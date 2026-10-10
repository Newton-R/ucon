import { Colors, raduis, StateColors } from "@/constants/Colors";
import { TextSize } from "@/constants/Template";
import { ArrowRight02FreeIcons } from "@hugeicons/core-free-icons";
import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  useColorScheme,
  View,
  ViewStyle,
} from "react-native";
import ThemedIcons from "../themed/ThemedIcons";
import ThemedText from "../themed/ThemedText";

type FormProps = TextInputProps & {
  label?: string;
  placeHolder?: string;
  value?: string;
  onTextChange: (e: string) => void;
  style?: ViewStyle;
};

export const FormInput = ({
  label,
  placeHolder,
  value,
  style,
  onTextChange,
  ...props
}: FormProps) => {
  const themeScheme = useColorScheme();
  const theme = Colors[themeScheme ?? "light"];
  return (
    <View style={[{ display: "flex", flexDirection: "column", gap: 8 }, style]}>
      {label && (
        <ThemedText style={{ fontSize: TextSize.md }}>{label}</ThemedText>
      )}
      <TextInput
        placeholder={placeHolder}
        {...props}
        onChangeText={(e) => onTextChange(e)}
        value={value}
        placeholderTextColor={theme.text_disabled}
        style={{
          width: "100%",
          paddingHorizontal: 16,
          borderColor: theme.border,
          color: theme.text_primary,
          borderWidth: 2,
          borderRadius: raduis.md,
          backgroundColor: theme.background,
          height: 50,
        }}
      ></TextInput>
    </View>
  );
};

interface ClassData {
  room: string;
  subject: string;
  lecturer: string;
  start_time: string;
  end_time: string;
}

const ClassCreationForm = () => {
  const pills = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const colors = [
    "#EF4444",
    "#F59E0B",
    "#10B981",
    "#2563EB",
    "#22D3EE",
    "#8B5CF6",
  ];
  const [active, setActive] = useState(0);
  const [classData, setClassData] = useState<ClassData>({
    room: "",
    subject: "",
    lecturer: "",
    start_time: "",
    end_time: "",
  });
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];
  return (
    <View style={{ display: "flex", flexDirection: "column", gap: 26 }}>
      <FormInput
        label="Subject name"
        placeHolder="e.g Algorithm"
        value={classData.subject}
        onTextChange={(e) => setClassData((prev) => ({ ...prev, subject: e }))}
      />
      <FormInput
        label="Lecturer"
        placeHolder="e.g Mr John Doe"
        value={classData.lecturer}
        onTextChange={(e) => setClassData((prev) => ({ ...prev, lecturer: e }))}
      />
      <FormInput
        label="Room"
        placeHolder="e.g 101"
        value={classData.room}
        onTextChange={(e) => setClassData((prev) => ({ ...prev, room: e }))}
      />
      <View style={styles.input_block}>
        <ThemedText style={styles.input_label}>Days</ThemedText>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{
            gap: 14,
            display: "flex",
            flexDirection: "row",
            height: "auto",
          }}
        >
          {pills.map((label, i) => (
            <Pressable
              onPress={() => setActive(i)}
              key={i}
              style={[
                styles.pill,
                {
                  borderColor: theme.border,
                  backgroundColor: theme.bg_muted,
                },
                active === i && { backgroundColor: StateColors.text_accent },
              ]}
            >
              <Text
                style={[
                  {
                    fontSize: TextSize.md,
                    fontWeight: "500",
                    color: theme.text_secondary,
                  },
                  active === i && { color: "#fff" },
                ]}
              >
                {label}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>
      <View style={styles.input_block}>
        <ThemedText style={styles.input_label}>Time</ThemedText>
        <View style={styles.time_flex}>
          <FormInput
            style={{ flex: 1 }}
            placeHolder="Start time"
            onTextChange={(e) =>
              setClassData((prev) => ({ ...prev, start_time: e }))
            }
          />
          <ThemedIcons icon={ArrowRight02FreeIcons} />
          <FormInput
            style={{ flex: 1 }}
            placeHolder="End time"
            onTextChange={(e) =>
              setClassData((prev) => ({ ...prev, end_time: e }))
            }
          />
        </View>
      </View>
      <View style={styles.input_block}>
        <ThemedText style={styles.input_label}>Color</ThemedText>
        <View style={styles.color_pallete_card}>
          {colors.map((col, i) => (
            <View
              style={[styles.color_pallete, { backgroundColor: col }]}
              key={i}
            />
          ))}
        </View>
      </View>
      <View>
        <ThemedText
          variant="primary"
          style={{ fontWeight: "500", fontSize: TextSize.lg }}
        >
          Set reminder
        </ThemedText>
      </View>
    </View>
  );
};

export default ClassCreationForm;

const styles = StyleSheet.create({
  input_block: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  color_pallete_card: {
    display: "flex",
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  color_pallete: {
    width: 30,
    height: 30,
    borderRadius: raduis.full,
  },
  pill: {
    padding: 4,
    borderWidth: 1,
    paddingHorizontal: 6,
    height: 40,
    width: 70,
    marginHorizontal: 6,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: raduis.full,
    display: "flex",
    textAlign: "center",
  },
  input_label: {
    fontSize: TextSize.md,
  },
  time_flex: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    justifyContent: "space-between",
  },
});
