import { raduis } from "@/constants/Colors";
import { TextSize } from "@/constants/Template";
import { StyleSheet, View } from "react-native";
import ThemedText from "./ThemedText";

export default function CourseCard() {
  return (
    <View style={styles.card}>
      <ThemedText variant="muted" style={{ fontSize: TextSize.md }}>
        01:00 - 03:00
      </ThemedText>
      <ThemedText
        variant="primary"
        style={{ fontSize: TextSize.xl, fontWeight: "500" }}
      >
        Mathematics
      </ThemedText>
      <ThemedText variant="secondary" style={{ fontSize: TextSize.md }}>
        Room 101 - Prof M. Chami
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    height: "auto",
    display: "flex",
    flexDirection: "column",
    gap: 4,
    padding: 15,
    paddingLeft: 20,
    borderLeftWidth: 12,
    borderColor: "rgb(137, 56, 148)",
    backgroundColor: "rgba(137, 56, 148, 0.1)",
    borderRadius: raduis.lg,
  },
});
