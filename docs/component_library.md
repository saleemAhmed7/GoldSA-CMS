# GoldSA CMS: UI Component Library Specification

This document defines the official reusable UI component specification for GoldSA CMS. It is intended for designers, frontend engineers, QA engineers, and future AI coding agents. It extends the visual and interaction foundation defined in the design system and must be used as the authoritative source for component behavior, structure, and accessibility.

---

## 1. Foundation Rules for All Components

All components in this library must follow the same base principles:

- Use the GoldSA CMS design foundation for spacing, typography, color, radius, elevation, motion, and accessibility.
- Prefer restrained luxury styling over heavy visual decoration.
- Keep interaction states clear, consistent, and accessible.
- Ensure every interactive component is keyboard reachable and screen-reader friendly.
- Maintain mobile-first behavior and support responsive layout changes without overlap or hidden content.
- Use semantic structure, not decorative markup, for all content and controls.

---

## 2. Buttons

### Button

- Purpose: Trigger primary or secondary actions such as save, submit, continue, add, or delete.
- Usage: Use for explicit user actions in forms, tables, dashboards, and storefront flows.
- Avoid: Avoid using for navigation when a standard link is more appropriate.
- Variants: Primary, Secondary, Outline, Ghost, Text, Danger, Success, Soft, Link.
- Sizes: XS, SM, MD, LG, XL.
- States: Default, Hover, Pressed, Focused, Keyboard Focus, Disabled, Loading, Selected, Active.
- Accessibility: Use semantic button markup, clear labels, visible focus indicators, and accessible loading states.
- Responsive Behavior: Buttons should remain legible at mobile sizes, with full-width use in compact forms when appropriate.
- Interaction Rules: Use clear tap and click affordances, consistent transition timing, and immediate confirmation feedback for destructive operations.
- Design Rules: Maintain consistent height, padding, icon alignment, and contrast. Use gold accents sparingly for primary actions.
- Best Practices: Keep labels concise and action-oriented. Limit the number of primary buttons in one area.
- Common Mistakes: Overusing high-emphasis buttons, unclear labels, and inconsistent spacing between adjacent actions.

### Icon Button

- Purpose: Provide compact actions for controls such as close, edit, search, favorite, and menu access.
- Usage: Use inside toolbars, table rows, cards, and compact input groups.
- Avoid: Avoid using icon-only buttons without a clear accessible label or visible context.
- Variants: Standard, Ghost, Outline, Circular, Toggle, Danger.
- Sizes: XS, SM, MD, LG.
- States: Default, Hover, Pressed, Focused, Keyboard Focus, Disabled, Active, Selected, Loading.
- Accessibility: Every icon button must expose a descriptive accessible name through an aria-label or adjacent text.
- Responsive Behavior: Maintain touch target size of at least 44 by 44 pixels on touch screens.
- Interaction Rules: Support pointer, keyboard, and touch interaction equally. Avoid ambiguous icons.
- Design Rules: Use simple line icons, clear alignment, and balanced spacing. Keep the hit area visually obvious.
- Best Practices: Pair icon buttons with tooltips or visible labels when action meaning is not obvious.
- Common Mistakes: Using decorative-only icons without labels, inconsistent icon size, or unclear affordance.

### Split Button

- Purpose: Offer a primary action with a secondary menu or action choice.
- Usage: Use for workflows with one default action and multiple related options.
- Avoid: Avoid when only one action exists or when the secondary action is rarely used.
- Variants: Primary Split, Secondary Split, Outline Split, Danger Split.
- Sizes: SM, MD, LG.
- States: Default, Hover, Pressed, Focused, Keyboard Focus, Disabled, Expanded, Collapsed.
- Accessibility: Ensure the main trigger and menu trigger are keyboard operable and announced clearly.
- Responsive Behavior: On smaller screens, use a simpler layout or collapse the secondary action into a menu.
- Interaction Rules: Keep the default action obvious while preserving a clear secondary action path.
- Design Rules: Keep the split affordance visually obvious, with consistent spacing and contrast.
- Best Practices: Use this when there is a clear primary default action and a small set of alternatives.
- Common Mistakes: Making both actions equally ambiguous or placing the split trigger where users expect a single-button action.

### Button Group

- Purpose: Group related actions together to communicate a set of choices.
- Usage: Use for segmented actions such as view toggles, filter modes, or workflow steps.
- Avoid: Avoid using for unrelated actions that should remain separate.
- Variants: Segmented, Toolbar, Inline, Vertical.
- Sizes: SM, MD, LG.
- States: Default, Hover, Pressed, Focused, Keyboard Focus, Selected, Active, Disabled.
- Accessibility: Maintain clear group semantics, logical tab order, and selected-state announcement.
- Responsive Behavior: Allow wrapping on narrow layouts and preserve grouping clarity.
- Interaction Rules: Ensure only one option is selected when the group behaves as a single-choice control.
- Design Rules: Keep the group visually compact while preserving enough spacing between buttons.
- Best Practices: Use this for a small set of closely related actions.
- Common Mistakes: Overloading the group with too many options or using it for actions that should be independent.

### Floating Action Button

- Purpose: Provide a persistent action shortcut for primary tasks such as add, chat, or create.
- Usage: Use sparingly for high-frequency actions in mobile or dashboard contexts.
- Avoid: Avoid using for critical destructive actions or for casual secondary tasks.
- Variants: Circular FAB, Extended FAB, Mini FAB.
- Sizes: MD, LG.
- States: Default, Hover, Pressed, Focused, Keyboard Focus, Disabled, Loading.
- Accessibility: Must include a clear label, visible focus state, and safe placement.
- Responsive Behavior: Remain unobtrusive on mobile and avoid blocking important content.
- Interaction Rules: Place in a consistent position and avoid rapid motion that could distract users.
- Design Rules: Use a strong but restrained visual weight and maintain sufficient spacing from screen edges.
- Best Practices: Reserve this for one primary action per screen.
- Common Mistakes: Using multiple floating actions at once or placing them over critical interface content.

---

## 3. Form Inputs

### Text Input

- Purpose: Collect short freeform text input such as names, titles, or descriptions.
- Usage: Use in forms, profile editing, content creation, and search forms.
- Avoid: Avoid when users need to choose from a fixed set of values.
- Variants: Standard, Filled, Underline, Search Field, Required Field.
- Sizes: XS, SM, MD, LG, XL.
- States: Default, Hover, Focused, Keyboard Focus, Disabled, Readonly, Invalid, Error, Warning, Success, Empty.
- Accessibility: Associate with a visible label and support clear error messaging and assistive text.
- Responsive Behavior: Keep the field usable on narrow screens and allow wrapping of helper text.
- Interaction Rules: Support typing, paste, selection, and clear actions in a predictable way.
- Design Rules: Keep the field visually calm, with clear boundaries and spacing around labels and helper text.
- Best Practices: Use placeholders sparingly and never as a replacement for labels.
- Common Mistakes: Using placeholder-only labeling or failing to expose errors clearly.

### Password Input

- Purpose: Collect and mask confidential passwords or secrets.
- Usage: Use for sign-in, account creation, and change-password flows.
- Avoid: Avoid when no secret input is needed.
- Variants: Standard, Toggle Visibility, Strength Indicator.
- Sizes: SM, MD, LG.
- States: Default, Hover, Focused, Keyboard Focus, Disabled, Readonly, Invalid, Error, Warning, Success.
- Accessibility: Ensure the toggle button is keyboard accessible and announced correctly.
- Responsive Behavior: Preserve usability on mobile, especially for password visibility toggles.
- Interaction Rules: Provide clear password visibility toggling and avoid unexpected input loss.
- Design Rules: Keep the masked field consistent with the rest of the input system and maintain high contrast for the toggle control.
- Best Practices: Support password strength feedback when relevant and avoid overloading the field.
- Common Mistakes: Hiding the reveal control, poor contrast, or no clear error handling.

### Search Input

- Purpose: Let users find content quickly.
- Usage: Use in lists, dashboards, catalogs, and site-wide search experiences.
- Avoid: Avoid using as a replacement for structured filters.
- Variants: Standard, Search with Clear, Search with Suggestions.
- Sizes: SM, MD, LG.
- States: Default, Hover, Focused, Keyboard Focus, Disabled, Empty, Loading.
- Accessibility: Must have a clear label or accessible name and support keyboard entry.
- Responsive Behavior: On mobile, allocate enough width for the search icon and clear button without clipping.
- Interaction Rules: Provide fast feedback for search results and support Enter key submission.
- Design Rules: Keep the input visually simple and consistent with the global input style.
- Best Practices: Use search affordance and clear action consistently.
- Common Mistakes: Treating search as a filter without offering clear result feedback.

### Textarea

- Purpose: Collect longer freeform text such as descriptions, notes, and content body copy.
- Usage: Use for long-form content entry, comments, and rich descriptions.
- Avoid: Avoid for short values that should be captured in a single-line input.
- Variants: Standard, Resizable, Auto-Expanding, Character-Limited.
- Sizes: SM, MD, LG.
- States: Default, Hover, Focused, Keyboard Focus, Disabled, Readonly, Invalid, Error, Warning, Success.
- Accessibility: Provide labels, accessible error messages, and adequate resize behavior.
- Responsive Behavior: Preserve usability on mobile by avoiding overly large default height.
- Interaction Rules: Support keyboard navigation, resizing where appropriate, and character limits.
- Design Rules: Keep the input visually aligned with the rest of the form system and use generous vertical spacing.
- Best Practices: Provide clear guidance for expected length and structure.
- Common Mistakes: Overly large, difficult-to-edit text areas without guidance.

### Number Input

- Purpose: Capture numeric values such as quantity, price, weight, or count.
- Usage: Use in inventory flows, product configuration, and financial settings.
- Avoid: Avoid for freeform text, IDs, or values that require formatting.
- Variants: Standard, Steppers, Currency, Decimal, Range-Linked.
- Sizes: SM, MD, LG.
- States: Default, Hover, Focused, Keyboard Focus, Disabled, Readonly, Invalid, Error, Warning, Success.
- Accessibility: Ensure screen readers announce the field and any stepper controls clearly.
- Responsive Behavior: Keep controls large enough for touch and avoid overflow on small screens.
- Interaction Rules: Support keyboard increment and decrement and prevent invalid values.
- Design Rules: Keep controls aligned and error states prominent.
- Best Practices: Validate range and precision clearly.
- Common Mistakes: Allowing invalid values without feedback or using a text field when a number control is needed.

### Email Input

- Purpose: Collect email addresses.
- Usage: Use on sign-up, contact, and account management forms.
- Avoid: Avoid when a different identifier is intended.
- Variants: Standard, Autocomplete-Enhanced, Validation-Aware.
- Sizes: SM, MD, LG.
- States: Default, Hover, Focused, Keyboard Focus, Disabled, Readonly, Invalid, Error, Warning, Success.
- Accessibility: Provide labels and clear validation messaging.
- Responsive Behavior: Keep input and helper text visible and legible on narrow screens.
- Interaction Rules: Validate on input completion and provide correction guidance.
- Design Rules: Keep the field consistent with other text inputs.
- Best Practices: Use browser-native validation when possible and provide recovery guidance.
- Common Mistakes: Missing validation or using generic error messages.

### Phone Input

- Purpose: Collect phone numbers with country and format awareness.
- Usage: Use for contact details and checkout flows.
- Avoid: Avoid for non-telephone identifiers.
- Variants: Standard, Country Code, International.
- Sizes: SM, MD, LG.
- States: Default, Hover, Focused, Keyboard Focus, Disabled, Readonly, Invalid, Error, Warning, Success.
- Accessibility: Ensure labels, format guidance, and validation messages are accessible.
- Responsive Behavior: Keep the country-code control compact and usable on small screens.
- Interaction Rules: Support input masking and validation without blocking normal editing.
- Design Rules: Keep the layout aligned and readable.
- Best Practices: Use a clear placeholder and validation pattern.
- Common Mistakes: Clumsy country-code layout or inconsistent formatting.

