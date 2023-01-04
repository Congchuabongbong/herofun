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

export interface Sponsor{
  updatedAt: string;
  status: number;
  id: number;
  createdAt: string;
  name: string;
  description: string;
  detail: string;
  image: string;
}
