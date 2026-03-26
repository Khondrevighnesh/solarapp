import {
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import { useState } from "react";
import { LineChart } from "react-native-chart-kit";

import Screen from "../components/Screen";
import { Colors } from "../theme/colors";
import { Theme } from "../theme/theme";
import { GlobalStyles } from "../theme/globalStyles";

const screenWidth = Dimensions.get("window").width;

export default function EPI() {
  /* 🌱 PLANT DATA */
  const plantCapacity = 100; // kW

  /* 📊 GENERATION DATA */
  const dailyGeneration = [120, 140, 130, 160, 180, 170, 200];
  const monthlyGeneration = [3200, 3500, 3800, 3600, 4000, 4200, 4500];

  const [view, setView] = useState<"daily" | "monthly">("daily");

  /* 📊 CALCULATE EPI */
  const getEPIData = () => {
    const data = view === "daily" ? dailyGeneration : monthlyGeneration;

    return {
      labels:
        view === "daily"
          ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
          : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],

      data: data.map((val) => val / plantCapacity),
    };
  };

  const chart = getEPIData();

  const currentEPI = chart.data[chart.data.length - 1];
  const targetEPI = 5; // industry avg

  const performance = ((currentEPI / targetEPI) * 100).toFixed(1);

  const status =
    currentEPI >= targetEPI
      ? "Excellent 🟢"
      : currentEPI >= targetEPI * 0.8
        ? "Average 🟡"
        : "Poor 🔴";

  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 🔝 HEADER */}
        <View
          style={{
            backgroundColor: Colors.primary,
            paddingTop: 60,
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
            EPI Dashboard ⚡
          </Text>

          <Text style={{ color: "#DCFCE7" }}>
            Energy Performance Index Analysis
          </Text>
        </View>

        {/* 📊 KPI */}
        <View style={{ marginTop: 10 }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <KPI title="Current EPI" value={currentEPI.toFixed(2)} />
            <KPI title="Target EPI" value={`${targetEPI}`} />
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <KPI title="Performance" value={`${performance}%`} />
            <KPI title="Capacity" value={`${plantCapacity} kW`} />
          </View>
        </View>

        {/* 🚨 STATUS */}
        <View style={[GlobalStyles.card, { marginTop: 10 }]}>
          <Text style={{ fontWeight: "bold" }}>System Status</Text>

          <Text
            style={{
              marginTop: 10,
              color: status.includes("Excellent")
                ? "green"
                : status.includes("Average")
                  ? "orange"
                  : "red",
            }}
          >
            {status}
          </Text>
        </View>

        {/* 🔘 TOGGLE */}
        <View
          style={{
            flexDirection: "row",
            margin: 16,
            backgroundColor: "#F1F5F9",
            borderRadius: 14,
            padding: 4,
          }}
        >
          {["daily", "monthly"].map((item) => (
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

        {/* 📈 GRAPH */}
        <View style={[GlobalStyles.card, { marginTop: 10 }]}>
          <Text style={{ fontWeight: "bold", marginBottom: 10 }}>
            EPI Trend
          </Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <LineChart
              data={{
                labels: chart.labels,
                datasets: [{ data: chart.data }],
              }}
              width={chart.labels.length * 70}
              height={220}
              bezier
              withShadow={false}
              withInnerLines={false}
              chartConfig={{
                backgroundGradientFrom: "#fff",
                backgroundGradientTo: "#fff",
                color: () => Colors.primary,
                labelColor: () => "#64748B",
              }}
              style={{ borderRadius: 16 }}
            />
          </ScrollView>
        </View>

        {/* 💡 INSIGHTS */}
        <View style={[GlobalStyles.card, { marginTop: 10 }]}>
          <Text style={{ fontWeight: "bold" }}>Insights</Text>

          <Text style={{ marginTop: 8 }}>
            • EPI indicates plant efficiency per kW installed
          </Text>

          <Text>• Higher EPI = better performance</Text>

          <Text>• Maintain panels & monitor inverter health</Text>
        </View>

        <View style={{ height: 50 }} />
      </ScrollView>
    </Screen>
  );
}

/* 🔹 KPI */
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

    <Text
      style={{
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 5,
      }}
    >
      {value}
    </Text>
  </View>
);
