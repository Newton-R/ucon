import FloatingBtn from "@/components/floatingBtn";
import ClassCreationForm from "@/components/forms/TaskCreationForm";
import Spacer from "@/components/spacer";
import SpinnerLoader from "@/components/SpinnerLoader";
import ThemedButton from "@/components/themed/Button";
import CourseCard from "@/components/themed/CourseCard";
import ThemedIcons from "@/components/themed/ThemedIcons";
import ThemedText from "@/components/themed/ThemedText";
import ThemedView from "@/components/themed/ThemedView";
import { Colors, raduis, StateColors } from "@/constants/Colors";
import { TextSize } from "@/constants/Template";
import { Class } from "@/constants/types";
import { getTimetable } from "@/hooks/useClass";
import { ChevronLeft, Search01Icon } from "@hugeicons/core-free-icons";
import LottieView from "lottie-react-native";
import { useEffect, useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

export default function TimetablePage() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];
  const pills = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [active, setActive] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [fetchedClasses, setFetchedClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getMyTable = async () => {
    try {
      const data = await getTimetable();
      console.log({ mydata: data });
      setFetchedClasses(data ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load timetable");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMyTable();
  }, []);

  if (loading) {
    return (
      <ThemedView
        style={{
          flex: 1,
          alignContent: "center",
          display: "flex",
          flexDirection: "column",
          gap: 6,
          justifyContent: "center",
        }}
      >
        <SpinnerLoader />
        <ThemedText>Loading...</ThemedText>;
      </ThemedView>
    );
  }

  if (error) {
    return (
      <ThemedView
        style={{ flex: 1, alignContent: "center", justifyContent: "center" }}
      >
        <ThemedText>{error}</ThemedText>;
      </ThemedView>
    );
  }

  if (!loading && fetchedClasses.length === 0) {
    return (
      <ThemedView
        style={{
          flex: 1,
          alignContent: "center",
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Modal
          onRequestClose={() => setModalOpen(false)}
          animationType="slide"
          visible={modalOpen}
        >
          <ThemedView safe style={{ flex: 1 }}>
            <View style={[styles.heading]}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 16,
                }}
              >
                <TouchableOpacity onPress={() => setModalOpen(false)}>
                  <ThemedIcons icon={ChevronLeft} />
                </TouchableOpacity>
                <ThemedText style={{ fontSize: TextSize["2xl"] }}>
                  Add Class
                </ThemedText>
              </View>
            </View>
            <Spacer />
            <ClassCreationForm onSubmit={() => setModalOpen(false)} />
          </ThemedView>
        </Modal>
        <View style={{ marginHorizontal: "auto" }}>
          <LottieView
            source={require("@/assets/animations/calender.json")}
            autoPlay
            loop
            style={{ width: 220, height: 220 }}
          />
        </View>
        <ThemedText style={{ textAlign: "center" }}>
          No classes available
        </ThemedText>
        <ThemedButton
          onPress={() => setModalOpen(true)}
          style={{
            width: "40%",
            marginTop: 10,
            borderRadius: raduis.md,
            marginHorizontal: "auto",
          }}
        >
          <Text style={{ color: "#fff" }}>Add Class</Text>
        </ThemedButton>
      </ThemedView>
    );
  }

  return (
    <ThemedView safe style={styles.parant}>
      <View style={styles.heading}>
        <ThemedText style={{ fontSize: TextSize["2xl"] }}>Timetable</ThemedText>
        <Pressable style={({ pressed }) => [{ borderColor: theme.border }]}>
          <ThemedIcons icon={Search01Icon} />
        </Pressable>
      </View>
      <Spacer />
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{
            gap: 14,
            display: "flex",
            flexDirection: "row",
            height: "auto",
          }}
        >
          {pills.map((label, i) => (
            <Pressable
              key={i}
              onPress={() => setActive(i)}
              style={[
                styles.pill,
                { borderColor: theme.border },
                active === i && { backgroundColor: StateColors.text_accent },
              ]}
            >
              <Text
                style={[
                  {
                    fontSize: TextSize.md,
                    fontWeight: "500",
                    color: theme.text_secondary,
                  },
                  active === i && { color: "#fff" },
                ]}
              >
                {label}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>
      <Spacer />
      <View style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {fetchedClasses.map((cls, i) => (
          <CourseCard myclass={cls} key={i} />
        ))}
      </View>
      <Modal
        onRequestClose={() => setModalOpen(false)}
        animationType="slide"
        visible={modalOpen}
      >
        <ThemedView safe style={{ flex: 1 }}>
          <View style={[styles.heading]}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 16,
              }}
            >
              <TouchableOpacity onPress={() => setModalOpen(false)}>
                <ThemedIcons icon={ChevronLeft} />
              </TouchableOpacity>
              <ThemedText style={{ fontSize: TextSize["2xl"] }}>
                Add Class
              </ThemedText>
            </View>
          </View>
          <Spacer />
          <ClassCreationForm
            onSubmit={() => {
              setModalOpen(false);
              getMyTable();
            }}
          />
        </ThemedView>
      </Modal>
      <FloatingBtn onPress={() => setModalOpen(true)} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  parant: {
    flex: 1,
    position: "relative",
  },
  pill: {
    padding: 4,
    borderWidth: 1,
    paddingHorizontal: 6,
    height: 40,
    width: 70,
    marginHorizontal: 6,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: raduis.full,
    display: "flex",
    textAlign: "center",
  },
  float_button: {
    width: 50,
    height: 50,
    borderRadius: raduis.full,
    position: "fixed",
    top: 100,
    left: 10,
  },
  heading: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
