import { Colors } from "@/constants/Colors";
import React from "react";
import { Platform, Text, TextStyle, useColorScheme } from "react-native";

type TextVariants = "primary" | "secondary" | "muted" | "disabled";

const ThemedText = ({
  style,
  children,
  variant,
}: {
  style?: TextStyle;
  variant?: TextVariants;
  children: React.ReactNode;
}) => {
  const colorSchema = useColorScheme();
  const theme = Colors[colorSchema ?? "light"];
  const textColor =
    variant === "disabled"
      ? theme.text_disabled
      : variant === "muted"
        ? theme.text_muted
        : variant === "secondary"
          ? theme.text_secondary
          : theme.text_primary;
  return (
    <Text
      style={[
        style,
        {
          color: textColor,
          fontFamily: Platform.select({
            android: "Inter_400Regular",
            ios: "Inter-Regular",
          }),
        },
      ]}
    >
      {children}
    </Text>
  );
};

export default ThemedText;
