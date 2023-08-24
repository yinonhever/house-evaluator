export interface HouseData {
  id: number;
  address: string;
  currentValue: number;
  loanAmount: number;
  risk: number;
}

export type Nullable<T> = { [K in keyof T]: T[K] | null };

export type HouseFormData = Nullable<Omit<HouseData, "id" | "risk">>;
