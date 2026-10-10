import { Colors, raduis } from "@/constants/Colors";
import React from "react";
import { Pressable, ViewStyle, useColorScheme } from "react-native";

const ThemedButton = ({
  style,
  children,
  onPress,
  variant = "default",
}: {
  style?: ViewStyle;
  onPress?: () => void;
  variant?: "default" | "outline";
  children: React.ReactNode;
}) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        style,
        {
          backgroundColor: theme.button_primary,
          padding: 16,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: raduis.full,
        },
        pressed && { backgroundColor: theme.button_focus_ring },
      ]}
    >
      {children}
    </Pressable>
  );
};

export default ThemedButton;
