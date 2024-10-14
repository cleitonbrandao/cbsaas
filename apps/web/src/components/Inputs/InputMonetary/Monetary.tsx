import { Input } from "@/components/ui/input"
import { forwardRef, InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;


export const Monetary = forwardRef<HTMLInputElement, InputProps>(({ type="text", name="", ...props }, ref) => {
    return (
        <>
            <Input type={type} name={name} ref={ref} {...props}/>
        </>
    )
})