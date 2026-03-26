import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import { useRouter } from "expo-router";

import Screen from "../components/Screen";
import { Colors } from "../theme/colors";
import { Theme } from "../theme/theme";

const width = Dimensions.get("window").width;

export default function Schemes() {
  const router = useRouter();
  const [openScheme, setOpenScheme] = useState<number | null>(null);

  const toggleScheme = (i: number) => {
    setOpenScheme(openScheme === i ? null : i);
  };

  return (
    <Screen>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* 🌈 HERO */}
        <View
          style={{
            backgroundColor: Colors.primary,
            padding: 24,
            borderRadius: 24,
            marginBottom: 30,
          }}
        >
          <Text style={{ color: "white", fontSize: 26, fontWeight: "700" }}>
            Install Solar & Save ☀️
          </Text>

          <Text style={{ color: "#ECFDF5", marginTop: 8 }}>
            Government subsidy + EMI options make solar affordable
          </Text>

          <TouchableOpacity
            style={{
              marginTop: 20,
              backgroundColor: "white",
              padding: 14,
              borderRadius: 14,
              alignItems: "center",
            }}
            onPress={() => router.push("/dashboard/register")}
          >
            <Text style={{ color: Colors.primary, fontWeight: "600" }}>
              Check Solar Feasibility
            </Text>
          </TouchableOpacity>
        </View>

        {/* ⚡ SCHEMES */}
        <Text style={styles.section}>Solar Schemes</Text>

        <SolarCard
          title="PM Surya Ghar Subsidy"
          desc="Up to ₹78,000 subsidy"
          badge="Gov Approved"
          details="Government scheme for rooftop solar installation for homes."
          open={openScheme === 0}
          onPress={() => toggleScheme(0)}
          onAction={() => Linking.openURL("https://pmsuryaghar.gov.in")}
          actionLabel="Apply on Govt Portal"
        />

        <SolarCard
          title="Solar EMI Plan"
          desc="Install from ₹1500/month"
          badge="Popular"
          details="Flexible EMI options with zero upfront investment."
          open={openScheme === 1}
          onPress={() => toggleScheme(1)}
          onAction={() => router.push("/calculators/emi")}
          actionLabel="Open EMI Calculator"
        />

        <SolarCard
          title="AMC Maintenance"
          desc="Cleaning & monitoring support"
          badge="Recommended"
          details="Annual maintenance ensures better performance."
          open={openScheme === 2}
          onPress={() => toggleScheme(2)}
          onAction={() => router.push("/dashboard/register")}
          actionLabel="Request AMC Plan"
        />

        <SolarCard
          title="Commercial Solar Plan"
          desc="For shops & industries"
          badge="New"
          details="High capacity solar for business savings."
          open={openScheme === 3}
          onPress={() => toggleScheme(3)}
          onAction={() => router.push("/dashboard/register")}
          actionLabel="Get Quote"
        />

        {/* 🌿 BENEFITS */}
        <Text style={styles.section}>Why Solar?</Text>

        <View style={styles.grid}>
          <Benefit icon="flash" text="90% Savings" />
          <Benefit icon="leaf" text="Green Energy" />
          <Benefit icon="home" text="Property Value" />
          <Benefit icon="battery-charging" text="Backup Power" />
        </View>

        {/* 📚 LEARNING */}
        <Text style={styles.section}>Learn Solar</Text>

        {/* 📘 INFO */}
        <View
          style={{
            backgroundColor: "#F8FAFC",
            padding: 16,
            borderRadius: 16,
            marginTop: 12,
          }}
        >
          <Text style={{ fontWeight: "600" }}>How Solar Works ⚡</Text>

          <Text
            style={{
              color: Colors.subText,
              fontSize: 13,
              marginTop: 6,
              lineHeight: 18,
            }}
          >
            Solar panels convert sunlight into electricity using photovoltaic
            cells. This electricity powers your home and reduces your bill by up
            to 90%. Excess energy can be exported to the grid via net metering.
          </Text>
        </View>

        {/* 🎥 VIDEOS */}
        <Text style={styles.section}>Watch & Learn</Text>

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

        {/* ❓ FAQ */}
        <Text style={styles.section}>FAQs</Text>

        <Faq q="How long panels last?" a="25+ years lifespan" />
        <Faq q="Is subsidy available?" a="Yes government provides subsidy." />
        <Faq q="What is AMC?" a="Maintenance contract service." />
      </ScrollView>
    </Screen>
  );
}