### URL Input

- Purpose: Collect website or resource links.
- Usage: Use for product links, profile links, and content references.
- Avoid: Avoid when a non-URL field is intended.
- Variants: Standard, Domain Validation, Prefilled Protocol.
- Sizes: SM, MD, LG.
- States: Default, Hover, Focused, Keyboard Focus, Disabled, Readonly, Invalid, Error, Warning, Success.
- Accessibility: Keep labels and validation errors accessible.
- Responsive Behavior: Adjust width and helper text on small devices.
- Interaction Rules: Support validation and correction prompts.
- Design Rules: Keep the field aligned and visually simple.
- Best Practices: Validate clearly and preserve user-entered values where possible.
- Common Mistakes: Allowing invalid URLs without guidance.

### Date Picker

- Purpose: Let users choose a single date.
- Usage: Use for reservation, event, shipment, or content scheduling.
- Avoid: Avoid when a simple text field is sufficient.
- Variants: Calendar Popup, Inline Calendar, Input-Assist.
- Sizes: SM, MD, LG.
- States: Default, Hover, Focused, Keyboard Focus, Disabled, Readonly, Invalid, Error, Warning, Success.
- Accessibility: Ensure keyboard navigation, screen-reader announcements, and clear labels.
- Responsive Behavior: On mobile, show a compact picker that does not require hover.
- Interaction Rules: Support click, tap, keyboard, and clear selection.
- Design Rules: Keep the calendar visually calm and aligned with the form system.
- Best Practices: Show date format guidance and support localization.
- Common Mistakes: Relying on hover-only behavior or using ambiguous date formats.

### Time Picker

- Purpose: Let users select a time value.
- Usage: Use for scheduling and booking flows.
- Avoid: Avoid for freeform notes or combined date-time fields that require a different pattern.
- Variants: Clock Style, List Style, Input-Assist.
- Sizes: SM, MD, LG.
- States: Default, Hover, Focused, Keyboard Focus, Disabled, Readonly, Invalid, Error, Warning, Success.
- Accessibility: Make the control keyboard accessible and readable.
- Responsive Behavior: Use a compact layout on smaller screens.
- Interaction Rules: Support predictable selection and clear validation.
- Design Rules: Keep the interface consistent with the date picker.
- Best Practices: Show the expected format clearly.
- Common Mistakes: Creating a control that is hard to use on touch devices.

### Date Range

- Purpose: Let users choose a start and end date together.
- Usage: Use for reporting, filtering, and booking windows.
- Avoid: Avoid when a single date is sufficient.
- Variants: Two-Input Range, Calendar Range, Preset Range.
- Sizes: SM, MD, LG.
- States: Default, Hover, Focused, Keyboard Focus, Disabled, Invalid, Error, Warning, Success.
- Accessibility: Ensure both inputs and any calendar interactions are reachable and explained.
- Responsive Behavior: Collapse to stacked inputs on narrow screens when necessary.
- Interaction Rules: Validate logical order and clearly indicate range state.
- Design Rules: Visually connect the start and end controls.
- Best Practices: Show the selected range clearly and prevent invalid combinations.
- Common Mistakes: Allowing impossible ranges or poor visual grouping.

### Color Picker

- Purpose: Allow selection of a color value for theme, brand, or content styling.
- Usage: Use in configuration, branding, and visual editing interfaces.
- Avoid: Avoid as a general input replacement for text values.
- Variants: Swatch Picker, Spectrum Picker, Input-Driven Picker.
- Sizes: SM, MD, LG.
- States: Default, Hover, Focused, Keyboard Focus, Disabled, Selected, Invalid, Error.
- Accessibility: Provide a text equivalent and keyboard access.
- Responsive Behavior: Keep swatches easy to tap and avoid dense layouts on mobile.
- Interaction Rules: Support clear selection and undo where possible.
- Design Rules: Keep the color display and label aligned and legible.
- Best Practices: Use a clear preview and meaningful color names.
- Common Mistakes: Creating ambiguous color selection without a visible preview.

### File Upload

- Purpose: Let users attach files such as documents, certificates, or media assets.
- Usage: Use in content submission, admin workflows, and e-commerce forms.
- Avoid: Avoid for simple text or numeric inputs.
- Variants: Standard Upload, Multi-File Upload, Upload with Preview.
- Sizes: SM, MD, LG.
- States: Default, Hover, Focused, Disabled, Loading, Error, Success, Empty.
- Accessibility: Provide a label, clear instructions, and status messages.
- Responsive Behavior: Support touch-friendly drop targets and stacked previews on small screens.
- Interaction Rules: Provide progress, retry, and remove actions clearly.
- Design Rules: Keep upload states visually distinct and consistent.
- Best Practices: Show file name, size, and progress when possible.
- Common Mistakes: Ambiguous drag targets or no feedback when uploads fail.

### Image Upload

- Purpose: Let users upload and preview images.
- Usage: Use for products, avatars, banners, and media assets.
- Avoid: Avoid for non-image documents.
- Variants: Single Image, Multiple Images, Cropping-Assisted.
- Sizes: SM, MD, LG.
- States: Default, Hover, Focused, Active, Disabled, Loading, Error, Success, Empty.
- Accessibility: Provide image alt guidance and clear remove or replace actions.
- Responsive Behavior: Preserve preview quality and allow simple mobile editing.
- Interaction Rules: Keep upload and replacement flows obvious and reversible.
- Design Rules: Maintain clear aspect ratio handling and whitespace around the preview.
- Best Practices: Show the image before saving to reduce errors.
- Common Mistakes: Uploading without thumbnail preview or lacking validation.

### Drag & Drop Upload

- Purpose: Let users transfer files by dragging them into the interface.
- Usage: Use for media libraries, import workflows, and bulk upload operations.
- Avoid: Avoid for single-file tasks that are better served by a standard upload button.
- Variants: Single Drop Zone, Multi Drop Zone, Dragging State.
- Sizes: MD, LG.
- States: Default, Hover, Active, Focused, Disabled, Loading, Error, Success.
- Accessibility: Ensure keyboard alternative and clear instructions are available.
- Responsive Behavior: Keep the drop zone visible and usable on touch devices.
- Interaction Rules: Provide clear hover and active states for drag operations.
- Design Rules: Keep the drop area visually distinct and aligned with the design system.
- Best Practices: Provide a nondrag fallback path such as a browse button.
- Common Mistakes: Relying only on drag-and-drop and failing to support keyboard or click alternatives.

### Rich Text Editor

- Purpose: Enable formatted content entry for product descriptions, blog editing, or CMS content blocks.
- Usage: Use in editorial and product content flows.
- Avoid: Avoid for simple metadata values that do not need formatting.
- Variants: Basic Toolbar, Full Toolbar, Minimal Toolbar.
- Sizes: MD, LG.
- States: Default, Focused, Keyboard Focus, Disabled, Readonly, Error, Success.
- Accessibility: Ensure toolbar controls are keyboard operable and content is semantically structured.
- Responsive Behavior: Condense toolbars on smaller screens without hiding critical actions.
- Interaction Rules: Keep toolbar placement predictable and provide clear formatting feedback.
- Design Rules: Use a clean toolbar and preserve a calm editing surface.
- Best Practices: Keep the editing experience simple and predictable.
- Common Mistakes: Overloading the toolbar with rarely used formatting options.

### OTP Input

- Purpose: Collect a short verification code in a compact form.
- Usage: Use for one-time password verification and secure confirmation flows.
- Avoid: Avoid for long-form text entry.
- Variants: Single-Field, Multi-Field, Paste-Supported.
- Sizes: SM, MD.
- States: Default, Focused, Keyboard Focus, Disabled, Error, Success.
- Accessibility: Support screen readers and keyboard navigation across all fields.
- Responsive Behavior: Keep inputs compact and aligned on smaller screens.
- Interaction Rules: Support auto-focus, paste, and clear entry patterns.
- Design Rules: Keep the field group visually compact and easy to scan.
- Best Practices: Provide clear instructions and resilient error recovery.
- Common Mistakes: Making the entry sequence difficult to understand or inaccessible.

### Tags Input

- Purpose: Let users enter or select multiple short values.
- Usage: Use for categories, labels, skills, and metadata tags.
- Avoid: Avoid when a single fixed choice is required.
- Variants: Freeform, Selectable, Autocomplete-Assisted.
- Sizes: SM, MD, LG.
- States: Default, Hover, Focused, Keyboard Focus, Disabled, Readonly, Error, Success.
- Accessibility: Ensure tags are understandable and keyboard operable.
- Responsive Behavior: Allow tags to wrap gracefully on smaller screens.
- Interaction Rules: Support add, remove, and keyboard navigation clearly.
- Design Rules: Keep tags visually light and easy to scan.
- Best Practices: Allow clear editing and preserve a compact layout.
- Common Mistakes: Overly dense tag groups or hidden tag removal controls.

---

## 4. Selection

### Checkbox

- Purpose: Let users select multiple options from a set.
- Usage: Use for settings, filters, and multi-select lists.
- Avoid: Avoid for single-choice scenarios that should use radio controls.
- Variants: Standard, Indeterminate, Card-Style.
- Sizes: SM, MD, LG.
- States: Default, Hover, Focused, Keyboard Focus, Checked, Indeterminate, Disabled, Invalid, Error.
- Accessibility: Provide clear labels and appropriate keyboard support.
- Responsive Behavior: Maintain sufficient tap area and avoid cramped lists on mobile.
- Interaction Rules: Support selection and deselection with clear visual feedback.
- Design Rules: Keep the control minimal and aligned with text.
- Best Practices: Use clear labels and avoid nested clutter.
- Common Mistakes: Mixing multiple checkbox choices without clear grouping.

### Radio

- Purpose: Let users choose one option from a set.
- Usage: Use for mutually exclusive choices such as shipping methods or currency format.
- Avoid: Avoid when multiple selections are allowed.
- Variants: Standard, Card-Style, Inline.
- Sizes: SM, MD, LG.
- States: Default, Hover, Focused, Keyboard Focus, Selected, Disabled, Invalid, Error.
- Accessibility: Use a proper radio group and support arrow-key navigation.
- Responsive Behavior: Preserve spacing and readability on mobile.
- Interaction Rules: Ensure only one option can be selected in the group.
- Design Rules: Keep the choice list visually calm and easy to scan.
- Best Practices: Use a clear legend or label for the group.
- Common Mistakes: Using radios when checkboxes are appropriate or failing to group them semantically.

### Switch

- Purpose: Toggle a binary setting on or off.
- Usage: Use for preferences, feature flags, and visible/invisible settings.
- Avoid: Avoid for actions that require confirmation or destructive outcomes.
- Variants: Standard, Compact, Label-Left, Label-Right.
- Sizes: SM, MD.
- States: Default, Hover, Focused, Keyboard Focus, Checked, Disabled, Active.
- Accessibility: Ensure the switch is keyboard operable and announced as a toggle.
- Responsive Behavior: Keep the control legible and not too small for touch.
- Interaction Rules: Support clear on/off state changes with smooth motion.
- Design Rules: Keep the switch visually quiet and aligned with adjacent text.
- Best Practices: Pair the switch with a clear label.
- Common Mistakes: Using switches for irreversible actions or unclear labels.

### Segmented Control

