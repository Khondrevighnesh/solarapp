import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as Location from "expo-location";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";

import Screen from "../components/Screen";
import { Colors } from "../theme/colors";
import { useAuth } from "../../context/AuthContext";

const { width } = Dimensions.get("window");

// ═══════════════════════════════════════
//  HELPERS
// ═══════════════════════════════════════
const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
};

const getGreetingIcon = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "sunny";
  if (hour < 17) return "partly-sunny";
  return "moon";
};

// Static Data
const trustBadges = [
  { icon: "shield-checkmark", label: "MNRE Certified" },
  { icon: "business", label: "500+ Plants" },
  { icon: "star", label: "4.8★ Rating" },
];

const processSteps = [
  { step: "1", title: "Calculate", desc: "See savings" },
  { step: "2", title: "Register", desc: "Free account" },
  { step: "3", title: "Upgrade", desc: "Choose plan" },
  { step: "4", title: "Relax", desc: "We handle it" },
];

const quickActions = [
  {
    icon: "calculator",
    label: "Calculator",
    color: Colors.eco,
    bg: Colors.ecoSoft,
    route: "/calculators",
  },
  {
    icon: "school",
    label: "Learn Solar",
    color: Colors.info,
    bg: Colors.infoSoft,
    route: "/schemes",
  },
  {
    icon: "grid",
    label: "Document",
    color: Colors.accent,
    bg: Colors.accentSoft,
    route: "/document",
  },
  {
    icon: "chatbubbles",
    label: "Support",
    color: Colors.primary,
    bg: Colors.primarySoft,
    route: "/dashboard/register",
  },
];

const todayTip = {
  title: "Did you know?",
  tip: "Cleaning your solar panels can increase energy output by up to 25%.",
  icon: "bulb",
};

const services = [
  {
    icon: "water",
    title: "Panel Cleaning",
    desc: "Deep clean to restore efficiency",

    bg: Colors.warningSoft,
    color: Colors.warning,
    route: "/components/services",
  },
  {
    icon: "construct",
    title: "AMC Plan",
    desc: "Full annual maintenance coverage",

    bg: Colors.infoSoft,
    color: Colors.info,
    route: "/components/services",
  },
  {
    icon: "pulse",
    title: "Live Monitoring",
    desc: "24/7 real-time performance tracking",

    bg: Colors.ecoSoft,
    color: Colors.eco,
    route: "/components/services",
  },
  {
    icon: "flash",
    title: "Inverter Service",
    desc: "Expert diagnosis & replacement",

    bg: Colors.accentSoft,
    color: Colors.accent,
    route: "/components/services",
  },

  {
    icon: "file-tray",
    title: "Annual Audit",
    desc: "Complete system health checkup",

    bg: Colors.primarySoft,
    color: Colors.primary,
    route: "/components/services",
  },
];

const faqData = [
  {
    q: "How accurate is the savings calculator?",
    a: "Our calculator uses industry-standard efficiency rates (18-22%). Actual savings may vary based on location and panel orientation.",
  },
  {
    q: "What happens if I don't maintain my solar panels?",
    a: "Dust and debris can reduce efficiency by 15-30%. Our O&M service ensures peak performance year-round.",
  },
  {
    q: "Do I need O&M if my panels are new?",
    a: "Yes! Even new installations benefit from monitoring and periodic cleaning. Prevention is cheaper than repair.",
  },
  {
    q: "How quickly can I get service started?",
    a: "Once you register, our team schedules a baseline inspection within 48 hours.",
  },
];

