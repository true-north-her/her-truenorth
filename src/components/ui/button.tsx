import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-button px-5 text-sm font-semibold transition-[color,background-color,border-color,transform,box-shadow] duration-ui ease-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:translate-y-px disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-soft hover:bg-primary-hover hover:shadow-lift",
        outline:
          "border border-secondary bg-background/75 text-primary hover:border-primary hover:bg-secondary",
        ghost: "bg-transparent text-primary underline-offset-4 hover:bg-secondary/55 hover:underline",
        link: "bg-transparent text-primary underline decoration-secondary underline-offset-4 hover:decoration-primary",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        secondary: "border border-secondary bg-background/75 text-primary hover:border-primary hover:bg-secondary",
      },
      size: {
        default: "h-11",
        sm: "h-9 px-3",
        lg: "h-12 px-6",
        icon: "size-10 px-0",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean };

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };