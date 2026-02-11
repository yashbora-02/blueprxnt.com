import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { packages } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

// GET /api/packages - Get all packages
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const allPackages = await db
      .select()
      .from(packages)
      .orderBy(packages.order);

    return NextResponse.json(allPackages);
  } catch (error) {
    console.error('Error fetching packages:', error);
    return NextResponse.json(
      { error: 'Failed to fetch packages' },
      { status: 500 }
    );
  }
}

// POST /api/packages - Create new package
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      name,
      slug,
      description,
      price,
      duration,
      features,
      ctaText,
      ctaLink,
      recommended,
      active,
      order,
    } = body;

    // Validate required fields
    if (!name || !slug) {
      return NextResponse.json(
        { error: 'Name and slug are required' },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const [existing] = await db
      .select()
      .from(packages)
      .where(eq(packages.slug, slug))
      .limit(1);

    if (existing) {
      return NextResponse.json(
        { error: 'Package with this slug already exists' },
        { status: 400 }
      );
    }

    // Create package
    const [newPackage] = await db
      .insert(packages)
      .values({
        name,
        slug,
        description,
        price,
        duration,
        features,
        ctaText: ctaText || 'Apply Now',
        ctaLink: ctaLink || '/apply',
        recommended: recommended || false,
        active: active !== undefined ? active : true,
        order: order || 0,
      })
      .returning();

    return NextResponse.json(newPackage, { status: 201 });
  } catch (error) {
    console.error('Error creating package:', error);
    return NextResponse.json(
      { error: 'Failed to create package' },
      { status: 500 }
    );
  }
}

// PUT /api/packages/:id - Update package
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Package ID is required' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const updates = { ...body, updatedAt: new Date() };

    const [updatedPackage] = await db
      .update(packages)
      .set(updates)
      .where(eq(packages.id, parseInt(id)))
      .returning();

    if (!updatedPackage) {
      return NextResponse.json(
        { error: 'Package not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedPackage);
  } catch (error) {
    console.error('Error updating package:', error);
    return NextResponse.json(
      { error: 'Failed to update package' },
      { status: 500 }
    );
  }
}

// DELETE /api/packages/:id - Delete package
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Package ID is required' },
        { status: 400 }
      );
    }

    await db.delete(packages).where(eq(packages.id, parseInt(id)));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting package:', error);
    return NextResponse.json(
      { error: 'Failed to delete package' },
      { status: 500 }
    );
  }
}

// PATCH /api/packages/reorder - Reorder packages
export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { packageIds } = body; // Array of package IDs in new order

    if (!Array.isArray(packageIds)) {
      return NextResponse.json(
        { error: 'packageIds must be an array' },
        { status: 400 }
      );
    }

    // Update order for each package
    const updates = packageIds.map((id, index) =>
      db
        .update(packages)
        .set({ order: index })
        .where(eq(packages.id, id))
    );

    await Promise.all(updates);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error reordering packages:', error);
    return NextResponse.json(
      { error: 'Failed to reorder packages' },
      { status: 500 }
    );
  }
}
