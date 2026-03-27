import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  BackHandler,
  Modal,
} from "react-native";

import { useLocalSearchParams, router, useFocusEffect } from "expo-router";
import { useCallback, useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../../context/AuthContext";

import Screen from "../../components/Screen";
import { Colors } from "../../theme/colors";

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

/* ✅ ROUTES */
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
  const { user, logout } = useAuth();

  const [profileOpen, setProfileOpen] = useState(false);
  const [notifyOpen, setNotifyOpen] = useState(false);

  /* 🔐 AUTH GUARD (SAFE FIX) */
  useEffect(() => {
    if (!user || user.role !== "client") {
      router.replace("/(client-tabs)/dashboard"); // ✅ FIXED PATH
    }
  }, [user]);

  /* ✅ RESET MODALS (IMPORTANT FIX) */
  useFocusEffect(
    useCallback(() => {
      setProfileOpen(false);
      setNotifyOpen(false);
    }, []),
  );

  useEffect(() => {
    setProfileOpen(false);
    setNotifyOpen(false);
  }, [user]);

  /* 🔓 LOGOUT */
  const handleLogout = async () => {
    await logout();

    setProfileOpen(false);
    setNotifyOpen(false);

    router.replace("/(client-tabs)/dashboard"); // ✅ FIXED (NO STACK)
  };

  /* 🔙 BACK BUTTON */
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (user && user.plants && user.plants.length > 1) {
          router.replace("/(client-tabs)/dashboard"); // → plant list
        } else {
          router.replace("/(client-tabs)/dashboard"); // → dashboard
        }
        return true;
      };

      const sub = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress,
      );

      return () => sub.remove();
    }, [user]),
  );

  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <View>
              <Text style={styles.location}>📍 {plant.location}</Text>
              <Text style={styles.plantName}>{plant.name}</Text>
              <Text style={styles.status}>🟢 {plant.status}</Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity onPress={() => setProfileOpen(true)}>
                <Ionicons name="person-circle" size={42} color="white" />
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

        {/* KPI */}
        <View style={styles.kpiWrap}>
          <KPI title="Today" value={`${plant.today} kWh`} />
          <KPI title="MTD" value={`${plant.mtd}`} />
          <KPI title="Eff." value={`${plant.efficiency}%`} />
          <KPI title="Saved" value={`₹${plant.savings}`} />
        </View>

        {/* CARDS */}
        <View>
          {cards.map((card, i) => (
            <TouchableOpacity
              key={i}
              onPress={() =>
                router.push({
                  pathname: card.route,
                  params: { plantId },
                })
              }
              style={styles.card}
            >
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{card.title}</Text>
                <Ionicons name={card.icon} size={24} color={Colors.primary} />
              </View>

              <Text style={styles.cardValue}>{card.value}</Text>

              <View style={styles.progressBg}>
                <View
                  style={[styles.progressFill, { width: `${card.progress}%` }]}
                />
              </View>

              <Text style={styles.progressText}>
                {card.progress}% monthly progress
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* PROFILE */}
      <Modal transparent visible={profileOpen} animationType="fade">
        <CenterCard onClose={() => setProfileOpen(false)}>
          <View style={{ alignItems: "center" }}>
            <Ionicons name="person-circle" size={70} color={Colors.primary} />
            <Text style={styles.profileName}>{user?.name}</Text>
            <Text style={styles.profileSub}>{user?.email}</Text>
          </View>

          <View style={styles.divider} />

          <ProfileItem icon="flash" text="Solar Client" />
          <ProfileItem icon="stats-chart" text="Efficiency: 92%" />
          <ProfileItem icon="wallet" text="Savings ₹4160/month" />

          <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
            <Ionicons name="log-out-outline" size={18} color="#fff" />
            <Text style={{ color: "#fff", marginLeft: 6 }}>Logout</Text>
          </TouchableOpacity>
        </CenterCard>
      </Modal>

      {/* NOTIFICATION */}
      <Modal transparent visible={notifyOpen} animationType="fade">
        <CenterCard onClose={() => setNotifyOpen(false)}>
          <Text style={styles.notifyTitle}>Notifications 🔔</Text>

          <Notify icon="flash" text="High generation today (+20%)" />
          <Notify icon="water" text="Cleaning due this week" />
          <Notify icon="alert-circle" text="Performance drop detected" />
        </CenterCard>
      </Modal>
    </Screen>
  );
}

/* COMPONENTS */
const KPI = ({ title, value }: any) => (
  <View style={styles.kpi}>
    <Text style={styles.kpiTitle}>{title}</Text>
    <Text style={styles.kpiValue}>{value}</Text>
  </View>
);

const Notify = ({ icon, text }: any) => (
  <View style={styles.notifyCard}>
    <Ionicons name={icon} size={20} color={Colors.primary} />
    <Text style={styles.notifyText}>{text}</Text>
  </View>
);

const ProfileItem = ({ icon, text }: any) => (
  <View style={styles.profileRow}>
    <Ionicons name={icon} size={18} color={Colors.primary} />
    <Text style={styles.profileText}>{text}</Text>
  </View>
);

const CenterCard = ({ children, onClose }: any) => (
  <TouchableOpacity activeOpacity={1} onPress={onClose} style={styles.modalBg}>
    <TouchableOpacity activeOpacity={1} style={styles.modalCard}>
      {children}
    </TouchableOpacity>
  </TouchableOpacity>
);

/* STYLES */
const styles = {
  header: {
    backgroundColor: Colors.primary,
    paddingTop: 40,
    paddingBottom: 30,
    paddingHorizontal: 16,
    borderRadius: 25,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  location: { color: "white", fontSize: 16 },
  plantName: { color: "white", fontSize: 18, fontWeight: "bold" },
  status: { color: "#DCFCE7" },

  kpiWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 10,
  },

  kpi: {
    width: "48%",
    backgroundColor: Colors.card,
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    alignItems: "center",
  },
  kpiTitle: { color: Colors.subText },
  kpiValue: { fontWeight: "bold", fontSize: 18 },

  card: {
    backgroundColor: Colors.card,
    padding: 18,
    borderRadius: 18,
    marginBottom: 10,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardTitle: { fontWeight: "bold" },
  cardValue: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    color: Colors.primary,
  },

  progressBg: {
    height: 8,
    backgroundColor: "#E5E7EB",
    borderRadius: 10,
    marginTop: 10,
  },
  progressFill: {
    height: "100%",
    backgroundColor: Colors.primary,
    borderRadius: 10,
  },
  progressText: { fontSize: 12, color: Colors.subText },

  modalBg: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    padding: 20,
  },
  modalCard: {
    backgroundColor: Colors.card,
    padding: 20,
    borderRadius: 20,
  },

  profileName: { fontSize: 18, fontWeight: "bold", marginTop: 10 },
  profileSub: { color: Colors.subText },

  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 15,
  },

  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  profileText: { marginLeft: 10 },

  logoutBtn: {
    marginTop: 15,
    backgroundColor: Colors.danger,
    padding: 12,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
  },

  notifyTitle: { fontWeight: "bold", fontSize: 16 },

  notifyCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.background,
    padding: 12,
    borderRadius: 12,
    marginTop: 10,
  },
  notifyText: { marginLeft: 10 },
};
