
'use server';

// This function is disabled as the application is not connected to a live database.
export async function seedUsers() {
  console.log("Database seeding is disabled in mock mode.");
  return { success: true, count: 0 };
}
