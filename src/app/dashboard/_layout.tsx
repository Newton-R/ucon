import { Colors, StateColors } from "@/constants/Colors";
import { TextSize } from "@/constants/Template";
import {
  Calendar,
  Home,
  ListChecksFreeIcons,
  MoneyBag01Icon,
  User02FreeIcons,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { Tabs } from "expo-router";
import { useColorScheme } from "react-native";

export default function DashboardRootLayout() {
  const themeScheme = useColorScheme();
  const theme = Colors[themeScheme ?? "light"];
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { backgroundColor: theme.card_bg },
        tabBarActiveTintColor: StateColors.text_accent,
        tabBarInactiveTintColor: theme.text_disabled,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <HugeiconsIcon
              icon={Home}
              color={focused ? StateColors.text_accent : theme.text_muted}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="tasks"
        options={{
          title: "Tasks",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <HugeiconsIcon
              icon={ListChecksFreeIcons}
              color={focused ? StateColors.text_accent : theme.text_muted}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="timetable"
        options={{
          title: "Timetable",
          headerStyle: {
            shadowColor: "none",
            boxShadow: "none",
            borderWidth: 0,
            shadowOpacity: 0,
            backgroundColor: theme.background,
          },
          headerTitleStyle: {
            color: theme.text_primary,
            fontSize: TextSize["2xl"],
          },

          tabBarIcon: ({ focused }) => (
            <HugeiconsIcon
              icon={Calendar}
              color={focused ? StateColors.text_accent : theme.text_muted}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="finance"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <HugeiconsIcon
              icon={MoneyBag01Icon}
              color={focused ? StateColors.text_accent : theme.text_muted}
            />
          ),
          title: "Finance",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <HugeiconsIcon
              icon={User02FreeIcons}
              color={focused ? StateColors.text_accent : theme.text_muted}
            />
          ),
          title: "Profile",
        }}
      />
    </Tabs>
  );
}
