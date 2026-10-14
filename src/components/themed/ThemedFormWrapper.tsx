import { Colors } from "@/constants/Colors";
import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  useColorScheme,
} from "react-native";

export default function FormWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const colorSchema = useColorScheme();
  const theme = Colors[colorSchema ?? "light"];
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: theme.background }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
