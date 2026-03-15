export type GrowthApiResponse = {
  status: boolean;
  message: string;
  data: {
    year: number;
    revenueByMonth: {
      jan: number;
      feb: number;
      mar: number;
      apr: number;
      may: number;
      jun: number;
      jul: number;
      aug: number;
      sep: number;
      oct: number;
      nov: number;
      dec: number;
    };
    customersByMonth: {
      jan: number;
      feb: number;
      mar: number;
      apr: number;
      may: number;
      jun: number;
      jul: number;
      aug: number;
      sep: number;
      oct: number;
      nov: number;
      dec: number;
    };
  };
};
