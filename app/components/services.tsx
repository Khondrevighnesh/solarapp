import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Animated, { FadeInDown, FadeInRight } from "react-native-reanimated";
import Screen from "../components/Screen";
import { Colors } from "../theme/colors";

const { width } = Dimensions.get("window");
// Card takes up 82% of screen width for a perfect peeking effect
const CARD_WIDTH = width * 0.82;
const CARD_MARGIN = 16;
const SNAP_INTERVAL = CARD_WIDTH + CARD_MARGIN;

// ═══════════════════════════════════════
//  DATA
// ═══════════════════════════════════════
const planFeatures = [
  { label: "Technician Access", key: "tech" },
  { label: "Admin Access", key: "admin" },
  { label: "Remote Support (Tech Call)", key: "remoteTech" },
  { label: "Remote Monitoring Support", key: "monitoring" },
  { label: "On-site Training", key: "training" },
  { label: "Post-Commissioning Access", key: "postComm" },
  { label: "Lead Access", key: "leads" },
  { label: "Warranty Claim Support", key: "warranty" },
  { label: "Solar Digilocker Access", key: "locker" },
];

const plans = [
  {
    name: "Basic Plan",
    price: "₹599",
    unit: "/kW/year",
    accentColor: Colors.textSecondary,
    bgHeader: Colors.surfaceAlt,
    features: {
      tech: true,
      admin: true,
      remoteTech: true,
      monitoring: true,
      training: true,
      locker: true,
    },
  },
  {
    name: "PV Protect",
    subtitle: "1-2 MW",
    price: "₹799",
    unit: "/kW/year",
    accentColor: Colors.info,
    bgHeader: Colors.infoSoft,
    features: {
      tech: true,
      admin: true,
      remoteTech: true,
      monitoring: true,
      training: true,
      leads: true,
      locker: true,
    },
  },
  {
    name: "PV Protect Pro",
    subtitle: "3-10 MW",
    price: "₹999",
    unit: "/kW/year",
    accentColor: Colors.eco,
    bgHeader: Colors.ecoSoft,
    isPopular: true,
    features: {
      tech: true,
      admin: true,
      remoteTech: true,
      monitoring: true,
      training: true,
      postComm: true,
      leads: true,
      warranty: true,
      locker: true,
    },
  },
];

