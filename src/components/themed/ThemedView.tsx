import { Colors } from "@/constants/Colors";
import { useColorScheme, View, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ThemedView = ({
  style,
  children,
  safe = false,
}: {
  style?: ViewStyle;
  safe?: boolean;
  children: React.ReactNode;
}) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        { backgroundColor: theme.background },
        safe && {
          paddingBottom: insets.bottom,
          paddingTop: insets.top + 30,
          paddingLeft: 20,
          paddingRight: 20,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

export default ThemedView;
