// app/api/appeals/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt((await params).id);
  const { status } = await req.json();
  const filePath = path.join(process.cwd(), "src/app/constants/appeals.json");

  try {
    // Read existing data
    const jsonData = await fs.readFile(filePath, "utf-8");
    const data = JSON.parse(jsonData);

    // Update status for specific appeal
    const updatedData = data.map((item: any) =>
      item.id === id ? { ...item, status } : item
    );

    // Write back updated data
    await fs.writeFile(filePath, JSON.stringify(updatedData, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating file:", error);
    return NextResponse.json(
      { error: "Failed to update status" },
      { status: 500 }
    );
  }
}
