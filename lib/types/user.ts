type User = {
  id: string;
  email: string;
  password: string;
  phone?: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  isVerified: boolean;
  status: number;
  createdAt: string;
};

export default User;
