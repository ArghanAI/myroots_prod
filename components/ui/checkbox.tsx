import * as React from "react"
import { cn } from "@/lib/utils"

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  checked?: boolean
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(({ className, checked, ...props }, ref) => {
  return <input type="checkbox" ref={ref} checked={checked} className={cn("sr-only peer", className)} {...props} />
})
Checkbox.displayName = "Checkbox"

export interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  checked?: boolean
}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(({ className, checked, ...props }, ref) => {
  return (
    <div className={cn("relative inline-flex items-center h-5 w-11 cursor-pointer rounded-full bg-muted", className)}>
      <input type="checkbox" ref={ref} checked={checked} className={cn("sr-only peer", className)} {...props} />
      <span
        className={cn(
          "absolute left-0 top-0 flex h-full w-full items-center justify-center transition-transform duration-200 ease-in-out peer-checked:translate-x-6 peer-checked:bg-secondary peer-checked:text-white",
          className,
        )}
      >
        <span className="block h-4 w-4 rounded-full bg-white"></span>
      </span>
    </div>
  )
})
Switch.displayName = "Switch"

export { Checkbox, Switch }

