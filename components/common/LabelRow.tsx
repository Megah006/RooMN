import React from "react";

type Props = { icon: React.ComponentType<{ className?: string }>; label: string };

export default function LabelRow({ icon: Icon, label }: Props) {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-600">
      <Icon className="w-4 h-4" />
      <span>{label}</span>
    </div>
  );
}
