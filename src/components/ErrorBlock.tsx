import { raduis, StateColors } from "@/constants/Colors";
import { StyleSheet, Text, View } from "react-native";
import Spacer from "./spacer";

export default function ErrorBlock({ message }: { message: string }) {
  return (
    <>
      <Spacer />
      <View style={styles.error}>
        <Text style={{ color: StateColors.danger }}>{message}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  error: {
    borderWidth: 1,
    borderRadius: raduis.md,
    padding: 8,
    height: 50,
    width: "100%",
    backgroundColor: "rgba(239, 68, 68, 0.2)",
    display: "flex",
    borderColor: StateColors.danger,
    alignItems: "center",
    justifyContent: "center",
  },
});
