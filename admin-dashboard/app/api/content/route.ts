import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { content } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import fs from 'fs/promises';
import path from 'path';

// GET /api/content - Get all content or specific section
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const section = searchParams.get('section');

    if (section) {
      const [sectionData] = await db
        .select()
        .from(content)
        .where(eq(content.section, section))
        .limit(1);

      return NextResponse.json(sectionData || null);
    }

    const allContent = await db.select().from(content);
    return NextResponse.json(allContent);
  } catch (error) {
    console.error('Error fetching content:', error);
    return NextResponse.json(
      { error: 'Failed to fetch content' },
      { status: 500 }
    );
  }
}

// PUT /api/content - Update content section
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { section, data, published } = body;

    if (!section || !data) {
      return NextResponse.json(
        { error: 'Section and data are required' },
        { status: 400 }
      );
    }

    // Check if section exists
    const [existing] = await db
      .select()
      .from(content)
      .where(eq(content.section, section))
      .limit(1);

    let result;
    if (existing) {
      // Update existing
      [result] = await db
        .update(content)
        .set({
          data,
          published: published ?? existing.published,
          updatedAt: new Date(),
        })
        .where(eq(content.section, section))
        .returning();
    } else {
      // Insert new
      [result] = await db
        .insert(content)
        .values({
          section,
          data,
          published: published ?? false,
        })
        .returning();
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error updating content:', error);
    return NextResponse.json(
      { error: 'Failed to update content' },
      { status: 500 }
    );
  }
}

// POST /api/content/publish - Publish content to live site
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { section } = body;

    // Get the content to publish
    const [contentData] = await db
      .select()
      .from(content)
      .where(eq(content.section, section))
      .limit(1);

    if (!contentData) {
      return NextResponse.json(
        { error: 'Content not found' },
        { status: 404 }
      );
    }

    // Update published status
    await db
      .update(content)
      .set({
        published: true,
        publishedAt: new Date(),
      })
      .where(eq(content.section, section));

    // Generate/update the actual HTML file
    await updateLiveWebsite(section, contentData.data);

    return NextResponse.json({
      success: true,
      message: 'Content published successfully',
    });
  } catch (error) {
    console.error('Error publishing content:', error);
    return NextResponse.json(
      { error: 'Failed to publish content' },
      { status: 500 }
    );
  }
}

// Helper function to update live website files
async function updateLiveWebsite(section: string, data: any) {
  // Path to the main website directory
  const websitePath = path.join(process.cwd(), '..');

  switch (section) {
    case 'hero':
      await updateHeroSection(websitePath, data);
      break;
    case 'about':
      await updateAboutSection(websitePath, data);
      break;
    case 'footer':
      await updateFooterSection(websitePath, data);
      break;
    // Add more sections as needed
  }
}

async function updateHeroSection(websitePath: string, data: any) {
  const indexPath = path.join(websitePath, 'index.html');
  let html = await fs.readFile(indexPath, 'utf-8');

  // Update hero content using regex or DOM manipulation
  // This is a simplified example - you'd want more robust parsing
  html = html.replace(
    /<p class="hero-tagline">.*?<\/p>/,
    `<p class="hero-tagline">${data.label}</p>`
  );

  html = html.replace(
    /<h1 class="hero-title">.*?<\/h1>/s,
    `<h1 class="hero-title">${data.title}</h1>`
  );

  html = html.replace(
    /<p class="hero-subtitle">.*?<\/p>/,
    `<p class="hero-subtitle">${data.subtitle}</p>`
  );

  await fs.writeFile(indexPath, html, 'utf-8');
}

async function updateAboutSection(websitePath: string, data: any) {
  const aboutPath = path.join(websitePath, 'about.html');
  let html = await fs.readFile(aboutPath, 'utf-8');

  // Similar updates for about page
  // ... implementation here

  await fs.writeFile(aboutPath, html, 'utf-8');
}

async function updateFooterSection(websitePath: string, data: any) {
  // Update footer in all HTML files
  const files = ['index.html', 'about.html', 'coaching.html', 'contact.html', 'system.html'];

  for (const file of files) {
    const filePath = path.join(websitePath, file);
    let html = await fs.readFile(filePath, 'utf-8');

    // Update footer content
    // ... implementation here

    await fs.writeFile(filePath, html, 'utf-8');
  }
}
