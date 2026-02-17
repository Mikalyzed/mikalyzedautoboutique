import { auth } from "@clerk/nextjs/server";

const ADMIN_USER_IDS = (process.env.ADMIN_USER_IDS || "")
  .split(",")
  .map((id) => id.trim())
  .filter(Boolean);

export async function requireAdmin(): Promise<{ userId: string }> {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  if (ADMIN_USER_IDS.length > 0 && !ADMIN_USER_IDS.includes(userId)) {
    throw new Error("Forbidden: Admin access required");
  }

  return { userId };
}
