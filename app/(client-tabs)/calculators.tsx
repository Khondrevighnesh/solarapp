import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";

import Screen from "../components/Screen";
import { Colors } from "../theme/colors";

export default function Calculators() {
  const router = useRouter();

  const calculators = [
    {
      icon: "calculator",
      title: "Solar Savings",
      desc: "Calculate monthly & yearly bill reduction with solar",
      color: Colors.eco,
      bg: Colors.ecoSoft,
      route: "/calculators/savings",
      stats: "Save up to 90%",
    },
    {
      icon: "flash",
      title: "Plant Size",
      desc: "Find the right system capacity for your needs",
      color: Colors.accent,
      bg: Colors.accentSoft,
      route: "/calculators/plant-size",
      stats: "3kW - 10kW+",
    },
    {
      icon: "card",
      title: "Solar EMI",
      desc: "Check monthly loan EMI with low interest rates",
      color: Colors.info,
      bg: Colors.infoSoft,
      route: "/calculators/emi",
      stats: "6.5% interest",
    },
    {
      icon: "battery-charging",
      title: "Battery Backup",
      desc: "Calculate required battery storage for backup",
      color: "#9333EA",
      bg: "#F3E8FF",
      route: "/calculators/battery",
      stats: "2-10 hours",
    },
    {
      icon: "analytics",
      title: "Generation",
      desc: "Estimate monthly energy production in kWh",
      color: Colors.primary,
      bg: Colors.primarySoft,
      route: "/calculators/generation",
      stats: "1500 kWh/mo",
    },
    {
      icon: "home",
      title: "Rooftop Area",
      desc: "Check solar feasibility for your roof space",
      color: Colors.danger,
      bg: Colors.dangerSoft,
      route: "/calculators/rooftop",
      stats: "100-500 sqft",
    },
    {
      icon: "leaf",
      title: "CO₂ Reduction",
      desc: "Calculate your environmental impact with solar",
      color: Colors.eco,
      bg: Colors.ecoSoft,
      route: "/calculators/co2",
      stats: "5-15 tons/year",
    },
    {
      icon: "shield-checkmark",
      title: "AMC Cost",
      desc: "Estimate annual maintenance contract costs",
      color: Colors.info,
      bg: Colors.infoSoft,
      route: "/components/services",
    },
  ];

  return (
    <Screen>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ═══ HEADER ═══ */}
        <Animated.View entering={FadeInDown.delay(100)} style={styles.header}>
          <Text style={styles.headerTitle}>Solar Calculators</Text>
          <Text style={styles.headerSubtitle}>
            Plan your solar investment with accurate tools
          </Text>
        </Animated.View>

        {/* ═══ HERO BANNER ═══ */}
        <Animated.View
          entering={FadeInDown.delay(150)}
          style={styles.heroBanner}
        >
          <View style={styles.heroLeft}>
            <View style={styles.heroIconWrap}>
              <Ionicons name="sunny" size={32} color={Colors.accent} />
            </View>
          </View>
          <View style={styles.heroRight}>
            <Text style={styles.heroTitle}>Plan Smarter with Solar</Text>
            <Text style={styles.heroText}>
              Use our professional tools to estimate savings, system size, EMI,
              and more — completely free.
            </Text>
            <View style={styles.heroBadges}>
              <View style={styles.heroBadge}>
                <Ionicons
                  name="checkmark-circle"
                  size={12}
                  color={Colors.eco}
                />
                <Text style={styles.heroBadgeText}>100% Free</Text>
              </View>
              <View style={styles.heroBadge}>
                <Ionicons
                  name="checkmark-circle"
                  size={12}
                  color={Colors.eco}
                />
                <Text style={styles.heroBadgeText}>No Login Required</Text>
              </View>
            </View>
          </View>
        </Animated.View>

        {/* ═══ WHY USE SECTION ═══ */}
        <Animated.View entering={FadeInDown.delay(200)}>
          <Text style={styles.sectionTitle}>Why Use Our Tools?</Text>
          <View style={styles.whyCard}>
            {[
              { icon: "speedometer", text: "Instant accurate results" },
              { icon: "calculator", text: "Professional-grade calculations" },
              { icon: "school", text: "Learn while you calculate" },
              { icon: "wallet", text: "Plan your budget properly" },
            ].map((item, i) => (
              <View key={i} style={styles.whyItem}>
                <View style={styles.whyIconWrap}>
                  <Ionicons
                    name={item.icon as any}
                    size={16}
                    color={Colors.primary}
                  />
                </View>
                <Text style={styles.whyText}>{item.text}</Text>
              </View>
            ))}
          </View>
        </Animated.View>

        {/* ═══ CALCULATORS LIST ═══ */}
        <Animated.View entering={FadeInDown.delay(250)}>
          <Text style={styles.sectionTitle}>All Calculators</Text>
          <View style={styles.calcList}>
            {calculators.map((calc, i) => (
              <TouchableOpacity
                key={i}
                style={styles.calcCard}
                onPress={() => router.push(calc.route as any)}
                activeOpacity={0.7}
              >
                <View
                  style={[styles.calcIconWrap, { backgroundColor: calc.bg }]}
                >
                  <Ionicons
                    name={calc.icon as any}
                    size={24}
                    color={calc.color}
                  />
                </View>
                <View style={styles.calcInfo}>
                  <Text style={styles.calcTitle}>{calc.title}</Text>
                  <Text style={styles.calcDesc}>{calc.desc}</Text>
                </View>
                <View style={styles.calcRight}>
                  <Text style={[styles.calcStats, { color: calc.color }]}>
                    {calc.stats}
                  </Text>
                  <Ionicons
                    name="chevron-forward"
                    size={18}
                    color={Colors.subText}
                  />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>

        {/* ═══ POPULAR COMBO ═══ */}
        <Animated.View entering={FadeInDown.delay(300)}>
          <Text style={styles.sectionTitle}>Popular Combinations</Text>
          <View style={styles.comboGrid}>
            <TouchableOpacity
              style={styles.comboCard}
              onPress={() => router.push("/calculators/savings")}
            >
              <View style={styles.comboIcons}>
                <View
                  style={[
                    styles.comboIconSmall,
                    { backgroundColor: Colors.ecoSoft },
                  ]}
                >
                  <Ionicons name="calculator" size={16} color={Colors.eco} />
                </View>
                <View
                  style={[
                    styles.comboIconSmall,
                    { backgroundColor: Colors.infoSoft },
                  ]}
                >
                  <Ionicons name="cash" size={16} color={Colors.info} />
                </View>
              </View>
              <Text style={styles.comboTitle}>Savings + EMI</Text>
              <Text style={styles.comboDesc}>
                Calculate savings and financing together
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.comboCard}
              onPress={() => router.push("/calculators/plant-size")}
            >
              <View style={styles.comboIcons}>
                <View
                  style={[
                    styles.comboIconSmall,
                    { backgroundColor: Colors.accentSoft },
                  ]}
                >
                  <Ionicons name="flash" size={16} color={Colors.accent} />
                </View>
                <View
                  style={[
                    styles.comboIconSmall,
                    { backgroundColor: Colors.primarySoft },
                  ]}
                >
                  <Ionicons name="analytics" size={16} color={Colors.primary} />
                </View>
              </View>
              <Text style={styles.comboTitle}>Size + Generation</Text>
              <Text style={styles.comboDesc}>
                Find right size and output estimate
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* ═══ CTA SECTION ═══ */}
        <Animated.View
          entering={FadeInDown.delay(350)}
          style={styles.ctaSection}
        >
          <View style={styles.ctaCard}>
            <View style={styles.ctaIconWrap}>
              <Ionicons name="headset" size={28} color={Colors.primary} />
            </View>
            <Text style={styles.ctaTitle}>Need Expert Guidance?</Text>
            <Text style={styles.ctaText}>
              Our solar engineers analyze your electricity bill, roof space, and
              load requirement to design the best solution.
            </Text>
            <TouchableOpacity
              style={styles.ctaButton}
              onPress={() => router.push("/dashboard/register")}
            >
              <Text style={styles.ctaButtonText}>
                Request Free Consultation
              </Text>
            </TouchableOpacity>
            <Text style={styles.ctaNote}>
              ✓ No obligation • ✓ Free site visit
            </Text>
          </View>
        </Animated.View>

        {/* ═══ QUICK LINKS ═══ */}
        <Animated.View entering={FadeInDown.delay(400)}>
          <Text style={styles.sectionTitle}>Quick Links</Text>
          <View style={styles.quickLinks}>
            <TouchableOpacity
              style={styles.quickLink}
              onPress={() => router.push("/dashboard/register")}
            >
              <Ionicons name="grid" size={20} color={Colors.primary} />
              <Text style={styles.quickLinkText}>View O&M Services</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.quickLink}
              onPress={() => router.push("/schemes")}
            >
              <Ionicons name="gift" size={20} color={Colors.accent} />
              <Text style={styles.quickLinkText}>Govt Subsidies Available</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.quickLink}
              onPress={() => router.push("/(client-tabs)/document")}
            >
              <Ionicons name="help-circle" size={20} color={Colors.info} />
              <Text style={styles.quickLinkText}>Documents</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.quickLink}
              onPress={() => router.push("/dashboard/register")}
            >
              <Ionicons name="call" size={20} color={Colors.eco} />
              <Text style={styles.quickLinkText}>Contact Support</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </Screen>
  );
}

