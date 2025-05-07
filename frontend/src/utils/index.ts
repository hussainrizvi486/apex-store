/* eslint-disable @typescript-eslint/no-explicit-any */
import { twMerge } from 'tailwind-merge'

import * as React from "react"

const MOBILE_BREAKPOINT = 768


export function cn(...args: (string)[]): string {
    return twMerge(args.filter(String).join(" "));
}


export function useIsMobile() {
    const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

    React.useEffect(() => {
        const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
        const onChange = () => {
            setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
        }
        mql.addEventListener("change", onChange)
        setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
        return () => mql.removeEventListener("change", onChange)
    }, [])

    return !!isMobile
}


export function decimal(value: any, precision = 2) {
    const v = isNaN(parseFloat(value)) ? 0 : parseFloat(value);
    return v.toFixed(precision);
}



export function formatCurrency(value: any) {
    return new Intl.NumberFormat("en-PH", {
        style: "currency",
        currency: "PHP",
    }).format(value);
}

export function float(value: any) {
    return isNaN(parseFloat(value)) ? 0 : parseFloat(value);
}