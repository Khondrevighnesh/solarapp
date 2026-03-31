import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  BackHandler,
  TextInput,
  Modal,
  SafeAreaView,
  StyleSheet,
  Dimensions,
} from "react-native";

import { router, useFocusEffect } from "expo-router";
import { useCallback, useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInDown } from "react-native-reanimated";

import Screen from "../../components/Screen";
import { Colors } from "../../theme/colors";
import { Theme } from "../../theme/theme";
import { GlobalStyles } from "../../theme/globalStyles";
import { useAuth } from "../../../context/AuthContext";

const { width } = Dimensions.get("window");

export default function Plants() {
  const { user, logout } = useAuth();

  const [search, setSearch] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifyOpen, setNotifyOpen] = useState(false);

  /* 🔐 AUTH GUARD */
  useEffect(() => {
    if (!user) router.replace("/(client-tabs)/dashboard");
  }, [user]);

  /* 🔙 BACK FLOW */
  useFocusEffect(
    useCallback(() => {
      const handleBackPress = () => {
        router.replace("/(client-tabs)/home");
        return true;
      };
      const sub = BackHandler.addEventListener(
        "hardwareBackPress",
        handleBackPress,
      );
      return () => sub.remove();
    }, []),
  );

  if (!user) return null;

  /* 🔍 FILTER */
  const filteredPlants = user.plants?.filter((p: any) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Screen backgroundColor={Colors.background}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 40,
            paddingTop: 8,
          }}
        >
          {/* ✨ PREMIUM HEADER — Home Style */}
          <Animated.View entering={FadeInDown.delay(100)} style={styles.header}>
            <View style={styles.headerLeft}>
              <Text style={styles.greeting}>
                Good {new Date().getHours() < 12 ? "Morning" : "Afternoon"}
              </Text>
              <Text style={styles.userName}>{user.name} 👋</Text>
            </View>
            <View style={{ flexDirection: "row", gap: 12 }}>
              <TouchableOpacity
                onPress={() => setNotifyOpen(true)}
                style={styles.iconBtn}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Ionicons
                  name="notifications-outline"
                  size={24}
                  color={Colors.primary}
                />
                <View style={styles.notifDot} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setProfileOpen(true)}
                style={styles.iconBtn}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Ionicons
                  name="person-circle-outline"
                  size={32}
                  color={Colors.primary}
                />
              </TouchableOpacity>
            </View>
          </Animated.View>

          {/* 📍 LOCATION ROW — Home Style */}
          <Animated.View
            entering={FadeInDown.delay(150)}
            style={styles.locationRow}
          >
            <View style={styles.locationBadge}>
              <Ionicons
                name="location"
                size={14}
                color={Colors.accent}
                style={{ marginRight: 4 }}
              />
              <Text style={styles.locationText}>India</Text>
            </View>
            <Text style={styles.locationSub}>Select your plant</Text>
          </Animated.View>

          {/* 🔍 SEARCH SECTION — Moved Out of Header, Premium Card */}
          <Animated.View
            entering={FadeInDown.delay(200)}
            style={styles.searchSection}
          >
            <View style={styles.searchContainer}>
              <Ionicons
                name="search"
                size={20}
                color={Colors.subText}
                style={{ marginRight: 10 }}
              />
              <TextInput
                placeholder="Search your plants..."
                placeholderTextColor={Colors.subText}
                value={search}
                onChangeText={setSearch}
                style={styles.searchInput}
                autoCorrect={false}
                autoCapitalize="none"
              />
              {search.length > 0 && (
                <TouchableOpacity
                  onPress={() => setSearch("")}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <Ionicons
                    name="close-circle"
                    size={20}
                    color={Colors.subText}
                  />
                </TouchableOpacity>
              )}
            </View>
          </Animated.View>

          {/* 🌱 PLANTS LIST — Premium Cards */}
          <Animated.View
            entering={FadeInDown.delay(250)}
            style={styles.listSection}
          >
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Your Plants</Text>
              <Text style={styles.sectionCount}>
                {filteredPlants?.length || 0} total
              </Text>
            </View>

            {filteredPlants?.length === 0 ? (
              /* ✨ Premium Empty State */
              <View style={styles.emptyCard}>
                <View style={styles.emptyIconWrap}>
                  <Ionicons name="leaf-outline" size={40} color={Colors.eco} />
                </View>
                <Text style={styles.emptyTitle}>No plants found</Text>
                <Text style={styles.emptySub}>
                  Try adjusting your search or add a new plant.
                </Text>
              </View>
            ) : (
              filteredPlants?.map((p: any, index: number) => (
                <TouchableOpacity
                  key={p.id}
                  activeOpacity={0.8}
                  style={[
                    styles.plantCard,
                    {
                      backgroundColor:
                        index % 2 === 0 ? Colors.surface : Colors.surfaceAlt,
                    },
                  ]}
                  onPress={() =>
                    router.push({
                      pathname: "/plants/cards",
                      params: { plantId: p.id },
                    })
                  }
                >
                  {/* Left Icon */}
                  <View style={styles.plantIconWrap}>
                    <Ionicons
                      name="home-outline"
                      size={26}
                      color={Colors.eco}
                    />
                  </View>

                  {/* Center Content */}
                  <View style={styles.plantInfo}>
                    <View style={styles.plantHeaderRow}>
                      <Text style={styles.plantName}>{p.name}</Text>
                      <View style={styles.statusDot}>
                        <View style={styles.dot} />
                        <Text style={styles.statusText}>Active</Text>
                      </View>
                    </View>
                    <View style={styles.plantStats}>
                      <Ionicons
                        name="flash"
                        size={14}
                        color={Colors.accent}
                        style={{ marginRight: 4 }}
                      />
                      <Text style={styles.plantKwh}>{p.today} kWh</Text>
                      <Text style={styles.plantSub}>today</Text>
                    </View>
                  </View>

                  {/* Right Chevron */}
                  <View style={styles.chevronWrap}>
                    <Ionicons
                      name="chevron-forward"
                      size={20}
                      color={Colors.primary}
                    />
                  </View>
                </TouchableOpacity>
              ))
            )}
          </Animated.View>
        </ScrollView>
      </SafeAreaView>

      {/* 👤 PROFILE MODAL — Bottom Sheet (Fully Visible & Fixed) */}
      <Modal
        transparent
        visible={profileOpen}
        animationType="slide"
        onRequestClose={() => setProfileOpen(false)} // ✅ Android back button
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setProfileOpen(false)} // ✅ Tap outside to close
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {}} // ✅ Prevent tap from closing when inside
            style={styles.bottomSheet}
          >
            {/* Handle Bar */}
            <View style={styles.handleBar} />

            {/* Close Button (Top Right) */}
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => setProfileOpen(false)}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons name="close" size={22} color={Colors.subText} />
            </TouchableOpacity>

            {/* Scrollable Content */}
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 20 }}
            >
              <View style={styles.sheetContent}>
                {/* Profile Header */}
                <View style={styles.profileHeader}>
                  <View style={styles.avatarWrap}>
                    <Ionicons name="person" size={44} color={Colors.primary} />
                  </View>
                  <Text style={styles.profileName}>{user.name}</Text>
                  <Text style={styles.profileEmail}>{user.email}</Text>

                  {/* Quick Stats */}
                  <View style={styles.statsRow}>
                    <View style={styles.statBox}>
                      <Text style={styles.statValue}>
                        {user.plants?.length || 0}
                      </Text>
                      <Text style={styles.statLabel}>Plants</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statBox}>
                      <Text style={styles.statValue}>
                        {user.plants
                          ?.reduce(
                            (a: number, b: any) =>
                              a + (parseFloat(b.today) || 0),
                            0,
                          )
                          .toFixed(1)}
                      </Text>
                      <Text style={styles.statLabel}>Total kWh</Text>
                    </View>
                  </View>
                </View>

                {/* Logout */}
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
                    style={{ marginRight: 8 }}
                  />
                  <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

      {/* 🔔 NOTIFICATIONS MODAL — Bottom Sheet (Fully Visible & Fixed) */}
      <Modal
        transparent
        visible={notifyOpen}
        animationType="slide"
        onRequestClose={() => setNotifyOpen(false)} // ✅ Android back button
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setNotifyOpen(false)} // ✅ Tap outside to close
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {}} // ✅ Prevent tap from closing when inside
            style={styles.bottomSheet}
          >
            {/* Handle Bar */}
            <View style={styles.handleBar} />

            {/* Header with Done Button */}
            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle}>Notifications</Text>
              <TouchableOpacity onPress={() => setNotifyOpen(false)}>
                <Text style={styles.sheetDone}>Done</Text>
              </TouchableOpacity>
            </View>

            {/* Scrollable Notifications */}
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 20 }}
            >
              {[
                {
                  type: "high",
                  title: "High generation today",
                  sub: "Plant A exceeded target by 24%",
                  color: Colors.eco,
                  icon: "trending-up",
                },
                {
                  type: "clean",
                  title: "Cleaning scheduled",
                  sub: "Due in 2 days for optimal efficiency",
                  color: Colors.accent,
                  icon: "brush",
                },
                {
                  type: "alert",
                  title: "Performance drop",
                  sub: "Plant C showing 12% lower output",
                  color: Colors.danger,
                  icon: "alert-circle",
                },
              ].map((notif, i) => (
                <View key={i} style={styles.notifCard}>
                  <View
                    style={[
                      styles.notifIconWrap,
                      { backgroundColor: notif.color + "20" },
                    ]}
                  >
                    <Ionicons
                      name={`${notif.icon}-outline`}
                      size={22}
                      color={notif.color}
                    />
                  </View>
                  <View style={styles.notifInfo}>
                    <Text style={styles.notifTitle}>{notif.title}</Text>
                    <Text style={styles.notifSub}>{notif.sub}</Text>
                  </View>
                  <View style={styles.notifBadge} />
                </View>
              ))}
            </ScrollView>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </Screen>
  );
}

