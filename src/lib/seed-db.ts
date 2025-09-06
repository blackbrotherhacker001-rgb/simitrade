
'use server';

import { collection, doc, writeBatch } from 'firebase/firestore';
import { db } from './firebase';
import { MOCK_USERS } from '@/hooks/use-auth';
import type { User } from '@/types';

export async function seedUsers() {
  const usersCollection = collection(db, 'users');
  const batch = writeBatch(db);

  let count = 0;
  for (const walletAddress in MOCK_USERS) {
    const userRef = doc(usersCollection, walletAddress);
    const userData: Omit<User, 'walletAddress'> = MOCK_USERS[walletAddress];
    
    // Add the isAdmin property, setting it true for the admin user
    const fullUserData: User = {
        ...userData,
        walletAddress: walletAddress,
        isAdmin: walletAddress === '0xbd9A66ff3694e47726C1C8DD572A38168217BaA1',
    };

    batch.set(userRef, fullUserData);
    count++;
  }

  try {
    await batch.commit();
    console.log(`Successfully seeded ${count} users.`);
    return { success: true, count };
  } catch (error) {
    console.error("Error seeding users:", error);
    return { success: false, error };
  }
}
