import { Colors } from "@/constants/Colors";
import { IconSvgObject } from "@hugeicons/core-free-icons/types";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { StyleSheet, useColorScheme } from "react-native";

export default function ThemedIcons({
  icon,
  size,

}: {
  icon: IconSvgObject;
  size?: number;
}) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];
  return <HugeiconsIcon color={theme.text_secondary} icon={icon} size={size} />;
}

const styles = StyleSheet.create({});
