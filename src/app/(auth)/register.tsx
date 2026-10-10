import Input from "@/components/IconedInput";
import Spacer from "@/components/spacer";
import ThemedButton from "@/components/themed/Button";
import ThemedText from "@/components/themed/ThemedText";
import ThemedView from "@/components/themed/ThemedView";
import { StateColors } from "@/constants/Colors";
import { TextSize } from "@/constants/Template";
import { Email, LockKeyholeIcon, User } from "@hugeicons/core-free-icons";
import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function RegisterationPage() {
  return (
    <ThemedView safe style={styles.page}>
      <View style={styles.heading_container}>
        <ThemedText
          variant="primary"
          style={{
            fontSize: TextSize["2xl"],
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Create your account
        </ThemedText>
        <ThemedText
          variant="muted"
          style={{ fontSize: TextSize.md, textAlign: "center" }}
        >
          Get started and take control of your academic journey
        </ThemedText>
      </View>
      <Spacer />
      <View style={styles.form}>
        <Input label="Full name" icon={User} placeholder="John Doe" />
        <Input label="Email Address" icon={Email} placeholder="you@gmail.com" />
        <Input
          label="Password"
          secureTextEntry
          icon={LockKeyholeIcon}
          placeholder="********"
        />
        <Input
          label="Confirm Password"
          secureTextEntry
          icon={LockKeyholeIcon}
          placeholder="********"
        />
      </View>
      <Spacer />
      <ThemedButton style={{ width: "100%" }}>
        <Text style={[{ color: "#fff" }]}>Create Account</Text>
      </ThemedButton>
      <Spacer />
      <ThemedText style={{ marginHorizontal: "auto" }}>
        Already have an account?{" "}
        <Link href={"/login"}>
          <Text style={{ color: StateColors.text_accent }}>Sign In</Text>{" "}
        </Link>
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  page: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    flex: 1,
    width: "100%",
  },
  heading_container: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    gap: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    width: "100%",
  },
});
