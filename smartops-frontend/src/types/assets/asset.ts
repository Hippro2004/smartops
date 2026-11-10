export const ASSET_CATEGORIES = ["LAPTOP", "MONITOR", "ACCESSORY"] as const;
export const ASSET_STATUSES = ["AVAILABLE", "IN_USE", "RETIRED"] as const;

export type AssetCategory = (typeof ASSET_CATEGORIES)[number];
export type AssetStatus = (typeof ASSET_STATUSES)[number];

export interface PageResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface AssetRequest {
  name: string;
  serialNumber: string;
  image: string | null;
  category: AssetCategory | null;
  status: AssetStatus;
  description: string;
}

export interface AssetResponse {
  id: number;
  name: string;
  serialNumber: string;
  image: string | null;
  category: AssetCategory;
  status: AssetStatus;
  description: string;
}
