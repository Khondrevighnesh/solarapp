import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import { useState } from "react";
import Screen from "../components/Screen";

import { Colors } from "../theme/colors";
import { Theme } from "../theme/theme";
import { GlobalStyles } from "../theme/globalStyles";

import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";

/* 📄 DUMMY REPORT HISTORY */
const reports = [
  { id: 1, month: "March 2026", status: "Ready" },
  { id: 2, month: "February 2026", status: "Ready" },
  { id: 3, month: "January 2026", status: "Ready" },
];

export default function Reports() {
  const [loading, setLoading] = useState(false);

  /* 📥 GENERATE + DOWNLOAD REPORT */
  const downloadReport = async (name: string) => {
    try {
      setLoading(true);

      const fileUri = FileSystem.documentDirectory + `${name}.txt`;

      const content = `
Solar Report - ${name}

Generation: 1200 kWh
Savings: ₹9600
CO₂ Saved: 850 kg
Performance: 92%

Thank you for using Solar App ☀️
      `;

      await FileSystem.writeAsStringAsync(fileUri, content);

      await Sharing.shareAsync(fileUri);
    } catch (e) {
      console.log("Download error");
    } finally {
      setLoading(false);
    }
  };

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
            Reports 📄
          </Text>

          <Text style={{ color: "#DCFCE7" }}>
            Download plant performance reports
          </Text>
        </View>

        {/* ⚡ QUICK REPORTS */}
        <View style={{ padding: 16 }}>
          <Text
            style={{
              fontSize: Theme.font.heading,
              fontWeight: "bold",
              marginBottom: 10,
            }}
          >
            Quick Reports
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => downloadReport("Monthly_Report")}
          >
            <Text style={styles.buttonText}>Download Monthly Report</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => downloadReport("Yearly_Report")}
          >
            <Text style={styles.buttonText}>Download Yearly Report</Text>
          </TouchableOpacity>
        </View>

        {/* 📋 REPORT HISTORY */}
        <View style={{ paddingHorizontal: 16 }}>
          <Text
            style={{
              fontSize: Theme.font.heading,
              fontWeight: "bold",
              marginBottom: 10,
            }}
          >
            Report History
          </Text>

          {reports.map((item) => (
            <View
              key={item.id}
              style={[GlobalStyles.card, { marginBottom: 12 }]}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontWeight: "bold" }}>{item.month}</Text>

                <Text style={{ color: "green" }}>{item.status}</Text>
              </View>

              <TouchableOpacity
                style={styles.smallBtn}
                onPress={() => downloadReport(item.month)}
              >
                <Text style={{ color: "white" }}>Download</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* ⏳ LOADING */}
        {loading && (
          <ActivityIndicator
            size="large"
            color={Colors.primary}
            style={{ marginTop: 20 }}
          />
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </Screen>
  );
}

/* 🎨 STYLES */
const styles = {
  button: {
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 10,
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
  },

  smallBtn: {
    marginTop: 10,
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
};
