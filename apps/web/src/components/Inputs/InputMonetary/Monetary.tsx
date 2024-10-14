import { Input } from "@/components/ui/input"
import { forwardRef, InputHTMLAttributes, useState } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;


export const Monetary = forwardRef<HTMLInputElement, InputProps>(({ type="text", name="", ...props }, ref) => {
    const [value, setValue] = useState("");

    const formatNumber = (value: string) => {
        const numericValue = value.replace(/[^\d]/g, "");
        if (!numericValue) return "";
        
        return numericValue
          .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
          .replace(/(\d+)(\d{2})$/, "$1,$2");
      };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formattedValue = formatNumber(e.target.value);
        setValue(formattedValue);
    }
    return (
        <>
            <Input type={type} name={name} ref={ref} value={value} onChange={handleChange} {...props} />
        </>
    )
})

Monetary.displayName = 'Monetary';