- Purpose: Let users switch between related views or modes.
- Usage: Use for view selection, filters, or content modes.
- Avoid: Avoid when there are too many options for a compact control.
- Variants: Horizontal, Vertical, Icon-Label, Pill.
- Sizes: SM, MD, LG.
- States: Default, Hover, Focused, Keyboard Focus, Selected, Disabled.
- Accessibility: Expose selected state and support arrow-key and tab navigation.
- Responsive Behavior: Allow wrapping or scrolling when necessary.
- Interaction Rules: Keep selection behavior simple and immediate.
- Design Rules: Use consistent spacing and clear active-state contrast.
- Best Practices: Keep the set of options small and clearly distinct.
- Common Mistakes: Overloading the control or making options too similar.

### Slider

- Purpose: Let users choose a single continuous value.
- Usage: Use for volume, brightness, price range, or intensity settings.
- Avoid: Avoid for discrete selections that should use radio or select input.
- Variants: Standard, Range-Filled, Labelled.
- Sizes: SM, MD, LG.
- States: Default, Hover, Focused, Keyboard Focus, Active, Disabled.
- Accessibility: Provide a label, keyboard support, and value feedback.
- Responsive Behavior: Keep the control easy to use on touch devices.
- Interaction Rules: Ensure input updates are immediate and visible.
- Design Rules: Use a simple track and thumb that align with the design system.
- Best Practices: Provide a visible current value when appropriate.
- Common Mistakes: Using sliders for values that need precise entry or discrete choices.

### Range Slider

- Purpose: Let users select a minimum and maximum value together.
- Usage: Use for price filters, date ranges, or quantity ranges.
- Avoid: Avoid when only one value is needed.
- Variants: Dual Handle, Preset Range, Compact Range.
- Sizes: MD, LG.
- States: Default, Hover, Focused, Keyboard Focus, Active, Disabled.
- Accessibility: Provide clear labels and accessible value announcements.
- Responsive Behavior: Keep the control easy to manipulate on mobile.
- Interaction Rules: Ensure the two handles remain within valid limits.
- Design Rules: Use clear track fill and handle contrast.
- Best Practices: Display the selected range clearly.
- Common Mistakes: Allowing handles to cross or using the control without context.

### Select

- Purpose: Let users choose one value from a list.
- Usage: Use for compact choices in forms and filters.
- Avoid: Avoid for large lists that should use autocomplete or command palette patterns.
- Variants: Standard, Searchable, Native, Custom.
- Sizes: SM, MD, LG.
- States: Default, Hover, Focused, Keyboard Focus, Open, Selected, Disabled, Invalid, Error.
- Accessibility: Provide clear label, keyboard support, and list announcement.
- Responsive Behavior: Use a mobile-friendly layout for the popup list.
- Interaction Rules: Keep options easy to scan and select.
- Design Rules: Maintain a calm visual hierarchy and consistent spacing.
- Best Practices: Use this when the list is short and the user needs a single selection.
- Common Mistakes: Using a select for long or highly searchable data sets.

### Multi Select

- Purpose: Let users choose multiple values from a list.
- Usage: Use for categories, tags, filters, and relation assignments.
- Avoid: Avoid for a single-choice requirement.
- Variants: Pill-Based, Checkbox List, Searchable Multi Select.
- Sizes: SM, MD, LG.
- States: Default, Hover, Focused, Keyboard Focus, Open, Selected, Disabled, Invalid, Error.
- Accessibility: Support keyboard navigation and clear selection announcement.
- Responsive Behavior: Allow chips or stacked selections to wrap gracefully.
- Interaction Rules: Keep the selection list simple and reversible.
- Design Rules: Use compact chip styling for selected items.
- Best Practices: Show selected values clearly and allow easy removal.
- Common Mistakes: Making the value list dense and hard to manage.

### Autocomplete

- Purpose: Help users select from a large set of values with type-ahead support.
- Usage: Use in address, product, and content lookup patterns.
- Avoid: Avoid for short static option lists.
- Variants: Inline Autocomplete, Dropdown Autocomplete, Multi-Value Autocomplete.
- Sizes: SM, MD, LG.
- States: Default, Hover, Focused, Keyboard Focus, Open, Loading, Selected, Disabled, Empty.
- Accessibility: Support keyboard navigation, clear labels, and announced results.
- Responsive Behavior: Keep the suggestion list dismissible and easy to use on mobile.
- Interaction Rules: Provide quick feedback and avoid overly aggressive filtering.
- Design Rules: Keep the input and dropdown visually linked and readable.
- Best Practices: Show helpful suggestions and preserve recent selections.
- Common Mistakes: Overloading the dropdown with too many options or poor matching behavior.

### Command Palette

- Purpose: Provide fast, searchable access to actions and destinations.
- Usage: Use for power-user navigation, admin commands, and quick tasks.
- Avoid: Avoid for everyday page navigation that should remain visible.
- Variants: Modal Palette, Command Menu, Quick Actions Palette.
- Sizes: MD, LG.
- States: Default, Focused, Keyboard Focus, Loading, Empty, Selected.
- Accessibility: Ensure keyboard-first operation and screen-reader clarity.
- Responsive Behavior: Use a compact layout on small screens and preserve fast search behavior.
- Interaction Rules: Support keyboard selection and clear action result feedback.
- Design Rules: Keep the palette calm, structured, and quick to scan.
- Best Practices: Limit the command set and group actions logically.
- Common Mistakes: Making the palette too broad or visually noisy.

### Tree Select

- Purpose: Let users choose from hierarchical data such as categories or organizational structures.
- Usage: Use for taxonomy, permissions, or category navigation.
- Avoid: Avoid for flat lists or simple one-level options.
- Variants: Single-Branch, Multi-Branch, Expandable Tree.
- Sizes: SM, MD, LG.
- States: Default, Hover, Focused, Keyboard Focus, Expanded, Collapsed, Selected, Disabled.
- Accessibility: Support keyboard expansion and clear tree semantics.
- Responsive Behavior: Keep branch depth manageable and allow scrolling when necessary.
- Interaction Rules: Make expansion and selection obvious and predictable.
- Design Rules: Use indentation and visual connectors sparingly.
- Best Practices: Keep the hierarchy shallow and well-labeled.
- Common Mistakes: Creating overly deep trees that are hard to navigate.

---

## 5. Navigation

### Navbar

- Purpose: Provide primary top-level navigation across the storefront or application shell.
- Usage: Use at the top of pages and sections that need persistent navigation.
- Avoid: Avoid using it for dense form layouts or content regions that need a different structure.
- Variants: Storefront Navbar, Admin Navbar, Compact Navbar, Sticky Navbar.
- Sizes: MD, LG.
- States: Default, Hover, Active, Focused, Keyboard Focus, Mobile Collapsed, Expanded.
- Accessibility: Ensure keyboard reachability, visible focus, and clear landmark structure.
- Responsive Behavior: Collapse or simplify navigation on smaller screens.
- Interaction Rules: Support hover, tap, and keyboard access while preserving clarity.
- Design Rules: Keep the header calm, structured, and aligned with the global navigation hierarchy.
- Best Practices: Keep the nav concise and prioritize the most important destinations.
- Common Mistakes: Overloading the navbar with too many items or hiding essential navigation from mobile users.

### Sidebar

- Purpose: Provide secondary navigation or toolkits for admin and content workflows.
- Usage: Use for dense dashboard navigation, settings, and workspace organization.
- Avoid: Avoid for simple single-page experiences that do not need persistent navigation.
- Variants: Collapsible Sidebar, Floating Sidebar, Nested Sidebar.
- Sizes: MD, LG.
- States: Default, Hover, Active, Focused, Keyboard Focus, Expanded, Collapsed, Disabled.
- Accessibility: Ensure clear labels, focus order, and keyboard collapse behavior.
- Responsive Behavior: Collapse to an icon-only or drawer pattern on smaller screens.
- Interaction Rules: Keep expand and collapse transitions deliberate and predictable.
- Design Rules: Use clear section grouping and sufficient spacing for labels.
- Best Practices: Keep the sidebar predictable and avoid deep nesting beyond what users can manage.
- Common Mistakes: Creating overly deep navigation structures or hiding critical items without alternative access.

### Breadcrumb

- Purpose: Show the current page location within a hierarchy.
- Usage: Use on products, categories, and deep content pages.
- Avoid: Avoid in flat structures where the relationship is already obvious.
- Variants: Standard, Compact, Divider-Style.
- Sizes: SM, MD.
- States: Default, Hover, Active, Focused, Keyboard Focus.
- Accessibility: Use appropriate navigation semantics and clear separators.
- Responsive Behavior: Allow wrapping or truncation on small screens without losing the final destination.
- Interaction Rules: Keep navigation steps clear and clickable where appropriate.
- Design Rules: Use subtle separators and maintain hierarchy contrast.
- Best Practices: Show the current page clearly and preserve the path context.
- Common Mistakes: Using breadcrumbs when the content structure is not hierarchical.

### Tabs

- Purpose: Organize related content into switchable panels.
- Usage: Use for product details, settings sections, or multi-panel content.
- Avoid: Avoid when the content should be shown at once or when there are too many options.
- Variants: Horizontal Tabs, Vertical Tabs, Pill Tabs, Underline Tabs.
- Sizes: SM, MD, LG.
- States: Default, Hover, Focused, Keyboard Focus, Active, Selected, Disabled.
- Accessibility: Expose active state and keyboard navigation clearly.
- Responsive Behavior: Allow tabs to scroll or wrap when the set is larger than the viewport permits.
- Interaction Rules: Make tab switching immediate and understandable.
- Design Rules: Keep the active state visually distinct and aligned with content sections.
- Best Practices: Keep the tab set small and logically grouped.
- Common Mistakes: Using tabs when content should be visible side by side or overusing them for basic navigation.

### Pagination

- Purpose: Divide content into pages and let users navigate large sets.
- Usage: Use for lists, search results, and admin tables.
- Avoid: Avoid for small lists that fit comfortably on one screen.
- Variants: Standard, Compact, Ellipsis, Jump-To-Page.
- Sizes: SM, MD.
- States: Default, Hover, Focused, Keyboard Focus, Active, Disabled.
- Accessibility: Ensure keyboard access and clear page-state announcement.
- Responsive Behavior: Compact or wrap controls on small screens.
- Interaction Rules: Keep previous and next navigation obvious and consistent.
- Design Rules: Maintain spacing and visual hierarchy without clutter.
- Best Practices: Use clear page numbering and avoid too many pages when possible.
- Common Mistakes: Overcomplicating pagination with unnecessary controls.

### Stepper

- Purpose: Guide users through sequential tasks or workflows.
- Usage: Use for signup, checkout, onboarding, or configuration wizards.
- Avoid: Avoid for simple one-step actions.
- Variants: Horizontal, Vertical, Dynamic Stepper.
- Sizes: MD, LG.
- States: Default, Active, Completed, Current, Disabled, Error.
- Accessibility: Expose step states clearly and maintain logical reading order.
- Responsive Behavior: Collapse or simplify vertical steppers on mobile.
- Interaction Rules: Make progress obvious and prevent skipping unless intended.
- Design Rules: Keep labels concise and progress states visual.
- Best Practices: Show only the currently relevant steps and maintain clarity.
- Common Mistakes: Using too many steps or hiding progress state.

### Menu

