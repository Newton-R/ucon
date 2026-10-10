import Input from "@/components/IconedInput";
import Spacer from "@/components/spacer";
import ThemedButton from "@/components/themed/Button";
import ThemedText from "@/components/themed/ThemedText";
import ThemedView from "@/components/themed/ThemedView";
import { StateColors } from "@/constants/Colors";
import { TextSize } from "@/constants/Template";
import { Email, LockFreeIcons } from "@hugeicons/core-free-icons";
import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function login() {
  return (
    <ThemedView
      safe
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",

        justifyContent: "center",
      }}
    >
      <View>
        <ThemedText style={{ fontSize: TextSize["3xl"] }}>
          Welcome back{" "}
        </ThemedText>
        <ThemedText variant="secondary">
          Log in to continue your account.
        </ThemedText>
      </View>
      <Spacer />
      <View style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <Input label="Email" placeholder="you@gmail.com" icon={Email} />
        <Input
          label="Password"
          placeholder="**********"
          secureTextEntry
          icon={LockFreeIcons}
        />
      </View>
      <Link
        href="/forgot_password"
        style={{
          color: StateColors.text_accent,
          alignSelf: "flex-end",
          marginTop: 4,
        }}
      >
        Forgot Password?
      </Link>
      <Spacer />
      <ThemedButton>
        <Text style={{ color: "#fff" }}>Sign In</Text>
      </ThemedButton>
      <Spacer />
      <ThemedText variant="secondary" style={{ marginHorizontal: "auto" }}>
        Don't have an account?{" "}
        <Text>
          <Link
            href="/register"
            style={{
              color: StateColors.text_accent,
            }}
          >
            Sign Up
          </Link>
        </Text>{" "}
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  intro_section: {
    display: "flex",
    flexDirection: "column",
    gap: 3,
  },
});
