'use client'

import Link from "next/link"
import { useParams } from "next/navigation"
import { ComponentProps } from "react"

interface NavLinkProps extends ComponentProps<typeof Link> {}

export function NavLink(props: NavLinkProps) {
    const params = useParams(); 

    const currentPath = params?.slug || "";
  
    const hrefPath = props.href.toString().split("/").pop();
  
    const isCurrent = hrefPath === currentPath;
    
    return <Link data-current={isCurrent} {...props}/>
}