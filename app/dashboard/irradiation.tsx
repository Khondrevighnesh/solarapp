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
            paddingTop: 50,
            paddingBottom: 30,
            paddingHorizontal: 20,
            borderRadius: 30,
            margin: 10,
          }}
        >
          <Text
            style={{
              color: Colors.textInverse,
              fontSize: Theme.font.hero,
              fontWeight: "bold",
            }}
          >
            Irradiation ☀️
          </Text>

          <Text style={{ color: Colors.primarySoft, marginTop: 4 }}>
            Solar Energy Input Analysis
          </Text>
        </View>

        {/* 📊 KPI CARDS */}
        <View style={{ paddingHorizontal: 10 }}>
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
              marginTop: 12,
            }}
          >
            <KPI title="Daily Total" value={`${total} kWh/m²`} />
            <KPI title="PR" value={`${performanceRatio}%`} />
          </View>
        </View>

        {/* 📈 GRAPH */}
        <View
          style={[
            GlobalStyles.card,
            {
              marginTop: 12,
              backgroundColor: Colors.surface,
              borderColor: Colors.border,
            },
          ]}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 16,
              color: Colors.text,
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
        </View>

        {/* 🌤 WEATHER IMPACT */}
        <View
          style={[
            GlobalStyles.card,
            {
              marginTop: 12,
              backgroundColor: Colors.surface,
              borderColor: Colors.border,
            },
          ]}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 16,
              color: Colors.text,
            }}
          >
            Weather Impact
          </Text>

          <Text style={{ marginTop: 6, color: Colors.warning }}>
            Cloud Cover: Low ☀️
          </Text>

          <Text style={{ color: Colors.textSecondary }}>Temperature: 32°C</Text>

          <Text style={{ marginTop: 5, color: Colors.subText }}>
            High sunlight → Maximum solar generation expected
          </Text>
        </View>

        {/* 📉 PERFORMANCE ANALYSIS */}
        <View
          style={[
            GlobalStyles.card,
            {
              marginTop: 12,
              backgroundColor: Colors.surface,
              borderColor: Colors.border,
            },
          ]}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 16,
              color: Colors.text,
            }}
          >
            Performance Analysis
          </Text>

          <Text style={{ marginTop: 6, color: Colors.textSecondary }}>
            Irradiation is strong during peak hours (11AM–2PM)
          </Text>

          <Text style={{ color: Colors.textSecondary }}>
            Minor drop observed after 3PM due to angle shift
          </Text>

          <Text style={{ color: Colors.eco, marginTop: 5 }}>
            System performing optimally 🟢
          </Text>
        </View>

        {/* 💡 INSIGHTS */}
        <View
          style={[
            GlobalStyles.card,
            {
              marginTop: 12,
              backgroundColor: Colors.surface,
              borderColor: Colors.border,
            },
          ]}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 16,
              color: Colors.text,
            }}
          >
            Smart Insights
          </Text>

          <Text style={{ marginTop: 6, color: Colors.textSecondary }}>
            • Peak irradiation reached at 1PM ☀️
          </Text>

          <Text style={{ color: Colors.textSecondary }}>
            • Ideal conditions for maximum output
          </Text>

          <Text style={{ color: Colors.textSecondary }}>
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
      backgroundColor: Colors.surface,
      padding: 16,
      borderRadius: 18,
      borderWidth: 1,
      borderColor: Colors.border,
      shadowColor: Colors.shadow,
      shadowOpacity: 0.05,
      shadowRadius: 10,
      elevation: 3,
    }}
  >
    <Text style={{ color: Colors.subText, fontSize: 12 }}>{title}</Text>

    <Text
      style={{
        fontSize: 22,
        fontWeight: "bold",
        marginTop: 6,
        color: Colors.text,
      }}
    >
      {value}
    </Text>
  </View>
);
