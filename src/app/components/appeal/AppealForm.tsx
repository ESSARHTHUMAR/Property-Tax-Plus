"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { appealSchema } from "@/app/validator/appealSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

type FormData = z.infer<typeof appealSchema>;

export default function AppealForm({
  onSubmit,
  defaultValues = {},
}: {
  onSubmit: (data: FormData) => void;
  defaultValues?: Partial<FormData>;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmitWithLoading = async (data: FormData) => {
    setLoading(true);
    await onSubmit(data); // make sure this is awaited inside `create/page.tsx`
    setLoading(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(appealSchema),
    defaultValues,
  });

  return (
    <form
      onSubmit={handleSubmit(handleSubmitWithLoading)}
      className="mt-4 bg-white rounded-lg"
    >
      <div className="grid grid-cols-2 gap-4 gap-x-20 px-6 py-4">
        <div className="flex flex-col gap-2">
          <label className="text-xs">Tax year</label>
          <Input type="number" {...register("taxYear")} />
          {errors.taxYear && (
            <span className="text-red-500 text-xs">
              {errors.taxYear.message}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs">Company</label>
          <Input {...register("company")} />
          {errors.company && (
            <span className="text-red-500 text-xs">
              {errors.company.message}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs">State</label>
          <Input {...register("state")} />
          {errors.state && (
            <span className="text-red-500 text-xs">{errors.state.message}</span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs">Assessor</label>
          <Input {...register("assessor")} />
          {errors.assessor && (
            <span className="text-red-500 text-xs">
              {errors.assessor.message}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs">Account Number</label>
          <Input type="number" {...register("accountNumber")} />
          {errors.accountNumber && (
            <span className="text-red-500 text-xs">
              {errors.accountNumber.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs">Status</label>
          <select
            {...register("status")}
            className="border border-gray-300 rounded px-3 py-2 text-xs"
          >
            <option value="">Select status</option>
            <option value="Sent">Sent</option>
            <option value="Not sent">Not sent</option>
          </select>
          {errors.status && (
            <span className="text-red-500 text-xs">
              {errors.status.message}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs">Deadline</label>
          <Input type="date" {...register("deadline")} />
          {errors.deadline && (
            <span className="text-red-500 text-xs">
              {errors.deadline.message}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs">Appeal Date</label>
          <Input type="date" {...register("appealDate")} />
          {errors.appealDate && (
            <span className="text-red-500 text-xs">
              {errors.appealDate.message}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs">Appeal By</label>
          <Input {...register("appealBy")} />
          {errors.appealBy && (
            <span className="text-red-500 text-xs">
              {errors.appealBy.message}
            </span>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-2 mt-6 pr-6 pb-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/appeals")}
          className="cursor-pointer"
        >
          Cancel
        </Button>
        <Button type="submit" disabled={loading} className="cursor-pointer">
        {loading ? "Saving..." : "Save"}
        </Button>
      </div>
    </form>
  );
}