- Purpose: Offer a list of related actions or destinations.
- Usage: Use in headers, toolbars, overflow contexts, and app shells.
- Avoid: Avoid using it where a simple button or link list is clearer.
- Variants: Dropdown Menu, Inline Menu, Context-Triggered Menu.
- Sizes: SM, MD.
- States: Default, Hover, Focused, Keyboard Focus, Active, Disabled, Open.
- Accessibility: Ensure keyboard navigation and screen-reader support.
- Responsive Behavior: Use a full-width or bottom-sheet pattern on small screens when needed.
- Interaction Rules: Keep the menu shallow, predictable, and easy to dismiss.
- Design Rules: Use a clear list structure and consistent item spacing.
- Best Practices: Group related options and keep the list short.
- Common Mistakes: Hidden or overly deep menu structures without clear labeling.

### Context Menu

- Purpose: Offer actions relevant to a specific item or region.
- Usage: Use on tables, cards, lists, and content surfaces.
- Avoid: Avoid for core navigation that should always be visible.
- Variants: Right-Click Menu, Overflow Menu, Item Actions Menu.
- Sizes: SM, MD.
- States: Default, Hover, Focused, Keyboard Focus, Open, Disabled.
- Accessibility: Ensure the menu can be opened and used by keyboard and screen reader.
- Responsive Behavior: Provide an alternative entry point on touch devices.
- Interaction Rules: Position relative to the triggering element and dismiss on outside interaction.
- Design Rules: Keep menu options aligned and concise.
- Best Practices: Use this for contextual actions only.
- Common Mistakes: Hiding essential actions in a context menu without alternatives.

### Dropdown

- Purpose: Show a compact set of choices or content when activated.
- Usage: Use for filters, settings, and selection lists.
- Avoid: Avoid for large or complex content that should use another pattern.
- Variants: Select Dropdown, Action Dropdown, Filter Dropdown.
- Sizes: SM, MD, LG.
- States: Default, Hover, Focused, Keyboard Focus, Open, Selected, Disabled.
- Accessibility: Ensure keyboard and screen-reader support and dismissible behavior.
- Responsive Behavior: Adapt to full-screen or bottom-sheet patterns on smaller screens.
- Interaction Rules: Keep opening and closing transitions smooth and predictable.
- Design Rules: Keep the dropdown visually linked to its trigger.
- Best Practices: Keep the list short and use clear item labels.
- Common Mistakes: Making the dropdown too large or placing it without clear context.

### Mega Menu

- Purpose: Offer a broad set of navigation options in a large, categorized panel.
- Usage: Use for large ecommerce or content hubs with many sections.
- Avoid: Avoid for simple small-site navigation.
- Variants: Full Width, Two-Column, Product-Focused.
- Sizes: LG, XL.
- States: Default, Hover, Focused, Keyboard Focus, Open, Active.
- Accessibility: Ensure keyboard access, focus order, and clear group labels.
- Responsive Behavior: Collapse to a simpler menu on mobile.
- Interaction Rules: Keep navigation organized and offer quick dismissal.
- Design Rules: Preserve visual hierarchy and avoid crowding.
- Best Practices: Group related navigation into meaningful sections.
- Common Mistakes: Overloading the menu or hiding navigation behind hover-only behavior.

### Command Menu

- Purpose: Provide an overlay command runner for actions and destinations.
- Usage: Use in admin dashboards and power-user experiences.
- Avoid: Avoid for basic end-user navigation that should be visible and persistent.
- Variants: Modal Command Menu, Inline Search Command Menu.
- Sizes: MD, LG.
- States: Default, Focused, Keyboard Focus, Loading, Empty, Selected.
- Accessibility: Make the menu fully keyboard operable and screen-reader friendly.
- Responsive Behavior: Keep the layout compact and easy to use on mobile screens.
- Interaction Rules: Support instant search and predictable selection.
- Design Rules: Prioritize clarity and readable spacing over visual complexity.
- Best Practices: Keep commands grouped and meaningful.
- Common Mistakes: Overloading with too many commands or confusing labels.

---

## 6. Feedback

### Alert

- Purpose: Communicate important status information inline.
- Usage: Use for validation, warnings, and contextual system messages.
- Avoid: Avoid for routine information that should not interrupt the user.
- Variants: Info, Success, Warning, Error.
- Sizes: SM, MD, LG.
- States: Default, Hover, Active, Loading, Error, Warning, Success, Info.
- Accessibility: Use appropriate role and color pairing with non-color cues.
- Responsive Behavior: Ensure the message remains readable at small widths.
- Interaction Rules: Keep the message concise and allow clear dismissal when appropriate.
- Design Rules: Use strong contrast and consistent iconography.
- Best Practices: Provide actionable next steps where needed.
- Common Mistakes: Using color alone or overusing alerts.

### Toast

- Purpose: Show brief temporary feedback after an action.
- Usage: Use for save confirmation, error feedback, or completion notices.
- Avoid: Avoid for critical content that requires persistent visibility.
- Variants: Success, Error, Warning, Info.
- Sizes: SM, MD.
- States: Default, Entering, Visible, Dismissing, Expired.
- Accessibility: Use live-region semantics and clear content.
- Responsive Behavior: Position to avoid overlap with mobile navigation and controls.
- Interaction Rules: Support auto-dismiss with manual close options.
- Design Rules: Keep the copy short and visually clear.
- Best Practices: Use for short confirmations rather than long instructions.
- Common Mistakes: Overlapping multiple toasts or leaving them on screen too long.

### Snackbar

- Purpose: Provide lightweight transient feedback tied to an action.
- Usage: Use for simple confirmations and quick system messages.
- Avoid: Avoid when the user needs a persistent or actionable message.
- Variants: Single-Line, Actionable, Error.
- Sizes: SM, MD.
- States: Default, Visible, Dismissing, Actionable.
- Accessibility: Use live announcements and allow keyboard dismissal.
- Responsive Behavior: Keep the layout narrow and mobile-friendly.
- Interaction Rules: Allow optional manual dismissal and action triggers.
- Design Rules: Keep the content short and visually compact.
- Best Practices: Reserve for brief feedback that needs no full modal or alert.
- Common Mistakes: Using snackbar for long or complex messages.

### Banner

- Purpose: Deliver persistent contextual information across a section or page.
- Usage: Use for release notes, feature updates, or maintenance notices.
- Avoid: Avoid for temporary microcopy.
- Variants: Info, Success, Warning, Error, Marketing.
- Sizes: MD, LG.
- States: Default, Dismissed, Active.
- Accessibility: Provide clear text and strong contrast.
- Responsive Behavior: Keep the banner readable and not overly tall on mobile.
- Interaction Rules: Support dismiss action when appropriate.
- Design Rules: Keep the banner visually tied to the page section without overwhelming it.
- Best Practices: Use concise copy and a clear call to action when needed.
- Common Mistakes: Making the banner too prominent or too verbose.

### Progress Bar

- Purpose: Show completion status for a process.
- Usage: Use for uploads, loading tasks, and multi-step progress.
- Avoid: Avoid when no progress is actually being tracked.
- Variants: Linear, Circular, Indeterminate.
- Sizes: SM, MD, LG.
- States: Default, Active, Complete, Error, Warning.
- Accessibility: Provide current status text and avoid relying on color alone.
- Responsive Behavior: Keep the bar readable on narrow screens.
- Interaction Rules: Update smoothly and reflect real progress.
- Design Rules: Keep the indicator simple and consistent.
- Best Practices: Show percentage or step state when significant.
- Common Mistakes: Showing a progress bar that never changes or that misrepresents progress.

### Spinner

- Purpose: Indicate loading or processing states.
- Usage: Use for async actions, data fetching, and content transitions.
- Avoid: Avoid for trivial interactions that are already obvious.
- Variants: Circular, Inline, Overlay.
- Sizes: SM, MD, LG.
- States: Default, Loading, Complete.
- Accessibility: Announce loading status when relevant and avoid motion-heavy visuals.
- Responsive Behavior: Keep the spinner legible across device sizes.
- Interaction Rules: Use subtle motion and avoid blocking the full page unless necessary.
- Design Rules: Use the brand accent carefully and keep the spinner centered.
- Best Practices: Pair with short loading text when the wait could be unclear.
- Common Mistakes: Using a spinner for too long without context.

### Skeleton

- Purpose: Show placeholder shapes while content is loading.
- Usage: Use for cards, list items, tables, and media containers.
- Avoid: Avoid replacing content that should remain visible and meaningful.
- Variants: Text, Image, Card, Table Row.
- Sizes: SM, MD, LG.
- States: Default, Loading, Loaded.
- Accessibility: Avoid presenting skeletons as meaningful content to assistive technology.
- Responsive Behavior: Keep skeleton shapes responsive and aligned with real content size.
- Interaction Rules: Transition smoothly into loaded content.
- Design Rules: Keep placeholder shapes subtle and calibrated to the real interface.
- Best Practices: Use skeletons for high-value, delayed content.
- Common Mistakes: Using skeletons for content that loads too quickly or that should not be hidden.

### Empty State

- Purpose: Explain that no content is available or no results match a query.
- Usage: Use for empty lists, empty tables, no-results, and first-use scenarios.
- Avoid: Avoid using it when the user is simply navigating a normal page.
- Variants: No Results, Empty Collection, First-Time Use.
- Sizes: MD, LG.
- States: Default, Actionable, Error, Success.
- Accessibility: Use clear text, iconography, and optional action guidance.
- Responsive Behavior: Keep the layout compact and legible on mobile.
- Interaction Rules: Offer a clear next action where appropriate.
- Design Rules: Keep the empty state calm and action-oriented.
- Best Practices: Provide a helpful next step rather than a generic message.
- Common Mistakes: Showing blank space with no explanation or action.

### Error State

- Purpose: Explain that something has gone wrong or failed.
- Usage: Use for failed operations, invalid forms, and broken content states.
- Avoid: Avoid using to describe ordinary empty states.
- Variants: Inline Error, Page Error, Form Error.
- Sizes: SM, MD, LG.
- States: Default, Active, Dismissed.
- Accessibility: Use clear language, visible iconography, and non-color cues.
- Responsive Behavior: Ensure the message and action remain usable on small screens.
- Interaction Rules: Provide an action or path to recover whenever possible.
- Design Rules: Keep the state clearly distinct and concise.
- Best Practices: Describe what happened and what the user can do next.
- Common Mistakes: Using vague error copy or failing to provide recovery steps.

### Success State

- Purpose: Confirm a completed action or positive result.
- Usage: Use for saved changes, successful uploads, or completed steps.
- Avoid: Avoid when the operation is not yet complete.
- Variants: Inline Success, Toast Success, Banner Success.
- Sizes: SM, MD, LG.
- States: Default, Active.
- Accessibility: Ensure status is conveyed in text as well as by color.
- Responsive Behavior: Keep the message concise and readable.
- Interaction Rules: Confirm completion clearly and avoid unnecessary motion.
- Design Rules: Keep the visual treatment calm and trustworthy.
- Best Practices: Pair with concise guidance if needed.
- Common Mistakes: Overusing success messaging for routine events.

### Warning State

- Purpose: Warn the user about a condition that requires attention.
- Usage: Use for unstable data, pending review, or cautious actions.
- Avoid: Avoid for ordinary informational messages.
- Variants: Inline Warning, Banner Warning, Validation Warning.
- Sizes: SM, MD, LG.
- States: Default, Active.
- Accessibility: Use clear language and sufficient contrast.
- Responsive Behavior: Ensure content fits without wrapping awkwardly.
- Interaction Rules: Keep the warning concise and actionable.
- Design Rules: Use a restrained but visible warning treatment.
- Best Practices: Explain impact and next steps.
- Common Mistakes: Warning without explanation or too much emphasis.

### Info State

