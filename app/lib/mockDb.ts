export type MockUser = {
  phone: string;
  role: 'worker' | 'customer' | 'admin';
  name: string;
  otp: string;
};

export const MOCK_USERS: MockUser[] = [
  {
    phone: '7488288878',
    role: 'worker',
    name: 'Sunita Sharma',
    otp: '123456',
  },
  {
    phone: '9019147439',
    role: 'customer',
    name: 'Pramati Gupta',
    otp: '123456',
  },
  {
    phone: '9999999999',
    role: 'admin',
    name: 'HCF Admin',
    otp: '123456',
  },
];
