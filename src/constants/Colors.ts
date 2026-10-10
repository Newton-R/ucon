interface ThemeColors {
  background: string;
  text_primary: string;
  text_secondary: string;
  text_muted: string;
  text_disabled: string;
  border: string;
  button_primary: string;
  button_primary_text: string;
  button_focus_ring: string;
  card_bg: string;
  card_border: string;
  card_shadow: string;
  bg_muted: string;
}

export const Colors: Record<string, ThemeColors> = {
  light: {
    background: "#F8FAFC",
    text_primary: "#0F172A",
    text_secondary: "#475569",
    text_muted: "#94A3B8",
    text_disabled: "#CBD5E1",
    border: "#E2E8F0",
    button_primary: "#2563EB",
    button_primary_text: "#FFFFFF",
    button_focus_ring: "#93C5FD",
    card_bg: "#FFFFFF",
    card_border: "#E2E8F0",
    card_shadow: "#2563EB",
    bg_muted: "#F3F4F6",
  },
  dark: {
    background: "#070B16",
    text_primary: "#F8FAFC",
    text_secondary: "#CBD5E1",
    text_muted: "#64748B",
    text_disabled: "#475569",
    border: "#1E293B",
    button_primary: "#2563EB",
    button_primary_text: "#FFFFFF",
    button_focus_ring: "#60A5FA",
    card_bg: "#0F172A",
    card_border: "#1E3A5F",
    card_shadow: "#497be8",
    bg_muted: "#1F2937",
  },
};

export const StateColors = {
  success: "#10B981",
  warning: "#F59E0B",
  danger: "#EF4444",
  info: "#06B6D4",
  text_accent: "#2563EB",
};

export const raduis = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 999,
};
