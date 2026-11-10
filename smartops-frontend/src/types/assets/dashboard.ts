export interface CategoryCount {
  category: string;
  count: number;
}

export interface DashboardStats {
  totalAssets: number;
  available: number;
  inUse: number;
  retired: number;
  totalUsers: number;
  byCategory: CategoryCount[];
}
