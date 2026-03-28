import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import { useRouter } from "expo-router";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";

import Screen from "../components/Screen";
import { Colors } from "../theme/colors";

export default function Schemes() {
  const router = useRouter();

  const schemes = [
    {
      title: "PM Surya Ghar Subsidy",
      subtitle: "Up to ₹78,000 government subsidy",
      badge: "Gov Approved",
      badgeColor: Colors.eco,
      badgeBg: Colors.ecoSoft,
      icon: "gift",
      iconColor: Colors.eco,
      iconBg: Colors.ecoSoft,
      description:
        "Government rooftop solar subsidy scheme for residential homes. Get up to 40% subsidy on system cost.",
      features: [
        "Up to ₹78,000 subsidy",
        "40% cost coverage",
        "Direct bank transfer",
        "Easy online application",
      ],
      action: () => Linking.openURL("https://pmsuryaghar.gov.in"),
      actionLabel: "Apply on Govt Portal",
      route: "/calculators",
    },
    {
      title: "Solar EMI Plan",
      subtitle: "Install from ₹1,500/month",
      badge: "Popular",
      badgeColor: Colors.accent,
      badgeBg: Colors.accentSoft,
      icon: "card",
      iconColor: Colors.accent,
      iconBg: Colors.accentSoft,
      description:
        "Flexible EMI options with zero upfront investment. Own your solar system with easy monthly payments.",
      features: [
        "Zero down payment",
        "6.5% interest rate",
        "3-10 year tenure",
        "No hidden charges",
      ],
      action: () => router.push("/calculators/emi"),
      actionLabel: "Calculate EMI",
      route: null,
    },
    {
      title: "AMC Maintenance Plan",
      subtitle: "From ₹4,999/year",
      badge: "Recommended",
      badgeColor: Colors.info,
      badgeBg: Colors.infoSoft,
      icon: "shield-checkmark",
      iconColor: Colors.info,
      iconBg: Colors.infoSoft,
      description:
        "Annual maintenance contract ensures peak performance. Professional cleaning, monitoring & support.",
      features: [
        "Quarterly panel cleaning",
        "24/7 monitoring",
        "Priority support",
        "Parts coverage",
      ],
      action: () => router.push("/dashboard/register"),
      actionLabel: "Get AMC Quote",
      route: null,
    },
    {
      title: "Commercial Solar Plan",
      subtitle: "Custom solutions for businesses",
      badge: "For Business",
      badgeColor: Colors.primary,
      badgeBg: Colors.primarySoft,
      icon: "business",
      iconColor: Colors.primary,
      iconBg: Colors.primarySoft,
      description:
        "High-capacity solar systems for shops, factories & offices. Tax benefits + faster ROI.",
      features: [
        "Custom capacity",
        "Tax benefits",
        "Faster payback",
        "Dedicated support",
      ],
      action: () => router.push("/dashboard/register"),
      actionLabel: "Get Business Quote",
      route: null,
    },
  ];

  const benefits = [
    {
      icon: "flash",
      label: "90% Bill Reduction",
      color: Colors.accent,
      bg: Colors.accentSoft,
    },
    {
      icon: "leaf",
      label: "Green Energy",
      color: Colors.eco,
      bg: Colors.ecoSoft,
    },
    {
      icon: "home",
      label: "Property Value+",
      color: Colors.info,
      bg: Colors.infoSoft,
    },
    {
      icon: "battery-charging",
      label: "Power Backup",
      color: Colors.primary,
      bg: Colors.primarySoft,
    },
    {
      icon: "wallet",
      label: "Tax Savings",
      color: Colors.danger,
      bg: Colors.dangerSoft,
    },
    {
      icon: "trending-up",
      label: "Energy Independence",
      color: Colors.eco,
      bg: Colors.ecoSoft,
    },
  ];

  const steps = [
    {
      num: "1",
      title: "Check Eligibility",
      desc: "Use our calculator to see savings",
    },
    {
      num: "2",
      title: "Apply for Subsidy",
      desc: "Register on govt portal or with us",
    },
    { num: "3", title: "Site Survey", desc: "Our team visits your location" },
    {
      num: "4",
      title: "Installation",
      desc: "Professional installation in 3-5 days",
    },
  ];

  const faqs = [
    {
      q: "How much government subsidy can I get?",
      a: "You can get up to 40% subsidy on system cost, capped at ₹78,000 for 3kW systems. For example, on a ₹3 lakh system, you pay only ₹2.22 lakhs after subsidy.",
    },
    {
      q: "How long do solar panels last?",
      a: "Solar panels typically last 25-30 years with minimal degradation (about 0.5% per year). Most manufacturers offer 25-year performance warranties.",
    },
    {
      q: "What is net metering?",
      a: "Net metering allows you to export excess electricity to the grid and earn credits. Your bill is calculated based on net consumption (used - exported).",
    },
    {
      q: "Do I need permissions for rooftop solar?",
      a: "For residential rooftops up to 10kW, no separate permission is needed. Your installer handles the application with the local DISCOM for grid connection.",
    },
    {
      q: "What happens on cloudy days?",
      a: "Solar panels still generate electricity on cloudy days, typically at 10-25% of their peak capacity. Battery backup or grid connection ensures uninterrupted power.",
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
          <Text style={styles.headerTitle}>Government Schemes</Text>
          <Text style={styles.headerSubtitle}>
            Save more with solar subsidies & offers
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
            <Text style={styles.heroTitle}>Install Solar & Save</Text>
            <Text style={styles.heroText}>
              Government subsidy + EMI options make solar affordable for
              everyone
            </Text>
            <View style={styles.heroBadges}>
              <View style={styles.heroBadge}>
                <Ionicons
                  name="checkmark-circle"
                  size={12}
                  color={Colors.eco}
                />
                <Text style={styles.heroBadgeText}>Up to 40% subsidy</Text>
              </View>
              <View style={styles.heroBadge}>
                <Ionicons
                  name="checkmark-circle"
                  size={12}
                  color={Colors.eco}
                />
                <Text style={styles.heroBadgeText}>Low EMI options</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.heroCta}
              onPress={() => router.push("/dashboard/register")}
            >
              <Text style={styles.heroCtaText}>Check Eligibility →</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* ═══ TRUST BADGES ═══ */}
        <Animated.View entering={FadeInDown.delay(200)} style={styles.trustRow}>
          <View style={styles.trustBadge}>
            <Ionicons name="shield-checkmark" size={14} color={Colors.eco} />
            <Text style={styles.trustText}>MNRE Approved</Text>
          </View>
          <View style={styles.trustBadge}>
            <Ionicons name="checkmark-circle" size={14} color={Colors.info} />
            <Text style={styles.trustText}>500+ Installations</Text>
          </View>
          <View style={styles.trustBadge}>
            <Ionicons name="star" size={14} color={Colors.accent} />
            <Text style={styles.trustText}>4.8★ Rating</Text>
          </View>
        </Animated.View>

        {/* ═══ SCHEMES LIST ═══ */}
        <Animated.View entering={FadeInDown.delay(250)}>
          <Text style={styles.sectionTitle}>Available Schemes</Text>
          <View style={styles.schemesList}>
            {schemes.map((scheme, i) => (
              <SchemeCard key={i} scheme={scheme} />
            ))}
          </View>
        </Animated.View>

        {/* ═══ HOW IT WORKS ═══ */}
        <Animated.View entering={FadeInDown.delay(300)}>
          <Text style={styles.sectionTitle}>Installation Process</Text>
          <View style={styles.stepsCard}>
            {steps.map((step, i) => (
              <View key={i} style={styles.stepItem}>
                <View style={styles.stepNum}>
                  <Text style={styles.stepNumText}>{step.num}</Text>
                </View>
                <View style={styles.stepContent}>
                  <Text style={styles.stepTitle}>{step.title}</Text>
                  <Text style={styles.stepDesc}>{step.desc}</Text>
                </View>
                {i < steps.length - 1 && <View style={styles.stepLine} />}
              </View>
            ))}
          </View>
        </Animated.View>

        {/* ═══ BENEFITS GRID ═══ */}
        <Animated.View entering={FadeInDown.delay(350)}>
          <Text style={styles.sectionTitle}>Why Go Solar?</Text>
          <View style={styles.benefitsGrid}>
            {benefits.map((benefit, i) => (
              <View key={i} style={styles.benefitCard}>
                <View
                  style={[styles.benefitIcon, { backgroundColor: benefit.bg }]}
                >
                  <Ionicons
                    name={benefit.icon as any}
                    size={22}
                    color={benefit.color}
                  />
                </View>
                <Text style={styles.benefitLabel}>{benefit.label}</Text>
              </View>
            ))}
          </View>
        </Animated.View>

        {/* ═══ HOW SOLAR WORKS ═══ */}
        <Animated.View entering={FadeInDown.delay(400)}>
          <Text style={styles.sectionTitle}>How Solar Works</Text>
          <View style={styles.infoCard}>
            <View style={styles.infoHeader}>
              <Ionicons name="flash" size={24} color={Colors.accent} />
              <Text style={styles.infoTitle}>Solar Energy Basics</Text>
            </View>
            <Text style={styles.infoText}>
              Solar panels convert sunlight into electricity using photovoltaic
              (PV) cells. This clean electricity powers your home and reduces
              your electricity bill by up to 90%.
            </Text>
            <View style={styles.infoPoints}>
              <View style={styles.infoPoint}>
                <Ionicons name="sunny" size={18} color={Colors.accent} />
                <Text style={styles.infoPointText}>
                  Sunlight hits solar panels
                </Text>
              </View>
              <View style={styles.infoPoint}>
                <Ionicons name="flash" size={18} color={Colors.accent} />
                <Text style={styles.infoPointText}>
                  Panels generate DC electricity
                </Text>
              </View>
              <View style={styles.infoPoint}>
                <Ionicons name="sync" size={18} color={Colors.accent} />
                <Text style={styles.infoPointText}>
                  Inverter converts to AC power
                </Text>
              </View>
              <View style={styles.infoPoint}>
                <Ionicons name="home" size={18} color={Colors.accent} />
                <Text style={styles.infoPointText}>
                  Powers your home appliances
                </Text>
              </View>
            </View>
          </View>
        </Animated.View>

        {/* ═══ SAVINGS CALCULATOR CTA ═══ */}
        <Animated.View
          entering={FadeInDown.delay(450)}
          style={styles.calcCtaCard}
        >
          <View style={styles.calcCtaLeft}>
            <Ionicons name="calculator" size={28} color={Colors.eco} />
          </View>
          <View style={styles.calcCtaCenter}>
            <Text style={styles.calcCtaTitle}>Calculate Your Savings</Text>
            <Text style={styles.calcCtaText}>
              See how much you can save with solar
            </Text>
          </View>
          <TouchableOpacity
            style={styles.calcCtaBtn}
            onPress={() => router.push("/calculators")}
          >
            <Text style={styles.calcCtaBtnText}>Go →</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* ═══ WATCH & LEARN ═══ */}
        <Animated.View entering={FadeInDown.delay(500)}>
          <Text style={styles.sectionTitle}>Watch & Learn</Text>
          <View style={styles.videosList}>
            <VideoCard
              title="How Solar Panels Work"
              duration="5 min"
              url="https://www.youtube.com/watch?v=xKxrkht7CpY"
            />
            <VideoCard
              title="Solar Installation Process"
              duration="7 min"
              url="https://www.youtube.com/watch?v=U0Y2j5FZl0E"
            />
            <VideoCard
              title="Reduce Electricity Bill"
              duration="4 min"
              url="https://www.youtube.com/watch?v=1kUE0BZtTRc"
            />
          </View>
        </Animated.View>

        {/* ═══ FAQ ═══ */}
        <Animated.View entering={FadeInDown.delay(550)}>
          <Text style={styles.sectionTitle}>Common Questions</Text>
          <View style={styles.faqCard}>
            {faqs.map((faq, i) => (
              <FAQItem key={i} question={faq.q} answer={faq.a} />
            ))}
          </View>
        </Animated.View>

        {/* ═══ BOTTOM CTA ═══ */}
        <Animated.View
          entering={FadeInDown.delay(600)}
          style={styles.bottomCta}
        >
          <View style={styles.ctaIconWrap}>
            <Ionicons name="chatbubbles" size={28} color={Colors.primary} />
          </View>
          <Text style={styles.ctaTitle}>Still Have Questions?</Text>
          <Text style={styles.ctaText}>
            Our solar experts are here to help you choose the right scheme
          </Text>
          <TouchableOpacity
            style={styles.ctaButton}
            onPress={() => router.push("/dashboard/register")}
          >
            <Text style={styles.ctaButtonText}>Talk to Expert →</Text>
          </TouchableOpacity>
          <View style={styles.ctaFeatures}>
            <Text style={styles.ctaFeature}>✓ Free consultation</Text>
            <Text style={styles.ctaFeature}>✓ Site visit included</Text>
          </View>
        </Animated.View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </Screen>
  );
}

