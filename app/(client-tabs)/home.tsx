import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as Location from "expo-location";
import { BarChart } from "react-native-chart-kit";

import Screen from "../components/Screen";
import { Colors } from "../theme/colors";
import { Theme } from "../theme/theme";
import { useAuth } from "../../context/AuthContext";

const screenWidth = Dimensions.get("window").width;

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning ☀️";
  if (hour < 18) return "Good Afternoon 🌤";
  return "Good Evening 🌙";
};

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();

  const [city, setCity] = useState("Fetching...");
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const [bill, setBill] = useState("");
  const [solarSize, setSolarSize] = useState("");
  const [showResult, setShowResult] = useState(false);

  const monthlyBill = Number(bill) || 0;
  const size = Number(solarSize) || 0;

  const solarBill = Math.max(monthlyBill * 0.1, 300);
  const monthlySaving = monthlyBill - solarBill;
  const yearlySaving = monthlySaving * 12;

  const dirtyLossM = Math.round(monthlySaving * 0.08);
  const maintenanceLossM = Math.round(monthlySaving * 0.05);
  const monitoringLossM = Math.round(monthlySaving * 0.04);

  const totalLossM = dirtyLossM + maintenanceLossM + monitoringLossM;
  const totalLossY = totalLossM * 12;

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") return;

        let loc = await Location.getCurrentPositionAsync({});
        let geo = await Location.reverseGeocodeAsync(loc.coords);

        if (geo.length > 0) {
          setCity(geo[0].city || "Your City");
        }
      } catch {}
    })();
  }, []);

  return (
    <Screen>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {/* HEADER */}
        <Text style={{ color: Colors.subText }}>{getGreeting()}</Text>
        <Text style={{ fontSize: Theme.font.hero, fontWeight: "700" }}>
          {user?.name || "Welcome"} 👋
        </Text>
        <Text style={{ color: Colors.subText }}>{city}</Text>

        {/* HERO */}
        <View style={styles.hero}>
          <Text style={styles.heroText}>
            Reduce your electricity bill by 90% ☀️
          </Text>
        </View>

        {/* 🔥 CALCULATOR */}
        <View style={styles.card}>
          <Text style={styles.title}>Calculate Your Savings ⚡</Text>

          <TextInput
            placeholder="Enter Monthly Bill (e.g. 1000)"
            value={bill}
            onChangeText={setBill}
            keyboardType="numeric"
            style={styles.input}
          />

          <TextInput
            placeholder="Enter Solar Size (kW)"
            value={solarSize}
            onChangeText={setSolarSize}
            keyboardType="numeric"
            style={styles.input}
          />

          {/* Quick Select */}
          <View style={styles.row}>
            {["1", "2", "3", "5", "10"].map((s) => (
              <TouchableOpacity
                key={s}
                onPress={() => setSolarSize(s)}
                style={styles.sizeBtn}
              >
                <Text>{s} kW</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => setShowResult(true)}
          >
            <Text style={{ color: "#fff" }}>Calculate Savings</Text>
          </TouchableOpacity>
        </View>

        {/* 📊 RESULT */}
        {showResult && (
          <>
            <View style={styles.card}>
              <BarChart
                data={{
                  labels: ["Current", "Solar"],
                  datasets: [{ data: [monthlyBill, solarBill] }],
                }}
                width={screenWidth - 60}
                height={220}
                yAxisLabel="₹"
                fromZero
                chartConfig={{
                  backgroundGradientFrom: Colors.card,
                  backgroundGradientTo: Colors.card,
                  color: () => Colors.primary,
                  labelColor: () => Colors.subText,
                }}
              />

              <Text style={styles.result}>
                Monthly Saving: ₹{monthlySaving}
              </Text>
              <Text style={styles.result}>Yearly Saving: ₹{yearlySaving}</Text>
            </View>

            {/* LOSS */}
            <View style={styles.card}>
              <Text style={styles.title}>Loss Without Maintenance ⚠️</Text>

              <LossItem text="Dirty Panels" m={dirtyLossM} />
              <LossItem text="No Maintenance" m={maintenanceLossM} />
              <LossItem text="No Monitoring" m={monitoringLossM} />

              <Text style={styles.result}>Monthly Loss: ₹{totalLossM}</Text>
              <Text style={styles.result}>Yearly Loss: ₹{totalLossY}</Text>

              <TouchableOpacity
                style={styles.button}
                onPress={() => router.push("/dashboard/register")}
              >
                <Text style={{ color: "#fff" }}>Fix Loss → Register Now</Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        {/* FAQ */}
        <View style={styles.card}>
          <Text style={styles.title}>FAQs ❓</Text>

          {faqData.map((item, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => setOpenFAQ(openFAQ === i ? null : i)}
              style={styles.faqItem}
            >
              <Text style={{ fontWeight: "600" }}>{item.q}</Text>

              {openFAQ === i && <Text style={styles.faqText}>{item.a}</Text>}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </Screen>
  );
}

/* COMPONENTS */
const LossItem = ({ text, m }: any) => (
  <View style={styles.lossRow}>
    <Text>{text}</Text>
    <Text style={{ color: Colors.danger }}>₹{m}/mo</Text>
  </View>
);

/* STYLES */
const styles = {
  hero: {
    backgroundColor: Colors.primary,
    padding: 24,
    borderRadius: 24,
    marginBottom: 20,
  },
  heroText: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "700",
  },
  card: {
    backgroundColor: Colors.card,
    padding: 18,
    borderRadius: 20,
    marginBottom: 20,

    borderWidth: 1,
    borderColor: Colors.border,
  },
  title: {
    fontWeight: "600",
    marginBottom: 10,
  },
  input: {
    backgroundColor: Colors.background,
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  sizeBtn: {
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 10,
    margin: 5,
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  result: {
    marginTop: 10,
    color: Colors.primary,
    fontWeight: "700",
    textAlign: "center",
  },
  faqItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: Colors.border,
  },
  faqText: {
    color: Colors.subText,
    marginTop: 6,
  },
  lossRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
};

/* FAQ DATA */
const faqData = [
  {
    q: "How accurate is this savings calculation?",
    a: "This is an estimate based on average solar efficiency. Actual savings may vary based on location, usage, and installation quality.",
  },
  {
    q: "Why am I losing money without maintenance?",
    a: "Dust, wiring issues, and inverter inefficiencies reduce output, causing loss in energy generation.",
  },
  {
    q: "Do I need monitoring system?",
    a: "Yes, monitoring helps track performance and detect faults early, ensuring maximum savings.",
  },
  {
    q: "How often should solar panels be cleaned?",
    a: "Ideally once every 15–30 days depending on dust conditions.",
  },
];
