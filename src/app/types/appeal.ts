export type Appeal = {
  id: number;
  taxYear: number;
  company: string;
  state: string;
  assessor: string;
  accountNumber: number;
  deadline: string;
  status: "Sent" | "Not sent";
  appealDate: string;
  appealBy: string;
  createdAt: string;
  updatedAt: string
};
