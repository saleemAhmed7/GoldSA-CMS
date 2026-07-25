import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import { Input } from "./input";

export interface DatePickerProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "onChange"> {
  value?: string;
  onChange?: (date: string) => void;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

export function DatePicker({ className, value, onChange, size = "md", ...props }: DatePickerProps) {
  return (
    <Input
      type="date"
      size={size}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      className={cn("font-interface cursor-pointer", className)}
      {...props}
    />
  );
}

export interface TimePickerProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "onChange"> {
  value?: string;
  onChange?: (time: string) => void;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

export function TimePicker({ className, value, onChange, size = "md", ...props }: TimePickerProps) {
  return (
    <Input
      type="time"
      size={size}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      className={cn("font-interface cursor-pointer", className)}
      {...props}
    />
  );
}

export interface DateRangeProps {
  startDate?: string;
  endDate?: string;
  onChange?: (range: { startDate: string; endDate: string }) => void;
  className?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  disabled?: boolean;
}

export function DateRange({
  startDate = "",
  endDate = "",
  onChange,
  className,
  size = "md",
  disabled,
}: DateRangeProps) {
  return (
    <div className={cn("inline-flex items-center gap-2 w-full", className)}>
      <DatePicker
        size={size}
        value={startDate}
        disabled={disabled}
        onChange={(val) => onChange?.({ startDate: val, endDate })}
        placeholder="Start Date"
      />
      <span className="text-muted font-medium text-body-small">to</span>
      <DatePicker
        size={size}
        value={endDate}
        disabled={disabled}
        onChange={(val) => onChange?.({ startDate, endDate: val })}
        placeholder="End Date"
      />
    </div>
  );
}
