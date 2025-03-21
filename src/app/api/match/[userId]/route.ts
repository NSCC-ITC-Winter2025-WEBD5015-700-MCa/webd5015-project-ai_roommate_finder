import { findMatches } from "@/lib/aiMatches";

export async function GET(req: Request, { params }: { params: { userId: string } }) {
  try {
    const result = await findMatches(params.userId);
    return Response.json(result);
  } catch (err) {
    console.error("Matchmaking failed:", err);
    return new Response("Matchmaking failed", { status: 500 });
  }
}
