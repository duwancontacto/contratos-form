export interface Plan {
  id: string;
  name: string;
  duration: string;
}

export interface Product {
  id: number;
  description: string;
  price_list: string;
  price_membership_6: string;
  price_membership_12: string;
  varcode: string;
  plans: Plan[];
  pdv: string;
}
