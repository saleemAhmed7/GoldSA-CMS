// Existing primitives
export { Button } from "./button";
export type { ButtonProps, ButtonSize, ButtonVariant } from "./button";

export { Card } from "./card";
export type { CardProps, CardSize, CardVariant } from "./card";

export { Input } from "./input";
export type { InputProps, InputSize, InputStatus, InputVariant } from "./input";

export { Label } from "./label";
export type { LabelProps } from "./label";

export { Typography } from "./typography";
export type { TypographyProps, TypographyTone, TypographyVariant } from "./typography";

// Group 1: Actions & Buttons
export { IconButton } from "./icon-button";
export type { IconButtonProps, IconButtonSize, IconButtonVariant } from "./icon-button";

export { SplitButton } from "./split-button";
export type { SplitButtonProps, SplitButtonVariant, SplitOption } from "./split-button";

export { ButtonGroup } from "./button-group";
export type { ButtonGroupProps, ButtonGroupSize, ButtonGroupVariant } from "./button-group";

export { FloatingActionButton } from "./floating-action-button";
export type { FloatingActionButtonProps, FABSize, FABVariant } from "./floating-action-button";

// Group 2: Form Controls & Inputs
export { Textarea } from "./textarea";
export type { TextareaProps, TextareaSize, TextareaStatus, TextareaVariant } from "./textarea";

export { PasswordInput } from "./password-input";
export type { PasswordInputProps, PasswordStrength } from "./password-input";

export { SearchInput } from "./search-input";
export type { SearchInputProps } from "./search-input";

export { NumberInput } from "./number-input";
export type { NumberInputProps } from "./number-input";

export { EmailInput, PhoneInput, UrlInput } from "./specialized-inputs";

export { DatePicker, TimePicker, DateRange } from "./date-picker";
export type { DatePickerProps, TimePickerProps, DateRangeProps } from "./date-picker";

export { ColorPicker } from "./color-picker";
export type { ColorPickerProps } from "./color-picker";

export { FileUpload, DragDropUpload } from "./file-upload";
export type { FileUploadProps } from "./file-upload";

export { OTPInput } from "./otp-input";
export type { OTPInputProps } from "./otp-input";

export { TagsInput } from "./tags-input";
export type { TagsInputProps } from "./tags-input";

// Group 3: Selection Controls
export { Checkbox } from "./checkbox";
export type { CheckboxProps, CheckboxSize, CheckboxVariant } from "./checkbox";

export { RadioGroup, Radio } from "./radio-group";
export type { RadioGroupProps, RadioProps, RadioSize, RadioVariant } from "./radio-group";

export { Switch } from "./switch";
export type { SwitchProps, SwitchSize, SwitchVariant } from "./switch";

export { SegmentedControl } from "./segmented-control";
export type {
  SegmentedControlProps,
  SegmentedControlSize,
  SegmentedControlVariant,
  SegmentOption,
} from "./segmented-control";

export { Slider } from "./slider";
export type { SliderProps, SliderSize, SliderVariant } from "./slider";

export { Select, MultiSelect } from "./select";
export type { SelectOption, SelectProps, MultiSelectProps } from "./select";

export { Autocomplete, CommandPalette } from "./autocomplete";
export type {
  AutocompleteItem,
  AutocompleteProps,
  CommandItem,
  CommandPaletteProps,
} from "./autocomplete";

// Group 4: Navigation
export { Breadcrumb } from "./breadcrumb";
export type { BreadcrumbItem, BreadcrumbProps } from "./breadcrumb";

export { Tabs, TabList, TabTrigger, TabContent } from "./tabs";
export type { TabsProps, TabsSize, TabsVariant } from "./tabs";

export { Pagination } from "./pagination";
export type { PaginationProps } from "./pagination";

export { Stepper } from "./stepper";
export type { StepItem, StepperProps } from "./stepper";

export { DropdownMenu } from "./dropdown-menu";
export type { DropdownMenuProps, MenuItem } from "./dropdown-menu";

// Group 5: Feedback & Indicators
export { Alert, Banner } from "./alert";
export type { AlertProps, AlertSize, AlertVariant, BannerProps } from "./alert";

export { Toast } from "./toast";
export type { ToastProps, ToastVariant } from "./toast";

export { Progress } from "./progress";
export type { ProgressProps, ProgressSize, ProgressVariant } from "./progress";

export { Spinner, Skeleton, EmptyState, StatusIndicator } from "./spinner";
export type {
  SpinnerProps,
  SpinnerSize,
  SpinnerVariant,
  SkeletonProps,
  SkeletonVariant,
  EmptyStateProps,
  StatusIndicatorProps,
  StatusType,
} from "./spinner";

// Group 6: Overlays & Dialogs
export { Modal, Dialog } from "./modal";
export type { ModalProps, DialogProps } from "./modal";

export { Drawer, Tooltip, Popover } from "./drawer";
export type { DrawerProps, TooltipProps, PopoverProps } from "./drawer";

// Group 7: Data Display
export { Badge, Chip, Tag } from "./badge";
export type { BadgeProps, BadgeSize, BadgeVariant, ChipProps, ChipVariant } from "./badge";

export { Avatar, Divider } from "./avatar";
export type { AvatarProps, AvatarSize, DividerProps, DividerVariant } from "./avatar";

export { Accordion, TreeView } from "./accordion";
export type { AccordionItem, AccordionProps, TreeNode, TreeViewProps } from "./accordion";

export { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, DataGrid } from "./table";
export type { TableProps, Column, DataGridProps } from "./table";

export { List, ListItem, DescriptionList, Timeline } from "./list";
export type { ListProps, DescriptionItem, DescriptionListProps, TimelineEvent, TimelineProps } from "./list";

// Group 8: Commerce & Layout Primitives
export { PriceDisplay, ProductCard } from "./product-card";
export type { PriceDisplayProps, ProductCardProps } from "./product-card";

export {
  DiscountBadge,
  InventoryBadge,
  RatingDisplay,
  OrderStatus,
  PaymentStatus,
} from "./commerce-badges";

export {
  Container,
  SectionLayout,
  Stack,
  GridLayout,
  FlexLayout,
  Spacer,
  AspectRatio,
  ScrollArea,
  StickyArea,
} from "./layout-primitives";

// Language & Currency Switchers
export { LanguageSwitcher } from "./language-switcher";
export { CurrencySwitcher } from "./currency-switcher";
