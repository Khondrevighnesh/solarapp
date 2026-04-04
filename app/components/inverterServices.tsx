import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Animated, { FadeInDown } from "react-native-reanimated";
import Screen from "../components/Screen";
import { Colors } from "../theme/colors";

// ... [Imports same as above]

const benefits = [
  {
    title: "Peak Conversion",
    desc: "Dirty filters cause overheating. we keep your inverter cool and efficient.",
    icon: "thermometer",
    color: Colors.warning,
    bg: Colors.warningSoft,
  },
  {
    title: "Fire Prevention",
    desc: "Loose DC connections are dangerous. Our torque-checks eliminate risk.",
    icon: "flame-outline",
    color: Colors.error,
    bg: Colors.errorSoft,
  },
];

const steps = [
  {
    label: "Phase 01",
    title: "Internal Cleaning",
    desc: "Removing dust from heat sinks and internal fans.",
    icon: "leaf-outline",
  },
  {
    label: "Phase 02",
    title: "Terminal Torque",
    desc: "Tightening all connections to manufacturer specs.",
    icon: "hammer-outline",
  },
  {
    label: "Phase 03",
    title: "Firmware Update",
    desc: "Installing the latest safety and performance code.",
    icon: "code-working-outline",
  },
  {
    label: "Phase 04",
    title: "Load Testing",
    desc: "Stress testing at peak sun hours for stability.",
    icon: "flash-outline",
  },
];

export default function InverterScreen() {
  const router = useRouter();
  return (
    <Screen>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View entering={FadeInDown.delay(100)} style={styles.header}>
          <View style={[styles.badge, { backgroundColor: Colors.warningSoft }]}>
            <Text style={[styles.badgeText, { color: Colors.warning }]}>
              EXPERT SERVICE
            </Text>
          </View>
          <Text style={styles.mainTitle}>Inverter Service</Text>
          <Text style={styles.mainSubtitle}>
            Specialized maintenance for the heart of your solar plant.
          </Text>
        </Animated.View>

        {benefits.map((item, i) => (
          <Animated.View
            key={i}
            entering={FadeInDown.delay(200 + i * 100)}
            style={styles.benefitCard}
          >
            <View style={[styles.iconBox, { backgroundColor: item.bg }]}>
              <Ionicons name={item.icon as any} size={28} color={item.color} />
            </View>
            <View style={styles.benefitInfo}>
              <Text style={styles.benefitTitle}>{item.title}</Text>
              <Text style={styles.benefitDesc}>{item.desc}</Text>
            </View>
          </Animated.View>
        ))}

        <View style={styles.processSection}>
          <Text style={styles.sectionLabel}>Service Steps</Text>
          <View style={styles.timelineContainer}>
            <View style={styles.verticalLine} />
            {steps.map((step, i) => (
              <View key={i} style={styles.stepRow}>
                <View style={styles.stepMarker}>
                  <View style={styles.dot} />
                </View>
                <View style={styles.stepContent}>
                  <Text style={styles.stepLabelText}>{step.label}</Text>
                  <Text style={styles.stepTitleText}>{step.title}</Text>
                  <Text style={styles.stepDescText}>{step.desc}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* CUSTOM QUOTE CARD (Replaces Price Card) */}
        <Animated.View
          entering={FadeInDown.delay(700)}
          style={styles.quoteCard}
        >
          <View style={styles.quoteTextContainer}>
            <Text style={styles.quoteLabel}>Custom Pricing</Text>
            <Text style={styles.quoteTitle}>Request a Quote</Text>
            <Text style={styles.quoteDesc}>
              Based on your plant capacity (kW/MW)
            </Text>
          </View>

          <TouchableOpacity
            style={styles.quoteBtn}
            onPress={() => router.push("/dashboard/register")}
          >
            <Text style={styles.quoteBtnText}>Get Started</Text>
            <Ionicons name="chevron-forward" size={16} color="#fff" />
          </TouchableOpacity>
        </Animated.View>
        <View style={{ height: 40 }} />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scrollContent: { paddingHorizontal: 20, paddingTop: 10 },
  header: { marginBottom: 30 },
  badge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 12,
    alignSelf: "flex-start",
  },
  badgeText: { fontSize: 10, fontWeight: "800", letterSpacing: 1 },
  mainTitle: {
    fontSize: 32,
    fontWeight: "800",
    color: Colors.primary,
    marginBottom: 8,
  },
  mainSubtitle: { fontSize: 15, color: Colors.subText, lineHeight: 22 },
  benefitCard: {
    flexDirection: "row",
    backgroundColor: Colors.surface,
    padding: 20,
    borderRadius: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    gap: 16,
  },
  iconBox: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  benefitInfo: { flex: 1 },
  benefitTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 6,
  },
  benefitDesc: { fontSize: 13, color: Colors.textSecondary, lineHeight: 20 },
  processSection: { marginTop: 20, marginBottom: 30 },
  sectionLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: Colors.subText,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 20,
  },
  timelineContainer: { paddingLeft: 10 },
  verticalLine: {
    position: "absolute",
    left: 19,
    top: 10,
    bottom: 20,
    width: 2,
    backgroundColor: Colors.borderLight,
  },
  stepRow: { flexDirection: "row", marginBottom: 32, gap: 20 },
  stepMarker: { width: 20, alignItems: "center" },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: Colors.primary,
    zIndex: 2,
    borderWidth: 3,
    borderColor: Colors.surfaceAlt,
  },
  stepContent: { flex: 1 },
  stepLabelText: {
    fontSize: 11,
    fontWeight: "800",
    color: Colors.primary,
    marginBottom: 2,
  },
  stepTitleText: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 4,
  },
  stepDescText: { fontSize: 13, color: Colors.subText, lineHeight: 19 },

  // PRICE CARD WITH GET STARTED BTN
  quoteCard: {
    flexDirection: "row",
    backgroundColor: Colors.surface, // Clean white/light surface
    padding: 24,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: Colors.borderLight,
    // Soft professional shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 5,
    marginTop: 20,
  },
  quoteTextContainer: {
    flex: 1,
    paddingRight: 10,
  },
  quoteLabel: {
    fontSize: 11,
    fontWeight: "800",
    color: Colors.eco, // Or Colors.info depending on the page
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 4,
  },
  quoteTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: Colors.text,
    marginBottom: 2,
  },
  quoteDesc: {
    fontSize: 12,
    color: Colors.subText,
    fontWeight: "500",
  },
  quoteBtn: {
    backgroundColor: Colors.primary, // Dark professional button
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  quoteBtnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },
});
