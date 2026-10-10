import { Colors } from "@/constants/Colors";
import { TextSize } from "@/constants/Template";
import { ChevronRight } from "@hugeicons/core-free-icons";
import { IconSvgObject } from "@hugeicons/core-free-icons/types";
import { Pressable, StyleSheet, useColorScheme, View } from "react-native";
import ThemedIcons from "./themed/ThemedIcons";
import ThemedText from "./themed/ThemedText";

interface MenuLinkProp {
  label: string;
  icon: IconSvgObject;
  onPress?: () => void;
}

const MenuLink = ({ label, icon, onPress }: MenuLinkProp) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];
  return (
    <Pressable
      onPress={() => {
        if (onPress) {
          onPress();
        }
      }}
      style={[styles.btn, { borderColor: theme.border }]}
    >
      <View style={styles.side}>
        <ThemedIcons icon={icon} size={18} />
        <ThemedText style={{ fontSize: TextSize.md }}>{label}</ThemedText>
      </View>
      <View style={styles.side}>
        <ThemedIcons icon={ChevronRight} />
      </View>
    </Pressable>
  );
};

export default MenuLink;

const styles = StyleSheet.create({
  btn: {
    display: "flex",
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    justifyContent: "space-between",
    borderBottomWidth: 1,
  },
  side: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "flex-end",
  },
});
