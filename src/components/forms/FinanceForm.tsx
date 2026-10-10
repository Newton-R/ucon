import { Colors, raduis, StateColors } from "@/constants/Colors";
import { TextSize } from "@/constants/Template";
import { DateTimePicker } from "@expo/ui/community/datetime-picker";
import {
  ArrowLeft01FreeIcons,
  Calendar01FreeIcons,
  Camera01FreeIcons,
  Car01Icon,
  FishFoodFreeIcons,
  School01FreeIcons,
  Wifi01FreeIcons,
} from "@hugeicons/core-free-icons";
import PlusIcon from "@hugeicons/core-free-icons/PlusIcon";
import { IconSvgObject } from "@hugeicons/core-free-icons/types";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { format } from "date-fns";
import { useState } from "react";
import {
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import DropDownInput from "../dropdownSelect";
import Spacer from "../spacer";
import ThemedButton from "../themed/Button";
import ThemedIcons from "../themed/ThemedIcons";
import ThemedText from "../themed/ThemedText";
import ThemedView from "../themed/ThemedView";
import { FormInput } from "./TaskCreationForm";

interface Icons {
  label: string;
  icon: IconSvgObject;
}

export default function FinanceForm({
  isOpen,
  close,
}: {
  isOpen: boolean;
  close: () => void;
}) {
  const [currentTab, setTab] = useState<"income" | "expense">("expense");
  const isExpense = currentTab === "expense";
  const themeScheme = useColorScheme();
  const theme = Colors[themeScheme ?? "light"];
  const [choosenIcon, setIcon] = useState<Icons>({
    label: "Data",
    icon: Wifi01FreeIcons,
  });

  const [formData, setFormData] = useState({
    info: "",
  });
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  const icons: Icons[] = [
    {
      label: "Data",
      icon: Wifi01FreeIcons,
    },
    {
      label: "Food",
      icon: FishFoodFreeIcons,
    },
    {
      label: "Transport",
      icon: Car01Icon,
    },
    {
      label: "School",
      icon: School01FreeIcons,
    },
    {
      label: "Other",
      icon: PlusIcon,
    },
  ];
  return (
    <Modal visible={isOpen} animationType="slide">
      <ThemedView safe style={{ flex: 1 }}>
        <View style={styles.page_top}>
          <Pressable onPress={() => close()}>
            <ThemedIcons icon={ArrowLeft01FreeIcons} />
          </Pressable>
          <ThemedText style={{ fontSize: TextSize["2xl"], fontWeight: "bold" }}>
            Transactions
          </ThemedText>
        </View>
        <Spacer />
        <View style={styles.tabslist}>
          <Pressable
            onPress={() => setTab("expense")}
            style={[
              styles.tab,
              { backgroundColor: theme.bg_muted },
              isExpense && { backgroundColor: StateColors.text_accent },
            ]}
          >
            <Text
              style={[
                { color: theme.text_secondary },
                isExpense && { color: "#fff" },
              ]}
            >
              Expenses
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setTab("income")}
            style={[
              styles.tab,
              { backgroundColor: theme.bg_muted },
              !isExpense && { backgroundColor: StateColors.text_accent },
            ]}
          >
            <Text
              style={[
                { color: theme.text_secondary },
                !isExpense && { color: "#fff" },
              ]}
            >
              Income
            </Text>
          </Pressable>
        </View>
        <Spacer />
        <View style={styles.icons_selection}>
          {icons.map((icon, i) => {
            const choosen = icon.label === choosenIcon.label;
            return (
              <Pressable
                onPress={() => setIcon(icon)}
                key={i}
                style={[
                  styles.icon_slot,
                  { borderColor: theme.background },
                  choosen && {
                    borderWidth: 1,
                    borderColor: StateColors.text_accent,
                  },
                ]}
              >
                <View
                  style={[
                    styles.icon,
                    { backgroundColor: theme.bg_muted },
                    choosen && { backgroundColor: StateColors.text_accent },
                  ]}
                >
                  <HugeiconsIcon
                    color={
                      choosen
                        ? "#fff"
                        : themeScheme === "light"
                          ? "#000"
                          : "#a1a1a1"
                    }
                    icon={icon.icon}
                  />
                </View>
                <ThemedText style={{ flexShrink: 0 }}>{icon.label}</ThemedText>
              </Pressable>
            );
          })}
        </View>
        <Spacer />
        <View style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <FormInput
            label="Description"
            placeHolder="e.g Launch"
            onTextChange={(text) => setFormData({ info: text })}
          />
          <View style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <ThemedText style={{ fontSize: TextSize.md }}>Date</ThemedText>
            <Pressable
              onPress={() => setShowDatePicker(true)}
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
              <ThemedText>{format(selectedDate, "EEE d, MMM yyyy")}</ThemedText>
              <ThemedIcons icon={Calendar01FreeIcons} />
            </Pressable>
            {showDatePicker && (
              <DateTimePicker
                value={selectedDate}
                mode="date"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onDismiss={() => {
                  setShowDatePicker(false);
                }}
                onValueChange={(_, selectedDate) => {
                  setShowDatePicker(false);

                  if (selectedDate) {
                    setSelectedDate(selectedDate);
                  }
                }}
              />
            )}
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
              position: "relative",
            }}
          >
            <ThemedText style={{ fontSize: TextSize.md }}>
              Payment Method
            </ThemedText>
            <DropDownInput />
          </View>
          <View style={styles.scan_block}>
            <View
              style={{
                backgroundColor: theme.bg_muted,
                padding: 15,
                borderRadius: 12,
              }}
            >
              <ThemedIcons icon={Camera01FreeIcons} />
            </View>
            <View
              style={{
                backgroundColor: theme.bg_muted,
                padding: 15,
                height: "100%",
                flex: 1,
                borderRadius: 12,
              }}
            >
              <ThemedText variant="secondary">
                Scan receipt (optional)
              </ThemedText>
            </View>
          </View>
        </View>
        <Spacer />
        <ThemedButton>
          <Text style={{ color: "#fff" }}>Save</Text>
        </ThemedButton>
      </ThemedView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  page_top: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
  },
  tabslist: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    flexDirection: "row",
  },
  tab: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    paddingVertical: 16,
    borderRadius: raduis.full,
  },
  icons_selection: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  icon_slot: {
    display: "flex",
    flexDirection: "column",
    gap: 3,
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: StateColors.text_accent,
  },
  icon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 12,
  },
  input: {
    width: "100%",
    paddingHorizontal: 16,

    borderWidth: 2,
    borderRadius: raduis.md,

    height: 50,
  },
  scan_block: {
    display: "flex",
    gap: 8,
    alignItems: "center",
    flexDirection: "row",
  },
});
