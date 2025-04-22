import { Appeal } from "@/app/types/appeal";

const BASE_URL = "https://json-server-eufh.onrender.com/appeals";

export const getAppeals = async (): Promise<Appeal[]> => {
  const res = await fetch(`${BASE_URL}`);
  if (!res.ok) throw new Error("Failed to fetch appeals");
  return res.json();
};

export const getAppealById = async (id: string): Promise<Appeal> => {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error("Appeal not found");
  return res.json();
};

export const createAppeal = async (data: Omit<Appeal, 'id'>): Promise<Appeal> => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error creating appeal");
  return res.json();
};

export const updateAppeal = async (id: string, data: Partial<Appeal>): Promise<Appeal> => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error updating appeal");
  return res.json();
};

export const deleteAppeal = async (id: string) => {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Error deleting appeal");
};
