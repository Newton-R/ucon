import ThemedButton from "@/components/themed/Button";
import ThemedView from "@/components/themed/ThemedView";
import { Colors } from "@/constants/Colors";
import { supabase } from "@/constants/utils";
import { useRouter } from "expo-router";

import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

type Instrument = {
  id: number;
  name: string;
};

export default function App() {
  const [instruments, setInstruments] = useState<Instrument[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    getInstruments();
  }, []);

  async function getInstruments() {
    const { data, error } = await supabase.from("instruments").select();

    if (error) {
      setError(error.message);
      return;
    }

    setInstruments(data ?? []);
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error loading instruments: {error}</Text>
      </View>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedButton onPress={() => router.push("/login")}>
        <Text style={{ color: Colors.light.button_primary_text }}>
          Proceed to Dashboard
        </Text>
      </ThemedButton>
      <FlatList
        data={instruments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Text style={styles.item}>{item.name}</Text>}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  container2: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
