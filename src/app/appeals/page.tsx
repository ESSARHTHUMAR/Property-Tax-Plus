
import Link from "next/link";
import { getAppeals } from "@/lib/api";
import AppealTable from "../components/appeal/AppealTable";
import ErrorBoundary from "@/app/components/ErrorBoundary";

// Display the data in table format
export default async function AppealsPage() {
  try {
    const data = await getAppeals();

    return (
      <div className="px-6 space-y-4 w-full">
        <div className="flex justify-between items-center">
          <h1 className="text-sm text-[#2D2E34] font-medium pb-2 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[4px] after:w-[144px] after:bg-[#3FC3AC] after:rounded-[8px] cursor-pointer">
            Appeal Letter{" "}
            <span className="text-white bg-[#F28372] ml-2.5 px-3 rounded-full">
              {data.length < 10 ? `0${data.length}` : `${data.length}`}
            </span>
          </h1>
          <Link
            href="/appeals/create"
            className="bg-[#F28372] text-xs font-bold text-white px-2 py-2 rounded hover:opacity-95"
          >
            Create Appeal
          </Link>
        </div>

        <AppealTable data={data} />
      </div>
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return <ErrorBoundary error={error} />;
    }
    return <ErrorBoundary error={new Error(String(error))} />;
  }
}
