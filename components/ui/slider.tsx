"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center min-w-28 md:min-w-40",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative  h-1.5 cursor-pointer w-full grow overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
      <SliderPrimitive.Range className="absolute h-full bg-gradient-to-r from-red-300 to-blue-300" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block cursor-pointer h-2.5 w-2.5 rounded-full border border-slate-300 bg-white ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50 dark:border-slate-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300" />
    <SliderPrimitive.Thumb className="block cursor-pointer h-2.5 w-2.5 rounded-full border border-slate-300 bg-white ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50 dark:border-slate-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300" />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
