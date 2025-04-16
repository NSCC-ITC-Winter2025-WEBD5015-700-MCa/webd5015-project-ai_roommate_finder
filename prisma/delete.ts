import db from "@/lib/db";

async function deleteAllData() {
  try {
    console.log("🧹 Deleting all user-related data...");

    // Delete in order to avoid relation constraints
    await db.notification.deleteMany();
    await db.message.deleteMany();
    await db.match.deleteMany();
    await db.preferences.deleteMany();
    await db.session.deleteMany();
    await db.account.deleteMany();
    await db.user.deleteMany();

    console.log("✅ All data deleted successfully!");
  } catch (error) {
    console.error("❌ Error deleting data:", error);
  } finally {
    await db.$disconnect();
  }
}

deleteAllData();
