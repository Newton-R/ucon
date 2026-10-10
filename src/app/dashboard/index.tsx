import Spacer from "@/components/spacer";
import { Card } from "@/components/themed/Card";
import ThemedIcons from "@/components/themed/ThemedIcons";
import ThemedText from "@/components/themed/ThemedText";
import ThemedView from "@/components/themed/ThemedView";
import TodayTaskCard from "@/components/todaytaskcard";
import { Colors, raduis, StateColors } from "@/constants/Colors";
import { TextSize } from "@/constants/Template";
import {
  Bell,
  CheckListIcon,
  Clock,
  Clock01Icon,
} from "@hugeicons/core-free-icons";
import { formatDate } from "date-fns";
import {
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";

const dummyTasks = [
  {
    hall: "Room 101",
    course: "Mathematics",
    time: "06:30",
  },
  {
    hall: "Room 101",
    course: "Mathematics",
    time: "06:30",
  },
  {
    hall: "Room 101",
    course: "Mathematics",
    time: "06:30",
  },
];

const tasks = [
  "Finish React Native Lesson",
  "Read Chapter 4",
  "Submit Assignment",
];

export default function Dashboard() {
  const themeScheme = useColorScheme();
  const theme = Colors[themeScheme ?? "light"];
  return (
    <ThemedView safe style={{ flex: 1 }}>
      <View style={styles.info_header}>
        <View style={styles.heading}>
          <ThemedText style={{ fontSize: TextSize["2xl"] }}>
            Good Morning, Newton 👌
          </ThemedText>
          <Pressable
            style={({ pressed }) => [
              styles.bell_btn,
              { borderColor: theme.border },
            ]}
          >
            <View style={styles.indicator} />

            <ThemedIcons icon={Bell} size={TextSize.lg} />
          </Pressable>
        </View>
        <ThemedText variant="secondary" style={{ fontSize: TextSize.lg }}>
          {formatDate(new Date(), "EEEE, MMM d ")}
        </ThemedText>
      </View>
      <Spacer />
      <Card style={styles.reminder_card}>
        <View
          style={{
            width: "100%",
            position: "absolute",
            height: "100%",
            padding: 12,
            top: 0,
            right: 0,
            marginHorizontal: "auto",
            zIndex: -10,
            alignItems: "flex-end",
          }}
        >
          <ThemedText style={{ color: theme.button_primary }}>
            <ThemedIcons icon={Clock01Icon} size={TextSize["6xl"]} />
          </ThemedText>
        </View>
        <View style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <View style={styles.text_line}>
            <ThemedIcons icon={CheckListIcon} size={TextSize.xs} />
            <ThemedText
              variant="muted"
              style={{
                fontSize: TextSize.md,
              }}
            >
              Next Class
            </ThemedText>
          </View>
          <ThemedText style={{ fontSize: TextSize["xl"], fontWeight: "bold" }}>
            Software Engineering
          </ThemedText>
          <View style={styles.text_line}>
            <ThemedIcons icon={Clock} size={TextSize.xs} />

            <ThemedText
              variant="secondary"
              style={{
                fontSize: TextSize.md,
              }}
            >
              10:00 AM - 12:00 PM
            </ThemedText>
          </View>
          <View style={styles.text_line}>
            <ThemedIcons icon={Clock} size={TextSize.xs} />
            <ThemedText
              variant="secondary"
              style={{
                fontSize: TextSize.md,
              }}
            >
              Room 6204
            </ThemedText>
          </View>
        </View>
        <Card
          style={{ padding: 2, paddingHorizontal: 10, borderRadius: raduis.sm }}
        >
          <ThemedText>32 mins</ThemedText>
        </Card>
      </Card>
      <Spacer />
      <View style={styles.section}>
        <View style={styles.section_title}>
          <ThemedText
            variant="primary"
            style={{ fontSize: TextSize.lg, fontWeight: "bold" }}
          >
            Today's Schedule
          </ThemedText>
          <Text style={{ color: StateColors.text_accent }}>View All</Text>
        </View>
        <View style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {dummyTasks.map((task, i) => (
            <TodayTaskCard
              course_title={task.course}
              hall={task.hall}
              time={task.time}
              key={i}
            />
          ))}
        </View>
      </View>
      <Spacer />
      <View style={styles.section}>
        <View style={styles.section_title}>
          <ThemedText style={{ fontSize: TextSize.lg, fontWeight: "bold" }}>
            Tasks
          </ThemedText>
          <Text style={{ color: StateColors.text_accent }}>View All</Text>
        </View>
        <View style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {tasks.map((task, i) => (
            <View key={i} style={styles.list_item}>
              <View style={[styles.radio, { borderColor: theme.border }]} />
              <ThemedText style={{ fontSize: TextSize.md, padding: 0 }}>
                {task}
              </ThemedText>
            </View>
          ))}
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  radio: {
    width: 15,
    borderWidth: 2,
    height: 15,
    borderRadius: raduis.full,
  },
  list_item: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
  },
  section: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  section_title: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  info_header: {
    height: "auto",
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  text_line: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
    gap: 3,
  },
  heading: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bell_btn: {
    width: 34,
    height: 34,
    position: "relative",
    borderRadius: raduis.full,
    borderWidth: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 4,
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: raduis.full,
    backgroundColor: StateColors.danger,
    position: "absolute",
    top: 2,
    right: 0,
    transform: "translateX(3px)",
  },
  reminder_card: {
    padding: 12,
    display: "flex",
    width: "100%",
    alignItems: "flex-end",
    overflow: "hidden",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
