import { cn } from "@/lib/cn";
import { Input, type InputProps } from "./input";

export function EmailInput({ className, placeholder = "name@example.com", ...props }: InputProps) {
  return (
    <Input
      type="email"
      placeholder={placeholder}
      className={cn(className)}
      {...props}
    />
  );
}

interface PhoneInputProps extends InputProps {
  countryCode?: string;
}

export function PhoneInput({
  className,
  countryCode = "+966",
  placeholder = "50 123 4567",
  ...props
}: PhoneInputProps) {
  return (
    <div className="relative flex items-center w-full">
      <span className="absolute left-3 font-interface text-body-small text-muted select-none">
        {countryCode}
      </span>
      <Input
        type="tel"
        placeholder={placeholder}
        className={cn("pl-14", className)}
        {...props}
      />
    </div>
  );
}

export function UrlInput({ className, placeholder = "https://example.com", ...props }: InputProps) {
  return (
    <Input
      type="url"
      placeholder={placeholder}
      className={cn(className)}
      {...props}
    />
  );
}
