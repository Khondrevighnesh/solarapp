import { View, Text, ScrollView, Dimensions } from "react-native";

import { LineChart } from "react-native-chart-kit";
import { Ionicons } from "@expo/vector-icons";

import Screen from "../components/Screen";
import { Colors } from "../theme/colors";
import { Theme } from "../theme/theme";

const screenWidth = Dimensions.get("window").width;

export default function Irradiation() {
  const irradiationData = [
    0, 50, 120, 300, 550, 720, 850, 920, 880, 760, 500, 200,
  ];

  const labels = [
    "6AM",
    "7AM",
    "8AM",
    "9AM",
    "10AM",
    "11AM",
    "12PM",
    "1PM",
    "2PM",
    "3PM",
    "4PM",
    "5PM",
  ];

  const current = irradiationData[irradiationData.length - 1];
  const peak = Math.max(...irradiationData);
  const total = irradiationData.reduce((a, b) => a + b, 0);

  const performanceRatio = (
    (total / (peak * irradiationData.length)) *
    100
  ).toFixed(1);

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
            <Text style={styles.headerTitle}>Irradiation ☀️</Text>
            <Text style={styles.headerSub}>Solar Energy Input Analysis</Text>
          </View>
        </View>

        {/* 📊 KPI */}
        <View style={styles.rowBetween}>
          <KPI title="Current" value={`${current} W/m²`} />
          <KPI title="Peak" value={`${peak} W/m²`} />
        </View>

        <View style={[styles.rowBetween, { marginTop: 12 }]}>
          <KPI title="Daily Total" value={`${total} kWh/m²`} />
          <KPI title="PR" value={`${performanceRatio}%`} highlight />
        </View>

        {/* 📈 GRAPH */}
        <Section title="Irradiation Trend" icon="analytics-outline">
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <LineChart
              data={{
                labels,
                datasets: [{ data: irradiationData }],
              }}
              width={labels.length * 70}
              height={220}
              bezier
              withShadow={false}
              withInnerLines={false}
              chartConfig={{
                backgroundGradientFrom: Colors.surface,
                backgroundGradientTo: Colors.surface,
                color: () => Colors.accent,
                labelColor: () => Colors.subText,
                propsForDots: {
                  r: "4",
                  strokeWidth: "2",
                  stroke: Colors.accent,
                },
              }}
              style={{ borderRadius: 16 }}
            />
          </ScrollView>
        </Section>

        {/* 🌤 WEATHER */}
        <Section title="Weather Impact" icon="partly-sunny-outline">
          <InfoRow
            icon="cloud-outline"
            label="Cloud Cover"
            value="Low ☀️"
            color={Colors.warning}
          />
          <InfoRow
            icon="thermometer-outline"
            label="Temperature"
            value="32°C"
          />
          <InfoRow
            icon="sunny-outline"
            label="Impact"
            value="High sunlight → Max generation"
            color={Colors.eco}
          />
        </Section>

        {/* 📉 PERFORMANCE */}
        <Section title="Performance Analysis" icon="trending-up-outline">
          <InfoRow
            label="Peak Hours"
            value="11AM – 2PM"
            color={Colors.accent}
          />
          <InfoRow label="Observation" value="Drop after 3PM" />
          <InfoRow
            label="System Status"
            value="Optimal 🟢"
            color={Colors.eco}
          />
        </Section>

        {/* 💡 INSIGHTS */}
        <Section title="Smart Insights" icon="bulb-outline">
          <Bullet text="Peak irradiation at 1PM ☀️" />
          <Bullet text="Ideal for maximum output" />
          <Bullet text="Optimize panel tilt post 3PM" />
        </Section>

        <View style={{ height: 40 }} />
      </ScrollView>
    </Screen>
  );
}

//////////////////////////////////////////////////////

const Section = ({ title, icon, children }: any) => (
  <View style={{ paddingHorizontal: 20, marginTop: 16 }}>
    <View style={styles.sectionHeader}>
      <Ionicons name={icon} size={18} color={Colors.primary} />
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>

    <View style={styles.card}>{children}</View>
  </View>
);

//////////////////////////////////////////////////////

const InfoRow = ({ icon, label, value, color }: any) => (
  <View style={styles.infoRow}>
    <View style={styles.rowLeft}>
      {icon && <Ionicons name={icon} size={16} color={Colors.subText} />}
      <Text style={styles.label}>{label}</Text>
    </View>

    <Text style={[styles.value, { color: color || Colors.text }]}>{value}</Text>
  </View>
);

//////////////////////////////////////////////////////

const Bullet = ({ text }: any) => (
  <Text style={{ color: Colors.textSecondary, marginTop: 6 }}>• {text}</Text>
);

//////////////////////////////////////////////////////

const KPI = ({ title, value, highlight }: any) => (
  <View
    style={[
      styles.card,
      {
        width: "48%",
        backgroundColor: highlight ? Colors.accentSoft : Colors.surface,
      },
    ]}
  >
    <Text style={{ color: Colors.subText, fontSize: 12 }}>{title}</Text>

    <Text
      style={{
        fontSize: 22,
        fontWeight: "bold",
        marginTop: 6,
        color: highlight ? Colors.accent : Colors.text,
      }}
    >
      {value}
    </Text>
  </View>
);

//////////////////////////////////////////////////////

const styles = {
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 14,
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

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 8,
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

  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  label: {
    color: Colors.subText,
  },

  value: {
    fontWeight: "600",
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
};
