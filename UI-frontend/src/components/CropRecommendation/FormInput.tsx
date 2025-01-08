import React from 'react';

type FormInputProps = {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  unit?: string;
};

const FormInput: React.FC<FormInputProps> = ({ name, value, onChange, unit }) => {
  return (
    <div>
      <label htmlFor={name}>{name.charAt(0).toUpperCase() + name.slice(1)}</label>
      <input
        type={name === 'city' ? 'text' : 'number'} 
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
        placeholder={unit ? `Enter ${name} (${unit})` : `Enter ${name}`}
      />
    </div>
  );
};

export default FormInput;
