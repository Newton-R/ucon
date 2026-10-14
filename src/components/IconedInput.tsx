import { Colors } from "@/constants/Colors";
import { Eye, EyeClosedFreeIcons } from "@hugeicons/core-free-icons";
import { IconSvgObject } from "@hugeicons/core-free-icons/types";
import { useState } from "react";
import {
  Pressable,
  StyleSheet,
  TextInput,
  useColorScheme,
  View,
} from "react-native";
import ThemedIcons from "./themed/ThemedIcons";
import ThemedText from "./themed/ThemedText";

type InputProps = {
  icon?: IconSvgObject;
  placeholder?: string;
  label?: string;
  value?: string;
  secureTextEntry?: boolean;
  onChangeText?: (text: string) => void;
};

export default function Input({
  icon: Icon,
  label,
  value,
  placeholder,
  secureTextEntry,
  onChangeText,
}: InputProps) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];
  const [viewingPass, setViewingPassword] = useState<boolean>(false);
  return (
    <View style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {label && <ThemedText variant="secondary">{label}</ThemedText>}
      <View
        style={[
          styles.container,
          { borderColor: theme.border, backgroundColor: theme.card_bg },
        ]}
      >
        {Icon && <ThemedIcons icon={Icon} />}

        <TextInput
          placeholder={placeholder}
          value={value}
          onChangeText={(text) => {
            if (onChangeText) {
              onChangeText(text);
            }
          }}
          placeholderTextColor={theme.text_muted}
          secureTextEntry={secureTextEntry && !viewingPass}
          style={[styles.input, { color: theme.text_primary }]}
        />

        {secureTextEntry && (
          <Pressable
            style={{ padding: 6 }}
            onPress={() => setViewingPassword(!viewingPass)}
          >
            <ThemedIcons
              icon={viewingPass ? EyeClosedFreeIcons : Eye}
              size={18}
            />
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 16,
    borderWidth: 1,

    borderRadius: 12,
  },

  input: {
    flex: 1,
    fontSize: 15,
  },
});