// ═══════════════════════════════════════
//  COMPONENTS
// ═══════════════════════════════════════

const SchemeCard = ({ scheme }: { scheme: any }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={styles.schemeCard}>
      <TouchableOpacity
        style={styles.schemeHeader}
        onPress={() => setExpanded(!expanded)}
        activeOpacity={0.7}
      >
        <View style={[styles.schemeIcon, { backgroundColor: scheme.iconBg }]}>
          <Ionicons
            name={scheme.icon as any}
            size={24}
            color={scheme.iconColor}
          />
        </View>
        <View style={styles.schemeInfo}>
          <View style={styles.schemeTitleRow}>
            <Text style={styles.schemeTitle}>{scheme.title}</Text>
            <View
              style={[styles.schemeBadge, { backgroundColor: scheme.badgeBg }]}
            >
              <Text
                style={[styles.schemeBadgeText, { color: scheme.badgeColor }]}
              >
                {scheme.badge}
              </Text>
            </View>
          </View>
          <Text style={styles.schemeSubtitle}>{scheme.subtitle}</Text>
        </View>
        <Ionicons
          name={expanded ? "chevron-up" : "chevron-down"}
          size={20}
          color={Colors.subText}
        />
      </TouchableOpacity>

      {expanded && (
        <Animated.View entering={FadeInUp} style={styles.schemeExpanded}>
          <Text style={styles.schemeDesc}>{scheme.description}</Text>

          <View style={styles.schemeFeatures}>
            {scheme.features.map((feature: string, i: number) => (
              <View key={i} style={styles.schemeFeature}>
                <Ionicons
                  name="checkmark-circle"
                  size={16}
                  color={scheme.iconColor}
                />
                <Text style={styles.schemeFeatureText}>{feature}</Text>
              </View>
            ))}
          </View>

          <TouchableOpacity
            style={[styles.schemeAction, { backgroundColor: scheme.iconColor }]}
            onPress={scheme.action}
          >
            <Text style={styles.schemeActionText}>{scheme.actionLabel}</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
};

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
      {open && <Text style={styles.faqA}>{answer}</Text>}
    </TouchableOpacity>
  );
};

