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

  /* 📥 GENERATE REPORT */
  const downloadReport = async (name: string) => {
    try {
      setLoading(true);

      const fileUri = FileSystem.documentDirectory + `${name}.txt`;

      const content = `
Solar Performance Report - ${name}

Generation: 1200 kWh
Savings: ₹9600
CO₂ Saved: 850 kg
Performance: 92%

System Status: Healthy
Weather Impact: Moderate ☀️

Thank you for using Solar App ⚡
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
            borderRadius: 30,
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
            Plant performance & analytics reports
          </Text>
        </View>

        {/* ⚡ QUICK REPORTS */}
        <View style={{ marginTop: 10 }}>
          <Text
            style={{
              fontSize: Theme.font.heading,
              fontWeight: "bold",
              marginBottom: 12,
            }}
          >
            Quick Reports
          </Text>

          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={() => downloadReport("Monthly_Report")}
          >
            <Text style={styles.btnText}>📊 Download Monthly Report</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryBtn}
            onPress={() => downloadReport("Yearly_Report")}
          >
            <Text style={styles.secondaryText}>📈 Download Yearly Report</Text>
          </TouchableOpacity>
        </View>

        {/* 📋 REPORT HISTORY */}
        <View style={{ marginTop: 10 }}>
          <Text
            style={{
              fontSize: Theme.font.heading,
              fontWeight: "bold",
              marginBottom: 12,
            }}
          >
            Report History
          </Text>

          {reports.map((item) => (
            <View key={item.id} style={styles.reportCard}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View>
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 15,
                    }}
                  >
                    {item.month}
                  </Text>

                  <Text
                    style={{
                      color: Colors.subText,
                      marginTop: 4,
                    }}
                  >
                    Performance Report
                  </Text>
                </View>

                <Text
                  style={{
                    color: Colors.primary,
                    fontWeight: "600",
                  }}
                >
                  {item.status}
                </Text>
              </View>

              <TouchableOpacity
                style={styles.downloadBtn}
                onPress={() => downloadReport(item.month)}
              >
                <Text style={{ color: "white", fontWeight: "600" }}>
                  Download
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* 💡 INSIGHTS (BOTTOM SECTION) */}
        <View
          style={[
            GlobalStyles.card,
            {
              marginTop: 10,
              borderRadius: 20,
            },
          ]}
        >
          <Text
            style={{
              fontSize: Theme.font.heading,
              fontWeight: "bold",
            }}
          >
            Insights
          </Text>

          <Text style={styles.insightText}>
            • Your plant generated 12% more energy this month 📈
          </Text>

          <Text style={styles.insightText}>
            • Performance remains stable across last 3 months
          </Text>

          <Text style={styles.insightText}>
            • Weather conditions supported higher efficiency ☀️
          </Text>

          <Text style={styles.insightText}>
            • Recommended: Panel cleaning to maintain output
          </Text>
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
  primaryBtn: {
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 10,
  },

  secondaryBtn: {
    borderWidth: 1,
    borderColor: Colors.primary,
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
  },

  btnText: {
    color: "white",
    fontWeight: "bold",
  },

  secondaryText: {
    color: Colors.primary,
    fontWeight: "bold",
  },

  reportCard: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  downloadBtn: {
    marginTop: 12,
    backgroundColor: Colors.primary,
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
  },

  insightText: {
    marginTop: 8,
    color: Colors.subText,
  },
};
