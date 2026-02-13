/**
 * Set Admin Claim for a User
 *
 * This script grants admin access to a specific user by email.
 *
 * Usage: npx tsx scripts/set-admin.ts <email>
 * Example: npx tsx scripts/set-admin.ts your@email.com
 */

import 'dotenv/config';
import { adminAuth } from '../lib/firebase-admin';

const email = process.argv[2];

if (!email) {
  console.error('❌ Please provide an email address');
  console.log('\nUsage: npx tsx scripts/set-admin.ts <email>');
  console.log('Example: npx tsx scripts/set-admin.ts admin@example.com');
  process.exit(1);
}

async function setAdmin() {
  try {
    console.log(`🔧 Setting admin claim for: ${email}\n`);

    // Get user by email
    const user = await adminAuth.getUserByEmail(email);
    console.log(`✓ Found user: ${user.email}`);

    // Set admin custom claim
    await adminAuth.setCustomUserClaims(user.uid, { admin: true });
    console.log('✓ Admin claim set successfully\n');

    // Verify
    const updatedUser = await adminAuth.getUser(user.uid);
    const hasAdmin = updatedUser.customClaims?.admin === true;

    if (hasAdmin) {
      console.log('✅ Success! User now has admin access.');
      console.log('\nYou can now login at http://localhost:3000/admin/login with:');
      console.log(`   Email: ${email}`);
    } else {
      console.log('❌ Failed to set admin claim');
    }

  } catch (error: any) {
    if (error.code === 'auth/user-not-found') {
      console.error(`❌ User not found: ${email}`);
      console.log('\nRun "npx tsx scripts/list-users.ts" to see all users');
    } else {
      console.error('❌ Error:', error.message);
    }
  }
}

setAdmin();
