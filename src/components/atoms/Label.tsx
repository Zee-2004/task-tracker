import { LabelHTMLAttributes } from "react";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  htmlFor: string;
}

export default function Label({ className, ...rest }: LabelProps) {
  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label {...rest} className={"text-sm text-gray-600 " + (className || "")} />
  );
}
