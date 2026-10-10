import Spacer from "@/components/spacer";
import ThemedButton from "@/components/themed/Button";
import ThemedText from "@/components/themed/ThemedText";
import ThemedView from "@/components/themed/ThemedView";
import { StateColors } from "@/constants/Colors";
import { TextSize } from "@/constants/Template";
import { Link, useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import { StyleSheet, Text, View } from "react-native";

export default function reset_successful() {
  const router = useRouter();
  return (
    <ThemedView safe style={styles.page}>
      <View style={{ marginHorizontal: "auto" }}>
        <LottieView
          source={require("@/assets/animations/reset-successful.json")}
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
          Check your email
        </ThemedText>
        <ThemedText variant="muted" style={{ textAlign: "center" }}>
          We sent a notification link to your email address.
        </ThemedText>
      </View>

      <View
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 20,
          marginTop: 10,
        }}
      >
        <ThemedText variant="secondary" style={{ textAlign: "center" }}>
          Please check your inbox ( and spam folder ). And click the link to
          verify your account.
        </ThemedText>
        <ThemedButton onPress={() => router.push("/reset_password")}>
          <Text style={{ color: "#fff" }}>Open email app</Text>
        </ThemedButton>
      </View>
      <Spacer />
      <View style={{ width: "100%", display: "flex", flexDirection: "column" }}>
        <ThemedText variant="muted" style={{ textAlign: "center" }}>
          Didn't recieve an email?
        </ThemedText>
        <Text style={{ textAlign: "center", color: StateColors.text_accent }}>
          Resend verification link
        </Text>
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
    marginHorizontal: "auto",
  },
});
