import { InputHTMLAttributes } from 'react';

export default function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={'w-full border rounded-md px-3 py-2 text-sm ' + (props.className || '')}
    />
  );
}