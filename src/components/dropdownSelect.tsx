import { Colors, raduis } from "@/constants/Colors";
import { ChevronDown } from "@hugeicons/core-free-icons";
import { useEffect, useState } from "react";
import {
  Animated,
  Pressable,
  ScrollView,
  StyleSheet,
  useAnimatedValue,
  useColorScheme,
} from "react-native";
import ThemedIcons from "./themed/ThemedIcons";
import ThemedText from "./themed/ThemedText";

interface option {
  label: string;
  value: string;
}

export default function DropDownInput() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];
  const [showPicker, setShowDatePicker] = useState<boolean>(false);
  const [choosen, setChoosen] = useState("");

  const rotate = useAnimatedValue(0);
  useEffect(() => {
    Animated.timing(rotate, {
      toValue: showPicker ? 1 : 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [showPicker]);

  const rotation = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  const options: option[] = [
    {
      label: "Cash",
      value: "Cash",
    },
    {
      label: "Mobile Money",
      value: "Mobile Money",
    },
    {
      label: "Borrow / Lent",
      value: "Borrow",
    },
  ];

  return (
    <Pressable
      onPress={() => {
        setShowDatePicker(!showPicker);
      }}
      style={[
        styles.input,
        {
          justifyContent: "space-between",
          borderColor: theme.border,
          display: "flex",
          flexDirection: "row",
          position: "relative",
          alignItems: "center",
          backgroundColor: theme.background,
        },
      ]}
    >
      {choosen ? (
        <ThemedText>{choosen}</ThemedText>
      ) : (
        <ThemedText variant="muted">Choose a payment method</ThemedText>
      )}
      <Animated.View
        style={{
          width: "auto",
          height: "auto",
          transform: [{ rotate: rotation }],
        }}
      >
        <ThemedIcons icon={ChevronDown} />
      </Animated.View>
      {showPicker && (
        <ScrollView
          style={[
            styles.menu,
            {
              borderWidth: 1,
              borderColor: theme.border,
              height: "auto",
              maxHeight: 150,
            },
          ]}
        >
          {options.map((opt, i) => (
            <Pressable
              key={i}
              onPress={() => {
                setChoosen(opt.value);
                setShowDatePicker(false);
              }}
              style={[
                {
                  display: "flex",
                  height: 50,
                  width: "100%",
                  paddingHorizontal: 16,
                  flexDirection: "column",
                  zIndex: 10,
                  justifyContent: "center",
                  borderBottomWidth: 1,
                  borderColor: theme.border,
                },
              ]}
            >
              <ThemedText>{opt.label}</ThemedText>
            </Pressable>
          ))}
        </ScrollView>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  input: {
    width: "100%",
    paddingHorizontal: 16,
    borderWidth: 2,
    borderRadius: raduis.md,
    height: 50,
  },
  menu: {
    position: "absolute",
    borderRadius: 12,
    display: "flex",
    flexDirection: "column",
    top: "110%",
    left: 0,
    right: 0,
  },
});
