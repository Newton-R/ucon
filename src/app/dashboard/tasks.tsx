import FloatingBtn from "@/components/floatingBtn";
import Spacer from "@/components/spacer";
import TaskCard, { task } from "@/components/taskCard";
import ThemedIcons from "@/components/themed/ThemedIcons";
import ThemedText from "@/components/themed/ThemedText";
import ThemedView from "@/components/themed/ThemedView";
import { Colors, raduis, StateColors } from "@/constants/Colors";
import { TextSize } from "@/constants/Template";
import { Search01FreeIcons } from "@hugeicons/core-free-icons";
import { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";

export default function Tasks() {
  const [selected, setSelected] = useState("");
  const dummyTesk: task[] = [
    {
      date: "Yesterday",
      priority: "high",
      task: "Finish React Native tutrorial",
    },
    {
      date: "Today",
      priority: "medium",
      task: "Check for poeam updated",
    },
    {
      date: "Today",
      priority: "low",
      task: "Dance for myself",
    },
  ];
  const filters = ["All", "Pending", "Completed"];
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];
  return (
    <ThemedView safe style={{ flex: 1, position: "relative" }}>
      <FloatingBtn />
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <ThemedText style={{ fontSize: TextSize["2xl"], fontWeight: "bold" }}>
          Tasks
        </ThemedText>
        <ThemedIcons icon={Search01FreeIcons} />
      </View>
      <Spacer />
      <View style={styles.filter_block}>
        {filters.map((filter, i) => (
          <Pressable
            key={i}
            onPress={() => setSelected(filter)}
            style={[
              styles.filter,
              { borderColor: theme.border, backgroundColor: theme.bg_muted },
              filter === selected && {
                backgroundColor: StateColors.text_accent,
              },
            ]}
          >
            <Text
              style={[
                { color: theme.text_secondary },
                filter === selected && { color: "#fff" },
              ]}
            >
              {filter}
            </Text>
          </Pressable>
        ))}
      </View>
      <Spacer />
      <View style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {dummyTesk.map((task, i) => (
          <TaskCard
            key={i}
            task={task.task}
            priority={task.priority}
            date={task.date}
          />
        ))}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  filter_block: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
  },
  filter: {
    borderRadius: raduis.full,
    padding: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
  },
});
