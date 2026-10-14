import { LoaderCircleFreeIcons } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";

type SpinnerLoaderProps = {
  size?: number;
  color?: string;
};

export default function SpinnerLoader({
  size = 22,
  color = "#fff",
}: SpinnerLoaderProps) {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 800,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );

    animation.start();

    return () => animation.stop();
  }, [spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <Animated.View style={{ transform: [{ rotate: spin }] }}>
      <HugeiconsIcon icon={LoaderCircleFreeIcons} size={size} color={color} />
    </Animated.View>
  );
}