- Purpose: Help users understand a neutral but useful status or context.
- Usage: Use for system notes, hints, feature availability, and general guidance.
- Avoid: Avoid for critical errors or success confirmation.
- Variants: Inline Info, Banner Info, Tooltip Info.
- Sizes: SM, MD, LG.
- States: Default, Active.
- Accessibility: Ensure the information can be read distinctly and is not only conveyed by color.
- Responsive Behavior: Keep it readable at all breakpoints.
- Interaction Rules: Use subtle motion and allow dismissal when relevant.
- Design Rules: Keep the treatment calm and unobtrusive.
- Best Practices: Keep the message short and relevant.
- Common Mistakes: Overusing info states or making them too visually strong.

---

## 7. Overlays

### Modal

- Purpose: Focus attention on a temporary task or content while dimming the rest of the page.
- Usage: Use for dialogs, forms, confirmations, and large content details.
- Avoid: Avoid for routine inline tasks that can stay on the page.
- Variants: Standard Modal, Fullscreen Modal, Form Modal.
- Sizes: SM, MD, LG.
- States: Default, Open, Closing, Focus Trap, Loading, Error, Success.
- Accessibility: Trap focus while open, support Escape, and ensure keyboard navigation works.
- Responsive Behavior: Adapt to full-screen or compact layouts on mobile.
- Interaction Rules: Dim the background, preserve focus, and support easy dismissal.
- Design Rules: Keep the modal centered and use generous spacing.
- Best Practices: Keep content scoped and avoid too many actions inside one modal.
- Common Mistakes: Overloading the modal with too much content or making it impossible to close.

### Drawer

- Purpose: Reveal a panel of content or actions from the edge of the screen.
- Usage: Use for filters, cart summaries, settings, and side panels.
- Avoid: Avoid for simple confirmations that fit a smaller pattern.
- Variants: Right Drawer, Left Drawer, Bottom Sheet Drawer.
- Sizes: MD, LG.
- States: Default, Open, Closing, Focused, Loading, Empty.
- Accessibility: Maintain focus management and support dismissing with Escape.
- Responsive Behavior: Use a full-width or compact drawer pattern on smaller screens.
- Interaction Rules: Keep the motion slow and predictable.
- Design Rules: Keep the drawer visually anchored to the page edge.
- Best Practices: Reserve the drawer for secondary workflows and keep content concise.
- Common Mistakes: Using a drawer for essential navigation that should remain visible.

### Popover

- Purpose: Show contextual content near a trigger.
- Usage: Use for help, quick actions, or additional info.
- Avoid: Avoid for critical content that needs persistent visibility.
- Variants: Info Popover, Action Popover, Rich Content Popover.
- Sizes: SM, MD.
- States: Default, Open, Hover, Focused, Disabled.
- Accessibility: Ensure keyboard access and predictable dismissal.
- Responsive Behavior: Reposition or collapse when the viewport is narrow.
- Interaction Rules: Keep the content short and dismissable.
- Design Rules: Keep the popover visually lightweight and tied to the trigger.
- Best Practices: Use it to supplement, not replace, primary content.
- Common Mistakes: Using the popover for large content blocks or essential actions.

### Tooltip

- Purpose: Provide brief contextual help for an element.
- Usage: Use for icon buttons, form fields, and compact controls.
- Avoid: Avoid for critical instructions that require persistent visibility.
- Variants: Standard, Rich, Keyboard-Triggered.
- Sizes: XS, SM.
- States: Default, Visible, Hidden.
- Accessibility: Ensure the tooltip is available to keyboard and screen-reader users.
- Responsive Behavior: Avoid hover-only behavior on touch devices.
- Interaction Rules: Keep the label short and appear near the trigger.
- Design Rules: Use restrained visuals and limited copy.
- Best Practices: Use tooltips for simple clarification, not essential instructions.
- Common Mistakes: Relying on tooltips for information that users must not miss.

### Dialog

- Purpose: Prompt a user for a decision or confirmation.
- Usage: Use for delete, discard, save, and similar action confirmations.
- Avoid: Avoid for general content display.
- Variants: Confirmation Dialog, Destructive Dialog, Choice Dialog.
- Sizes: SM, MD.
- States: Default, Open, Confirmed, Cancelled, Error.
- Accessibility: Make the dialog focusable, keyboard operable, and screen-reader clear.
- Responsive Behavior: Keep the dialog compact and readable on mobile.
- Interaction Rules: Make primary and secondary actions clear and distinct.
- Design Rules: Keep the copy concise and the layout uncluttered.
- Best Practices: Present one clear decision and one clear action.
- Common Mistakes: Asking for too many decisions in one dialog.

### Lightbox

- Purpose: Display media at a larger scale for close inspection.
- Usage: Use for images, videos, and gallery viewing.
- Avoid: Avoid as a general content container.
- Variants: Image Lightbox, Video Lightbox, Gallery Lightbox.
- Sizes: MD, LG, XL.
- States: Default, Open, Loading, Active, Closed.
- Accessibility: Support keyboard navigation, captions, and dismissal.
- Responsive Behavior: Scale gracefully to mobile screens.
- Interaction Rules: Support zoom, next/previous, and close actions clearly.
- Design Rules: Keep the focus on the media and avoid excessive UI noise.
- Best Practices: Preserve orientation and make controls obvious.
- Common Mistakes: Overly complex lightbox controls or hidden navigation.

### Bottom Sheet

- Purpose: Present actionable content from the bottom of the screen.
- Usage: Use for mobile actions, filters, or compact panels.
- Avoid: Avoid for desktop-only content that should stay in a modal or drawer.
- Variants: Action Sheet, Filter Sheet, Confirm Sheet.
- Sizes: SM, MD.
- States: Default, Open, Dragging, Dismissed.
- Accessibility: Ensure keyboard dismissal and focus restoration.
- Responsive Behavior: Optimize for touch interactions on mobile and tablet.
- Interaction Rules: Support swipe dismissal and clear close affordances.
- Design Rules: Keep the sheet compact and visually anchored.
- Best Practices: Use it for mobile-first workflows.
- Common Mistakes: Using a bottom sheet for large, dense content.

### Confirmation Dialog

- Purpose: Confirm an irreversible or high-impact action.
- Usage: Use for deletion, cancellation, or destructive actions.
- Avoid: Avoid for low-risk or routine interactions.
- Variants: Destructive, Neutral, Single-Action.
- Sizes: SM, MD.
- States: Default, Open, Confirmed, Cancelled.
- Accessibility: Use clear messaging and support keyboard action selection.
- Responsive Behavior: Keep it compact and easy to read on small screens.
- Interaction Rules: Make the primary action clearly destructive and the secondary action clearly safe.
- Design Rules: Maintain high contrast and avoid hidden meaning.
- Best Practices: Pair with clear language that explains consequences.
- Common Mistakes: Ambiguous wording or overly complex confirmation flows.

---

## 8. Data Display

### Card

- Purpose: Group related content and actions into a single visual block.
- Usage: Use for products, summaries, settings, and content tiles.
- Avoid: Avoid for large forms or data-heavy layouts that need tables or grids.
- Variants: Standard, Elevated, Interactive, Selectable.
- Sizes: SM, MD, LG.
- States: Default, Hover, Focused, Selected, Disabled.
- Accessibility: Ensure cards that are interactive are keyboard reachable and clearly labeled.
- Responsive Behavior: Stack or reflow cards neatly on smaller screens.
- Interaction Rules: Keep hover and press states subtle and consistent.
- Design Rules: Maintain balanced spacing, strong content hierarchy, and clear visual boundaries.
- Best Practices: Keep card content focused and scannable.
- Common Mistakes: Filling cards with too many unrelated actions or text blocks.

### Statistic Card

- Purpose: Present one key value with supporting context.
- Usage: Use for KPIs, sales, inventory counts, and operational metrics.
- Avoid: Avoid for complex analysis that needs a table or chart.
- Variants: Standard, Highlighted, Trend-Linked.
- Sizes: SM, MD, LG.
- States: Default, Hover, Active.
- Accessibility: Ensure text contrast and clear labels.
- Responsive Behavior: Reflow content for smaller screens.
- Interaction Rules: Keep the card visually calm and readable.
- Design Rules: Use typography and spacing to emphasize the metric.
- Best Practices: Keep the value, label, and context visually aligned.
- Common Mistakes: Overloading the card with too much information.

### Data Table

- Purpose: Present structured data in rows and columns.
- Usage: Use for inventories, users, orders, and admin records.
- Avoid: Avoid for small or simple content that should remain in a list or card layout.
- Variants: Basic, Dense, Striped, Selectable.
- Sizes: MD, LG.
- States: Default, Hover, Selected, Active, Disabled, Empty, Loading.
- Accessibility: Use semantic table structure, headings, and clear row/column association.
- Responsive Behavior: Support horizontal scroll or stacked row patterns on smaller screens.
- Interaction Rules: Keep sorting, selection, and row interactions predictable.
- Design Rules: Maintain consistent row height and spacing.
- Best Practices: Keep columns concise and aligned.
- Common Mistakes: Overloading tables with too many columns or too much dense data.

### Data Grid

- Purpose: Offer rich table-like data views with advanced behavior such as filtering and editing.
- Usage: Use for complex admin and operational workflows.
- Avoid: Avoid for simple lists that do not need advanced data operations.
- Variants: Editable Grid, Filterable Grid, Compact Grid.
- Sizes: LG, XL.
- States: Default, Hover, Selected, Loading, Error, Empty.
- Accessibility: Ensure keyboard navigation, focus visibility, and clear row/column semantics.
- Responsive Behavior: Provide a manageable layout on tablets and mobile by using stacked or collapsible patterns.
- Interaction Rules: Preserve keyboard operability for selection and editing.
- Design Rules: Keep the grid visually structured and easy to scan.
- Best Practices: Use this only where complex data operations are needed.
- Common Mistakes: Using a grid for simple content that should be a list or card system.

### List

- Purpose: Present repeated items or records in a linear structure.
- Usage: Use for notifications, tasks, users, and content lists.
- Avoid: Avoid for complex tabular data that needs multi-column structure.
- Variants: Simple List, Ordered List, Divided List, Interactive List.
- Sizes: SM, MD, LG.
- States: Default, Hover, Selected, Disabled.
- Accessibility: Ensure list semantics and focus behavior are clear.
- Responsive Behavior: Keep the list compact and readable on small screens.
- Interaction Rules: Support selection and navigation consistently.
- Design Rules: Maintain spacing and visual rhythm across items.
- Best Practices: Keep the items concise and clearly grouped.
- Common Mistakes: Making lists too dense or inconsistent in structure.

### Description List

- Purpose: Show a set of labels and values in a structured way.
- Usage: Use for product specs, account details, and metadata views.
- Avoid: Avoid for narrative content or dense tables.
- Variants: Two-Column, Vertical, Compact.
- Sizes: SM, MD, LG.
- States: Default.
- Accessibility: Use semantic list structure and readable labels.
- Responsive Behavior: Adapt to stacked layout in small screens.
- Interaction Rules: Keep the content static unless an action is needed.
- Design Rules: Keep labels and values aligned and easy to scan.
- Best Practices: Use this for fine-grained metadata and definitions.
- Common Mistakes: Using the description list for large body copy or multi-step content.

### Timeline

- Purpose: Show ordered events in sequence.
- Usage: Use for order history, audit trails, content versions, and activity logs.
- Avoid: Avoid for non-chronological or highly complex branching content.
- Variants: Vertical, Horizontal, Compact.
- Sizes: MD, LG.
- States: Default, Active, Completed, Error.
- Accessibility: Keep the sequence understandable and keyboard accessible where interactive.
- Responsive Behavior: Support vertical stacking on narrow screens.
- Interaction Rules: Keep each event visually distinct and easy to scan.
- Design Rules: Use clear spacing and consistent connectors.
- Best Practices: Keep the timeline short and meaningful.
- Common Mistakes: Overloading a timeline with too many entries or unclear ordering.

