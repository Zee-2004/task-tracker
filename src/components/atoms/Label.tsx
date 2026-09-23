import { LabelHTMLAttributes } from 'react';

export default function Label(props: LabelHTMLAttributes<HTMLLabelElement>) {
  return <label {...props} className={'text-sm text-gray-600 ' + (props.className || '')} />;
}