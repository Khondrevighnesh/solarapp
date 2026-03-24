import { View, Text, ScrollView, Dimensions } from "react-native";

import { LineChart } from "react-native-chart-kit";

import Screen from "../components/Screen";
import { Colors } from "../theme/colors";
import { Theme } from "../theme/theme";
import { GlobalStyles } from "../theme/globalStyles";

const screenWidth = Dimensions.get("window").width;

export default function Irradiation() {
  /* ☀️ DUMMY IRRADIATION DATA (Hourly) */
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

  /* 📊 METRICS */
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
            backgroundColor: Colors.primary,
            paddingTop: 60,
            paddingBottom: 30,
            paddingHorizontal: 20,
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: Theme.font.hero,
              fontWeight: "bold",
            }}
          >
            Irradiation ☀️
          </Text>

          <Text style={{ color: "#DCFCE7" }}>Solar Energy Input Analysis</Text>
        </View>

        {/* 📊 KPI CARDS */}
        <View style={{ padding: 16 }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <KPI title="Current" value={`${current} W/m²`} />
            <KPI title="Peak" value={`${peak} W/m²`} />
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <KPI title="Daily Total" value={`${total} kWh/m²`} />
            <KPI title="PR" value={`${performanceRatio}%`} />
          </View>
        </View>

        {/* 📈 GRAPH */}
        <View style={[GlobalStyles.card, { margin: 16 }]}>
          <Text
            style={{
              fontWeight: "bold",
              marginBottom: 10,
            }}
          >
            Irradiation Trend
          </Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <LineChart
              data={{
                labels,
                datasets: [{ data: irradiationData }],
              }}
              width={labels.length * 70} // ✅ scrollable width
              height={220}
              bezier
              withShadow={false}
              withInnerLines={false}
              chartConfig={{
                backgroundGradientFrom: "#fff",
                backgroundGradientTo: "#fff",
                color: () => "#FDB813", // solar yellow
                labelColor: () => "#64748B",
              }}
              style={{ borderRadius: 16 }}
            />
          </ScrollView>
        </View>

        {/* 🌤 WEATHER IMPACT */}
        <View style={[GlobalStyles.card, { marginHorizontal: 16 }]}>
          <Text style={{ fontWeight: "bold" }}>Weather Impact</Text>

          <Text style={{ marginTop: 6 }}>Cloud Cover: Low ☀️</Text>

          <Text>Temperature: 32°C</Text>

          <Text style={{ marginTop: 5, color: Colors.subText }}>
            High sunlight → Maximum solar generation expected
          </Text>
        </View>

        {/* 📉 PERFORMANCE ANALYSIS */}
        <View style={[GlobalStyles.card, { margin: 16 }]}>
          <Text style={{ fontWeight: "bold" }}>Performance Analysis</Text>

          <Text style={{ marginTop: 6 }}>
            Irradiation is strong during peak hours (11AM–2PM)
          </Text>

          <Text>Minor drop observed after 3PM due to angle shift</Text>

          <Text style={{ color: "green", marginTop: 5 }}>
            System performing optimally 🟢
          </Text>
        </View>

        {/* 💡 INSIGHTS */}
        <View style={[GlobalStyles.card, { marginHorizontal: 16 }]}>
          <Text style={{ fontWeight: "bold" }}>Smart Insights</Text>

          <Text style={{ marginTop: 6 }}>
            • Peak irradiation reached at 1PM ☀️
          </Text>

          <Text>• Ideal conditions for maximum output</Text>

          <Text>
            • Recommend monitoring panel tilt for better afternoon efficiency
          </Text>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </Screen>
  );
}

/* 🔹 KPI CARD */
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