// ═══════════════════════════════════════
//  STYLES
// ═══════════════════════════════════════
const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },

  // Header
  header: {
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: Colors.text,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: Colors.subText,
  },

  // Hero Banner
  heroBanner: {
    flexDirection: "row",
    backgroundColor: Colors.accentSoft,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.accent,
    gap: 14,
  },
  heroLeft: {
    justifyContent: "center",
  },
  heroIconWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  heroRight: {
    flex: 1,
    justifyContent: "center",
  },
  heroTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 4,
  },
  heroText: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 18,
    marginBottom: 10,
  },
  heroBadges: {
    flexDirection: "row",
    gap: 12,
  },
  heroBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  heroBadgeText: {
    fontSize: 11,
    fontWeight: "600",
    color: Colors.eco,
  },

  // Section Title
  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 12,
  },

  // Why Card
  whyCard: {
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: 14,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  whyItem: {
    flexDirection: "row",
    alignItems: "center",
    width: "50%",
    paddingVertical: 6,
  },
  whyIconWrap: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: Colors.primarySoft,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  whyText: {
    fontSize: 12,
    fontWeight: "500",
    color: Colors.text,
    flex: 1,
  },

  // Calculator List
  calcList: {
    marginBottom: 20,
    gap: 10,
  },
  calcCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  calcIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  calcInfo: {
    flex: 1,
  },
  calcTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 2,
  },
  calcDesc: {
    fontSize: 12,
    color: Colors.subText,
    lineHeight: 16,
  },
  calcRight: {
    alignItems: "flex-end",
    gap: 4,
  },
  calcStats: {
    fontSize: 11,
    fontWeight: "700",
  },

  // Popular Combinations
  comboGrid: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },
  comboCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  comboIcons: {
    flexDirection: "row",
    gap: 6,
    marginBottom: 10,
  },
  comboIconSmall: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  comboTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 2,
  },
  comboDesc: {
    fontSize: 11,
    color: Colors.subText,
    lineHeight: 15,
  },

  // CTA Section
  ctaSection: {
    marginBottom: 20,
  },
  ctaCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 18,
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.border,
  },
  ctaIconWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primarySoft,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  ctaTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 6,
    textAlign: "center",
  },
  ctaText: {
    fontSize: 13,
    color: Colors.subText,
    textAlign: "center",
    lineHeight: 18,
    marginBottom: 14,
  },
  ctaButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 13,
    paddingHorizontal: 28,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  ctaButtonText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#fff",
  },
  ctaNote: {
    fontSize: 11,
    color: Colors.subText,
  },

  // Quick Links
  quickLinks: {
    backgroundColor: Colors.surface,
    borderRadius: 14,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 20,
  },
  quickLink: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  quickLinkText: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
    color: Colors.text,
    marginLeft: 12,
  },
});
