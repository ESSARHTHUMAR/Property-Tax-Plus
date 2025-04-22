"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import AppealForm from "@/app/components/appeal/AppealForm";
import { getAppealById, updateAppeal } from "@/lib/api";
import { Appeal } from "@/app/types/appeal";

export default function EditAppealPage() {
  const router = useRouter();
  const { id } = useParams();
  const [appeal, setAppeal] = useState<Appeal | null>(null);

  useEffect(() => {
    const fetchAppeal = async () => {
      if (typeof id === "string") {
        const data = await getAppealById(id);
        setAppeal(data);
      }
    };
    fetchAppeal();
  }, [id]);

  const handleSubmit = async (data: any) => {
    const now = new Date().toISOString();
    if (appeal) {
      await updateAppeal(String(appeal.id), {
        ...data,
        createdAt: appeal.createdAt,
        updatedAt: now,
      });
      router.push("/appeals");
    }
  };

  if (!appeal) return <div className="p-6">Loading...</div>;

  return (
    <div className="px-6 w-full">
      <h1 className="text-sm text-[#2D2E34] font-medium pb-2 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[4px] after:w-[80px] after:bg-[#3FC3AC] after:rounded-[8px]">
        Edit Appeal
      </h1>
      <AppealForm onSubmit={handleSubmit} defaultValues={appeal} />
    </div>
  );
}
