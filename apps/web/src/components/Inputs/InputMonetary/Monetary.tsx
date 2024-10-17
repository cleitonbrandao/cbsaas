import { Input } from "@/components/ui/input"
import { forwardRef, InputHTMLAttributes, useState } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;


export const Monetary = forwardRef<HTMLInputElement, InputProps>(({ type="text", name="", ...props }, ref) => {
    const [value, setValue] = useState("R$ 0,00");

    const formatNumber = (value: string) => {
        const numericValue = parseFloat(value.replace(/[^\d]/g, "")) / 100;
        if (isNaN(numericValue)) return "";
        
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
        }).format(numericValue);
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