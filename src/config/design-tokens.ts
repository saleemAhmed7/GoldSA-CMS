import {
  breakpointTokens,
  colorTokens,
  elevationTokens,
  motionTokens,
  radiusTokens,
  spacingTokens,
  typographyTokens,
  zIndexTokens,
} from "@/config/tokens";

export const DESIGN_TOKENS = {
  colors: colorTokens,
  typography: typographyTokens,
  spacing: spacingTokens,
  radius: radiusTokens,
  elevation: elevationTokens,
  motion: motionTokens,
  animation: {
    curveOutQuart: motionTokens.easing.outQuart,
    durationMicro: motionTokens.duration.micro,
    durationStandard: motionTokens.duration.standard,
    durationLayout: motionTokens.duration.layout,
  },
  zIndex: zIndexTokens,
  breakpoints: breakpointTokens,
} as const;

export type DesignTokens = typeof DESIGN_TOKENS;
