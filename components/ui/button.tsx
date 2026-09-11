import * as React from "react";
import { Slot } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * House rule: no pill-shaped buttons. Every variant is capped at `rounded-md`,
 * which resolves to the 3px `--radius` token. Do not add `rounded-full` here.
 */
const buttonVariants = cva(
  [
    "relative inline-flex items-center justify-center gap-2 rounded-md",
    "font-sans text-sm font-medium tracking-[0.01em] whitespace-nowrap",
    "transition-[background-color,border-color,color,box-shadow,transform] duration-200 ease-out",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:size-4 [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        primary:
          "bg-btn-primary text-btn-primary-fg hover:bg-btn-primary-hover active:translate-y-px",
        accent:
          "bg-btn-accent text-btn-accent-fg hover:bg-btn-accent-hover active:translate-y-px",
        outline:
          "border border-border-strong bg-transparent text-ink hover:border-ink hover:bg-ink/[0.04] active:translate-y-px",
        ghost:
          "bg-transparent text-ink hover:bg-ink/[0.06] active:translate-y-px",
        /**
         * For dark fields (hero, footer, dark sections). `--field-foreground`
         * and `--ink-deep` are light and dark respectively in BOTH themes, so
         * this pairing cannot invert into an unreadable state.
         */
        field:
          "bg-field-foreground text-ink-deep hover:bg-brass-bright active:translate-y-px",
        fieldOutline:
          "border border-field-border bg-transparent text-field-foreground hover:border-field-foreground hover:bg-white/[0.07] active:translate-y-px",
      },
      size: {
        sm: "h-9 px-3.5 text-[0.8125rem]",
        md: "h-11 px-5",
        lg: "h-12 px-6 text-[0.9375rem]",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot.Root : "button";
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { buttonVariants };
