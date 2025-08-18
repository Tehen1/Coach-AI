
'use server';

import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { AppData, WaterGlass } from '@/lib/types';

/**
 * Retrieves the entire data document for a given user.
 * @param userId - The ID of the user.
 * @returns The user's data as an AppData object, or null if not found.
 */
export async function getUserData(userId: string): Promise<AppData | null> {
  const userRef = doc(db, 'users', userId);
  try {
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      return docSnap.data() as AppData;
    } else {
      console.log("No such document for user:", userId);
      return null;
    }
  } catch (error) {
    console.error("Error getting user data:", error);
    throw error;
  }
}

/**
 * Updates the water tracker glasses for a specific user.
 * @param userId - The ID of the user.
 * @param glasses - The new array of water glasses.
 */
export async function updateWaterTracker(userId: string, glasses: WaterGlass[]): Promise<void> {
  const userRef = doc(db, 'users', userId);
  try {
    await updateDoc(userRef, {
      'nutritionData.waterTracker.glasses': glasses,
    });
  } catch (error) {
    console.error("Error updating water tracker:", error);
    throw error;
  }
}
