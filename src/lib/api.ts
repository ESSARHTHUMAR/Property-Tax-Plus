const BASE_URL = "http://localhost:3001/appeals";

export const getAppeals = async () => {
  const res = await fetch(`${BASE_URL}`);
  if (!res.ok) throw new Error("Failed to fetch appeals");
  return res.json();
};

export const getAppealById = async (id: string) => {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error("Appeal not found");
  return res.json();
};

export const createAppeal = async (data: any) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error creating appeal");
  return res.json();
};

export const updateAppeal = async (id: string, data: any) => {
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
