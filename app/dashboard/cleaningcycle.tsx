import { View, Text, ScrollView, Image, StyleSheet } from "react-native";

import Screen from "../components/Screen";
import { Colors } from "../theme/colors";
import { Theme } from "../theme/theme";

/* 🧼 DATA */
const cleaningData = [
  {
    id: 1,
    date: "12 Mar 2026",
    technician: "Rahul Patil",
    status: "Completed",
    review: "Panels cleaned properly. Efficiency improved.",
    before: "https://picsum.photos/200/120?1",
    after: "https://picsum.photos/200/120?2",
  },
  {
    id: 2,
    date: "25 Feb 2026",
    technician: "Amit Sharma",
    status: "Completed",
    review: "Dust removed. Good performance observed.",
    before: "https://picsum.photos/200/120?3",
    after: "https://picsum.photos/200/120?4",
  },
  {
    id: 3,
    date: "10 Apr 2026",
    technician: "Scheduled",
    status: "Pending",
    review: "Upcoming cleaning cycle",
  },
];

export default function CleaningCycle() {
  const completed = cleaningData.filter((i) => i.status === "Completed").length;
  const total = 24;
  const progress = (completed / total) * 100;

  return (
    <Screen>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* 🔝 HEADER — full width, no side padding */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Cleaning Cycle 🧼</Text>

          <Text style={styles.headerSubtitle}>
            24 Cycles / Year Maintenance
          </Text>
        </View>

        {/* 📊 KPI + PROGRESS — inset from both sides */}
        <View style={styles.kpiContainer}>
          {/* KPI ROW */}
          <View style={styles.kpiRow}>
            <KPI title="Completed" value={completed} color={Colors.eco} />
            <KPI
              title="Pending"
              value={total - completed}
              color={Colors.warning}
            />
            <KPI title="Total" value={total} color={Colors.textSecondary} />
          </View>

          {/* 📈 PROGRESS BAR */}
          <View style={{ marginTop: 20 }}>
            <Text style={styles.sectionLabel}>Cleaning Progress</Text>

            <View style={styles.progressBarBg}>
              <View
                style={[styles.progressBarFill, { width: `${progress}%` }]}
              />
            </View>

            <Text style={styles.progressText}>
              {completed} / {total} cycles completed
            </Text>
          </View>
        </View>

        {/* 📋 HISTORY — inset from both sides */}
        <View style={styles.historySection}>
          <Text style={styles.sectionTitle}>Cleaning History</Text>

          {cleaningData.map((item) => (
            <View key={item.id} style={styles.historyCard}>
              {/* HEADER ROW */}
              <View style={styles.cardHeader}>
                <Text style={styles.cardDate}>{item.date}</Text>

                <View
                  style={[
                    styles.statusBadge,
                    {
                      backgroundColor:
                        item.status === "Completed"
                          ? Colors.ecoSoft
                          : Colors.warningSoft,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.statusText,
                      {
                        color:
                          item.status === "Completed"
                            ? Colors.eco
                            : Colors.warning,
                      },
                    ]}
                  >
                    {item.status}
                  </Text>
                </View>
              </View>

              {/* TECH */}
              <Text style={styles.technicianText}>👨‍🔧 {item.technician}</Text>

              {/* IMAGES */}
              {item.status === "Completed" && (
                <View style={styles.imageRow}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.imageLabel}>Before</Text>
                    <Image source={{ uri: item.before }} style={styles.image} />
                  </View>

                  <View style={{ flex: 1 }}>
                    <Text style={styles.imageLabel}>After</Text>
                    <Image source={{ uri: item.after }} style={styles.image} />
                  </View>
                </View>
              )}

              {/* REVIEW */}
              <Text style={styles.reviewText}>{item.review}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </Screen>
  );
}

/* KPI CARD */
const KPI = ({
  title,
  value,
  color,
}: {
  title: string;
  value: number;
  color: string;
}) => (
  <View style={styles.kpiCard}>
    <Text style={styles.kpiTitle}>{title}</Text>

    <Text style={[styles.kpiValue, { color }]}>{value}</Text>
  </View>
);

/* STYLES */
const styles = StyleSheet.create({
  // Header — full width, no side padding
  header: {
    backgroundColor: Colors.primary,
    paddingTop: 40,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  headerTitle: {
    color: Colors.textInverse,
    fontSize: Theme.font.hero,
    fontWeight: "bold",
  },
  headerSubtitle: {
    color: Colors.ecoSoft,
    marginTop: 4,
  },

  // KPI Container — inset from both sides
  kpiContainer: {
    marginTop: 10,
    backgroundColor: Colors.surface,
    borderRadius: 24,
    padding: 16,
    marginHorizontal: 16, // ✅ content padded from both sides
  },
  kpiRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  kpiCard: {
    width: "30%",
    backgroundColor: Colors.surfaceAlt,
    padding: 12,
    borderRadius: 14,
    alignItems: "center",
  },
  kpiTitle: {
    color: Colors.subText,
    fontSize: 12,
  },
  kpiValue: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 4,
  },

  // Progress
  progressBarBg: {
    height: 12,
    backgroundColor: Colors.border,
    borderRadius: 10,
    overflow: "hidden",
  },
  progressBarFill: {
    backgroundColor: Colors.primary,
    height: "100%",
  },
  progressText: {
    marginTop: 6,
    color: Colors.subText,
    fontSize: 12,
  },

  // History Section — inset from both sides
  historySection: {
    marginTop: 10,
    paddingHorizontal: 16, // ✅ content padded from both sides
  },
  sectionTitle: {
    fontSize: Theme.font.heading,
    fontWeight: "bold",
    marginBottom: 12,
    color: Colors.text,
  },
  sectionLabel: {
    fontWeight: "600",
    marginBottom: 6,
    color: Colors.text,
  },

  // History Card
  historyCard: {
    backgroundColor: Colors.surface,
    padding: 16,
    borderRadius: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardDate: {
    fontWeight: "bold",
    color: Colors.text,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontWeight: "600",
    fontSize: 12,
  },

  // Technician
  technicianText: {
    marginTop: 6,
    color: Colors.subText,
  },

  // Images
  imageRow: {
    flexDirection: "row",
    marginTop: 12,
    gap: 10,
  },
  imageLabel: {
    fontSize: 12,
    color: Colors.subText,
    marginBottom: 4,
  },
  image: {
    width: "100%",
    height: 110,
    borderRadius: 10,
  },

  // Review
  reviewText: {
    marginTop: 10,
    color: Colors.subText,
    fontSize: 13,
  },
});
