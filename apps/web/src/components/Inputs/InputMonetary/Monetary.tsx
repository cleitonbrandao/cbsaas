import { Input } from "@/components/ui/input"
import { forwardRef, InputHTMLAttributes, useState, useEffect } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;


export const Monetary = forwardRef<HTMLInputElement, InputProps>(({ type="text", name="", defaultValue, ...props }, ref) => {
    const [value, setValue] = useState("R$ 0,00");

    useEffect(() => {
        if (defaultValue !== undefined && defaultValue !== null) {
            let numericValue: number;

            if (typeof defaultValue === "number") {
                numericValue = defaultValue;
            } else if (typeof defaultValue === "string") {
                numericValue = parseFloat(defaultValue);
            } else {
                numericValue = parseFloat(Array.isArray(defaultValue) ? defaultValue[0] : "0");
            }

            const formattedValue = new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL"
            }).format(numericValue);
            setValue(formattedValue);
        }
    }, [defaultValue]);

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