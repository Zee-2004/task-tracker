import Badge from "../atoms/Badge";

type Priority = "LOW" | "MEDIUM" | "HIGH";

const PRIORITY_COLORS: Record<Priority, string> = {
  LOW: "bg-green-100 text-green-700",
  MEDIUM: "bg-yellow-100 text-yellow-700",
  HIGH: "bg-red-100 text-red-700",
};

export default function PriorityBadge({ priority }: { priority: Priority }) {
  return <Badge label={priority} colorClass={PRIORITY_COLORS[priority]} />;
}
