import { fetchUserProfile } from "@/lib/api";

export default async function ProfilePage({ params }: { params: { id: string } }) {
  const user = await fetchUserProfile(params.id);

  return <div>{user.name}'s Profile</div>;
}