### Accordion

- Purpose: Let users expand and collapse content sections.
- Usage: Use for FAQs, advanced settings, and content sections that need progressive disclosure.
- Avoid: Avoid for essential content that must always remain visible.
- Variants: Standard, Nested, Card Accordion.
- Sizes: SM, MD, LG.
- States: Default, Hover, Focused, Keyboard Focus, Expanded, Collapsed.
- Accessibility: Expose expanded state and ensure keyboard operation.
- Responsive Behavior: Keep sections readable and avoid complex nesting on small screens.
- Interaction Rules: Make expand and collapse states obvious and predictable.
- Design Rules: Keep spacing consistent and preserve content hierarchy.
- Best Practices: Keep each section focused and not overly verbose.
- Common Mistakes: Nesting too many accordions or hiding critical information.

### Tree View

- Purpose: Show hierarchical content relationships.
- Usage: Use for permissions, categories, content maps, and nested entities.
- Avoid: Avoid for simple flat lists.
- Variants: Basic Tree, File Tree, Expandable Tree.
- Sizes: SM, MD, LG.
- States: Default, Hover, Focused, Keyboard Focus, Expanded, Collapsed, Selected.
- Accessibility: Ensure keyboard expansion and clear visual hierarchy.
- Responsive Behavior: Keep the tree usable on smaller screens with a compact layout.
- Interaction Rules: Make each branch clear and easy to expand.
- Design Rules: Use indentation and icons sparingly and consistently.
- Best Practices: Keep the depth manageable and labels clear.
- Common Mistakes: Creating overly deep or visually noisy trees.

### Badge

- Purpose: Highlight a concise status or attribute.
- Usage: Use for labels, counts, tags, and small indicators.
- Avoid: Avoid for long or complex information that needs more room.
- Variants: Neutral, Success, Warning, Error, Info, Gold Accent.
- Sizes: XS, SM, MD.
- States: Default, Active, Selected.
- Accessibility: Ensure the badge remains understandable without relying on color alone.
- Responsive Behavior: Keep the badge compact and legible on mobile.
- Interaction Rules: Use labels that are concise and readable.
- Design Rules: Use subtle emphasis and consistent spacing.
- Best Practices: Keep the badge short and meaningful.
- Common Mistakes: Overusing badges or using them for full sentences.

### Chip

- Purpose: Represent a small interactive or non-interactive value.
- Usage: Use for filters, selected tags, and small categories.
- Avoid: Avoid for long text or important actions that need buttons.
- Variants: Static Chip, Action Chip, Filter Chip, Removable Chip.
- Sizes: XS, SM, MD.
- States: Default, Hover, Focused, Keyboard Focus, Selected, Disabled.
- Accessibility: Ensure removable chips support keyboard operations and clear labels.
- Responsive Behavior: Allow chips to wrap without overlap.
- Interaction Rules: Make removal and selection obvious and easy.
- Design Rules: Keep the chip compact and visually consistent.
- Best Practices: Use chips for short, high-frequency values.
- Common Mistakes: Making chips too visually dominant or too dense.

### Avatar

- Purpose: Represent a person, team, or entity with an image or initials.
- Usage: Use in user lists, comments, activity feeds, and account contexts.
- Avoid: Avoid using avatars where a simple icon or text label is enough.
- Variants: Image Avatar, Initials Avatar, Status Avatar.
- Sizes: XS, SM, MD, LG, XL.
- States: Default, Active, Online, Offline, Selected.
- Accessibility: Ensure the avatar has a useful accessible name when it represents a person.
- Responsive Behavior: Keep the avatar clear and legible at different scales.
- Interaction Rules: Support status or selection states if interactive.
- Design Rules: Keep the shape consistent and the background unobtrusive.
- Best Practices: Use meaningful initials or images and preserve consistency.
- Common Mistakes: Using overly decorative avatars that do not communicate identity clearly.

### Divider

- Purpose: Separate groups of content visually.
- Usage: Use between sections, rows, and groups.
- Avoid: Avoid using it to create layout spacing where spacing tokens are more appropriate.
- Variants: Horizontal Divider, Vertical Divider, Dashed Divider.
- Sizes: SM, MD.
- States: Default.
- Accessibility: Keep it subtle and avoid using it as the only separator for essential information.
- Responsive Behavior: Ensure it remains visible without crowding content.
- Interaction Rules: None beyond passive display.
- Design Rules: Use a fine, restrained line and consistent spacing.
- Best Practices: Use dividers thoughtfully and sparingly.
- Common Mistakes: Overusing dividers and creating visual noise.

### Tag

- Purpose: Mark content with a concise attribute or category.
- Usage: Use for product metadata, statuses, and content labels.
- Avoid: Avoid for lengthy text or content that needs more emphasis.
- Variants: Neutral, Accent, Success, Warning, Error, Info.
- Sizes: XS, SM, MD.
- States: Default, Hover, Selected, Disabled.
- Accessibility: Ensure the tag is understandable without color alone.
- Responsive Behavior: Allow wrapping on compact layouts.
- Interaction Rules: Keep the tag simple and consistent.
- Design Rules: Use subdued emphasis and clear label treatment.
- Best Practices: Keep tags short and meaningful.
- Common Mistakes: Using too many tags or overly long labels.

---

## 9. Commerce

### Product Card

- Purpose: Present a product at a glance with summary information and a clear action path.
- Usage: Use in storefront catalogs, collections, search results, and promotions.
- Avoid: Avoid for content that is not product-oriented or needs dense metadata.
- Variants: Standard, Featured, Compact, Sale, Out of Stock.
- Sizes: SM, MD, LG.
- States: Default, Hover, Focused, Selected, Disabled, Loading, Out of Stock.
- Accessibility: Ensure image alt text, text contrast, and interactive affordance are available.
- Responsive Behavior: Reflow cards into a simpler stack on smaller screens.
- Interaction Rules: Keep hover and touch states subtle and clear.
- Design Rules: Maintain strong image hierarchy, balanced typography, and premium spacing.
- Best Practices: Emphasize important product information without cluttering the card.
- Common Mistakes: Overloading the card with too many actions or weak product hierarchy.

### Price Display

- Purpose: Show pricing information clearly and elegantly.
- Usage: Use on product cards, checkout summaries, and promotional surfaces.
- Avoid: Avoid when the information is not currency-related.
- Variants: Standard, Discounted, Compare-At Price, Inline Price.
- Sizes: SM, MD, LG.
- States: Default, Highlighted, Disabled.
- Accessibility: Ensure the price is readable and not only conveyed by visual emphasis.
- Responsive Behavior: Keep the price prominent without breaking the layout on mobile.
- Interaction Rules: Support clear hierarchy for current price and original price.
- Design Rules: Use gold accents sparingly and maintain strong contrast.
- Best Practices: Present current and discounted values clearly.
- Common Mistakes: Using inconsistent formatting or poor visual hierarchy.

### Discount Badge

- Purpose: Highlight promotional savings.
- Usage: Use on products, banners, and catalog entries.
- Avoid: Avoid using where a discount is not actually active.
- Variants: Standard, Strong, Soft.
- Sizes: XS, SM.
- States: Default, Active, Selected.
- Accessibility: Ensure the badge text is clear and reads naturally.
- Responsive Behavior: Keep the badge compact and readable.
- Interaction Rules: Keep it simple and non-interactive unless explicitly required.
- Design Rules: Use a small but visible accent treatment.
- Best Practices: Use clear wording such as Save or Off.
- Common Mistakes: Using ambiguous savings labels.

### Inventory Badge

- Purpose: Communicate stock availability at a glance.
- Usage: Use on product cards and inventory lists.
- Avoid: Avoid when stock state is not relevant or cannot be confirmed.
- Variants: In Stock, Low Stock, Out of Stock, Preorder.
- Sizes: XS, SM.
- States: Default, Active, Warning, Error.
- Accessibility: Ensure the stock status is understandable without depending on color alone.
- Responsive Behavior: Keep the badge concise on smaller screens.
- Interaction Rules: Keep the badge informative and non-confusing.
- Design Rules: Use a restrained treatment that does not overpower the card.
- Best Practices: Clearly communicate real availability states.
- Common Mistakes: Misleading stock labels or inconsistent severity.

### Stock Indicator

- Purpose: Show whether a product can be purchased immediately.
- Usage: Use in product detail views, product lists, and inventory surfaces.
- Avoid: Avoid for non-commerce contexts.
- Variants: Availability, Low Stock, Sold Out, Limited Quantity.
- Sizes: SM, MD.
- States: Default, Warning, Error, Success.
- Accessibility: Communicate the status in text and icon form.
- Responsive Behavior: Keep the indicator legible in compact contexts.
- Interaction Rules: Ensure it reflects real inventory states.
- Design Rules: Use calm but distinct visual treatment.
- Best Practices: Keep the indicator simple and trustworthy.
- Common Mistakes: Overusing stock indicators without accurate data.

### Image Gallery

- Purpose: Display multiple product images in an organized way.
- Usage: Use for product detail pages and catalog browsing.
- Avoid: Avoid as a content-only display where a simple image is enough.
- Variants: Grid Gallery, Carousel Gallery, Thumbnail Gallery.
- Sizes: MD, LG, XL.
- States: Default, Hover, Active, Selected, Loading.
- Accessibility: Provide alt text, keyboard support, and a clear main image context.
- Responsive Behavior: Reflow to a simpler layout on mobile.
- Interaction Rules: Support selection and image-change transitions clearly.
- Design Rules: Keep the gallery elegant and uncluttered.
- Best Practices: Prioritize the most important product views first.
- Common Mistakes: Cluttering the gallery or weak image prioritization.

### Product Gallery

- Purpose: Provide an interactive product media experience for discovery and selection.
- Usage: Use in product detail and merchandising flows.
- Avoid: Avoid for static marketing content that needs only a single hero image.
- Variants: Standard, Zoomable, 360 View.
- Sizes: MD, LG, XL.
- States: Default, Hover, Active, Loading, Selected.
- Accessibility: Support keyboard navigation and alternate media descriptions.
- Responsive Behavior: Adapt to vertical or horizontal layouts depending on screen size.
- Interaction Rules: Make media switching predictable and not overly animated.
- Design Rules: Keep the gallery premium and focused on the product.
- Best Practices: Use clear thumbnails and a strong primary view.
- Common Mistakes: Overly complex gallery behavior or poor media loading states.

### Rating Display

- Purpose: Show quality or popularity scores in a compact, recognizable way.
- Usage: Use on product cards, reviews, and entity summaries.
- Avoid: Avoid when rating is not part of the content model.
- Variants: Star Rating, Numeric Rating, Badge Rating.
- Sizes: SM, MD.
- States: Default, Active, Hover.
- Accessibility: Ensure the rating is announced clearly and not just visual.
- Responsive Behavior: Keep it compact and legible in cards and lists.
- Interaction Rules: Support interaction only when rating input is intended.
- Design Rules: Keep the scale consistent and clear.
- Best Practices: Use familiar rating patterns and show context when needed.
- Common Mistakes: Using a rating system without clear meaning or scale.

### Status Badge

- Purpose: Display a simple status label for an entity or workflow.
- Usage: Use for orders, subscriptions, and other lifecycle states.
- Avoid: Avoid for long narrative states.
- Variants: Neutral, Success, Warning, Error, Info.
- Sizes: XS, SM, MD.
- States: Default, Active.
- Accessibility: Ensure the label is understandable and not color-only.
- Responsive Behavior: Keep the badge compact and clear.
- Interaction Rules: None beyond passive display.
- Design Rules: Use semantic color and concise text.
- Best Practices: Use only the defined status vocabulary.
- Common Mistakes: Creating custom statuses without a consistent mapping.

