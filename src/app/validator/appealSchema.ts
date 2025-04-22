import * as z from "zod";

export const appealSchema = z.object({
  taxYear: z.coerce.number().min(4, "Tax year is required"),
  company: z.string().min(1, "Company is required"),
  state: z.string().min(2, "State is required"),
  assessor: z.string().min(1, "Assessor By is required"),
  accountNumber: z.coerce.number().min(1, "Account number is required"),
  deadline: z.string().min(1, "Appeal deadline is required"),
  status: z.enum(["Sent", "Not sent"], { message: "Status is required" }),
  appealDate: z.string().min(1, "Appealed date is required"),
  appealBy: z.string().min(1, "Appeal by is required"),
});
