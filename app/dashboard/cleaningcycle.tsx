import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";

import Screen from "../components/Screen";
import { Colors } from "../theme/colors";
import { Theme } from "../theme/theme";
import { GlobalStyles } from "../theme/globalStyles";

/* 🧼 DUMMY DATA */
const cleaningData = [
  {
    id: 1,
    date: "12 Mar 2026",
    technician: "Rahul Patil",
    status: "Completed",
    review: "Panels cleaned properly. Efficiency improved.",
    before: "https://via.placeholder.com/150/dirty",
    after: "https://via.placeholder.com/150/clean",
  },
  {
    id: 2,
    date: "25 Feb 2026",
    technician: "Amit Sharma",
    status: "Completed",
    review: "Dust removed. Good performance observed.",
    before: "https://via.placeholder.com/150/dirty",
    after: "https://via.placeholder.com/150/clean",
  },
  {
    id: 3,
    date: "10 Apr 2026",
    technician: "Scheduled",
    status: "Pending",
    review: "Upcoming cleaning cycle",
    before: null,
    after: null,
  },
];

export default function CleaningCycle() {
  const completed = cleaningData.filter((c) => c.status === "Completed").length;
  const total = 24;
  const pending = total - completed;

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
            Cleaning Cycle 🧼
          </Text>

          <Text style={{ color: "#DCFCE7" }}>Annual Maintenance Tracking</Text>
        </View>

        {/* 📊 OVERVIEW */}
        <View style={{ padding: 16 }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <KPI title="Total Cycles" value="24 / Year" />
            <KPI title="Completed" value={`${completed}`} />
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <KPI title="Pending" value={`${pending}`} />
            <KPI title="Next Cleaning" value="10 Apr" />
          </View>
        </View>

        {/* 📋 CLEANING HISTORY */}
        <View style={{ paddingHorizontal: 16 }}>
          <Text
            style={{
              fontSize: Theme.font.heading,
              fontWeight: "bold",
              marginBottom: 10,
            }}
          >
            Cleaning History
          </Text>

          {cleaningData.map((item) => (
            <View
              key={item.id}
              style={[GlobalStyles.card, { marginBottom: 14 }]}
            >
              {/* TOP ROW */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontWeight: "bold" }}>{item.date}</Text>

                <Text
                  style={{
                    color: item.status === "Completed" ? "green" : "orange",
                    fontWeight: "600",
                  }}
                >
                  {item.status}
                </Text>
              </View>

              {/* TECHNICIAN */}
              <Text style={{ marginTop: 6 }}>
                Technician: {item.technician}
              </Text>

              {/* PHOTOS */}
              {item.status === "Completed" && (
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 10,
                    gap: 10,
                  }}
                >
                  <View>
                    <Text style={{ fontSize: 12, color: Colors.subText }}>
                      Before
                    </Text>
                    <Image source={{ uri: item.before }} style={styles.image} />
                  </View>

                  <View>
                    <Text style={{ fontSize: 12, color: Colors.subText }}>
                      After
                    </Text>
                    <Image source={{ uri: item.after }} style={styles.image} />
                  </View>
                </View>
              )}

              {/* REVIEW */}
              <Text
                style={{
                  marginTop: 10,
                  color: Colors.subText,
                }}
              >
                {item.review}
              </Text>
            </View>
          ))}
        </View>

        <View style={{ height: 40 }} />
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
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 5,
      }}
    >
      {value}
    </Text>
  </View>
);

/* 🎨 STYLES */
const styles = {
  image: {
    width: 120,
    height: 90,
    borderRadius: 10,
    marginTop: 4,
  },
};
