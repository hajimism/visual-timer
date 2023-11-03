"use client";

import type { ElementRef, ComponentPropsWithoutRef } from "react";

import * as SliderPrimitive from "@radix-ui/react-slider";
import { forwardRef } from "react";

import { cn } from "@/common/lib/cn";

const Slider = forwardRef<
  ElementRef<typeof SliderPrimitive.Root>,
  ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-2 h-40 touch-none select-none justify-center data-[disabled=true]:pointer-events-none",
      className
    )}
    {...props}
    min={0}
    max={90}
    step={5}
    orientation="vertical"
  >
    <SliderPrimitive.Track className="relative h-40 w-2 rounded-full bg-secondary">
      <SliderPrimitive.Range className="absolute w-full rounded-full bg-primary" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border-2 border-secondary bg-primary transition-colors focus-visible:outline-none" />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
