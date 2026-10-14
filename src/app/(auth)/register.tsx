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
import { Email, LockKeyholeIcon, User } from "@hugeicons/core-free-icons";
import { Link } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

interface RegistrationPayload {
  full_name: string;
  email: string;
  password: string;
  confirm_password: string;
}

export default function RegisterationPage() {
  const { signUp, loading, error } = useAuth();
  const [formData, setFormData] = useState<RegistrationPayload>({
    full_name: "",
    email: "",
    confirm_password: "",
    password: "",
  });

  const handleInputChange = (key: keyof RegistrationPayload, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSignUp = () => {
    if (formData.confirm_password === formData.password) {
      signUp(formData.email, formData.password, formData.full_name);
    } else {
      Alert.alert(
        "Password",
        "Password confirmation needs to be same as password!",
      );
    }
  };

  return (
    <FormWrapper>
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
          <Input
            label="Full name"
            onChangeText={(text) => handleInputChange("full_name", text)}
            value={formData.full_name}
            icon={User}
            placeholder="John Doe"
          />
          <Input
            label="Email Address"
            onChangeText={(text) => handleInputChange("email", text)}
            value={formData.email}
            icon={Email}
            placeholder="you@gmail.com"
          />
          <Input
            onChangeText={(text) => handleInputChange("password", text)}
            label="Password"
            value={formData.password}
            secureTextEntry
            icon={LockKeyholeIcon}
            placeholder="********"
          />
          <Input
            label="Confirm Password"
            secureTextEntry
            icon={LockKeyholeIcon}
            onChangeText={(text) => handleInputChange("confirm_password", text)}
            value={formData.confirm_password}
            placeholder="********"
          />
        </View>
        {error && <ErrorBlock message={error.message} />}
        <Spacer />
        <ThemedButton onPress={() => handleSignUp()} style={{ width: "100%" }}>
          {loading ? (
            <SpinnerLoader />
          ) : (
            <Text style={[{ color: "#fff" }]}>Create Account</Text>
          )}
        </ThemedButton>
        <Spacer />
        <ThemedText style={{ marginHorizontal: "auto" }}>
          Already have an account?{" "}
          <Link href={"/login"}>
            <Text style={{ color: StateColors.text_accent }}>Sign In</Text>{" "}
          </Link>
        </ThemedText>
      </ThemedView>
    </FormWrapper>
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
