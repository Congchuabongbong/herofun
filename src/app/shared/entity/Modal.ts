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
  category: {
    id: number;
    name: string;
    image: string;
  };
  description: string;
  account: {
    id: number;
    username: string
  };
  sponsor: {
    id: number;
    name: string;
    image: string;
    description: string;
  }
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

export interface Category {
  createdAt: string,
  updatedAt: string,
  status: number,
  id: number,
  name: string,
  image: string
}

export interface PaymentSuccess {
  id: number
  senderName: string,
  message: string,
  amount: number,
  campaignId: number,
  paymentChannel: number,
  accountId: number,
  paymentStatus: string,
  orderId: string
}

export class FilterTransaction {
  constructor() {
    this.keyword = "";
    this.startAmount = "";
    this.endAmount = "";
    this.startDateSendingTime = "";
    this.endDateSendingTime = "";
    this.offset = 1;
    this.limit = 6;
  }

  public keyword: string;
  public startAmount: any;
  public endAmount: any;
  public startDateSendingTime: string;
  public endDateSendingTime: string;
  public offset: number;
  public limit: number;

}
export class ResponseTransactionToken {
  constructor() {
    this.items = [];
    this.totalElements = 0;
    this.totalPages = 0;
    this.offset = 0;
    this.limit = 0;
  }
  totalElements: number;
  totalPages: number;
  offset: number;
  limit: number;
  items: Transaction[];

}

export class Transaction {
  constructor() {
    this.senderName = "";
    this.message = "";
    this.amount = 0;
    this.sendingTime = "";
    this.campaign = "";
    this.paymentChannel = "";
    this.paymentStatus = "";
    this.paypalTransactionId = "";
  }
  public senderName: string;
  public message: string;
  public amount: number;
  public sendingTime: string;
  public campaign: string;
  public paymentChannel: string;
  public paymentStatus: string;
  public paypalTransactionId: string;
}

export class ResponseCampaignToken {

  constructor() {
    this.totalElements = 0;
    this.totalPages = 0;
    this.offset = 0;
    this.limit = 0;
    this.items = [];
  }
  totalElements: number;
  totalPages: number;
  offset: number;
  limit: number;
  items: Campaign[];
}




export class FilterCampaign {

  constructor() {
    this.keyword = "";
    this.endDateCreateAt = "";
    this.startDateCreateAt = "";
    this.category = "";
    this.status = "";
    this.targetAmountStart = "";
    this.targetAmountEnd = "";
    this.offset = 1;
    this.limit = 6;
  }

  keyword: string;
  endDateCreateAt: string;
  startDateCreateAt: string;
  category: string;
  status: string;
  targetAmountStart: string;
  targetAmountEnd: string;
  offset: number;
  limit: number;
}

export class CampaignRequest {
  constructor() {
    this.title = "";
    this.startDate = "";
    this.endDate = "";
    this.description = "";
    this.detail = "";
    this.image = "";
    this.targetAmount = 0;
    this.categoryId = 0;
    this.sponsorId = 0;
  }
  title: string;
  startDate: string;
  endDate: string;
  description: string;
  detail: string;
  image: string;
  targetAmount: number;
  categoryId: number;
  sponsorId: number;
}
