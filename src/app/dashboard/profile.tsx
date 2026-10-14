import MenuLink from "@/components/MenuLink";
import Spacer from "@/components/spacer";
import { Card } from "@/components/themed/Card";
import ThemedIcons from "@/components/themed/ThemedIcons";
import ThemedText from "@/components/themed/ThemedText";
import ThemedView from "@/components/themed/ThemedView";
import { Colors, raduis, StateColors } from "@/constants/Colors";
import { TextSize } from "@/constants/Template";
import { useAuth } from "@/hooks/useAuth";
import {
  Bell,
  ChevronRight,
  CircleAlert,
  Dollar01FreeIcons,
  Lock,
  Logout01FreeIcons,
  Moon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";

export default function ProfilePage() {
  const { signOut, user } = useAuth();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];
  return (
    <ThemedView safe style={{ flex: 1 }}>
      <View style={styles.userinfo_container}>
        <View style={styles.avatar}>
          <Image
            style={styles.avatarImage}
            source={require("@/assets/images/me2.jpg")}
          />
        </View>
        <View style={styles.info}>
          <ThemedText style={{ fontSize: TextSize["2xl"] }}>
            {user?.user_metadata.full_name}
          </ThemedText>
          <ThemedText variant="secondary" style={{ fontSize: TextSize.sm }}>
            Software Engineering student
          </ThemedText>
        </View>
      </View>
      <Spacer />
      <Card style={styles.progress_card}>
        <ThemedText style={{ fontWeight: "bold", fontSize: TextSize["xl"] }}>
          Your Progress
        </ThemedText>
        <View
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <ThemedText variant="secondary" style={{ fontSize: TextSize.sm }}>
            3/5 tasks completed
          </ThemedText>
          <ThemedIcons icon={ChevronRight} />
        </View>
        <View
          style={{
            position: "relative",
            width: "100%",
            backgroundColor: theme.bg_muted,
            height: 20,
            borderRadius: raduis.full,
          }}
        >
          <View
            style={{
              backgroundColor: StateColors.text_accent,
              height: "100%",
              width: "50%",
              borderRadius: raduis.full,
            }}
          />
        </View>
      </Card>
      <Spacer />
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: theme.card_bg,
          borderWidth: 1,
          borderRadius: raduis.md,
          overflow: "hidden",
          borderColor: theme.border,
        }}
      >
        <MenuLink icon={Lock} label="Account & Security" />
        <MenuLink icon={Bell} label="Notifications" />
        <MenuLink icon={Moon} label="Appearance" />
        <MenuLink icon={Dollar01FreeIcons} label="Currency" />
        <MenuLink icon={CircleAlert} label="Support" />
        <Pressable onPress={() => signOut()} style={styles.logout_btn}>
          <HugeiconsIcon
            icon={Logout01FreeIcons}
            color={StateColors.danger}
            size={18}
          />
          <Text style={{ color: StateColors.danger }}>Log out</Text>
        </Pressable>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  userinfo_container: {
    display: "flex",
    flexDirection: "row",
    gap: 12,
    alignItems: "flex-end",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: raduis.full,
    overflow: "hidden",
  },
  info: {
    display: "flex",
    flexDirection: "column",
    objectFit: "cover",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  },
  progress_card: {
    backgroundColor: "rgba(37, 99, 235, 0.2)",
    padding: 18,
    borderRadius: raduis.lg,
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  logout_btn: {
    display: "flex",
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    gap: 10,
  },
});
