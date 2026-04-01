import {
  View,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useState, useEffect } from "react";
import { LineChart } from "react-native-chart-kit";

import Screen from "../components/Screen";
import { plants } from "../../data/plants";
import { Colors } from "../theme/colors";
import { Theme } from "../theme/theme";

const screenWidth = Dimensions.get("window").width;

export default function Generation() {
  const plant = plants?.[0] || {};

  const [view, setView] = useState<"daily" | "monthly" | "yearly">("daily");
  const [selectedPoint, setSelectedPoint] = useState<any>(null);
  const [weather, setWeather] = useState<any>(null);
  const [loadingWeather, setLoadingWeather] = useState(true);

  /* Weather */
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=18.52&longitude=73.85&current_weather=true",
        );
        const data = await res.json();
        setWeather(data?.current_weather);
      } catch (e) {
        console.log("Weather error");
      } finally {
        setLoadingWeather(false);
      }
    };
    fetchWeather();
  }, []);

  /* Data */
  const getChartData = () => {
    if (view === "daily") {
      return {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        data: plant?.generation || [20, 30, 25, 40, 50, 45, 60],
      };
    }
    if (view === "monthly") {
      return {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        data: plant?.monthly || [
          400, 520, 610, 480, 700, 650, 720, 800, 760, 820, 900, 950,
        ],
      };
    }
    return {
      labels: ["2021", "2022", "2023", "2024", "2025"],
      data: plant?.yearly || [5000, 7200, 8500, 9200, 11000],
    };
  };

  const chart = getChartData();
  const chartWidth = Math.max(screenWidth, chart.labels.length * 70);

  const total = (chart.data || []).reduce((a, b) => a + b, 0);
  const today = chart.data?.[chart.data.length - 1] || 0;
  const expected = total * 1.1 || 1;
  const efficiency = ((total / expected) * 100).toFixed(1);
  const isLow = Number(efficiency) < 80;
  const trend =
    today >= (chart.data?.[chart.data.length - 2] || 0) ? "up" : "down";

  return (
    <Screen backgroundColor={Colors.background}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 28 }}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerAccent} />
          <Text style={styles.headerTitle}>Solar Analytics</Text>
          <Text style={styles.headerSub}>{plant?.name || "Solar Plant"}</Text>
          <View style={styles.headerChips}>
            <View style={styles.chip}>
              <Text style={styles.chipText}>Live</Text>
            </View>
            <View style={styles.chipSoft}>
              <Text style={styles.chipSoftText}>Clean UI</Text>
            </View>
          </View>
        </View>

        {/* KPI Grid */}
        <View style={styles.kpiWrap}>
          <KPI title="Today" value={`${today} kWh`} accent />
          <KPI title="Total" value={`${total} kWh`} />
          <KPI title="Savings" value={`₹${total * 8}`} />
          <KPI title="Efficiency" value={`${efficiency}%`} />
        </View>

        {/* Alert */}
        {isLow && (
          <View style={styles.alertCard}>
            <Text style={styles.alertText}>⚠️ Low Performance Detected</Text>
          </View>
        )}

        {/* Toggle */}
        <View style={styles.toggle}>
          {["daily", "monthly", "yearly"].map((item) => (
            <TouchableOpacity
              key={item}
              onPress={() => setView(item as any)}
              style={[
                styles.toggleItem,
                view === item && styles.toggleItemActive,
              ]}
              activeOpacity={0.9}
            >
              <Text
                style={[
                  styles.toggleText,
                  view === item && styles.toggleTextActive,
                ]}
              >
                {item.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Chart Card */}
        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardTitle}>
              {view.toUpperCase()} Generation
            </Text>
            <View
              style={[
                styles.trendPill,
                trend === "up" ? styles.trendUp : styles.trendDown,
              ]}
            >
              <Text
                style={[
                  styles.trendText,
                  trend === "up" ? styles.trendTextUp : styles.trendTextDown,
                ]}
              >
                {trend === "up" ? "▲" : "▼"} {trend === "up" ? "Up" : "Down"}
              </Text>
            </View>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <LineChart
              data={{
                labels: chart.labels,
                datasets: [{ data: chart.data || [] }],
              }}
              width={chartWidth}
              height={240}
              bezier
              withInnerLines={false}
              withOuterLines={false}
              withShadow={false}
              chartConfig={{
                backgroundGradientFrom: Colors.surface,
                backgroundGradientTo: Colors.surface,
                color: () => Colors.primary,
                labelColor: () => Colors.subText,
                propsForDots: {
                  r: "4",
                  strokeWidth: "2",
                  stroke: Colors.textInverse,
                },
                propsForLabels: { fontSize: 10 },
              }}
              onDataPointClick={(data) => setSelectedPoint(data)}
              style={{ marginLeft: -6 }}
            />
          </ScrollView>

          {selectedPoint && (
            <View style={styles.tooltip}>
              <Text style={styles.tooltipText}>
                {chart.labels[selectedPoint.index]} → {selectedPoint.value} kWh
              </Text>
            </View>
          )}
        </View>

        {/* Weather */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Weather Impact</Text>
          {loadingWeather ? (
            <ActivityIndicator
              style={{ marginTop: 10 }}
              color={Colors.primary}
            />
          ) : (
            <>
              <Text style={styles.bodyText}>
                Temp: {weather?.temperature ?? "--"}°C
              </Text>
              <Text style={styles.bodyText}>
                Wind: {weather?.windspeed ?? "--"} km/h
              </Text>
              <Text
                style={[
                  styles.bodyText,
                  { marginTop: 6, color: Colors.subText },
                ]}
              >
                {weather?.temperature > 30
                  ? "High sunlight → Strong generation ☀️"
                  : "Moderate conditions"}
              </Text>
            </>
          )}
        </View>

        {/* Performance */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Performance Analytics</Text>
          <Text style={styles.bodyText}>
            Expected: {Math.round(expected)} kWh
          </Text>
          <Text style={styles.bodyText}>Actual: {total} kWh</Text>
          <Text
            style={[
              styles.bodyText,
              { marginTop: 6, color: isLow ? Colors.danger : Colors.eco },
            ]}
          >
            Efficiency: {efficiency}%
          </Text>
        </View>

        <View style={{ height: 18 }} />
      </ScrollView>
    </Screen>
  );
}

/* KPI Component */
const KPI = ({ title, value, accent = false }: any) => (
  <View style={styles.kpi}>
    <Text style={styles.kpiTitle}>{title}</Text>
    <Text style={[styles.kpiValue, accent && { color: Colors.eco }]}>
      {value}
    </Text>
  </View>
);

/* STYLES */
const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.surface,
    paddingTop: 26,
    paddingBottom: 18,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
    marginBottom: 14,
    position: "relative",
  },
  headerAccent: {
    position: "absolute",
    top: 0,
    left: 16,
    right: 16,
    height: 4,
    borderRadius: 4,
    backgroundColor: Colors.accent,
  },
  headerTitle: {
    color: Colors.text,
    fontSize: Theme.font.hero,
    fontWeight: "700",
    letterSpacing: -0.3,
  },
  headerSub: {
    color: Colors.subText,
    marginTop: 4,
    fontSize: 14,
    fontWeight: "600",
  },
  headerChips: { flexDirection: "row", gap: 8, marginTop: 10 },
  chip: {
    backgroundColor: Colors.primarySoft,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  chipText: { color: Colors.primary, fontWeight: "700", fontSize: 12 },
  chipSoft: {
    backgroundColor: Colors.surface,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  chipSoftText: { color: Colors.subText, fontWeight: "700", fontSize: 12 },

  kpiWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: 4,
    marginBottom: 8,
  },
  kpi: {
    width: "48%",
    backgroundColor: Colors.surface,
    padding: 14,
    borderRadius: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    shadowColor: Colors.shadowSoft,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 1,
  },
  kpiTitle: { color: Colors.subText, fontSize: 12, marginBottom: 4 },
  kpiValue: { fontWeight: "800", fontSize: 18, color: Colors.text },

  alertCard: {
    backgroundColor: Colors.dangerSoft,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.danger,
    padding: 12,
    marginHorizontal: 16,
    marginBottom: 12,
  },
  alertText: { color: Colors.danger, fontWeight: "700" },

  toggle: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: Colors.surfaceAlt,
    borderRadius: 14,
    padding: 4,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  toggleItem: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  toggleItemActive: {
    backgroundColor: Colors.primary,
    shadowColor: Colors.shadowSoft,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  toggleText: {
    color: Colors.subText,
    fontWeight: "700",
    fontSize: 12,
  },
  toggleTextActive: {
    color: Colors.textInverse,
  },

  card: {
    backgroundColor: Colors.surface,
    borderRadius: 18,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    shadowColor: Colors.shadowSoft,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 1,
  },
  cardHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  cardTitle: { fontWeight: "800", fontSize: 16, color: Colors.text },
  bodyText: { color: Colors.text, fontSize: 14 },

  trendPill: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },
  trendUp: { backgroundColor: Colors.ecoSoft },
  trendDown: { backgroundColor: Colors.dangerSoft },
  trendText: { fontWeight: "700", fontSize: 12 },
  trendTextUp: { color: Colors.eco },
  trendTextDown: { color: Colors.danger },

  tooltip: {
    marginTop: 10,
    backgroundColor: Colors.surfaceAlt,
    padding: 10,
    borderRadius: 10,
  },
  tooltipText: { color: Colors.text, fontSize: 13 },
});
