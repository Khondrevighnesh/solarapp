import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  BackHandler,
  Modal,
  SafeAreaView,
  Dimensions,
  TextInput,
} from "react-native";

import { useLocalSearchParams, router, useFocusEffect } from "expo-router";
import { useCallback, useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../../context/AuthContext";

import Screen from "../../components/Screen";
import { Colors } from "../../theme/colors";
import { Theme } from "../../theme/theme";

const { width } = Dimensions.get("window");

const cards = [
  {
    title: "Generation",
    value: "520 kWh",
    icon: "flash",
    color: Colors.eco,
    route: "/dashboard/generation",
  },
  {
    title: "Cleaning",
    value: "18 / 24",
    icon: "water",
    color: Colors.accent,
    route: "/dashboard/cleaningcycle",
  },
  {
    title: "Reports",
    value: "12 Reports",
    icon: "document-text",
    color: Colors.primary,
    route: "/dashboard/reports",
  },
  {
    title: "Irradiation",
    value: "High",
    icon: "sunny",
    color: Colors.warning,
    route: "/dashboard/irradiation",
  },
  {
    title: "EPI",
    value: "0.92",
    icon: "stats-chart",
    color: Colors.info,
    route: "/dashboard/epi",
  },
  {
    title: "Plant Info",
    value: "View Details",
    icon: "information-circle",
    color: Colors.subText,
    route: "/dashboard/plant-details",
  },
];

export default function Cards() {
  const { plantId }: any = useLocalSearchParams();
  const { user, logout } = useAuth();

  const [search, setSearch] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifyOpen, setNotifyOpen] = useState(false);

  // 🔐 Auth Guard
  useEffect(() => {
    if (!user) router.replace("/(client-tabs)/dashboard");
  }, [user]);

  // 🔙 Back Button Handling
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        router.back();
        return true;
      };
      const sub = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress,
      );
      return () => sub.remove();
    }, []),
  );

  if (!user) return null;

  // 🔍 Filter cards based on search
  const filteredCards = cards.filter((card) =>
    card.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Screen backgroundColor={Colors.background}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          {/* ✨ PREMIUM HEADER */}
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <View style={styles.headerLeft}>
                <View style={styles.locationBadge}>
                  <Ionicons name="location" size={14} color={Colors.accent} />
                  <Text style={styles.locationText}>Pune, India</Text>
                </View>
                <Text style={styles.plantName}>Mudra Solar Plant</Text>
                <Text style={styles.plantStatus}>
                  Status: <Text style={styles.activeStatus}>Active</Text>
                </Text>
              </View>

              <View style={styles.headerActions}>
                <TouchableOpacity
                  style={styles.notificationBtn}
                  onPress={() => setNotifyOpen(true)}
                >
                  <Ionicons name="notifications" color="white" size={22} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.profileBtn}
                  onPress={() => setProfileOpen(true)}
                >
                  <Ionicons
                    name="person-circle"
                    color={Colors.surface}
                    size={28}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* 🔍 SEARCH BAR */}
            <View style={styles.searchContainer}>
              <Ionicons
                name="search"
                size={20}
                color={Colors.subText}
                style={styles.searchIcon}
              />
              <TextInput
                style={styles.searchInput}
                placeholder="Search features..."
                placeholderTextColor={Colors.subText}
                value={search}
                onChangeText={setSearch}
              />
            </View>
          </View>

          {/* 💡 KPI CARDS */}
          <View style={styles.kpiContainer}>
            <View style={styles.kpiCard}>
              <Ionicons name="flash" size={24} color={Colors.eco} />
              <View style={styles.kpiContent}>
                <Text style={styles.kpiLabel}>Today's Generation</Text>
                <Text style={styles.kpiValue}>18 kWh</Text>
                <Text style={styles.kpiSub}>↑ 12% from yesterday</Text>
              </View>
            </View>

            <View style={styles.kpiCard}>
              <Ionicons name="wallet" size={24} color={Colors.accent} />
              <View style={styles.kpiContent}>
                <Text style={styles.kpiLabel}>Savings</Text>
                <Text style={styles.kpiValue}>₹4160</Text>
                <Text style={styles.kpiSub}>This month</Text>
              </View>
            </View>
          </View>

          {/* 🗂️ FEATURE CARDS */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Plant Features</Text>
            <Text style={styles.sectionCount}>
              {filteredCards.length} items
            </Text>
          </View>

          <View style={styles.cardsContainer}>
            {filteredCards.map((card, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.featureCard,
                  {
                    backgroundColor:
                      index % 2 === 0 ? Colors.surface : Colors.surfaceAlt,
                  },
                ]}
                onPress={() => router.push(`${card.route}?plantId=${plantId}`)}
              >
                <View
                  style={[
                    styles.cardIcon,
                    { backgroundColor: `${card.color}20` },
                  ]}
                >
                  <Ionicons name={card.icon} size={24} color={card.color} />
                </View>

                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{card.title}</Text>
                  <Text style={[styles.cardValue, { color: card.color }]}>
                    {card.value}
                  </Text>
                </View>

                <Ionicons
                  name="chevron-forward"
                  size={24}
                  color={Colors.primary}
                  style={styles.cardChevron}
                />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* 👤 PROFILE MODAL */}
      <Modal transparent visible={profileOpen} animationType="slide">
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setProfileOpen(false)}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
            style={styles.bottomSheet}
          >
            <View style={styles.sheetHandle} />

            <View style={styles.profileHeader}>
              <View style={styles.avatarContainer}>
                <Ionicons name="person" size={48} color={Colors.primary} />
              </View>
              <Text style={styles.profileName}>{user.name || "User"}</Text>
              <Text style={styles.profileEmail}>{user.email}</Text>
            </View>

            <View style={styles.profileStats}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>3</Text>
                <Text style={styles.statLabel}>Plants</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>18k</Text>
                <Text style={styles.statLabel}>kWh/month</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>92%</Text>
                <Text style={styles.statLabel}>Efficiency</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.logoutBtn}
              onPress={() => {
                logout();
                setProfileOpen(false);
              }}
            >
              <Ionicons
                name="log-out-outline"
                size={20}
                color={Colors.danger}
              />
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

      {/* 🔔 NOTIFICATIONS MODAL */}
      <Modal transparent visible={notifyOpen} animationType="slide">
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setNotifyOpen(false)}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
            style={styles.bottomSheet}
          >
            <View style={styles.sheetHandle} />

            <View style={styles.notificationHeader}>
              <Text style={styles.notificationTitle}>Notifications</Text>
              <TouchableOpacity onPress={() => setNotifyOpen(false)}>
                <Text style={styles.doneButton}>Done</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.notificationContainer}>
              {[
                {
                  id: 1,
                  title: "Maintenance Alert",
                  message: "Plant needs cleaning tomorrow",
                  time: "2 hours ago",
                  icon: "construct",
                  color: Colors.accent,
                },
                {
                  id: 2,
                  title: "High Generation",
                  message: "5% above average today",
                  time: "5 hours ago",
                  icon: "trending-up",
                  color: Colors.eco,
                },
                {
                  id: 3,
                  title: "Performance Report",
                  message: "March report is ready",
                  time: "1 day ago",
                  icon: "document-text",
                  color: Colors.info,
                },
              ].map((item) => (
                <TouchableOpacity key={item.id} style={styles.notificationItem}>
                  <View
                    style={[
                      styles.notificationIcon,
                      { backgroundColor: `${item.color}20` },
                    ]}
                  >
                    <Ionicons name={item.icon} size={20} color={item.color} />
                  </View>
                  <View style={styles.notificationContent}>
                    <Text style={styles.notificationTitle}>{item.title}</Text>
                    <Text style={styles.notificationMessage}>
                      {item.message}
                    </Text>
                    <Text style={styles.notificationTime}>{item.time}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </Screen>
  );
}

const styles = {
  // Header Styles
  header: {
    backgroundColor: Colors.primary,
    paddingTop: 24,
    paddingBottom: 24,
    paddingHorizontal: 20,
    borderRadius: 25,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 6,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  headerLeft: {},
  locationBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.15)",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  locationText: {
    color: "white",
    fontSize: 12,
    marginLeft: 4,
    fontWeight: "500",
  },
  plantName: {
    color: "white",
    fontSize: 22,
    fontWeight: "700",
    marginTop: 8,
  },
  plantStatus: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 12,
    marginTop: 4,
  },
  activeStatus: {
    color: Colors.eco,
    fontWeight: "600",
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  notificationBtn: {
    backgroundColor: "rgba(255,255,255,0.15)",
    padding: 8,
    borderRadius: 20,
  },
  profileBtn: {
    backgroundColor: "rgba(255,255,255,0.15)",
    padding: 4,
    borderRadius: 20,
  },

  // Search Styles
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.surface,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: Colors.text,
    fontSize: 14,
  },

  // KPI Styles
  kpiContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 20,
    gap: 16,
  },
  kpiCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.borderLight,
    shadowColor: Colors.shadowSoft,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  kpiContent: {
    marginLeft: 12,
  },
  kpiLabel: {
    fontSize: 12,
    color: Colors.subText,
    fontWeight: "500",
  },
  kpiValue: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.text,
    marginTop: 2,
  },
  kpiSub: {
    fontSize: 10,
    color: Colors.subText,
    marginTop: 4,
  },

  // Section Header
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 24,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.text,
  },
  sectionCount: {
    fontSize: 13,
    color: Colors.subText,
    fontWeight: "500",
  },

  // Cards Container
  cardsContainer: {
    paddingHorizontal: 20,
  },

  // Feature Card Styles
  featureCard: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    shadowColor: Colors.shadowSoft,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 1,
  },
  cardIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  cardContent: {
    flex: 1,
    marginHorizontal: 14,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 4,
  },
  cardValue: {
    fontSize: 14,
    fontWeight: "600",
  },
  cardChevron: {
    opacity: 0.8,
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(11, 31, 59, 0.5)",
    justifyContent: "flex-end",
  },
  bottomSheet: {
    backgroundColor: Colors.surface,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 24,
    maxHeight: "85%",
  },
  sheetHandle: {
    width: 48,
    height: 5,
    backgroundColor: Colors.border,
    borderRadius: 3,
    alignSelf: "center",
    marginBottom: 24,
  },

  // Profile Modal Styles
  profileHeader: {
    alignItems: "center",
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primarySoft,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: Colors.subText,
    marginBottom: 24,
  },
  profileStats: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Colors.background,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.subText,
  },
  statDivider: {
    width: 1,
    backgroundColor: Colors.border,
  },
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.dangerSoft,
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.danger,
  },
  logoutText: {
    color: Colors.danger,
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 10,
  },

  // Notifications Modal Styles
  notificationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  notificationTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.text,
  },
  doneButton: {
    fontSize: 16,
    color: Colors.primary,
    fontWeight: "600",
  },
  notificationContainer: {
    marginTop: 8,
    maxHeight: 400,
  },
  notificationItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  notificationIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationMessage: {
    fontSize: 14,
    color: Colors.text,
    marginVertical: 4,
  },
  notificationTime: {
    fontSize: 12,
    color: Colors.subText,
    marginTop: 4,
  },
};
