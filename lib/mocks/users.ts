import User from "@/lib/types/user";

export const mockUsers: User[] = [
  {
    id: "user1",
    email: "anna@example.com",
    password: "123456",
    phone: "+49 151 12345678",
    firstName: "Anna",
    lastName: "Schmidt",
    isVerified: true,
    status: 1,
    createdAt: "2024-01-01",
  },
  {
    id: "user2",
    email: "max@example.com",
    password: "123456z",
    phone: "+49 152 87654321",
    firstName: "Max",
    lastName: "Müller",
    isVerified: false,
    status: 1,
    createdAt: "2024-01-02",
  },
];

// текущий залогиненный пользователь
export const mockCurrentUser = mockUsers[0];
