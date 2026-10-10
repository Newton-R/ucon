import Input from "@/components/IconedInput";
import Spacer from "@/components/spacer";
import ThemedButton from "@/components/themed/Button";
import ThemedText from "@/components/themed/ThemedText";
import ThemedView from "@/components/themed/ThemedView";
import { TextSize } from "@/constants/Template";
import { LockKeyholeIcon } from "@hugeicons/core-free-icons";
import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import { StyleSheet, Text, View } from "react-native";

export default function ResetPassword() {
  const router = useRouter();
  return (
    <ThemedView safe style={styles.page}>
      <View style={{ marginHorizontal: "auto" }}>
        <LottieView
          source={require("@/assets/animations/lock.json")}
          autoPlay
          loop
          style={{ width: 250, height: 250 }}
        />
      </View>
      <View style={styles.head}>
        <ThemedText
          variant="primary"
          style={{
            fontSize: TextSize.xl,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Reset your Password
        </ThemedText>
        <ThemedText variant="muted" style={{ textAlign: "center" }}>
          Enter your new password below.
        </ThemedText>
      </View>
      <Spacer />
      <View
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        <Input
          icon={LockKeyholeIcon}
          placeholder="**********"
          label="New Password"
        />
        <Input
          icon={LockKeyholeIcon}
          placeholder="**********"
          label="Confirm new password"
        />
      </View>
      <Spacer />
      <View style={{ width: "100%", display: "flex", flexDirection: "column" }}>
        <ThemedButton onPress={() => router.push("/reset_successful")}>
          <Text style={{ color: "#fff" }}>Reset password</Text>
        </ThemedButton>
        {/* <Spacer />
        <Link href={"/login"} style={{ marginHorizontal: "auto" }}>
          <Text
            style={{ color: StateColors.text_accent, marginHorizontal: "auto" }}
          >
            Back to sign in
          </Text>
        </Link> */}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  page: {
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
    justifyContent: "center",
    flex: 1,
    width: "100%",
  },
  head: {
    display: "flex",
    flexDirection: "column",
    gap: 3,
    textAlign: "center",
    marginHorizontal: "auto",
  },
});
