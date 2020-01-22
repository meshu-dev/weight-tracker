export interface IWeighin {
  id: number;
  date: any;
  value: string;
}

export interface WeighInResolved {
  weighIn: IWeighin;
  error?: any;
}

/*
export interface WeighIn {
  weighinId: number;
  date: any;
  value: string;
} */