/* 💎 COMPONENTS */

const SolarCard = ({
  title,
  desc,
  badge,
  details,
  open,
  onPress,
  onAction,
  actionLabel,
}: any) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <View style={{ flex: 1 }}>
        <Text style={{ fontWeight: "600" }}>{title}</Text>
        <Text style={styles.sub}>{desc}</Text>
      </View>

      <Ionicons
        name={open ? "chevron-up" : "chevron-down"}
        size={20}
        color={Colors.subText}
      />
    </View>

    <View style={styles.badge}>
      <Text style={{ color: Colors.primary, fontSize: 11, fontWeight: "600" }}>
        {badge}
      </Text>
    </View>

    {open && (
      <View style={{ marginTop: 12 }}>
        <Text style={styles.sub}>{details}</Text>

        <View style={{ marginTop: 10 }}>
          <Detail text="High savings" />
          <Detail text="Government supported" />
          <Detail text="Quick processing" />
        </View>

        <TouchableOpacity style={styles.innerBtn} onPress={onAction}>
          <Text style={{ color: "white", fontWeight: "600" }}>
            {actionLabel}
          </Text>
        </TouchableOpacity>
      </View>
    )}
  </TouchableOpacity>
);

const Detail = ({ text }: any) => (
  <Text style={{ color: Colors.subText, fontSize: 12, marginTop: 4 }}>
    • {text}
  </Text>
);

const Benefit = ({ icon, text }: any) => (
  <View style={styles.benefit}>
    <Ionicons name={icon} size={22} color={Colors.primary} />
    <Text style={{ marginTop: 6, fontSize: 12 }}>{text}</Text>
  </View>
);

const LearningCard = ({ title, desc, color }: any) => (
  <View
    style={{
      width: width * 0.65,
      backgroundColor: color,
      padding: 18,
      borderRadius: 18,
      marginRight: 12,
    }}
  >
    <Text style={{ color: "white", fontWeight: "700" }}>{title}</Text>
    <Text style={{ color: "white", fontSize: 12, marginTop: 4 }}>{desc}</Text>
  </View>
);

const VideoCard = ({ title, duration, url }: any) => (
  <TouchableOpacity
    style={styles.videoCard}
    onPress={() => Linking.openURL(url)}
  >
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <View style={styles.playIcon}>
        <Ionicons name="play" size={18} color="white" />
      </View>

      <View style={{ marginLeft: 12, flex: 1 }}>
        <Text style={{ fontWeight: "600" }}>{title}</Text>
        <Text style={{ fontSize: 12, color: Colors.subText }}>{duration}</Text>
      </View>

      <Ionicons name="open-outline" size={18} color={Colors.subText} />
    </View>
  </TouchableOpacity>
);

const Step = ({ text }: any) => (
  <View style={styles.step}>
    <View style={styles.dot} />
    <Text>{text}</Text>
  </View>
);

const Faq = ({ q, a }: any) => {
  const [open, setOpen] = useState(false);
  return (
    <TouchableOpacity style={styles.card} onPress={() => setOpen(!open)}>
      <Text style={{ fontWeight: "600" }}>{q}</Text>
      {open && <Text style={styles.sub}>{a}</Text>}
    </TouchableOpacity>
  );
};

/* 🎨 STYLES */

const styles: any = {
  section: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 10,
  },

  card: {
    backgroundColor: "#F8FAFC",
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },

  sub: {
    color: Colors.subText,
    fontSize: 12,
    marginTop: 4,
  },

  badge: {
    marginTop: 6,
    backgroundColor: "#E0F2FE",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
    alignSelf: "flex-start",
  },

  innerBtn: {
    marginTop: 12,
    backgroundColor: Colors.primary,
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  benefit: {
    width: "48%",
    backgroundColor: "#F8FAFC",
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 12,
  },

  videoCard: {
    backgroundColor: "#F8FAFC",
    padding: 14,
    borderRadius: 14,
    marginBottom: 10,
  },

  playIcon: {
    backgroundColor: "#EF4444",
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: "center",
    alignItems: "center",
  },

  step: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
    marginRight: 10,
  },

  whiteBtn: {
    marginTop: 15,
    backgroundColor: "white",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
  },

  ctaWrap: {
    position: "absolute",
    bottom: 15,
    width: "100%",
    alignItems: "center",
  },

  cta: {
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 30,
    width: "90%",
    alignItems: "center",
  },
};
