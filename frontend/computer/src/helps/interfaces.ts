export interface imgArrType {
  name: string;
  url: string;
}
export interface ActivityType {
  url: string;
  header: string;
  text: string;
}

// interfaces.ts
export interface productsType {
  id: number;
  url: string;
  name: string;
  description: string;
  price?: number | string;
  imgs?: string[] | undefined;
  discount?: number;
  finalPrice?: number;
}
