"use client";

import { useRouter } from "next/navigation";
import { createAppeal } from "@/lib/api";
import AppealForm from "@/app/components/appeal/AppealForm";
import { Appeal } from "@/app/types/appeal";

export default function CreateAppealPage() {
  const router = useRouter();

  // Create the appeal
  const handleSubmit = async (data: Appeal) => {
    try {
      const now = new Date().toISOString();
      await createAppeal({ ...data, createdAt: now, updatedAt: now });
      router.refresh();
      router.push("/appeals");
    } catch (error) {
      console.error("Error saving appeal:", error);
    }
  };

  return (
    <div className="px-6 w-full">
      <h1 className="text-sm text-[#2D2E34] font-medium pb-2 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[4px] after:w-[98px] after:bg-[#3FC3AC] after:rounded-[8px]">
        Create Appeal
      </h1>
      <AppealForm onSubmit={handleSubmit} />
    </div>
  );
}
