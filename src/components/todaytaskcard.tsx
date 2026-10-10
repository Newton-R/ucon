import { Colors, raduis, StateColors } from "@/constants/Colors";
import { TextSize } from "@/constants/Template";
import { ChevronRight } from "@hugeicons/core-free-icons";
import { StyleSheet, useColorScheme, View } from "react-native";
import ThemedIcons from "./themed/ThemedIcons";
import ThemedText from "./themed/ThemedText";

interface TodayTask {
  time: string;
  course_title: string;
  hall: string;
}

export default function TodayTaskCard({ time, course_title, hall }: TodayTask) {
  const colorSheme = useColorScheme();
  const theme = Colors[colorSheme ?? "light"];
  return (
    <View style={styles.card}>
      <View style={styles.course_card}>
        <ThemedText>{time}</ThemedText>
        <View style={styles.thump}>
          <View style={styles.thumb_bulb} />
        </View>
        <View style={styles.course_details}>
          <ThemedText variant="primary" style={{ fontSize: TextSize.md }}>
            {course_title}
          </ThemedText>
          <ThemedText variant="secondary">{hall}</ThemedText>
        </View>
      </View>
      <ThemedText>
        <ThemedIcons icon={ChevronRight} size={24} />
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    display: "flex",
    flexWrap: "nowrap",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
    justifyContent: "space-between",
    height: "auto",
  },
  course_card: {
    display: "flex",
    flexWrap: "nowrap",
    flexDirection: "row",
    gap: 20,
  },
  thump: {
    height: 40,
    width: 3,
    minHeight: 9,
    backgroundColor: StateColors.text_accent,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  },
  thumb_bulb: {
    width: 10,
    height: 10,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    margin: "auto",
    borderRadius: raduis.full,
    backgroundColor: StateColors.text_accent,
    transform: `translateY(-5px) translateX(-3.5px)`,
  },
  course_details: {
    display: "flex",
    flexDirection: "column",
    gap: 2,

    height: "auto",
  },
});
