'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ComponentProps } from "react"

interface NavLinkProps extends ComponentProps<typeof Link> {}

export function NavLink(props: NavLinkProps) {
    const params = usePathname(); 
  
    const isCurrent = props.href.toString() === params;

    return <Link data-current={isCurrent} {...props}/>
}