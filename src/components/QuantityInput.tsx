import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';

interface QuantityInputProps {
  value: number;
  onChange: (value: number) => void;
  className?: string;
}

export default function QuantityInput({ value, onChange, className }: QuantityInputProps) {
  const [displayValue, setDisplayValue] = useState(String(value));

  useEffect(() => {
    setDisplayValue(String(value));
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    // Allow empty or numeric values only
    if (newValue === '' || /^\d+$/.test(newValue)) {
      setDisplayValue(newValue);
    }
  };

  const handleBlur = () => {
    const numValue = parseInt(displayValue) || 1;
    const finalValue = Math.max(1, numValue);
    setDisplayValue(String(finalValue));
    onChange(finalValue);
  };

  return (
    <Input
      type="text"
      inputMode="numeric"
      pattern="[0-9]*"
      value={displayValue}
      onChange={handleChange}
      onBlur={handleBlur}
      className={className}
    />
  );
}
