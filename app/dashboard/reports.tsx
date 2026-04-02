import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from "react-native";

import { useState } from "react";
import Screen from "../components/Screen";

import { Colors } from "../theme/colors";
import { Theme } from "../theme/theme";
import { GlobalStyles } from "../theme/globalStyles";

import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";

/* 📄 REPORT DATA */
const reports = [
  { id: 1, name: "new bucket upload", date: "22 Jan 2025", type: "Monthly" },
  { id: 2, name: "final toast", date: "22 Jan 2025", type: "Monthly" },
  { id: 3, name: "new", date: "22 Jan 2025", type: "Commissioning" },
  { id: 4, name: "new toast", date: "22 Jan 2025", type: "Monthly" },
  { id: 5, name: "new final upload", date: "22 Jan 2025", type: "Monthly" },
  { id: 6, name: "Report #6", date: "22 Jan 2025", type: "Commissioning" },
  { id: 7, name: "Report #7", date: "22 Jan 2025", type: "Monthly" },
];

export default function Reports() {
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  /* 🔍 FILTER + SEARCH */
  const filteredReports = reports.filter((r) => {
    const matchesFilter = filter === "All" || r.type === filter;
    const matchesSearch = r.name.toLowerCase().includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  /* 📥 DOWNLOAD */
  const downloadReport = async (name: string) => {
    try {
      setLoading(true);

      const fileUri = FileSystem.documentDirectory + `${name}.txt`;
      await FileSystem.writeAsStringAsync(fileUri, `Report - ${name}`);

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
            Reports 📄
          </Text>

          <Text style={{ color: Colors.primarySoft, marginTop: 4 }}>
            Detailed insights & records
          </Text>
        </View>

        {/* 📊 SUMMARY */}
        <View style={{ paddingHorizontal: 10 }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <SummaryCard title="Total" value="7" />
            <SummaryCard title="Period" value="Current" />
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 12,
            }}
          >
            <SummaryCard title="Contract" value="ACTIVE" highlight />
            <SummaryCard title="Type" value={filter} />
          </View>
        </View>

        {/* 🔍 SEARCH */}
        <View style={{ paddingHorizontal: 10, marginTop: 15 }}>
          <TextInput
            placeholder="Search reports..."
            value={search}
            onChangeText={setSearch}
            placeholderTextColor={Colors.subText}
            style={{
              backgroundColor: Colors.surface,
              padding: 14,
              borderRadius: 14,
              borderWidth: 1,
              borderColor: Colors.border,
              color: Colors.text,
            }}
          />
        </View>

        {/* 🔘 FILTER */}
        <View style={{ paddingHorizontal: 10, marginTop: 15 }}>
          <View style={{ flexDirection: "row" }}>
            {["All", "Monthly", "Commissioning"].map((item) => (
              <TouchableOpacity
                key={item}
                onPress={() => setFilter(item)}
                style={{
                  paddingVertical: 8,
                  paddingHorizontal: 14,
                  borderRadius: 20,
                  marginRight: 10,
                  backgroundColor:
                    filter === item ? Colors.primary : Colors.surfaceAlt,
                }}
              >
                <Text
                  style={{
                    color:
                      filter === item
                        ? Colors.textInverse
                        : Colors.textSecondary,
                    fontWeight: "600",
                  }}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* 📋 REPORT LIST */}
        <View style={{ paddingHorizontal: 10, marginTop: 15 }}>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 16,
              color: Colors.text,
              marginBottom: 10,
            }}
          >
            Reports ({filteredReports.length})
          </Text>

          {filteredReports.length === 0 && (
            <Text style={{ color: Colors.subText }}>No reports found 😔</Text>
          )}

          {filteredReports.map((item) => (
            <View key={item.id} style={styles.card}>
              {/* TOP ROW */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.title}>{item.name}</Text>

                {/* TYPE BADGE */}
                <View
                  style={{
                    backgroundColor:
                      item.type === "Monthly"
                        ? Colors.infoSoft
                        : Colors.warningSoft,
                    paddingHorizontal: 10,
                    paddingVertical: 4,
                    borderRadius: 10,
                  }}
                >
                  <Text
                    style={{
                      color:
                        item.type === "Monthly" ? Colors.info : Colors.warning,
                      fontSize: 12,
                      fontWeight: "600",
                    }}
                  >
                    {item.type}
                  </Text>
                </View>
              </View>

              {/* DATE */}
              <Text style={styles.date}>📅 {item.date}</Text>

              {/* ACTIONS */}
              <View style={styles.actions}>
                <TouchableOpacity
                  style={styles.download}
                  onPress={() => downloadReport(item.name)}
                >
                  <Text style={styles.actionText}>⬇️ Download</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.preview}>
                  <Text style={styles.previewText}>👁️ Preview</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

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

/* 🔹 SUMMARY CARD */
const SummaryCard = ({ title, value, highlight = false }: any) => (
  <View
    style={{
      width: "48%",
      backgroundColor: highlight ? Colors.ecoSoft : Colors.surface,
      padding: 14,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: Colors.border,
    }}
  >
    <Text style={{ color: Colors.subText, fontSize: 12 }}>{title}</Text>

    <Text
      style={{
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 5,
        color: highlight ? Colors.eco : Colors.text,
      }}
    >
      {value}
    </Text>
  </View>
);

/* 🎨 STYLES */
const styles = {
  card: {
    backgroundColor: Colors.surface,
    padding: 16,
    borderRadius: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },

  title: {
    fontWeight: "bold",
    fontSize: 15,
    color: Colors.text,
  },

  date: {
    marginTop: 6,
    color: Colors.subText,
  },

  actions: {
    flexDirection: "row",
    marginTop: 12,
  },

  download: {
    backgroundColor: Colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginRight: 10,
  },

  preview: {
    borderWidth: 1,
    borderColor: Colors.border,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
  },

  actionText: {
    color: Colors.textInverse,
    fontWeight: "600",
  },

  previewText: {
    color: Colors.textSecondary,
    fontWeight: "600",
  },
};