// ═══════════════════════════════════════
//  HOME SCREEN
// ═══════════════════════════════════════
export default function Home() {
  const { user } = useAuth();
  const router = useRouter();
  const [city, setCity] = useState("Pune");

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") return;
        let loc = await Location.getCurrentPositionAsync({});
        let geo = await Location.reverseGeocodeAsync(loc.coords);
        if (geo.length > 0) setCity(geo[0].city || "Your City");
      } catch {}
    })();
  }, []);

  return (
    <Screen>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ═══ HEADER ═══ */}
        <Animated.View entering={FadeInDown.delay(100)} style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.greeting}>{getGreeting()}</Text>
            <Text style={styles.userName}>
              {user?.name || "Solar Explorer"} 👋
            </Text>
          </View>
          <TouchableOpacity
            style={styles.profileBtn}
            onPress={() => router.push("/profile")}
          >
            <Ionicons
              name="person-circle-outline"
              size={40}
              color={Colors.primary}
            />
          </TouchableOpacity>
        </Animated.View>

        {/* ═══ TRUST BADGES ═══ */}
        <Animated.View entering={FadeInDown.delay(150)} style={styles.trustRow}>
          {trustBadges.map((badge, i) => (
            <View key={i} style={styles.trustBadge}>
              <Ionicons name={badge.icon as any} size={12} color={Colors.eco} />
              <Text style={styles.trustLabel}>{badge.label}</Text>
            </View>
          ))}
        </Animated.View>

        {/* ═══ LOCATION BAR ═══ */}
        <Animated.View
          entering={FadeInDown.delay(180)}
          style={styles.locationRow}
        >
          <Ionicons name="location" size={20} color={Colors.accent} />
          <Text style={styles.locationText}>{city}</Text>
        </Animated.View>

        {/* ═══ HERO TIP CARD ═══ */}
        <Animated.View entering={FadeInDown.delay(200)} style={styles.tipCard}>
          <View style={styles.tipIconWrap}>
            <Ionicons
              name={todayTip.icon as any}
              size={22}
              color={Colors.accent}
            />
          </View>
          <View style={styles.tipContent}>
            <Text style={styles.tipTitle}>{todayTip.title}</Text>
            <Text style={styles.tipText}>{todayTip.tip}</Text>
          </View>
        </Animated.View>

        {/* ═══ QUICK ACTIONS ═══ */}
        <Animated.View entering={FadeInDown.delay(250)}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            {quickActions.map((action, i) => (
              <TouchableOpacity
                key={i}
                style={styles.quickAction}
                onPress={() => router.push(action.route as any)}
              >
                <View style={[styles.qaIcon, { backgroundColor: action.bg }]}>
                  <Ionicons
                    name={action.icon as any}
                    size={22}
                    color={action.color}
                  />
                </View>
                <Text style={styles.qaLabel}>{action.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>

        {/* ═══ HOW IT WORKS ═══ */}
        <Animated.View entering={FadeInDown.delay(300)}>
          <Text style={styles.sectionTitle}>How It Works</Text>
          <View style={styles.processCard}>
            {processSteps.map((item, i) => (
              <View key={i} style={styles.processItem}>
                <View style={styles.processStep}>
                  <Text style={styles.processStepNum}>{item.step}</Text>
                </View>
                <Text style={styles.processTitle}>{item.title}</Text>
                <Text style={styles.processDesc}>{item.desc}</Text>
              </View>
            ))}
          </View>
        </Animated.View>

        {/* ═══ WHY SUSTANIFY ═══ */}
        <Animated.View entering={FadeInDown.delay(350)}>
          <Text style={styles.sectionTitle}>Why Choose Sustanify?</Text>
          <View style={styles.whyGrid}>
            {[
              {
                icon: "shield-checkmark",
                title: "MNRE Certified",
                desc: "Government approved",
                color: Colors.eco,
              },
              {
                icon: "people",
                title: "500+ Clients",
                desc: "Trusted across India",
                color: Colors.info,
              },
              {
                icon: "speedometer",
                title: "98% Uptime",
                desc: "Reliable monitoring",
                color: Colors.accent,
              },
              {
                icon: "time",
                title: "48hr Support",
                desc: "Quick response",
                color: Colors.primary,
              },
            ].map((item, i) => (
              <View key={i} style={styles.whyCard}>
                <Ionicons
                  name={item.icon as any}
                  size={24}
                  color={item.color}
                />
                <Text style={styles.whyTitle}>{item.title}</Text>
                <Text style={styles.whyDesc}>{item.desc}</Text>
              </View>
            ))}
          </View>
        </Animated.View>

        {/* ═══ SERVICES ═══ */}
        <Animated.View entering={FadeInDown.delay(400)}>
          <View style={styles.servicesHeader}>
            <Text style={styles.sectionTitle}>Our Services</Text>
            <TouchableOpacity
              onPress={() => router.push("/components/services")}
            >
              <Text style={styles.viewAllText}>View All →</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.servicesList}>
            {services.map((svc, i) => (
              <TouchableOpacity
                key={i}
                style={styles.serviceCard}
                onPress={() => router.push(svc.route as any)}
              >
                <View style={[styles.serviceIcon, { backgroundColor: svc.bg }]}>
                  <Ionicons
                    name={svc.icon as any}
                    size={24}
                    color={svc.color}
                  />
                </View>
                <View style={styles.serviceInfo}>
                  <Text style={styles.serviceTitle}>{svc.title}</Text>
                  <Text style={styles.serviceDesc}>{svc.desc}</Text>
                </View>
                <View style={styles.serviceRight}>
                  <Text style={styles.servicePrice}>{svc.price}</Text>
                  <Ionicons
                    name="chevron-forward"
                    size={16}
                    color={Colors.subText}
                  />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>

        {/* ═══ SUCCESS STORY ═══ */}
        <Animated.View entering={FadeInDown.delay(450)}>
          <Text style={styles.sectionTitle}>Real Results</Text>
          <View style={styles.storyCard}>
            <View style={styles.storyHeader}>
              <View style={styles.storyAvatar}>
                <Text style={styles.storyAvatarText}>RK</Text>
              </View>
              <View style={styles.storyInfo}>
                <Text style={styles.storyName}>Rajesh Kumar</Text>
                <Text style={styles.storyLocation}>Mumbai, Maharashtra</Text>
              </View>
              <View style={styles.storyBadge}>
                <Ionicons
                  name="checkmark-circle"
                  size={14}
                  color={Colors.eco}
                />
                <Text style={styles.storyBadgeText}>Verified</Text>
              </View>
            </View>
            <View style={styles.storyStats}>
              <View style={styles.storyStat}>
                <Text style={styles.storyStatValue}>+15%</Text>
                <Text style={styles.storyStatLabel}>Efficiency</Text>
              </View>
              <View style={styles.storyStatDivider} />
              <View style={styles.storyStat}>
                <Text style={styles.storyStatValue}>₹18k</Text>
                <Text style={styles.storyStatLabel}>Yearly Savings</Text>
              </View>
              <View style={styles.storyStatDivider} />
              <View style={styles.storyStat}>
                <Text style={styles.storyStatValue}>3mo</Text>
                <Text style={styles.storyStatLabel}>With Us</Text>
              </View>
            </View>
            <Text style={styles.storyText}>
              "Sustanify's O&M service caught a fault in my inverter within
              days. They fixed it before it became a big problem. My plant
              efficiency improved by 15% in just 3 months!"
            </Text>
          </View>
        </Animated.View>

        {/* ═══ FAQ ═══ */}
        <Animated.View entering={FadeInDown.delay(500)}>
          <Text style={styles.sectionTitle}>Common Questions</Text>
          <View style={styles.faqCard}>
            {faqData.map((item, i) => (
              <FAQItem key={i} question={item.q} answer={item.a} />
            ))}
          </View>
        </Animated.View>

        {/* ═══ BOTTOM CTA ═══ */}
        <Animated.View
          entering={FadeInDown.delay(550)}
          style={styles.bottomCta}
        >
          <View style={styles.ctaIconWrap}>
            <Ionicons name="sunny" size={36} color={Colors.accent} />
          </View>
          <Text style={styles.ctaTitle}>Start Protecting Your Solar Today</Text>
          <Text style={styles.ctaSubtitle}>
            Join 500+ solar owners who trust Sustanify Energy
          </Text>
          <TouchableOpacity
            style={styles.ctaButton}
            onPress={() => router.push("/dashboard/register")}
          >
            <Text style={styles.ctaButtonText}>Create Free Account →</Text>
          </TouchableOpacity>
          <View style={styles.ctaFeatures}>
            <Text style={styles.ctaFeature}>✓ No credit card required</Text>
            <Text style={styles.ctaFeature}>✓ Cancel anytime</Text>
          </View>
        </Animated.View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </Screen>
  );
}

// ═══════════════════════════════════════
//  FAQ COMPONENT
// ═══════════════════════════════════════
const FAQItem = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <TouchableOpacity
      style={styles.faqItem}
      onPress={() => setOpen(!open)}
      activeOpacity={0.7}
    >
      <View style={styles.faqQuestion}>
        <Text style={styles.faqQ}>{question}</Text>
        <Ionicons
          name={open ? "chevron-up" : "chevron-down"}
          size={18}
          color={Colors.subText}
        />
      </View>
      {open && <Text style={styles.faqAnswer}>{answer}</Text>}
    </TouchableOpacity>
  );
};

// ═══════════════════════════════════════
//  STYLES
// ═══════════════════════════════════════
const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },

  // ─── Header ───
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  headerLeft: {
    flex: 1,
  },
  greeting: {
    fontSize: 13,
    color: Colors.subText,
    marginBottom: 1,
  },
  userName: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.text,
  },
  profileBtn: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },

  // ─── Trust Badges ───
  trustRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 8,
  },
  trustBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: Colors.ecoSoft,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  trustLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: Colors.eco,
  },

  // ─── Location ───
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    marginBottom: 14,
  },
  locationText: {
    fontSize: 12,
    color: Colors.subText,
  },

  // ─── Section Title ───
  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 10,
  },

  // ─── Tip Card ───
  tipCard: {
    flexDirection: "row",
    backgroundColor: Colors.accentSoft,
    borderRadius: 14,
    padding: 14,
    marginBottom: 16,
    alignItems: "center",
    gap: 12,
    borderWidth: 1,
    borderColor: Colors.accent,
  },
  tipIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: Colors.accent,
    marginBottom: 2,
  },
  tipText: {
    fontSize: 13,
    color: Colors.text,
    lineHeight: 18,
  },

  // ─── Quick Actions ───
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  quickAction: {
    alignItems: "center",
    flex: 1,
  },
  qaIcon: {
    width: 50,
    height: 50,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
  },
  qaLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: Colors.text,
    textAlign: "center",
  },

  // ─── Process Card ───
  processCard: {
    flexDirection: "row",
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: 14,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  processItem: {
    alignItems: "center",
    flex: 1,
  },
  processStep: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  processStepNum: {
    fontSize: 12,
    fontWeight: "700",
    color: "#fff",
  },
  processTitle: {
    fontSize: 11,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 1,
  },
  processDesc: {
    fontSize: 10,
    color: Colors.subText,
    textAlign: "center",
  },

  // ─── Why Grid ───
  whyGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 20,
  },
  whyCard: {
    width: (width - 42) / 2,
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.border,
  },
  whyTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: Colors.text,
    marginTop: 8,
    marginBottom: 1,
  },
  whyDesc: {
    fontSize: 11,
    color: Colors.subText,
    textAlign: "center",
  },

  // ─── Services ───
  servicesHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  viewAllText: {
    fontSize: 13,
    fontWeight: "600",
    color: Colors.primary,
  },
  servicesList: {
    marginBottom: 20,
    gap: 10,
  },
  serviceCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  serviceIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 2,
  },
  serviceDesc: {
    fontSize: 12,
    color: Colors.subText,
  },
  serviceRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  servicePrice: {
    fontSize: 12,
    fontWeight: "700",
    color: Colors.accent,
  },

  // ─── Success Story ───
  storyCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  storyHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  storyAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  storyAvatarText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#fff",
  },
  storyInfo: {
    flex: 1,
  },
  storyName: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.text,
  },
  storyLocation: {
    fontSize: 12,
    color: Colors.subText,
  },
  storyBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    backgroundColor: Colors.ecoSoft,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  storyBadgeText: {
    fontSize: 11,
    fontWeight: "600",
    color: Colors.eco,
  },
  storyStats: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  storyStat: {
    alignItems: "center",
    flex: 1,
  },
  storyStatDivider: {
    width: 1,
    backgroundColor: Colors.border,
    marginVertical: 2,
  },
  storyStatValue: {
    fontSize: 17,
    fontWeight: "800",
    color: Colors.eco,
  },
  storyStatLabel: {
    fontSize: 10,
    color: Colors.subText,
    marginTop: 2,
  },
  storyText: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 19,
    fontStyle: "italic",
  },

  // ─── FAQ ───
  faqCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  faqItem: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  faqQuestion: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  faqQ: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
    color: Colors.text,
    paddingRight: 10,
    lineHeight: 20,
  },
  faqAnswer: {
    fontSize: 13,
    color: Colors.subText,
    marginTop: 6,
    lineHeight: 18,
  },

  // ─── Bottom CTA ───
  bottomCta: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    marginBottom: 20,
  },
  ctaIconWrap: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(255,255,255,0.15)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
  },
  ctaTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#fff",
    textAlign: "center",
    marginBottom: 6,
    lineHeight: 24,
  },
  ctaSubtitle: {
    fontSize: 13,
    color: "rgba(255,255,255,0.7)",
    textAlign: "center",
    marginBottom: 16,
  },
  ctaButton: {
    backgroundColor: Colors.accent,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
    marginBottom: 12,
  },
  ctaButtonText: {
    fontSize: 15,
    fontWeight: "800",
    color: Colors.primary,
  },
  ctaFeatures: {
    flexDirection: "row",
    gap: 16,
  },
  ctaFeature: {
    fontSize: 12,
    color: "rgba(255,255,255,0.6)",
  },
});