const VideoCard = ({
  title,
  duration,
  url,
}: {
  title: string;
  duration: string;
  url: string;
}) => (
  <TouchableOpacity
    style={styles.videoCard}
    onPress={() => Linking.openURL(url)}
    activeOpacity={0.7}
  >
    <View style={styles.playIcon}>
      <Ionicons name="play" size={18} color="#fff" />
    </View>
    <View style={styles.videoInfo}>
      <Text style={styles.videoTitle}>{title}</Text>
      <Text style={styles.videoDuration}>{duration}</Text>
    </View>
    <Ionicons name="open-outline" size={18} color={Colors.subText} />
  </TouchableOpacity>
);

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

  // ─── Hero Banner ───
  heroBanner: {
    flexDirection: "row",
    backgroundColor: Colors.primary,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    gap: 14,
  },
  heroLeft: {
    justifyContent: "center",
  },
  heroIconWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "rgba(255,255,255,0.15)",
    justifyContent: "center",
    alignItems: "center",
  },
  heroRight: {
    flex: 1,
  },
  heroTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 4,
  },
  heroText: {
    fontSize: 13,
    color: "rgba(255,255,255,0.8)",
    lineHeight: 18,
    marginBottom: 10,
  },
  heroBadges: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 12,
  },
  heroBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  heroBadgeText: {
    fontSize: 11,
    color: "rgba(255,255,255,0.9)",
  },
  heroCta: {
    backgroundColor: Colors.accent,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignSelf: "flex-start",
  },
  heroCtaText: {
    fontSize: 13,
    fontWeight: "700",
    color: Colors.primary,
  },

  // ─── Trust Badges ───
  trustRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 20,
  },
  trustBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: Colors.surface,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  trustText: {
    fontSize: 11,
    fontWeight: "600",
    color: Colors.text,
  },

  // ─── Section Title ───
  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 12,
  },

  // ─── Schemes ───
  schemesList: {
    marginBottom: 20,
    gap: 12,
  },
  schemeCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: "hidden",
  },
  schemeHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
  },
  schemeIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  schemeInfo: {
    flex: 1,
  },
  schemeTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 2,
  },
  schemeTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.text,
  },
  schemeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  schemeBadgeText: {
    fontSize: 10,
    fontWeight: "600",
  },
  schemeSubtitle: {
    fontSize: 12,
    color: Colors.subText,
  },
  schemeExpanded: {
    paddingHorizontal: 14,
    paddingBottom: 14,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
    paddingTop: 12,
  },
  schemeDesc: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 18,
    marginBottom: 12,
  },
  schemeFeatures: {
    marginBottom: 12,
    gap: 8,
  },
  schemeFeature: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  schemeFeatureText: {
    fontSize: 13,
    color: Colors.text,
  },
  schemeAction: {
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  schemeActionText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#fff",
  },

  // ─── Steps ───
  stepsCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  stepItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  stepNum: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  stepNumText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#fff",
  },
  stepContent: {
    flex: 1,
    paddingTop: 4,
  },
  stepTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 2,
  },
  stepDesc: {
    fontSize: 12,
    color: Colors.subText,
  },
  stepLine: {
    position: "absolute",
    left: 15,
    top: 36,
    width: 2,
    height: 24,
    backgroundColor: Colors.border,
  },

  // ─── Benefits Grid ───
  benefitsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 20,
  },
  benefitCard: {
    width: "48%",
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.border,
  },
  benefitIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  benefitLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: Colors.text,
    textAlign: "center",
  },

  // ─── Info Card ───
  infoCard: {
    backgroundColor: Colors.accentSoft,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.accent,
  },
  infoHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  infoTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: Colors.text,
  },
  infoText: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 19,
    marginBottom: 12,
  },
  infoPoints: {
    gap: 8,
  },
  infoPoint: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  infoPointText: {
    fontSize: 13,
    color: Colors.text,
  },

  // ─── Calculator CTA ───
  calcCtaCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.ecoSoft,
    borderRadius: 14,
    padding: 14,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.eco,
    gap: 12,
  },
  calcCtaLeft: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  calcCtaCenter: {
    flex: 1,
  },
  calcCtaTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.text,
  },
  calcCtaText: {
    fontSize: 12,
    color: Colors.subText,
  },
  calcCtaBtn: {
    backgroundColor: Colors.eco,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  calcCtaBtnText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#fff",
  },

  // ─── Videos ───
  videosList: {
    marginBottom: 20,
    gap: 10,
  },
  videoCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  playIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#EF4444",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  videoInfo: {
    flex: 1,
  },
  videoTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 2,
  },
  videoDuration: {
    fontSize: 12,
    color: Colors.subText,
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
  faqA: {
    fontSize: 13,
    color: Colors.subText,
    marginTop: 8,
    lineHeight: 18,
  },

  // ─── Bottom CTA ───
  bottomCta: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    marginBottom: 20,
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
    fontSize: 18,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 4,
  },
  ctaText: {
    fontSize: 13,
    color: Colors.subText,
    textAlign: "center",
    marginBottom: 14,
    lineHeight: 18,
  },
  ctaButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
    marginBottom: 12,
  },
  ctaButtonText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#fff",
  },
  ctaFeatures: {
    flexDirection: "row",
    gap: 16,
  },
  ctaFeature: {
    fontSize: 12,
    color: Colors.subText,
  },
});
