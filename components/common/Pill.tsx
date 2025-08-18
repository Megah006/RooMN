import React from "react";

export default function Pill({ children }: { children: React.ReactNode }) {
  return <span className="text-xs px-2 py-1 rounded-full bg-gray-100">{children}</span>;
}
