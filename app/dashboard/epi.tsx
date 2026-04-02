import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useState } from "react";
import { LineChart } from "react-native-chart-kit";
import { Ionicons } from "@expo/vector-icons";

import Screen from "../components/Screen";
import { Colors } from "../theme/colors";
import { Theme } from "../theme/theme";

export default function EPI() {
  const plantCapacity = 100;

  const dailyGeneration = [120, 140, 130, 160, 180, 170, 200];
  const monthlyGeneration = [3200, 3500, 3800, 3600, 4000, 4200, 4500];

  const [view, setView] = useState<"daily" | "monthly">("daily");

  const data = view === "daily" ? dailyGeneration : monthlyGeneration;
  const epiData = data.map((val) => val / plantCapacity);

  const labels =
    view === "daily"
      ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
      : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];

  const current = epiData[epiData.length - 1];
  const previous = epiData[epiData.length - 2];

  const target = 5;

  const performance = ((current / target) * 100).toFixed(1);
  const diff = (((current - previous) / previous) * 100).toFixed(1);

  const statusColor =
    current >= target
      ? Colors.eco
      : current >= target * 0.8
        ? Colors.warning
        : Colors.danger;

  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 🔝 HEADER */}
        <View
          style={{
            paddingTop: 10,

            borderRadius: 30,
            margin: 10,
          }}
        >
          <View style={[styles.card, { backgroundColor: Colors.primary }]}>
            <Text style={styles.headerTitle}>EPI Dashboard ⚡</Text>
            <Text style={styles.headerSub}>
              Energy Performance Index Analysis
            </Text>
          </View>
        </View>

        {/* 📊 KPI */}
        <View style={styles.row}>
          <KPI title="Current EPI" value={current.toFixed(2)} />
          <KPI title="Target" value={`${target}`} />
        </View>

        <View style={[styles.row, { marginTop: 12 }]}>
          <KPI title="Performance" value={`${performance}%`} highlight />
          <KPI title="Change" value={`${diff}%`} />
        </View>

        {/* 🔘 TOGGLE */}
        <View style={styles.toggleContainer}>
          {["daily", "monthly"].map((item) => (
            <TouchableOpacity
              key={item}
              onPress={() => setView(item as any)}
              style={[styles.toggleBtn, view === item && styles.toggleActive]}
            >
              <Text
                style={{
                  color: view === item ? "#fff" : Colors.subText,
                  fontWeight: "600",
                }}
              >
                {item.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* 📈 TREND */}
        <Section title="EPI Trend" icon="analytics-outline">
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <LineChart
              data={{
                labels,
                datasets: [{ data: epiData }],
              }}
              width={labels.length * 70}
              height={220}
              bezier
              withShadow={false}
              withInnerLines={false}
              chartConfig={{
                backgroundGradientFrom: Colors.surface,
                backgroundGradientTo: Colors.surface,
                color: () => Colors.primary,
                labelColor: () => Colors.subText,
              }}
              style={{ borderRadius: 16 }}
            />
          </ScrollView>

          <Bullet text="Higher EPI = better efficiency" />
          <Bullet text="Stable trend = consistent performance" />
        </Section>

        {/* 🛡 SYSTEM STATUS */}
        <Section title="System Status" icon="shield-checkmark-outline">
          <InfoRow
            label="Performance"
            value={`${performance}% of target`}
            color={statusColor}
          />
          <InfoRow label="Target EPI" value={`${target}`} />
          <InfoRow
            label="Current EPI"
            value={current.toFixed(2)}
            color={Colors.accent}
          />

          <Text style={styles.note}>
            {current >= target
              ? "System performing above industry benchmark."
              : "Below optimal — check cleaning & inverter efficiency."}
          </Text>
        </Section>

        {/* 🔁 COMPARISON */}
        <Section title="Comparison" icon="git-compare-outline">
          <InfoRow
            label="Change"
            value={`${diff}%`}
            color={diff > 0 ? Colors.eco : Colors.danger}
          />
          <InfoRow
            label="Compared To"
            value={view === "daily" ? "Yesterday" : "Last Month"}
          />

          <Text style={styles.note}>
            {diff > 0
              ? "Performance improved due to better sunlight."
              : "Drop observed — possible weather/system issue."}
          </Text>
        </Section>

        {/* 💡 INSIGHTS */}
        <Section title="Insights" icon="bulb-outline">
          <Bullet text="Maintain panels for better EPI" />
          <Bullet text="Monitor inverter efficiency" />
          <Bullet text="Track trends regularly" />
        </Section>

        <View style={{ height: 40 }} />
      </ScrollView>
    </Screen>
  );
}

//////////////////////////////////////////////////////

const Section = ({ title, icon, children }: any) => (
  <View style={styles.sectionContainer}>
    <View style={styles.sectionHeader}>
      <Ionicons name={icon} size={18} color={Colors.primary} />
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>

    <View style={styles.card}>{children}</View>
  </View>
);

//////////////////////////////////////////////////////

const InfoRow = ({ label, value, color }: any) => (
  <View style={styles.infoRow}>
    <Text style={styles.label}>{label}</Text>
    <Text style={[styles.value, { color: color || Colors.text }]}>{value}</Text>
  </View>
);

//////////////////////////////////////////////////////

const KPI = ({ title, value, highlight }: any) => (
  <View
    style={[
      styles.card,
      styles.kpiCard,
      {
        backgroundColor: highlight ? Colors.accentSoft : Colors.surface,
      },
    ]}
  >
    <Text style={styles.kpiLabel}>{title}</Text>
    <Text
      style={[
        styles.kpiValue,
        { color: highlight ? Colors.accent : Colors.text },
      ]}
    >
      {value}
    </Text>
  </View>
);

//////////////////////////////////////////////////////

const Bullet = ({ text }: any) => <Text style={styles.bullet}>• {text}</Text>;

//////////////////////////////////////////////////////

const styles = {
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: Colors.shadow,
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },

  headerTitle: {
    color: Colors.textInverse,
    fontSize: Theme.font.hero,
    fontWeight: "bold",
  },

  headerSub: {
    color: Colors.primarySoft,
    marginTop: 4,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: 12,
  },

  kpiCard: {
    width: "48%",
  },

  kpiLabel: {
    color: Colors.subText,
    fontSize: 12,
  },

  kpiValue: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 6,
  },

  toggleContainer: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: Colors.surfaceAlt,
    borderRadius: 12,
    padding: 4,
  },

  toggleBtn: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },

  toggleActive: {
    backgroundColor: Colors.primary,
  },

  sectionContainer: {
    paddingHorizontal: 16,
    marginTop: 18,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 6,
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.text,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: Colors.borderLight,
  },

  label: {
    color: Colors.subText,
  },

  value: {
    fontWeight: "600",
  },

  note: {
    marginTop: 8,
    color: Colors.textSecondary,
  },

  bullet: {
    color: Colors.textSecondary,
    marginTop: 6,
  },
};