// ═══════════════════════════════════════
//  STYLES — Premium & Clean
// ═══════════════════════════════════════
const styles = StyleSheet.create({
  // ─── Header ───
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  headerLeft: {
    flex: 1,
  },
  greeting: {
    fontSize: 13,
    color: Colors.subText,
    marginBottom: 2,
    fontWeight: "500",
  },
  userName: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.text,
    letterSpacing: -0.5,
  },
  iconBtn: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: Colors.primarySoft,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
  notifDot: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.accent,
  },

  // ─── Location ───
  locationRow: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  locationBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.accentSoft,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 20,
    alignSelf: "flex-start",
    marginBottom: 4,
  },
  locationText: {
    fontSize: 12,
    fontWeight: "600",
    color: Colors.accent,
  },
  locationSub: {
    fontSize: 13,
    color: Colors.subText,
  },

  // ─── Search Section ───
  searchSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  searchContainer: {
    backgroundColor: Colors.surface,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: Colors.shadowSoft,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  searchInput: {
    flex: 1,
    fontSize: Theme.font.body,
    color: Colors.text,
    marginLeft: 4,
  },

  // ─── List Section ───
  listSection: {
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
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

  // ─── Plant Card ───
  plantCard: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    shadowColor: Colors.shadowSoft,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 1,
  },
  plantIconWrap: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: Colors.ecoSoft,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  plantInfo: {
    flex: 1,
  },
  plantHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  plantName: {
    fontSize: Theme.font.title,
    fontWeight: "700",
    color: Colors.text,
    marginRight: 8,
  },
  statusDot: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.ecoSoft,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 20,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.eco,
    marginRight: 4,
  },
  statusText: {
    fontSize: 11,
    fontWeight: "600",
    color: Colors.eco,
  },
  plantStats: {
    flexDirection: "row",
    alignItems: "center",
  },
  plantKwh: {
    fontSize: Theme.font.title,
    fontWeight: "800",
    color: Colors.eco,
    marginRight: 4,
  },
  plantSub: {
    fontSize: 12,
    color: Colors.subText,
  },
  chevronWrap: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: Colors.primarySoft,
    alignItems: "center",
    justifyContent: "center",
  },

  // ─── Empty State ───
  emptyCard: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    paddingVertical: 40,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  emptyIconWrap: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.ecoSoft,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: Theme.font.title,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 6,
  },
  emptySub: {
    fontSize: Theme.font.body,
    color: Colors.subText,
    textAlign: "center",
    paddingHorizontal: 20,
  },

  // ─── Modals ───
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(11, 31, 59, 0.45)",
    justifyContent: "flex-end", // ✅ Forces sheet to bottom
  },
  bottomSheet: {
    backgroundColor: Colors.surface,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingTop: 12,
    paddingHorizontal: 24,
    maxHeight: "90%", // ✅ Increased for full visibility
    // No paddingBottom — ScrollView handles it
  },
  handleBar: {
    width: 48,
    height: 5,
    backgroundColor: Colors.border,
    borderRadius: 3,
    alignSelf: "center",
    marginBottom: 18,
  },
  closeBtn: {
    position: "absolute",
    top: 16,
    right: 20,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.surfaceAlt,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  sheetContent: {
    flex: 1,
  },
  sheetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },
  sheetTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.text,
  },
  sheetDone: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.primary,
  },

  // ─── Profile Sheet ───
  profileHeader: {
    alignItems: "center",
    marginBottom: 24,
  },
  avatarWrap: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: Colors.primarySoft,
    borderWidth: 3,
    borderColor: Colors.surface,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  profileName: {
    fontSize: Theme.font.title + 2,
    fontWeight: "700",
    color: Colors.text,
  },
  profileEmail: {
    fontSize: Theme.font.body,
    color: Colors.subText,
    marginTop: 4,
  },
  statsRow: {
    flexDirection: "row",
    gap: 24,
    marginTop: 18,
  },
  statBox: {
    alignItems: "center",
  },
  statValue: {
    fontSize: Theme.font.title,
    fontWeight: "800",
    color: Colors.eco,
  },
  statLabel: {
    fontSize: 11,
    color: Colors.subText,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    backgroundColor: Colors.border,
  },
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 14,
    backgroundColor: Colors.dangerSoft,
    borderWidth: 1,
    borderColor: Colors.danger,
  },
  logoutText: {
    color: Colors.danger,
    fontSize: Theme.font.body,
    fontWeight: "600",
  },

  // ─── Notifications Sheet ───
  notifCard: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: Colors.surfaceAlt,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  notifIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  notifInfo: {
    flex: 1,
  },
  notifTitle: {
    fontSize: Theme.font.body,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 2,
  },
  notifSub: {
    fontSize: Theme.font.caption,
    color: Colors.subText,
    lineHeight: 18,
  },
  notifBadge: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.accent,
    alignSelf: "center",
  },
});
