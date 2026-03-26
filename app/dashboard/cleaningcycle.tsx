import { View, Text, ScrollView, Image, Dimensions } from "react-native";

import Screen from "../components/Screen";
import { Colors } from "../theme/colors";
import { Theme } from "../theme/theme";

const screenWidth = Dimensions.get("window").width;

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
        {/* 🔝 HEADER */}
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
            Cleaning Cycle 🧼
          </Text>

          <Text style={{ color: "#DCFCE7", marginTop: 4 }}>
            24 Cycles / Year Maintenance
          </Text>
        </View>

        {/* 📊 KPI + PROGRESS */}
        <View
          style={{
            marginTop: 10,
            backgroundColor: "white",
            borderBottomLeftRadius: 24,
            borderBottomRightRadius: 24,
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            padding: 16,
          }}
        >
          {/* KPI ROW */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <KPI title="Completed" value={completed} />
            <KPI title="Pending" value={total - completed} />
            <KPI title="Total" value={total} />
          </View>

          {/* 📈 PROGRESS BAR */}
          <View style={{ marginTop: 20 }}>
            <Text style={{ fontWeight: "600", marginBottom: 6 }}>
              Cleaning Progress
            </Text>

            <View
              style={{
                height: 12,
                backgroundColor: "#E5E7EB",
                borderRadius: 10,
                overflow: "hidden",
              }}
            >
              <View
                style={{
                  width: `${progress}%`,
                  backgroundColor: Colors.primary,
                  height: "100%",
                }}
              />
            </View>

            <Text
              style={{
                marginTop: 6,
                color: Colors.subText,
                fontSize: 12,
              }}
            >
              {completed} / {total} cycles completed
            </Text>
          </View>
        </View>

        {/* 📋 HISTORY */}
        <View
          style={{
            marginTop: 10,
          }}
        >
          <Text
            style={{
              fontSize: Theme.font.heading,
              fontWeight: "bold",
              marginBottom: 12,
            }}
          >
            Cleaning History
          </Text>

          {cleaningData.map((item) => (
            <View
              key={item.id}
              style={{
                backgroundColor: "white",
                padding: 16,
                borderRadius: 16,
                marginBottom: 14,
                borderWidth: 1,
                borderColor: "#E2E8F0",
              }}
            >
              {/* HEADER ROW */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontWeight: "bold" }}>{item.date}</Text>

                <Text
                  style={{
                    color: item.status === "Completed" ? "#16A34A" : "#F59E0B",
                    fontWeight: "600",
                  }}
                >
                  {item.status}
                </Text>
              </View>

              {/* TECH */}
              <Text style={{ marginTop: 6, color: Colors.subText }}>
                👨‍🔧 {item.technician}
              </Text>

              {/* IMAGES */}
              {item.status === "Completed" && (
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 12,
                    gap: 10,
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <Text style={label}>Before</Text>
                    <Image source={{ uri: item.before }} style={styles.image} />
                  </View>

                  <View style={{ flex: 1 }}>
                    <Text style={label}>After</Text>
                    <Image source={{ uri: item.after }} style={styles.image} />
                  </View>
                </View>
              )}

              {/* REVIEW */}
              <Text
                style={{
                  marginTop: 10,
                  color: Colors.subText,
                  fontSize: 13,
                }}
              >
                {item.review}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </Screen>
  );
}

/* KPI CARD */
const KPI = ({ title, value }: any) => (
  <View
    style={{
      width: "30%",
      backgroundColor: "#F8FAFC",
      padding: 12,
      borderRadius: 14,
      alignItems: "center",
    }}
  >
    <Text style={{ color: "#64748B", fontSize: 12 }}>{title}</Text>

    <Text
      style={{
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 4,
      }}
    >
      {value}
    </Text>
  </View>
);

/* STYLES */
const label = {
  fontSize: 12,
  color: "#64748B",
  marginBottom: 4,
};

const styles = {
  image: {
    width: "100%", // ✅ FIX overflow
    height: 110,
    borderRadius: 10,
  },
};
