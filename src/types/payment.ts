export type UserStatus = 'Active' | 'Inactive';
export type PaymentStatus = 'Paid' | 'Unpaid' | 'Overdue';

export interface Payment {
    id: string;
    name: string;
    email: string;
    userStatus: UserStatus;
    lastLogin: string;
    paymentStatus: PaymentStatus;
    paymentDate?: string;
    dueDate?: string;
    amount: number;
}

export const initialPayments: Payment[] = [
    {
        id: '1', 
        name: 'justin Septimus',
        email: 'exemple@email.com',
        userStatus: 'Active',
        lastLogin: '14/09/2020',
        paymentStatus: "Paid",
        paymentDate: '15/09/2020',
        amount: 200
    },

    {
        id: '2',
        name: 'Anika Rhiel Madsen',
        email: 'exemple@email.com',
        userStatus: 'Active',
        lastLogin: '14/06/2022',
        paymentStatus: 'Overdue',
        dueDate: '17/03/2023',
        amount: 1.400,
    },
    {
    id: '3',
    name: 'Miracle Vaccaro',
    email: 'example@email.com',
    userStatus: 'Active',
    lastLogin: '14/09/2024',
    paymentStatus: 'Paid',
    paymentDate: '15/09/2025',
    amount: 250
  },

   {
    id: '4',
    name: 'Erin Levin',
    email: 'example@email.com',
    userStatus: 'Active',
    lastLogin: '14/09/2020',
    paymentStatus: 'Unpaid',
    dueDate: '15/09/2020',
    amount: 200
  },
  {
    id: '5',
    name: 'Mira Herwitz',
    email: 'example@email.com',
    userStatus: 'Inactive',
    lastLogin: '14/09/2020',
    paymentStatus: 'Paid',
    paymentDate: '15/09/2020',
    amount: 200
  }, 

   {
    id: '6',
    name: 'Jaxson Siphron',
    email: 'example@email.com',
    userStatus: 'Inactive',
    lastLogin: '14/09/2020',
    paymentStatus: 'Paid',
    paymentDate: '15/09/2020',
    amount: 750
  },

  {
    id: '7',
    name: 'Mira Levin',
    email: 'example@email.com',
    userStatus: 'Active',
    lastLogin: '14/09/2020',
    paymentStatus: 'Unpaid',
    dueDate: '15/09/2020',
    amount: 200
  },

  {
    id: '8',
    name: 'Lincoln Levin',
    email: 'example@email.com',
    userStatus: 'Active',
    lastLogin: '14/09/2020',
    paymentStatus: 'Paid',
    paymentDate: '15/09/2020',
    amount: 370
  },

  {
    id: '9',
    name: 'Philip Saris',
    email: 'example@email.com',
    userStatus: 'Inactive',
    lastLogin: '14/09/2020',
    paymentStatus: 'Unpaid',
    dueDate: '15/09/2020',
    amount: 200
  },

   {
    id: '10',
    name: 'Cheyenne Ekstrom Bothman',
    email: 'example@email.com',
    userStatus: 'Inactive',
    lastLogin: '14/09/2020',
    paymentStatus: 'Paid',
    paymentDate: '15/09/2020',
    amount: 150
  }
]