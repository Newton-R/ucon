import { PlusFreeIcons } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { Pressable, StyleSheet } from "react-native";

export default function FloatingBtn({ onPress }: { onPress?: () => void }) {
  return (
    <Pressable
      onPress={() => {
        if (!onPress) return;
        onPress();
      }}
      style={[styles.floatingButton]}
    >
      <HugeiconsIcon icon={PlusFreeIcons} color={"#fff"} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  floatingButton: {
    position: "absolute",
    bottom: 24,
    right: 20,

    width: 56,
    height: 56,
    borderRadius: 28,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#2E4FE0",

    elevation: 6, // Android shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
});
