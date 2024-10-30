import { FieldError, UseFormRegister } from 'react-hook-form';

type FormInputProps = {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  error?: FieldError;
  type?: string;
  placeholder?: string;
  isCheckbox?: boolean;
  width?: string;
};

export default function FormInput({
  label,
  name,
  register,
  error,
  type = 'text',
  placeholder = '',
  isCheckbox = false,
  width = 'w-full',
}: FormInputProps) {
  return (
    <div className={width}>
      {isCheckbox ? (
        <label htmlFor={name} className="flex cursor-pointer items-center gap-1">
          <input id={name} type="checkbox" {...register(name)} className="sr-only" />
          <span className="checkbox-icon">
            <svg width="21" height="25" viewBox="0 0 21 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M8.2539 18.0292L3.9585 12.8521L4.57558 12.1094L8.2539 16.5427L16.1671 7.00522L16.7834 7.74793L8.2539 18.0292Z"
                fill="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="text-sm font-medium">{label}</span>
        </label>
      ) : (
        <div className="flex w-full flex-col gap-2 text-sm">
          <label htmlFor={name} className="font-bold">
            {label}
          </label>
          <input
            id={name}
            type={type}
            placeholder={placeholder}
            {...register(name)}
            className="border-b border-primary pb-1 transition-colors duration-200 ease-in-out hover:border-tertiary focus:border-tertiary focus:outline-none"
          />
        </div>
      )}
      {error && <p className="mt-1 text-xs text-warning">{error.message}</p>}
    </div>
  );
}
