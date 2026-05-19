export interface User {
  id: string;
  email: string;
  password: string;
  businessName: string;
  currency: string;
  logo?: string;
}

export interface Member {
  id: string;
  name: string;
  phone: string;
  email: string;
  joinDate: string;
  profileImage: string;
}

export interface Plan {
  id: string;
  name: string;
  type: 'monthly' | 'quarterly' | 'annual';
  price: number;
  description?: string;
}

export interface Membership {
  id: string;
  memberId: string;
  planId: string;
  status: 'active' | 'expired' | 'paused' | 'extended';
  startDate: string;
  endDate: string;
  amountPaid: number;
}

export interface DashboardStats {
  totalMembers: number;
  activePlans: number;
  expiredPlans: number;
  totalRevenue: number;
  pausedPlans: number;
  extendedPlans: number;
}
