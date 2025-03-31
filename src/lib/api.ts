export const fetchUserProfile = async (id: string) => {
    const res = await fetch(`/api/users/${id}`);
    return res.json();
  };
  