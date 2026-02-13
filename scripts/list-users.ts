/**
 * List Firebase Users and Check Admin Claims
 *
 * This script lists all Firebase users and shows which ones have admin access.
 *
 * Usage: npx tsx scripts/list-users.ts
 */

import 'dotenv/config';
import { adminAuth } from '../lib/firebase-admin';

async function listUsers() {
  try {
    console.log('📋 Listing all Firebase users...\n');

    const listUsersResult = await adminAuth.listUsers();

    if (listUsersResult.users.length === 0) {
      console.log('No users found in Firebase Auth');
      return;
    }

    console.log(`Found ${listUsersResult.users.length} user(s):\n`);

    listUsersResult.users.forEach((user, index) => {
      const hasAdminClaim = user.customClaims?.admin === true;
      console.log(`${index + 1}. ${user.email || 'No email'}`);
      console.log(`   UID: ${user.uid}`);
      console.log(`   Admin claim: ${hasAdminClaim ? '✅ YES' : '❌ NO'}`);
      console.log(`   Email verified: ${user.emailVerified ? 'Yes' : 'No'}`);
      console.log('');
    });

    const adminUsers = listUsersResult.users.filter(u => u.customClaims?.admin === true);
    if (adminUsers.length === 0) {
      console.log('⚠️  No users have admin access!');
      console.log('\nTo grant admin access to a user, run:');
      console.log('npx tsx scripts/set-admin.ts <email>');
    } else {
      console.log(`✅ ${adminUsers.length} user(s) have admin access`);
    }

  } catch (error) {
    console.error('❌ Error listing users:', error);
  }
}

listUsers();
