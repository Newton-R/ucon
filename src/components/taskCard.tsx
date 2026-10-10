import { Colors, raduis } from "@/constants/Colors";
import { TextSize } from "@/constants/Template";
import { DotIcon } from "@hugeicons/core-free-icons";
import { StyleSheet, Text, useColorScheme, View } from "react-native";
import ThemedIcons from "./themed/ThemedIcons";
import ThemedText from "./themed/ThemedText";

export interface task {
  task: string;
  date: string;
  priority: "high" | "medium" | "low";
}

const TaskCard = ({ task, date, priority }: task) => {
  const customTheme = useColorScheme();
  const theme = Colors[customTheme ?? "light"];
  return (
    <View style={[styles.card, { backgroundColor: theme.card_bg }]}>
      <View style={[styles.radio, { borderColor: theme.border }]} />
      <View style={styles.card_content}>
        <ThemedText variant="primary" style={{ fontSize: TextSize.xl }}>
          {task}
        </ThemedText>
        <View style={styles.line_text}>
          <ThemedText variant="secondary" style={{ fontSize: TextSize.md }}>
            {date}
          </ThemedText>
          <ThemedIcons icon={DotIcon} size={24} />
          <Text
            style={[
              priority === "high"
                ? styles.danger
                : priority === "medium"
                  ? styles.pending
                  : styles.completed,
            ]}
          >
            {priority}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default TaskCard;

const styles = StyleSheet.create({
  card: {
    padding: 14,
    borderRadius: raduis.lg,
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "flex-start",
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: raduis.full,
    marginTop: 6,
    borderWidth: 1,
  },
  card_content: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  line_text: {
    display: "flex",
    flexDirection: "row",
    gap: 2,
    alignItems: "center",
  },
  completed: {
    color: "#10B981",
  },
  danger: {
    color: "#EF4444",
  },
  pending: {
    color: "#F59E0B",
  },
});