### Order Status

- Purpose: Show the lifecycle status of an order.
- Usage: Use in admin views, customer dashboards, and order lists.
- Avoid: Avoid for unrelated workflow states.
- Variants: Pending, Paid, Packed, Shipped, Delivered, Cancelled.
- Sizes: SM, MD.
- States: Default, Active, Error.
- Accessibility: Ensure the label and state are announced clearly.
- Responsive Behavior: Keep it readable in compact lists or cards.
- Interaction Rules: Keep states consistent across the application.
- Design Rules: Use strong semantic color without overemphasis.
- Best Practices: Match the label to the actual workflow vocabulary.
- Common Mistakes: Inconsistent status naming or unclear state mapping.

### Payment Status

- Purpose: Show the payment state of an order or invoice.
- Usage: Use in checkout, finance, and order management views.
- Avoid: Avoid for general delivery or customer-support workflows.
- Variants: Unpaid, Pending, Captured, Refunded, Failed.
- Sizes: SM, MD.
- States: Default, Active, Error.
- Accessibility: Ensure the meaning is clear and screen-reader friendly.
- Responsive Behavior: Keep it compact and readable in tables and cards.
- Interaction Rules: Keep the status consistent and tied to business logic.
- Design Rules: Use subtle but distinct semantic treatment.
- Best Practices: Use the same vocabulary everywhere for financial states.
- Common Mistakes: Mixing payment and order statuses in one display.

### Shipment Status

- Purpose: Show the delivery lifecycle of an order.
- Usage: Use in logistics, fulfillment, and commerce tracking.
- Avoid: Avoid for non-shipping content.
- Variants: Pending Shipment, In Transit, Delivered, Returned.
- Sizes: SM, MD.
- States: Default, Active, Warning, Error.
- Accessibility: Ensure the status is understandable and clearly labelled.
- Responsive Behavior: Keep it compact in lists and detail views.
- Interaction Rules: Keep it aligned with actual workflow state.
- Design Rules: Use a calm visual treatment with strong semantics.
- Best Practices: Use the same vocabulary across order and shipment displays.
- Common Mistakes: Using shipment labels that do not match the workflow model.

---

## 10. Layout

### Container

- Purpose: Constrain content width and maintain layout rhythm.
- Usage: Use to frame pages, sections, dashboards, and content modules.
- Avoid: Avoid creating arbitrary containers that break flow.
- Variants: Fluid, Narrow, Wide, Full Bleed.
- Sizes: SM, MD, LG, XL.
- States: Default.
- Accessibility: Keep content readable and not overly constrained on small screens.
- Responsive Behavior: Adapt width based on breakpoint and content type.
- Interaction Rules: None beyond layout structure.
- Design Rules: Preserve alignment, spacing, and rhythm.
- Best Practices: Use containers consistently for page-level organization.
- Common Mistakes: Over-nesting containers or inconsistent width use.

### Section

- Purpose: Group related content into a coherent page block.
- Usage: Use for landing sections, content areas, and feature blocks.
- Avoid: Avoid turning every small article into a separate section.
- Variants: Standard, Hero, Content, Split, CTA.
- Sizes: MD, LG, XL.
- States: Default.
- Accessibility: Preserve clear hierarchy and reading order.
- Responsive Behavior: Reflow content into a single column on mobile when needed.
- Interaction Rules: None beyond layout structure.
- Design Rules: Keep spacing rhythm consistent with surrounding sections.
- Best Practices: Give each section a clear purpose and heading.
- Common Mistakes: Creating sections with no meaningful content or no clear relationship.

### Stack

- Purpose: Arrange elements vertically with consistent spacing.
- Usage: Use in forms, lists, and simple content blocks.
- Avoid: Avoid excessive nesting that makes layout hard to reason about.
- Variants: Vertical, Horizontal, Reversed.
- Sizes: SM, MD, LG.
- States: Default.
- Accessibility: Maintain a logical reading order.
- Responsive Behavior: Stack cleanly on smaller screens.
- Interaction Rules: None beyond layout.
- Design Rules: Keep rhythm consistent and spacing predictable.
- Best Practices: Use stacks for simple vertical organization.
- Common Mistakes: Mixing too many layout methods in one area.

### Grid

- Purpose: Arrange content in rows and columns.
- Usage: Use for cards, dashboards, product listings, and content modules.
- Avoid: Avoid for one-dimensional content that should use a stack.
- Variants: 2-Column, 3-Column, 4-Column, Responsive Grid.
- Sizes: MD, LG, XL.
- States: Default.
- Accessibility: Preserve reading order and avoid overly dense layouts.
- Responsive Behavior: Collapse columns gracefully on narrower screens.
- Interaction Rules: None beyond layout.
- Design Rules: Keep gutters and alignment consistent.
- Best Practices: Use the grid to create clarity, not visual complexity.
- Common Mistakes: Creating awkward column widths or inconsistent spacing.

### Flex

- Purpose: Arrange content in dynamic layouts that adapt to content size.
- Usage: Use for inline control groups, cards, and horizontal content patterns.
- Avoid: Avoid for complex page-level layouts that need the grid system.
- Variants: Row, Column, Wrap, Align Center.
- Sizes: SM, MD, LG.
- States: Default.
- Accessibility: Keep content flow logical and not dependent on visual ordering.
- Responsive Behavior: Allow wrapping when the screen is narrow.
- Interaction Rules: None beyond layout.
- Design Rules: Keep alignment and spacing purposeful.
- Best Practices: Use flex for component-level layout only.
- Common Mistakes: Overusing flex for page-level structures.

### Spacer

- Purpose: Add controlled space between components.
- Usage: Use to maintain rhythm and avoid arbitrary margins.
- Avoid: Avoid using it as a substitute for semantic layout structure.
- Variants: Horizontal Spacer, Vertical Spacer.
- Sizes: XS, SM, MD, LG, XL.
- States: Default.
- Accessibility: None.
- Responsive Behavior: Scale spacing down on compact screens when needed.
- Interaction Rules: None.
- Design Rules: Use the spacing scale consistently.
- Best Practices: Keep spacing intentional and aligned to the system scale.
- Common Mistakes: Using inconsistent spacing that creates visual noise.

### Separator

- Purpose: Show a clear boundary between content groups.
- Usage: Use between sections, list items, or content panels.
- Avoid: Avoid overusing separators where spacing alone is enough.
- Variants: Horizontal, Vertical, Soft, Strong.
- Sizes: SM, MD.
- States: Default.
- Accessibility: Keep separators subtle and not disruptive.
- Responsive Behavior: Remain visible but not overpowering on mobile.
- Interaction Rules: None.
- Design Rules: Keep the separator subtle and aligned with the design system.
- Best Practices: Use separators only where a clear boundary is needed.
- Common Mistakes: Overusing separators and adding visual clutter.

### Aspect Ratio

- Purpose: Preserve visual proportion for images and media.
- Usage: Use for media containers, thumbnails, and showcase cards.
- Avoid: Avoid on content blocks that do not need fixed proportions.
- Variants: Square, Landscape, Portrait, Widescreen.
- Sizes: SM, MD, LG.
- States: Default.
- Accessibility: Preserve content readability and avoid cropping critical information.
- Responsive Behavior: Maintain proportion without forcing awkward overflow.
- Interaction Rules: None.
- Design Rules: Choose proportions based on the content and device context.
- Best Practices: Use the ratio that best matches the media type.
- Common Mistakes: Forcing a ratio that crops meaningful content.

### Resizable Panel

- Purpose: Allow users to adjust the width or height of a panel.
- Usage: Use for side panels, dashboards, and workspace layouts.
- Avoid: Avoid for static content that should remain fixed.
- Variants: Horizontal Resize, Vertical Resize, Split Pane.
- Sizes: MD, LG.
- States: Default, Hover, Active, Focused.
- Accessibility: Support keyboard resizing and clear focus state.
- Responsive Behavior: Preserve usability on smaller screens by avoiding complex resizing interactions.
- Interaction Rules: Make resizing predictable and not overly aggressive.
- Design Rules: Keep handles subtle and aligned with the panel edge.
- Best Practices: Use resizable panels only where fine control is genuinely useful.
- Common Mistakes: Making resizing hard to discover or too sensitive.

### Scroll Area

- Purpose: Provide a constrained scrollable region.
- Usage: Use for long lists, tables, sidebars, and content panels.
- Avoid: Avoid for full-page content that should naturally scroll the page.
- Variants: Vertical, Horizontal, Both Directions.
- Sizes: MD, LG.
- States: Default, Hover, Active.
- Accessibility: Ensure keyboard scroll and focus management remain usable.
- Responsive Behavior: Preserve readability and avoid clipping content on mobile.
- Interaction Rules: Keep scrolling predictable and not blocked by overlay UI.
- Design Rules: Keep the container boundaries clear and visually calm.
- Best Practices: Use scroll areas only when the content truly exceeds the visible area.
- Common Mistakes: Overusing scroll areas without providing clear context.

### Sticky Area

- Purpose: Keep important content visible while the user scrolls.
- Usage: Use for filters, action bars, headers, and summary panels.
- Avoid: Avoid making too much content sticky, which can crowd the screen.
- Variants: Sticky Header, Sticky Sidebar, Sticky Action Bar.
- Sizes: MD, LG.
- States: Default, Active.
- Accessibility: Ensure sticky content does not obscure important elements or create focus issues.
- Responsive Behavior: Reduce sticky behavior on smaller screens when space is limited.
- Interaction Rules: Keep sticky elements unobtrusive and predictable.
- Design Rules: Use elevation and spacing to distinguish the sticky region.
- Best Practices: Keep sticky areas limited to truly important content.
- Common Mistakes: Making too much of the screen sticky and harming readability.

---

## 11. Media

### Image

- Purpose: Present visual content clearly and consistently.
- Usage: Use throughout the storefront, CMS content areas, and product surfaces.
- Avoid: Avoid decorative images that add no meaningful value.
- Variants: Standard, Hero, Thumbnail, Background, Lazy-Loaded.
- Sizes: SM, MD, LG, XL.
- States: Default, Loading, Loaded, Error.
- Accessibility: Provide alt text and maintain meaningful contrast and focus where interactive.
- Responsive Behavior: Use responsive sizing and preserve aspect ratio gracefully.
- Interaction Rules: Keep image transitions subtle and deliberate.
- Design Rules: Use generous spacing around the image and respect the brand visual calm.
- Best Practices: Prioritize quality and relevance over decoration.
- Common Mistakes: Using low-quality images or missing alt text.

### Video

- Purpose: Present video content or preview media.
- Usage: Use for product demonstrations, editorial content, and promotional experiences.
- Avoid: Avoid autoplaying video without user intent or accessibility controls.
- Variants: Inline, Poster-Only, Autoplay-Disabled.
- Sizes: MD, LG, XL.
- States: Default, Loading, Playing, Paused, Error.
- Accessibility: Provide captions, controls, and keyboard access where applicable.
- Responsive Behavior: Preserve a usable aspect ratio on mobile.
- Interaction Rules: Make controls obvious and avoid unexpected audio.
- Design Rules: Keep the player visually calm and consistent with the media system.
- Best Practices: Provide a poster image and clear controls.
- Common Mistakes: Auto-playing media with no controls or context.

### Carousel

