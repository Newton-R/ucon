import { useEffect } from "react";
import { Animated, StyleSheet, useAnimatedValue, View } from "react-native";
import Svg, { Circle } from "react-native-svg";
import ThemedText from "./themed/ThemedText";

const SIZE = 200;
const STROKE_WIDTH = 30;
const RADIUS = 70;

const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

interface DoughNutProps {
  data: {
    label: string;
    value: number;
    color: string;
  }[];
}

export default function DoughNut({ data }: DoughNutProps) {
  const AnimatedCircle = Animated.createAnimatedComponent(Circle);
  const total = data.reduce((sum, item) => sum + item.value, 0);

  const length = useAnimatedValue(0);

  const segments = data.map((data) => {
    const percentage = data.value / total;
    return {
      ...data,
      percentage: percentage,
      length: percentage * CIRCUMFERENCE,
    };
  });

  useEffect(() => {
    Animated.timing(length, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, []);

  let offset = 0;

  return (
    <View>
      <Svg width={SIZE} height={SIZE}>
        <Circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          stroke="#E2E8F0"
          strokeWidth={STROKE_WIDTH}
          fill="none"
        />
        {segments.map((segment, i) => {
          const animatedLength = length.interpolate({
            inputRange: [0, 1],
            outputRange: [0, segment.length],
          });
          const segmentss = (
            <AnimatedCircle
              key={i}
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={RADIUS}
              stroke={segment.color}
              strokeWidth={STROKE_WIDTH}
              fill="none"
              strokeDashoffset={offset}
              strokeDasharray={[animatedLength, CIRCUMFERENCE]}
            />
          );

          offset -= segment.length;

          return segmentss;
        })}
      </Svg>

      <View style={styles.center}>
        <ThemedText variant="primary" style={{ fontWeight: "bold" }}>
          42,500
        </ThemedText>
        <ThemedText variant={"secondary"}>XAF</ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  chartContainer: {
    width: 200,
    height: 200,
    position: "relative",
  },

  center: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});
