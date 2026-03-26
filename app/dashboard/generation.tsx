import {
  View,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import { useState, useEffect } from "react";
import { LineChart } from "react-native-chart-kit";

import Screen from "../components/Screen";
import { plants } from "../../data/plants";

import { Colors } from "../theme/colors";
import { Theme } from "../theme/theme";
import { GlobalStyles } from "../theme/globalStyles";

const screenWidth = Dimensions.get("window").width;

export default function Generation() {
  const plant = plants?.[0] || {};

  const [view, setView] = useState<"daily" | "monthly" | "yearly">("daily");
  const [selectedPoint, setSelectedPoint] = useState<any>(null);
  const [weather, setWeather] = useState<any>(null);
  const [loadingWeather, setLoadingWeather] = useState(true);

  /* 🌦️ FREE WEATHER API (NO API KEY) */
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

  /* 📊 DATA */
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

  /* 📏 DYNAMIC WIDTH (KEY FIX) */
  const chartWidth = Math.max(screenWidth, chart.labels.length * 70);

  /* SAFE CALC */
  const total = (chart.data || []).reduce((a, b) => a + b, 0);
  const today = chart.data?.[chart.data.length - 1] || 0;

  const expected = total * 1.1 || 1;
  const efficiency = ((total / expected) * 100).toFixed(1);
  const isLow = Number(efficiency) < 80;

  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View
          style={{
            backgroundColor: Colors.primary,
            paddingTop: 40,
            paddingBottom: 30,
            paddingHorizontal: 20,
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: Theme.font.hero,
              fontWeight: "bold",
            }}
          >
            Solar Analytics
          </Text>

          <Text style={{ color: "#DCFCE7" }}>
            {plant?.name || "Solar Plant"}
          </Text>
        </View>

        {/* KPI */}
        <View style={{ marginTop: 10 }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <KPI title="Today" value={`${today} kWh`} />
            <KPI title="Total" value={`${total} kWh`} />
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <KPI title="Savings" value={`₹${total * 8}`} />
            <KPI title="Efficiency" value={`${efficiency}%`} />
          </View>
        </View>

        {/* ALERT */}
        {isLow && (
          <View
            style={{
              backgroundColor: "#FEF2F2",
              marginHorizontal: 16,

              borderRadius: 12,
              borderWidth: 1,
              borderColor: "#FCA5A5",
            }}
          >
            <Text style={{ color: "#DC2626", fontWeight: "bold" }}>
              ⚠️ Low Performance Detected
            </Text>
          </View>
        )}

        {/* TOGGLE */}
        <View
          style={{
            flexDirection: "row",
            margin: 16,
            backgroundColor: "#F1F5F9",
            borderRadius: 14,
          }}
        >
          {["daily", "monthly", "yearly"].map((item) => (
            <TouchableOpacity
              key={item}
              onPress={() => setView(item as any)}
              style={{
                flex: 1,
                padding: 10,
                borderRadius: 10,
                backgroundColor: view === item ? Colors.primary : "transparent",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: view === item ? "white" : "#64748B",
                }}
              >
                {item.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* 📊 CHART WITH SCROLL (MAIN FIX) */}
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 20,
            paddingVertical: 16,
            borderWidth: 1,
            borderColor: "#E2E8F0",
            marginBottom: 10,
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              marginBottom: 10,
              marginLeft: 16,
              fontSize: 16,
            }}
          >
            {view.toUpperCase()} Generation
          </Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <LineChart
              data={{
                labels: chart.labels,
                datasets: [{ data: chart.data || [] }],
              }}
              width={chartWidth}
              height={220}
              bezier
              withInnerLines={false}
              withOuterLines={false}
              withShadow={false}
              chartConfig={{
                backgroundGradientFrom: "#ffffff",
                backgroundGradientTo: "#ffffff",
                color: () => Colors.primary,
                labelColor: () => "#64748B",

                propsForDots: {
                  r: "4",
                  strokeWidth: "2",
                  stroke: "#fff",
                },

                propsForLabels: {
                  fontSize: 10,
                },
              }}
              onDataPointClick={(data) => setSelectedPoint(data)}
            />
          </ScrollView>

          {/* TOOLTIP */}
          {selectedPoint && (
            <View
              style={{
                marginTop: 10,
                marginHorizontal: 16,
                backgroundColor: "#F1F5F9",
                padding: 10,
                borderRadius: 10,
              }}
            >
              <Text>
                {chart.labels[selectedPoint.index]} → {selectedPoint.value} kWh
              </Text>
            </View>
          )}
        </View>

        {/* WEATHER */}
        <View style={[GlobalStyles.card, {}]}>
          <Text style={{ fontWeight: "bold" }}>Weather Impact</Text>

          {loadingWeather ? (
            <ActivityIndicator style={{ marginTop: 10 }} />
          ) : (
            <>
              <Text>Temp: {weather?.temperature ?? "--"}°C</Text>
              <Text>Wind: {weather?.windspeed ?? "--"} km/h</Text>

              <Text style={{ marginTop: 5, color: Colors.subText }}>
                {weather?.temperature > 30
                  ? "High sunlight → Strong generation ☀️"
                  : "Moderate conditions"}
              </Text>
            </>
          )}
        </View>

        {/* PERFORMANCE */}
        <View style={[GlobalStyles.card]}>
          <Text style={{ fontWeight: "bold" }}>Performance Analytics</Text>

          <Text>Expected: {Math.round(expected)} kWh</Text>
          <Text>Actual: {total} kWh</Text>

          <Text
            style={{
              color: isLow ? "red" : "green",
              marginTop: 5,
            }}
          >
            Efficiency: {efficiency}%
          </Text>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </Screen>
  );
}

/* KPI */
const KPI = ({ title, value }: any) => (
  <View
    style={{
      width: "48%",
      backgroundColor: "white",
      padding: 16,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: "#E2E8F0",
    }}
  >
    <Text style={{ color: "#64748B" }}>{title}</Text>
    <Text style={{ fontSize: 20, fontWeight: "bold" }}>{value}</Text>
  </View>
);
