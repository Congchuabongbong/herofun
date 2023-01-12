export interface Campaign {
  createdAt: string;
  updatedAt: string;
  status: number;
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  donations: number;
  targetAmount: number;
  currentAmount: number;
  detail: string;
  image: string;
  portal: string;
  categoryId: string;
  description: string;
  accountId: number;
}

export interface Sponsor {
  updatedAt: string;
  status: number;
  id: number;
  createdAt: string;
  name: string;
  description: string;
  detail: string;
  image: string;
}


export interface ITransaction {
  senderName: string,
  message: string,
  amount: number,
  campaignId: number,
  paymentChannel: number,
  anonymous: boolean;
}

export interface IOrder {
  status: boolean,
  message: string,
  data: {
    id: number,
    senderName: string,
    message: string,
    amount: number,
    campaignId: number,
    paymentChannel: number,
    accountId: number,
    paymentStatus: string,
    orderId: string,
    link: {
      href: string,
      rel: string,
      method: string;
    };
  };
}