- Purpose: Rotate through a set of media or content items.
- Usage: Use for featured products, stories, and promotional showcases.
- Avoid: Avoid for single-item displays or essential content that must remain visible.
- Variants: Horizontal, Vertical, Thumbnail-Controlled.
- Sizes: MD, LG, XL.
- States: Default, Active, Hover, Focused, Loading.
- Accessibility: Provide controls and keyboard support and avoid forcing motion.
- Responsive Behavior: Use a simpler layout on smaller screens.
- Interaction Rules: Support pause, next, previous, and touch interaction.
- Design Rules: Keep the carousel visually elegant and not overly busy.
- Best Practices: Use a small number of items and clear navigation.
- Common Mistakes: Overusing motion or making controls unclear.

### Gallery

- Purpose: Present collections of related images or media.
- Usage: Use in product collections, portfolios, and showcase experiences.
- Avoid: Avoid for single media pieces that should remain simple.
- Variants: Grid, Masonry, Thumbnail Strip.
- Sizes: MD, LG, XL.
- States: Default, Hover, Active, Selected.
- Accessibility: Provide alt text and keyboard navigation for interactive items.
- Responsive Behavior: Reflow neatly across screen sizes.
- Interaction Rules: Keep selection and preview behavior clear.
- Design Rules: Preserve rhythm and spacing across the collection.
- Best Practices: Keep the gallery curated and easy to scan.
- Common Mistakes: Overcrowding the gallery or using inconsistent image sizes.

### Thumbnail

- Purpose: Show a condensed preview of a media item.
- Usage: Use in galleries, upload previews, and media selection tools.
- Avoid: Avoid for primary content display when more detail is needed.
- Variants: Square, Landscape, Circle, Interactive.
- Sizes: XS, SM, MD.
- States: Default, Hover, Selected, Disabled.
- Accessibility: Ensure the thumbnail has meaningful context and label when interactive.
- Responsive Behavior: Keep it compact and not too dense.
- Interaction Rules: Support selection and preview behaviors clearly.
- Design Rules: Keep the shape and spacing consistent.
- Best Practices: Use thumbnails for quick scanning and selection.
- Common Mistakes: Making thumbnails too small or visually inconsistent.

### Placeholder

- Purpose: Reserve space for media or content until it loads.
- Usage: Use in image loading, card loading, and media preview contexts.
- Avoid: Avoid as a replacement for meaningful content.
- Variants: Image Placeholder, Text Placeholder, Media Placeholder.
- Sizes: SM, MD, LG.
- States: Default, Loading, Loaded, Error.
- Accessibility: Ensure placeholders do not create confusion for assistive technology.
- Responsive Behavior: Preserve proportion and layout integrity.
- Interaction Rules: Replace smoothly when content is ready.
- Design Rules: Keep the placeholder subtle and aligned to the final content shape.
- Best Practices: Use placeholders only when loading is expected.
- Common Mistakes: Leaving empty space or using placeholders for permanently missing content.

---

## 12. Utility

### Copy Button

- Purpose: Copy text or values to the clipboard with a simple action.
- Usage: Use for links, codes, and short reference values.
- Avoid: Avoid for long content that should be viewed rather than copied.
- Variants: Icon Copy, Text Copy, Success Copy.
- Sizes: XS, SM, MD.
- States: Default, Hover, Focused, Success, Error.
- Accessibility: Provide a clear label and confirmation feedback.
- Responsive Behavior: Keep the action compact and easy to tap.
- Interaction Rules: Confirm success quickly and clearly.
- Design Rules: Keep the action visually subtle and consistent with button styles.
- Best Practices: Use for short, useful values only.
- Common Mistakes: Exposing copy controls without clear feedback.

### Theme Switch

- Purpose: Allow users to switch between light and dark themes.
- Usage: Use in global navigation and preferences panels.
- Avoid: Avoid if theme is fixed by product or business rules.
- Variants: Toggle, Segmented Theme Switch, Icon Toggle.
- Sizes: SM, MD.
- States: Default, Hover, Focused, Selected, Disabled.
- Accessibility: Ensure the current theme state is announced clearly.
- Responsive Behavior: Keep it compact and visible in header or settings areas.
- Interaction Rules: Animate theme change smoothly and predictably.
- Design Rules: Keep the switch aligned with the rest of the control system.
- Best Practices: Preserve user preference across sessions.
- Common Mistakes: Switching theme without preserving context or readability.

### Language Switch

- Purpose: Let users change interface language.
- Usage: Use in global navigation and localized experiences.
- Avoid: Avoid for content that should not be localized.
- Variants: Dropdown, Segmented Switch, Flag-Based.
- Sizes: SM, MD.
- States: Default, Hover, Selected, Focused, Disabled.
- Accessibility: Ensure the control is clearly labeled and keyboard accessible.
- Responsive Behavior: Keep the control compact in mobile navigation.
- Interaction Rules: Make language change immediate and clear.
- Design Rules: Keep the control simple and consistent.
- Best Practices: Use clear language labels rather than flags alone.
- Common Mistakes: Using ambiguous icons or relying on non-localized labels.

### Search Bar

- Purpose: Provide a compact search entry surface.
- Usage: Use in headers, content sections, and list views.
- Avoid: Avoid when a full search page or command palette is more appropriate.
- Variants: Inline Search, Header Search, Filter Search.
- Sizes: SM, MD, LG.
- States: Default, Hover, Focused, Keyboard Focus, Loading, Empty.
- Accessibility: Provide labels or accessible names and support keyboard entry.
- Responsive Behavior: Keep it simple and not too wide on mobile.
- Interaction Rules: Support clear input and immediate results where appropriate.
- Design Rules: Keep the bar visually calm and aligned with inputs.
- Best Practices: Use search bars where the user expects instant input.
- Common Mistakes: Using a large search bar where a compact input would be better.

### Filter Panel

- Purpose: Let users narrow content by criteria.
- Usage: Use in catalogs, dashboards, and large lists.
- Avoid: Avoid for simple content that does not need filtering.
- Variants: Side Filter Panel, Inline Filter Panel, Drawer Filter Panel.
- Sizes: MD, LG.
- States: Default, Open, Collapsed, Active, Empty.
- Accessibility: Ensure filter controls are reachable and with clear labels.
- Responsive Behavior: Move to a drawer or overlay on smaller screens.
- Interaction Rules: Make active filters easy to understand and reset.
- Design Rules: Keep the panel structured and visually aligned with the content.
- Best Practices: Keep the number of filters manageable.
- Common Mistakes: Overcomplicating the filter experience or hiding active filters.

### Sort Control

- Purpose: Let users change the order of a list or table.
- Usage: Use in product lists, tables, and search results.
- Avoid: Avoid when the content order is fixed and not user-controlled.
- Variants: Dropdown Sort, Button Sort, Toggle Sort.
- Sizes: SM, MD.
- States: Default, Hover, Focused, Selected, Active.
- Accessibility: Provide clear labels and keyboard support.
- Responsive Behavior: Keep controls compact on mobile.
- Interaction Rules: Clearly show the current sort order.
- Design Rules: Use a visually subtle but obvious control.
- Best Practices: Provide a limited set of meaningful sort options.
- Common Mistakes: Too many sort options or unclear active state.

### View Switcher

- Purpose: Let users switch between visual presentation modes such as list and grid.
- Usage: Use in catalogs, media libraries, and dashboard views.
- Avoid: Avoid when only one view is relevant.
- Variants: Grid/List, Card/List, Compact/Expanded.
- Sizes: SM, MD.
- States: Default, Hover, Focused, Selected.
- Accessibility: Ensure the selected view state is clear and keyboard accessible.
- Responsive Behavior: Keep the switcher simple and easy to use on smaller screens.
- Interaction Rules: Make the transition immediate and clearly reflected.
- Design Rules: Keep the control compact and visually aligned.
- Best Practices: Use only when the alternative views truly differ.
- Common Mistakes: Exposing multiple views without clear information architecture.

### Quick Actions

- Purpose: Present a small set of high-frequency actions in a compact form.
- Usage: Use in lists, cards, and dashboards.
- Avoid: Avoid for secondary or rarely used functionality.
- Variants: Inline Quick Actions, Overflow Quick Actions.
- Sizes: SM, MD.
- States: Default, Hover, Focused, Active.
- Accessibility: Keep the action set easy to discover and keyboard reachable.
- Responsive Behavior: Collapse into a menu or overflow pattern on small screens.
- Interaction Rules: Keep quick actions obvious and accessible.
- Design Rules: Use restrained spacing and iconography.
- Best Practices: Limit the actions to the most important tasks.
- Common Mistakes: Overloading the area with too many choices.

### Notifications Panel

- Purpose: Provide a centralized view of unread system or user notifications.
- Usage: Use in dashboards and application shells.
- Avoid: Avoid for simple single-message feedback.
- Variants: Popover Panel, Drawer Panel, Full Page Panel.
- Sizes: MD, LG.
- States: Default, Hover, Active, Empty, Loading.
- Accessibility: Ensure keyboard access and clear content grouping.
- Responsive Behavior: Use a compact pattern on mobile and tablet.
- Interaction Rules: Support scanning, dismissing, and opening details.
- Design Rules: Keep the panel structured and calm.
- Best Practices: Use it for a collection of notifications, not one-off toasts.
- Common Mistakes: Turning the panel into a catch-all for every message.

### Activity Feed

- Purpose: Show recent activity related to an entity, user, or workspace.
- Usage: Use in dashboards, account views, and admin operations.
- Avoid: Avoid for primary navigation and dense data tables.
- Variants: Vertical Feed, Compact Feed, Timeline Feed.
- Sizes: MD, LG.
- States: Default, Hover, Loading, Empty.
- Accessibility: Preserve reading order and keep timestamps and actors clear.
- Responsive Behavior: Keep the feed compact and easy to scan on mobile.
- Interaction Rules: Support scrolling and item-level actions.
- Design Rules: Keep the feed visually calm and structured.
- Best Practices: Show only the most useful recent activity.
- Common Mistakes: Making the feed too long or too noisy.

---

## 13. Final Chapter

### Component Naming Convention

- Use clear, descriptive, and reusable names that reflect purpose rather than implementation detail.
- Prefer noun-based names for display components and verb-based names for interactive components.
- Preserve consistency across product, admin, and shared experiences.

### Composition Philosophy

- Favor composition over one-off customization.
- Build complex experiences from smaller, reusable primitives rather than bespoke components.
- Keep component APIs simple, predictable, and scalable.

### Extensibility Rules

- Support variant, size, state, and content composition without creating parallel component types.
- Avoid over-parameterizing components; use meaningful props or slots when a component needs expansion.
- Keep extension patterns consistent with the overall system.

### Deprecation Policy

- Deprecate components through a documented migration path rather than abrupt removal.
- Mark deprecated components in documentation, provide replacement guidance, and preserve compatibility during transition.
- Remove deprecated patterns only after adoption is complete and validated.

### Testing Strategy

- Validate components for function, accessibility, responsive behavior, interaction states, and visual consistency.
- Test keyboard access, screen-reader announcements, focus management, and touch usability.
- Verify components across mobile, tablet, laptop, and desktop breakpoints.

### Documentation Standards

- Every component must have clear usage guidance, variant definitions, state descriptions, accessibility notes, interaction rules, and examples of good and poor usage.
- Documentation must remain aligned with the implementation and updated whenever the component changes.
- Future AI coding agents must be able to implement from this document without ambiguity.

### Versioning Rules

- Treat the library as a versioned design system asset.
- Introduce breaking changes only through a versioned migration plan and documented release notes.
- Preserve backwards compatibility wherever possible for shared primitives.

### Future Component Guidelines

- New components must solve a reusable problem, not a single feature-specific need.
- New components must fit the visual language, interaction model, and accessibility system defined here.
- Any new component must be documented before implementation and must be reviewed for inclusion in the shared library.
