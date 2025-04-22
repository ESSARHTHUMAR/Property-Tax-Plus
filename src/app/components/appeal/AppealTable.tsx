"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Appeal } from "@/app/types/appeal";
import { deleteAppeal } from "@/lib/api";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BsThreeDots } from "react-icons/bs";
import { formatDate } from "@/lib/formatDate";

export default function AppealTable({ data }: { data: Appeal[] }) {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const paginatedAppeals = data.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const handleDelete = async (id?: number) => {
    if (!id) return;
    await deleteAppeal(id.toString());
    router.refresh();
  };

  return (
    <div className="flex flex-col h-full">
    <div className="overflow-auto rounded-t-lg pb-16 flex-grow">
      <table className="min-w-full bg-[#FFFFFF] rounded-b-lg">
        {/* Table headers */}
        <thead className="bg-[#ECF3F9] text-left">
          <tr>
            {[
              "TAX YEAR",
              "COMPANY",
              "STATE",
              "ASSESSOR",
              "ACCOUNT NUMBER",
              "APPEALED DEADLINE",
              "STATUS",
              "APPEALED DATE",
              "APPEALED BY",
              "ACTIONS",
            ].map((col) => (
              <th key={col} className="text-[#5F7181] text-xs p-4 tracking-[2%]">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Table data */}
          {paginatedAppeals.map((appeal: Appeal) => (
            <tr key={appeal.id} className="border-b border-[#F6F7F8]">
              <td className="p-4 text-[#2D2E34] text-sm font-medium">
                {appeal.taxYear}
              </td>
              <td className="p-4 text-[#2D2E34] text-sm font-medium">
                {appeal.company}
              </td>
              <td className="p-4 text-[#2D2E34] text-sm font-medium">
                {appeal.state}
              </td>
              <td className="p-4 text-[#2D2E34] text-sm font-medium">
                {appeal.assessor}
              </td>
              <td className="p-4 text-[#2D2E34] text-sm font-medium">
                {appeal.accountNumber}
              </td>
              <td className="p-4 text-[#2D2E34] text-sm font-medium">
                {formatDate(appeal.deadline)}
              </td>
              <td
                className={`p-4 text-sm font-medium ${
                  appeal.status === "Not sent"
                    ? "text-red-600"
                    : "text-[#2D2E34]"
                }`}
              >
                {appeal.status}
              </td>
              <td className="p-4 text-[#2D2E34] text-sm font-medium">
                {formatDate(appeal.appealDate)}
              </td>
              <td className="p-4 text-[#2D2E34] text-sm font-medium">
                {appeal.appealBy}
              </td>

              {/* Actions */}
              <td className="p-4 text-[#2D2E34] text-sm font-medium">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <BsThreeDots className="cursor-pointer" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() => router.push(`/appeals/edit/${appeal.id}`)}
                    >
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() => handleDelete(appeal.id)}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center py-4 bg-[#F6F7F8] gap-2 fixed left-0 right-0 bottom-0">
        {Array.from(
          { length: Math.ceil(data.length / itemsPerPage) },
          (_, i) => (
            <Button
              key={i}
              variant={i + 1 === page ? "default" : "outline"}
              onClick={() => setPage(i + 1)}
              className="cursor-pointer border border-black"
            >
              {i + 1}
            </Button>
          )
        )}
      </div>
    </div>
    </div>
  );
}
