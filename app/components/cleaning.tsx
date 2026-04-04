import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Animated, { FadeInDown } from "react-native-reanimated";

import Screen from "../components/Screen";
import { Colors } from "../theme/colors";

const { width } = Dimensions.get("window");

// ═══════════════════════════════════════
//  DATA
// ═══════════════════════════════════════
const benefits = [
  {
    title: "Efficiency Boost",
    desc: "Dust and bird droppings can block up to 30% of sunlight. Professional cleaning restores peak energy production instantly.",
    icon: "trending-up",
    color: Colors.eco,
    bg: Colors.ecoSoft,
  },
  {
    title: "Hotspot Prevention",
    desc: "Localized dirt causes uneven heating (hotspots), which can permanently damage solar cells. Regular cleaning extends panel life.",
    icon: "shield-checkmark",
    color: Colors.info,
    bg: Colors.infoSoft,
  },
];

const steps = [
  {
    label: "Phase 01",
    title: "Thermal Inspection",
    desc: "We use thermal sensors to detect cell damage before cleaning starts.",
    icon: "scan-outline",
  },
  {
    label: "Phase 02",
    title: "De-ionized Rinse",
    desc: "Standard tap water leaves mineral scales. We use purified water for a spot-free finish.",
    icon: "water-outline",
  },
  {
    label: "Phase 03",
    title: "Nylon Brush Scrub",
    desc: "Non-abrasive specialized solar brushes remove stubborn grime without scratching glass.",
    icon: "color-filter-outline",
  },
  {
    label: "Phase 04",
    title: "Post-Clean Audit",
    desc: "Final generation check to confirm the efficiency increase.",
    icon: "analytics",
  },
];

export default function CleaningService() {
  const router = useRouter();

  return (
    <Screen>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ═══ TOP HEADER ═══ */}
        <Animated.View entering={FadeInDown.delay(100)} style={styles.header}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>PREMIUM SERVICE</Text>
          </View>
          <Text style={styles.mainTitle}>Plant Cleaning</Text>
          <Text style={styles.mainSubtitle}>
            Specialized O&M cleaning to keep your solar plant performing at
            100%.
          </Text>
        </Animated.View>

        {/* ═══ VERTICAL BENEFITS ═══ */}
        <Text style={styles.sectionLabel}>Why Professional Cleaning?</Text>
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

        {/* ═══ VERTICAL PROCESS TIMELINE ═══ */}
        <View style={styles.processSection}>
          <Text style={styles.sectionLabel}>Our Cleaning Process</Text>

          <View style={styles.timelineContainer}>
            {/* The Vertical Line */}
            <View style={styles.verticalLine} />

            {steps.map((step, i) => (
              <Animated.View
                key={i}
                entering={FadeInDown.delay(400 + i * 100)}
                style={styles.stepRow}
              >
                <View style={styles.stepMarker}>
                  <View style={styles.dot}>
                    <View style={styles.innerDot} />
                  </View>
                </View>

                <View style={styles.stepContent}>
                  <Text style={styles.stepLabelText}>{step.label}</Text>
                  <Text style={styles.stepTitleText}>{step.title}</Text>
                  <Text style={styles.stepDescText}>{step.desc}</Text>
                </View>
              </Animated.View>
            ))}
          </View>
        </View>

        {/* ═══ PRICE CARD ═══ */}
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

// ═══════════════════════════════════════
//  STYLES
// ═══════════════════════════════════════
const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  header: {
    marginBottom: 30,
    alignItems: "flex-start",
  },
  badge: {
    backgroundColor: Colors.accentSoft,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "800",
    color: Colors.accent,
    letterSpacing: 1,
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: "800",
    color: Colors.primary,
    marginBottom: 8,
  },
  mainSubtitle: {
    fontSize: 15,
    color: Colors.subText,
    lineHeight: 22,
  },

  sectionLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: Colors.subText,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 16,
  },

  // Benefit Cards (Vertical Stack)
  benefitCard: {
    flexDirection: "row",
    backgroundColor: Colors.surface,
    padding: 20,
    borderRadius: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    alignItems: "flex-start",
    gap: 16,
  },
  iconBox: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  benefitInfo: {
    flex: 1,
  },
  benefitTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 6,
  },
  benefitDesc: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 20,
  },

  // Timeline Section
  processSection: {
    marginTop: 20,
    marginBottom: 30,
  },
  timelineContainer: {
    paddingLeft: 10,
    marginTop: 10,
  },
  verticalLine: {
    position: "absolute",
    left: 19,
    top: 10,
    bottom: 20,
    width: 2,
    backgroundColor: Colors.borderLight,
  },
  stepRow: {
    flexDirection: "row",
    marginBottom: 32,
    gap: 20,
  },
  stepMarker: {
    width: 20,
    alignItems: "center",
  },
  dot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.primarySoft,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
  innerDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
  },
  stepContent: {
    flex: 1,
    paddingTop: 0,
  },
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
  stepDescText: {
    fontSize: 13,
    color: Colors.subText,
    lineHeight: 19,
  },

  // Fixed Bottom-style CTA
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
