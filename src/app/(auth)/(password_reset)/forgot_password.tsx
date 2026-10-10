import Input from "@/components/IconedInput";
import Spacer from "@/components/spacer";
import ThemedButton from "@/components/themed/Button";
import ThemedText from "@/components/themed/ThemedText";
import ThemedView from "@/components/themed/ThemedView";
import { StateColors } from "@/constants/Colors";
import { TextSize } from "@/constants/Template";
import { Email } from "@hugeicons/core-free-icons";
import { Link, useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import { StyleSheet, Text, View } from "react-native";

export default function ForgotPassWordPage() {
  const router = useRouter();
  return (
    <ThemedView safe style={styles.page}>
      <View style={{ marginHorizontal: "auto" }}>
        <LottieView
          source={require("@/assets/animations/forgot-password.json")}
          autoPlay
          loop
          style={{ width: 300, height: 300 }}
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
          Forgot your Password ?
        </ThemedText>
        <ThemedText variant="muted" style={{ textAlign: "center" }}>
          No worries! Enter your email address and we'll send you a reset link.
        </ThemedText>
      </View>
      <Spacer />
      <View style={{ width: "100%" }}>
        <Input icon={Email} placeholder="you@gmail.com" label="Email Address" />
      </View>
      <Spacer />
      <View style={{ width: "100%", display: "flex", flexDirection: "column" }}>
        <ThemedButton onPress={() => router.push("/reset_password")}>
          <Text style={{ color: "#fff" }}>Send reset link</Text>
        </ThemedButton>
        <Spacer />
        <Link href={"/login"} style={{ marginHorizontal: "auto" }}>
          <Text
            style={{ color: StateColors.text_accent, marginHorizontal: "auto" }}
          >
            Back to sign in
          </Text>
        </Link>
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
  },
});
