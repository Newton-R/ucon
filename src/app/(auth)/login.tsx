import ErrorBlock from "@/components/ErrorBlock";
import Input from "@/components/IconedInput";
import Spacer from "@/components/spacer";
import SpinnerLoader from "@/components/SpinnerLoader";
import ThemedButton from "@/components/themed/Button";
import FormWrapper from "@/components/themed/ThemedFormWrapper";
import ThemedText from "@/components/themed/ThemedText";
import ThemedView from "@/components/themed/ThemedView";
import { StateColors } from "@/constants/Colors";
import { TextSize } from "@/constants/Template";
import { useAuth } from "@/hooks/useAuth";
import { Email, LockFreeIcons } from "@hugeicons/core-free-icons";
import { Link } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

interface LoginPayload {
  email: string;
  password: string;
}

export default function login() {
  const { error, logIn, loading } = useAuth();
  const [formData, setFormData] = useState<LoginPayload>({
    email: "",
    password: "",
  });

  const handleInputChange = (key: keyof LoginPayload, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <FormWrapper>
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
          <Input
            label="Email"
            value={formData.email}
            onChangeText={(text) => handleInputChange("email", text)}
            placeholder="you@gmail.com"
            icon={Email}
          />
          <Input
            label="Password"
            value={formData.password}
            onChangeText={(text) => handleInputChange("password", text)}
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

        {error && <ErrorBlock message={error.message} />}

        <Spacer />
        <ThemedButton onPress={() => logIn(formData.email, formData.password)}>
          {loading ? (
            <SpinnerLoader />
          ) : (
            <Text style={{ color: "#fff" }}>Sign In</Text>
          )}
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
    </FormWrapper>
  );
}

const styles = StyleSheet.create({
  intro_section: {
    display: "flex",
    flexDirection: "column",
    gap: 3,
  },
});
