import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  BackHandler,
  Modal,
} from "react-native";

import { useLocalSearchParams, router, useFocusEffect } from "expo-router";

import { useCallback, useState } from "react";
import { Ionicons } from "@expo/vector-icons";

import Screen from "../../components/Screen";
import { Colors } from "../../theme/colors";

/* 🌱 DUMMY USER (DB SIMULATION) */
const user = {
  name: "Vighnesh Khondre",
  email: "vighnesh@solar.com",
  phone: "9876543210",
};

/* 🌱 PLANT DATA */
const plant = {
  name: "Mudra Solar Plant",
  location: "Pune",
  status: "Active",

  today: 18,
  mtd: 520,
  efficiency: 92,
  savings: 4160,
};

/* 📊 CARDS */
const cards = [
  {
    title: "Generation",
    value: "520 kWh",
    progress: 75,
    icon: "flash",
    route: "/dashboard/generation",
  },
  {
    title: "Cleaning",
    value: "18 / 24",
    progress: 70,
    icon: "water",
    route: "/dashboard/cleaningcycle",
  },
  {
    title: "Reports",
    value: "12 Reports",
    progress: 100,
    icon: "document-text",
    route: "/dashboard/reports",
  },
  {
    title: "Irradiation",
    value: "High",
    progress: 85,
    icon: "sunny",
    route: "/dashboard/irradiation",
  },
  {
    title: "EPI",
    value: "0.92",
    progress: 92,
    icon: "stats-chart",
    route: "/dashboard/epi",
  },
  {
    title: "Plant Information",
    value: "Plant Information System",
    progress: 100,
    icon: "home-outline",
    route: "/dashboard/plant-details",
  },
];

export default function Cards() {
  const { plantId }: any = useLocalSearchParams();

  const [profileOpen, setProfileOpen] = useState(false);
  const [notifyOpen, setNotifyOpen] = useState(false);

  /* 🔙 BACK */
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        router.replace("/(client-tabs)/dashboard");
        return true;
      };

      const sub = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress,
      );

      return () => sub.remove();
    }, []),
  );

  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 🔝 HEADER */}
        <View
          style={{
            backgroundColor: Colors.primary,
            paddingTop: 40,
            paddingBottom: 30,
            paddingHorizontal: 16,
            borderBottomLeftRadius: 25,
            borderBottomRightRadius: 25,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            {/* LEFT */}
            <View>
              <Text
                style={{ color: "white", fontSize: 18, fontWeight: "bold" }}
              >
                📍 {plant.location}
              </Text>

              <Text
                style={{
                  color: "white",
                  fontSize: 18,
                  fontWeight: "bold",
                }}
              >
                {plant.name}
              </Text>

              <Text style={{ color: "#DCFCE7" }}>🟢 {plant.status}</Text>
            </View>

            {/* RIGHT */}
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity onPress={() => setProfileOpen(true)}>
                <Ionicons name="person-circle" size={40} color="white" />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setNotifyOpen(true)}>
                <Ionicons
                  name="notifications"
                  size={40}
                  color="white"
                  style={{ marginLeft: 10 }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* ⚡ KPI CARDS */}
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",

            marginTop: 10,
          }}
        >
          <KPI title="Today" value={`${plant.today} kWh`} />
          <KPI title="MTD" value={`${plant.mtd}`} />
          <KPI title="Eff." value={`${plant.efficiency}%`} />
          <KPI title="Saved" value={`₹${plant.savings}`} />
        </View>

        {/* 🔲 MAIN CARDS */}
        <View style={{ marginTop: 8 }}>
          {cards.map((card, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => router.push(`${card.route}?plantId=${plantId}`)}
              style={{
                backgroundColor: Colors.card,
                padding: 18,
                borderRadius: 18,
                marginBottom: 10,
                borderWidth: 1,
                borderColor: Colors.border,
              }}
            >
              {/* HEADER */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                  {card.title}
                </Text>

                <Ionicons name={card.icon} size={24} color={Colors.primary} />
              </View>

              {/* VALUE */}
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  marginTop: 10,
                  color: Colors.primary,
                }}
              >
                {card.value}
              </Text>

              {/* PROGRESS */}
              <View
                style={{
                  height: 8,
                  backgroundColor: "#E5E7EB",
                  borderRadius: 10,
                  marginTop: 10,
                }}
              >
                <View
                  style={{
                    width: `${card.progress}%`,
                    height: "100%",
                    backgroundColor: Colors.primary,
                    borderRadius: 10,
                  }}
                />
              </View>

              <Text
                style={{
                  fontSize: 12,
                  color: Colors.subText,
                  marginTop: 5,
                }}
              >
                {card.progress}% monthly progress
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* 👤 PROFILE MODAL */}
      <Modal transparent visible={profileOpen} animationType="fade">
        <CenterCard onClose={() => setProfileOpen(false)}>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>{user.name}</Text>
          <Text style={{ marginTop: 5 }}>{user.email}</Text>
          <Text>{user.phone}</Text>

          <TouchableOpacity
            onPress={() => router.replace("/home")}
            style={{
              marginTop: 12,
              backgroundColor: Colors.danger,
              padding: 10,
              borderRadius: 10,
            }}
          >
            <Text style={{ color: "white" }}>Logout</Text>
          </TouchableOpacity>
        </CenterCard>
      </Modal>

      {/* 🔔 NOTIFICATION MODAL */}
      <Modal transparent visible={notifyOpen} animationType="fade">
        <CenterCard onClose={() => setNotifyOpen(false)}>
          <Text style={{ fontWeight: "bold" }}>Notifications</Text>

          <Text style={{ marginTop: 8 }}>⚡ High generation today</Text>

          <Text>🧼 Cleaning due this week</Text>
        </CenterCard>
      </Modal>
    </Screen>
  );
}

/* KPI CARD */
const KPI = ({ title, value }: any) => (
  <View
    style={{
      width: "48%",
      backgroundColor: Colors.card,
      padding: 16,
      borderRadius: 16,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: Colors.border,
      alignItems: "center",
    }}
  >
    <Text style={{ color: Colors.subText }}>{title}</Text>
    <Text style={{ fontWeight: "bold", fontSize: 18, marginTop: 4 }}>
      {value}
    </Text>
  </View>
);

/* CENTER MODAL */
const CenterCard = ({ children, onClose }: any) => (
  <TouchableOpacity
    onPress={onClose}
    style={{
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.4)",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <View
      style={{
        width: "80%",
        backgroundColor: "white",
        padding: 20,
        borderRadius: 18,
      }}
    >
      {children}
    </View>
  </TouchableOpacity>
);
