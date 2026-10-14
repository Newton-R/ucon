import { Colors, raduis, StateColors } from "@/constants/Colors";
import { Timetable } from "@/constants/schema";
import { TextSize } from "@/constants/Template";
import { useClass } from "@/hooks/useClass";
import { DateTimePicker } from "@expo/ui/community/datetime-picker";
import { ArrowRight02FreeIcons } from "@hugeicons/core-free-icons";
import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { format } from "date-fns";
import { useState } from "react";
import {
  Platform,
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
import SpinnerLoader from "../SpinnerLoader";
import ThemedButton from "../themed/Button";
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
  start_time: Date;
  end_time: Date;
}

const ClassCreationForm = ({ onSubmit }: { onSubmit: () => void }) => {
  const pills = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const colors = [
    "239, 68, 68",
    "245, 158, 11",
    "16, 185, 129",
    "37, 99, 235",
    "34, 211, 238",
    "139, 92, 246",
  ];
  const [active, setActive] = useState(0);
  const [classData, setClassData] = useState<Timetable>({
    room: "",
    course: "",
    color: "",
    day: 0,
    reminder: true,
    lecturer: "",
    start_time: new Date(),
    end_time: new Date(),
  });
  const { addClass } = useClass();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [timerOpen, setTimerOpen] = useState<boolean>(false);
  const [endTimerOpen, setEndTimerOpen] = useState<boolean>(false);

  const SaveClass = async () => {
    setLoading(true);

    try {
      await addClass({
        color: classData.color,
        course: classData.course,
        end_time: classData.end_time,
        day: classData.day,
        lecturer: classData.lecturer,
        reminder: classData.reminder,
        room: classData.room,
        start_time: classData.start_time,
      });
      onSubmit();
    } catch (e) {
      console.log({ error: e });
    } finally {
      setLoading(false);
    }
  };

  const onChange = (
    event: DateTimePickerEvent,
    key: keyof ClassData,
    selected?: Date,
  ) => {
    if (Platform.OS === "android") {
      setEndTimerOpen(false);
      setTimerOpen(false);
    }

    if (event.type === "set" && selected) {
      setClassData((prev) => ({ ...prev, [key]: selected }));
    }
  };

  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];
  return (
    <View style={{ display: "flex", flexDirection: "column", gap: 26 }}>
      <FormInput
        label="Subject name"
        placeHolder="e.g Algorithm"
        value={classData.course}
        onTextChange={(e) => setClassData((prev) => ({ ...prev, course: e }))}
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
              onPress={() => {
                setClassData((prev) => ({ ...prev, day: i + 1 }));
                setActive(i);
              }}
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
          <Pressable
            onPress={() => setTimerOpen(true)}
            style={[
              styles.input,
              {
                justifyContent: "space-between",
                borderColor: theme.border,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: theme.background,
              },
            ]}
          >
            <ThemedText>{format(classData.start_time, "HH:mm")}</ThemedText>
          </Pressable>
          <ThemedIcons icon={ArrowRight02FreeIcons} />
          <Pressable
            onPress={() => setEndTimerOpen(true)}
            style={[
              styles.input,
              {
                justifyContent: "space-between",
                borderColor: theme.border,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: theme.background,
              },
            ]}
          >
            <ThemedText>{format(classData.end_time, "HH:mm")}</ThemedText>
          </Pressable>

          {timerOpen && (
            <DateTimePicker
              value={classData.start_time as Date}
              mode="time"
              is24Hour={true}
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={(e, selected) => onChange(e, "start_time", selected)}
            />
          )}

          {endTimerOpen && (
            <DateTimePicker
              value={classData.end_time as Date}
              mode="time"
              is24Hour={true}
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={(e, selected) => onChange(e, "end_time", selected)}
            />
          )}
        </View>
      </View>
      <View style={styles.input_block}>
        <ThemedText style={styles.input_label}>Color</ThemedText>
        <View style={styles.color_pallete_card}>
          {colors.map((col, i) => (
            <Pressable
              onPress={() => setClassData((prev) => ({ ...prev, color: col }))}
              style={[
                { borderRadius: 13 },
                classData.color === col && styles.color_selected,
              ]}
              key={i}
            >
              <View
                style={[
                  styles.color_pallete,
                  { backgroundColor: `rgb(${col})` },
                ]}
              />
            </Pressable>
          ))}
        </View>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <ThemedText
          variant="primary"
          style={{ fontWeight: "500", fontSize: TextSize.lg }}
        >
          Set reminder
        </ThemedText>
        <Pressable
          onPress={() =>
            setClassData((prev) => ({ ...prev, reminder: !classData.reminder }))
          }
          style={[
            styles.toggle_btn,
            { borderWidth: 2, borderColor: theme.border },
            classData.reminder && {
              alignItems: "flex-end",
              backgroundColor: StateColors.text_accent,
            },
          ]}
        >
          <View
            style={[
              styles.toggle_blob,
              { backgroundColor: theme.text_primary },
            ]}
          />
        </Pressable>
      </View>
      <ThemedButton onPress={() => SaveClass()}>
        {isLoading ? (
          <SpinnerLoader />
        ) : (
          <Text style={{ color: "#fff" }}>Save</Text>
        )}
      </ThemedButton>
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
    borderRadius: 11,
  },
  input: {
    paddingHorizontal: 16,
    flex: 1,
    borderWidth: 2,
    borderRadius: raduis.md,

    height: 50,
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
  color_selected: {
    padding: 2,
    borderWidth: 2,
    borderColor: StateColors.text_accent,
  },
  toggle_btn: {
    width: 50,
    height: 30,
    borderRadius: raduis.full,
    padding: 2,
  },
  toggle_blob: {
    height: "100%",
    width: 24,
    backgroundColor: "#fff",
    borderRadius: raduis.full,
  },
});
