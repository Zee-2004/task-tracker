import { ReactNode } from "react";
import Label from "../atoms/Label";

interface FormFieldProps {
  id: string;
  label: string;
  children: ReactNode;
}

export default function FormField({ id, label, children }: FormFieldProps) {
  return (
    <div className="space-y-1">
      <Label htmlFor={id}>{label}</Label>
      {children}
    </div>
  );
}
