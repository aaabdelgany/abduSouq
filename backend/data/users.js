import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Reg User',
    email: 'reg@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Meh User',
    email: 'meh@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
];

export default users;
