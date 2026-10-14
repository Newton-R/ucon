import { raduis } from "@/constants/Colors";
import { TextSize } from "@/constants/Template";
import { Class } from "@/constants/types";
import { StyleSheet, View } from "react-native";
import ThemedText from "./ThemedText";

export default function CourseCard({ myclass }: { myclass: Class }) {
  const timeFormat = (time: string) => {
    const formated = time.split(":").splice(0, 2).join(":");
    return formated;
  };
  return (
    <View
      style={[
        styles.card,
        {
          borderLeftWidth: 12,
          borderColor: `rgb(${myclass.color})`,
          backgroundColor: `rgba(${myclass.color}, 0.1)`,
        },
      ]}
    >
      <ThemedText variant="muted" style={{ fontSize: TextSize.md }}>
        {timeFormat(myclass.start_time)} - {timeFormat(myclass.end_time)}
      </ThemedText>
      <ThemedText
        variant="primary"
        style={{ fontSize: TextSize.xl, fontWeight: "500" }}
      >
        {myclass.course}
      </ThemedText>
      <ThemedText variant="secondary" style={{ fontSize: TextSize.md }}>
        {myclass.room} - {myclass.lecturer}
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
    borderRadius: raduis.lg,
  },
});
