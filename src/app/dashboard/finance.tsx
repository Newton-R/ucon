import DoughNut from "@/components/doughnut";
import FloatingBtn from "@/components/floatingBtn";
import FinanceForm from "@/components/forms/FinanceForm";
import {
  CategoryPoint,
  RecentTransactionsCard,
} from "@/components/recenttransactioncard";
import Spacer from "@/components/spacer";
import ThemedText from "@/components/themed/ThemedText";
import ThemedView from "@/components/themed/ThemedView";
import { raduis, StateColors } from "@/constants/Colors";
import { TextSize } from "@/constants/Template";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const data = [
  {
    label: "Food",
    value: 18000,
    color: "#3B82F6",
  },
  {
    label: "Transport",
    value: 9500,
    color: "#10B981",
  },
  {
    label: "School",
    value: 8000,
    color: "#8B5CF6",
  },
  {
    label: "Other",
    value: 7000,
    color: "#F59E0B",
  },
];
export default function Finance() {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  return (
    <ThemedView safe style={{ flex: 1, position: "relative" }}>
      <View>
        <ThemedText style={{ fontSize: TextSize["2xl"], fontWeight: "bold" }}>
          Finance
        </ThemedText>
      </View>
      <Spacer />
      <View style={styles.lv1}>
        <View style={styles.income}>
          <Text style={{ color: "#10B981", fontSize: TextSize.lg }}>
            Income
          </Text>
          <Text
            style={{
              color: "#10B981",
              fontSize: TextSize.xl,
              fontWeight: "bold",
            }}
          >
            1,000,000 FCFA
          </Text>
        </View>
        <View style={styles.expenditure}>
          <Text style={{ color: "#EF4444", fontSize: TextSize.lg }}>
            Expenditure
          </Text>
          <Text
            style={{
              color: "#EF4444",
              fontSize: TextSize.xl,
              fontWeight: "bold",
            }}
          >
            1,000,000 FCFA
          </Text>
        </View>
      </View>
      <Spacer />
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <ThemedText>Spendings by category</ThemedText>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <DoughNut data={data} />
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              gap: 8,
            }}
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <CategoryPoint key={i} />
            ))}
          </View>
        </View>
      </View>
      <Spacer />
      <View style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <View style={styles.section_head}>
          <ThemedText>Recent Transactions</ThemedText>
          <Text style={{ color: StateColors.text_accent }}>View all</Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          {Array.from({ length: 3 }).map((_, i) => (
            <RecentTransactionsCard key={i} />
          ))}
        </View>
      </View>
      <FinanceForm isOpen={modalOpen} close={() => setModalOpen(false)} />
      <FloatingBtn onPress={() => setModalOpen(true)} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  lv1: {
    display: "flex",
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  income: {
    flex: 1,
    borderRadius: raduis.lg,
    padding: 25,
    display: "flex",
    flexDirection: "column",
    gap: 2,
    backgroundColor: "rgba(16, 185, 129, 0.2)",
  },
  expenditure: {
    flex: 1,
    borderRadius: raduis.lg,
    padding: 25,
    display: "flex",
    flexDirection: "column",
    gap: 2,
    backgroundColor: "rgba(239, 68, 68, 0.2)",
  },
  section_head: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