// ═══════════════════════════════════════
//  PRICING SCREEN
// ═══════════════════════════════════════
export default function PricingScreen() {
  const router = useRouter();

  return (
    <Screen>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* ═══ HEADER ═══ */}
        <Animated.View entering={FadeInDown.delay(100)} style={styles.header}>
          <Text style={styles.title}>Choose Your Plan</Text>
          <Text style={styles.subtitle}>Smart B2B Solar Maintenance</Text>
        </Animated.View>

        {/* ═══ CAROUSEL ═══ */}
        <Animated.View entering={FadeInRight.delay(200)}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={SNAP_INTERVAL}
            decelerationRate="fast"
            contentContainerStyle={styles.scrollContent}
          >
            {plans.map((plan, index) => (
              <View
                key={index}
                style={[styles.card, plan.isPopular && styles.popularCard]}
              >
                {/* Popular Badge */}
                {plan.isPopular && (
                  <View style={styles.popularBadge}>
                    <Text style={styles.popularBadgeText}>RECOMMENDED</Text>
                  </View>
                )}

                {/* Card Header */}
                <View
                  style={[
                    styles.cardHeader,
                    { backgroundColor: plan.bgHeader },
                  ]}
                >
                  <View style={styles.planTitleRow}>
                    <Text
                      style={[styles.planName, { color: plan.accentColor }]}
                    >
                      {plan.name}
                    </Text>
                    {plan.subtitle && (
                      <View
                        style={[
                          styles.subtitleBadge,
                          { backgroundColor: `${plan.accentColor}20` },
                        ]}
                      >
                        <Text
                          style={[
                            styles.planSubtitle,
                            { color: plan.accentColor },
                          ]}
                        >
                          {plan.subtitle}
                        </Text>
                      </View>
                    )}
                  </View>

                  <View style={styles.priceContainer}>
                    <Text style={styles.priceText}>{plan.price}</Text>
                    <Text style={styles.unitText}>{plan.unit}</Text>
                  </View>
                </View>

                {/* Features List */}
                <View style={styles.featuresList}>
                  {planFeatures.map((f, i) => {
                    const isIncluded =
                      !!plan.features[f.key as keyof typeof plan.features];
                    return (
                      <View
                        key={i}
                        style={[
                          styles.featureRow,
                          !isIncluded && styles.featureRowDisabled,
                        ]}
                      >
                        <Ionicons
                          name={isIncluded ? "checkmark-circle" : "close"}
                          size={20}
                          color={isIncluded ? plan.accentColor : Colors.border}
                        />
                        <Text
                          style={[
                            styles.featureText,
                            !isIncluded && styles.featureTextDisabled,
                          ]}
                        >
                          {f.label}
                        </Text>
                      </View>
                    );
                  })}
                </View>

                {/* Select Button with Routing */}
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={[
                      styles.selectBtn,
                      {
                        backgroundColor: plan.isPopular
                          ? plan.accentColor
                          : Colors.surface,
                      },
                      !plan.isPopular && {
                        borderWidth: 1,
                        borderColor: plan.accentColor,
                      },
                    ]}
                    activeOpacity={0.8}
                    onPress={() => router.push("/dashboard/register")}
                  >
                    <Text
                      style={[
                        styles.selectBtnText,
                        { color: plan.isPopular ? "#fff" : plan.accentColor },
                      ]}
                    >
                      Get Started
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        </Animated.View>

        {/* ═══ BOTTOM TRUST INFO ═══ */}
        <Animated.View
          entering={FadeInDown.delay(300)}
          style={styles.bottomInfo}
        >
          <View style={styles.infoIconWrap}>
            <Ionicons
              name="shield-checkmark"
              size={24}
              color={Colors.primary}
            />
          </View>
          <View style={styles.infoTextWrap}>
            <Text style={styles.infoTitle}>Enterprise Grade Protection</Text>
            <Text style={styles.infoDesc}>
              MNRE Certified • 98% Uptime • Cancel Anytime
            </Text>
          </View>
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
  container: {
    paddingTop: 10,
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 26,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: Colors.primary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 15,
    color: Colors.subText,
    fontWeight: "500",
  },

  // ─── Carousel ───
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },

  // ─── Card ───
  card: {
    width: CARD_WIDTH,
    backgroundColor: Colors.surface,
    borderRadius: 24, // Softer, more modern corners
    marginRight: CARD_MARGIN,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    position: "relative",
    // Clean shadow
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 4,
    overflow: "hidden",
  },
  popularCard: {
    borderColor: Colors.eco,
    borderWidth: 1.5,
    transform: [{ scale: 1.0 }], // Slight pop
  },

  popularBadge: {
    position: "absolute",
    top: 0,
    right: 20,
    backgroundColor: Colors.eco,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    zIndex: 10,
  },
  popularBadgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.5,
  },

  // ─── Card Header ───
  cardHeader: {
    padding: 24,
    paddingTop: 30,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  planTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  planName: {
    fontSize: 20,
    fontWeight: "800",
  },
  subtitleBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  planSubtitle: {
    fontSize: 11,
    fontWeight: "700",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  priceText: {
    fontSize: 36,
    fontWeight: "800",
    color: Colors.text,
  },
  unitText: {
    fontSize: 13,
    color: Colors.subText,
    marginLeft: 4,
    fontWeight: "500",
  },

  // ─── Features ───
  featuresList: {
    padding: 26,
    paddingBottom: 16,
    gap: 16,
  },
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  featureRowDisabled: {
    opacity: 0.6,
  },
  featureText: {
    fontSize: 14,
    color: Colors.textSecondary,
    flex: 1,
    fontWeight: "500",
  },
  featureTextDisabled: {
    color: Colors.subText,
  },

  // ─── Button ───
  buttonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  selectBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
    borderRadius: 16, // Modern rounded button
  },
  selectBtnText: {
    fontWeight: "700",
    fontSize: 15,
  },

  // ─── Bottom Info ───
  bottomInfo: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.primarySoft,
    marginHorizontal: 20,
    marginTop: 10,
    padding: 16,
    borderRadius: 16,
    gap: 14,
  },
  infoIconWrap: {
    width: 48,
    height: 48,
    backgroundColor: "#fff",
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  infoTextWrap: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.primary,
    marginBottom: 2,
  },
  infoDesc: {
    fontSize: 12,
    color: Colors.subText,
  },
});
