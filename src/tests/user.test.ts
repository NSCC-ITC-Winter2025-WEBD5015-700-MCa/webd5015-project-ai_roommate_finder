import { db } from "@/lib/db"; // ✅ Use the same singleton instance

test('creates a user', async () => {
  const timestamp = Date.now();
  const email = `john.doe+${timestamp}@example.com`;

  const user = await db.user.create({
    data: {
      name: 'John Doe',
      email: email,
      password: 'password123'
    }
  });

  expect(user).toHaveProperty('id');
  expect(user.name).toBe('John Doe');
  expect(user.email).toBe(email); 
});
