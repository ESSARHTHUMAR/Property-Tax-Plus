"use client";

import { useEffect } from "react";

export default function ErrorBoundary({ error }: { error: Error }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="p-4 text-red-600">
      <h2 className="text-lg font-bold">Something went wrong</h2>
      <p>{error.message}</p>
    </div>
  );
}
