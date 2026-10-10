import { Colors, raduis } from '@/constants/Colors';
import { TextSize } from '@/constants/Template';
import { Bus01FreeIcons } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { StyleSheet, useColorScheme, View } from 'react-native';
import ThemedText from './themed/ThemedText';

export function RecentTransactionsCard() {
    const colorScheme = useColorScheme()
    const theme = Colors[colorScheme ?? "light"]
    return (
        <View style={[styles.card, { backgroundColor: theme.card_bg }]}>
            <View style={styles.data_side}>
                <View style={[styles.card_icon]}>
                    <HugeiconsIcon color={"#10B981"} icon={Bus01FreeIcons} />
                </View>
                <View style={styles.card_content}>
                    <ThemedText variant='primary' style={{ fontSize: TextSize.md, fontWeight: "500" }}>Lunch</ThemedText>
                    <ThemedText variant='secondary' style={{ fontSize: TextSize.sm }}>12, Sep 2026</ThemedText>
                </View>
            </View>
            <ThemedText>12,000</ThemedText>
        </View>
    )
}

export function CategoryPoint() {
    return <View style={styles.list}>
        <View style={styles.list_side}>
            <View style={[styles.list_bullet, { backgroundColor: "#000" }]} />
            <ThemedText style={{ fontSize: TextSize.md }}>Food</ThemedText>
        </View>
        <ThemedText variant='muted'>12,000</ThemedText>
    </View>
}

const styles = StyleSheet.create({
    card: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 14,
        borderRadius: raduis.lg,
    },
    card_icon: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(16, 185, 129, 0.2)",
        justifyContent: "center",
        padding: 6,
        width: 45,
        height: 45,
        borderRadius: raduis.full
    },
    data_side: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 12
    },
    card_content: {
        display: "flex",
        flexDirection: "column",
        gap: 2
    },
    list: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    list_side: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 6
    },
    list_bullet: {
        height: 10,
        width: 10,
        borderRadius: raduis.full
    }

})