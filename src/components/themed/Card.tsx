import { Colors } from "@/constants/Colors";
import {
  Pressable,
  StyleSheet,
  useColorScheme,
  View,
  type ViewProps,
} from "react-native";

type CardProps = ViewProps & {
  children: React.ReactNode;
  padding?: "sm" | "md" | "lg";
  radius?: "sm" | "md" | "lg";
  pressable?: boolean;
  onPress?: () => void;
};

export function Card({
  children,
  padding = "md",
  radius = "md",
  pressable = false,
  onPress,
  style,
  ...props
}: CardProps) {
  const cardStyle = [
    styles.base,
    styles[`padding_${padding}`],
    styles[`radius_${radius}`],
    style,
  ];

  const themeSchema = useColorScheme();
  const theme = Colors[themeSchema ?? "light"];

  if (pressable) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          cardStyle,
          pressed && styles.pressed,
          {
            backgroundColor: theme.card_bg,
            borderColor: theme.card_border,
            shadowColor: theme.card_shadow,
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.06,
            shadowRadius: 8,
            elevation: 2,
          },
        ]}
      >
        {children}
      </Pressable>
    );
  }

  return (
    <View
      style={[
        cardStyle,
        {
          backgroundColor: theme.card_bg,
          borderColor: theme.card_border,
          shadowColor: theme.card_shadow,
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.06,
          shadowRadius: 8,
          elevation: 2,
        },
      ]}
      {...props}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  padding_sm: {
    padding: 12,
  },

  padding_md: {
    padding: 16,
  },

  padding_lg: {
    padding: 20,
  },

  radius_sm: {
    borderRadius: 8,
  },

  radius_md: {
    borderRadius: 12,
  },

  radius_lg: {
    borderRadius: 16,
  },

  pressed: {
    opacity: 0.8,
  },
});
