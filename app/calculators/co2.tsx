// app/calculators/co2.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";

import Screen from "../components/Screen";
import { Colors } from "../theme/colors";

export default function CO2Calculator() {
  const router = useRouter();
  const [systemSize, setSystemSize] = useState("5");

  const size = Number(systemSize) || 1;
  const annualKwh = size * 1400; // average
  const co2PerYear = ((annualKwh / 1000) * 0.82).toFixed(1);
  const treesEquivalent = Math.round(Number(co2PerYear) * 50);
  const carsEquivalent = (Number(co2PerYear) / 4.6).toFixed(1); // avg car emits 4.6 tons/year
  const flightsEquivalent = Math.round(Number(co2PerYear) / 0.9); // avg flight emits 0.9 tons

  return (
    <Screen>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backBtn}
          >
            <Ionicons name="arrow-back" size={24} color={Colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>CO₂ Reduction Calculator</Text>
          <View style={{ width: 40 }} />
        </View>

        <Animated.View entering={FadeInDown.delay(100)} style={styles.heroCard}>
          <Ionicons name="leaf" size={36} color={Colors.eco} />
          <Text style={styles.heroTitle}>Your Environmental Impact</Text>
          <Text style={styles.heroSubtitle}>
            See how much CO₂ you can save by switching to solar energy
          </Text>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(150)} style={styles.formCard}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>System Size (kW)</Text>
            <View style={styles.inputWrap}>
              <TextInput
                placeholder="e.g. 5"
                value={systemSize}
                onChangeText={setSystemSize}
                keyboardType="numeric"
                style={styles.input}
                placeholderTextColor={Colors.subText}
              />
              <Text style={styles.inputSuffix}>kW</Text>
            </View>
          </View>

          <Text style={styles.quickLabel}>Quick Select:</Text>
          <View style={styles.sizeGrid}>
            {[1, 3, 5, 7, 10].map((s) => (
              <TouchableOpacity
                key={s}
                onPress={() => setSystemSize(String(s))}
                style={[
                  styles.sizeBtn,
                  systemSize === String(s) && styles.sizeBtnActive,
                ]}
              >
                <Text
                  style={[
                    styles.sizeBtnText,
                    systemSize === String(s) && styles.sizeBtnTextActive,
                  ]}
                >
                  {s} kW
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>

        <Animated.View entering={FadeInUp}>
          <Animated.View entering={FadeInUp.delay(100)} style={styles.mainCard}>
            <View style={styles.mainHeader}>
              <Ionicons name="globe" size={24} color={Colors.eco} />
              <Text style={styles.mainHeaderText}>Annual CO₂ Reduction</Text>
            </View>
            <View style={styles.mainHighlight}>
              <Text style={styles.mainValue}>{co2PerYear}</Text>
              <Text style={styles.mainUnit}>tons/year</Text>
            </View>
            <Text style={styles.mainNote}>
              = {annualKwh.toLocaleString()} kWh clean energy
            </Text>
          </Animated.View>

          <Animated.View
            entering={FadeInUp.delay(150)}
            style={styles.equivalentsCard}
          >
            <Text style={styles.eqTitle}>Equivalent To</Text>
            <View style={styles.eqGrid}>
              <View style={styles.eqItem}>
                <View
                  style={[styles.eqIcon, { backgroundColor: Colors.ecoSoft }]}
                >
                  <Ionicons name="leaf" size={24} color={Colors.eco} />
                </View>
                <Text style={styles.eqValue}>{treesEquivalent}</Text>
                <Text style={styles.eqLabel}>Trees Planted</Text>
              </View>
              <View style={styles.eqItem}>
                <View
                  style={[styles.eqIcon, { backgroundColor: Colors.infoSoft }]}
                >
                  <Ionicons name="car" size={24} color={Colors.info} />
                </View>
                <Text style={styles.eqValue}>{carsEquivalent}</Text>
                <Text style={styles.eqLabel}>Cars Off Road</Text>
              </View>
              <View style={styles.eqItem}>
                <View
                  style={[
                    styles.eqIcon,
                    { backgroundColor: Colors.accentSoft },
                  ]}
                >
                  <Ionicons name="airplane" size={24} color={Colors.accent} />
                </View>
                <Text style={styles.eqValue}>{flightsEquivalent}</Text>
                <Text style={styles.eqLabel}>Flights Offset</Text>
              </View>
            </View>
          </Animated.View>

          <Animated.View
            entering={FadeInUp.delay(200)}
            style={styles.impactCard}
          >
            <Text style={styles.impactTitle}>25-Year Impact</Text>
            <View style={styles.impactStats}>
              <View style={styles.impactStat}>
                <Text style={styles.impactValue}>
                  {(Number(co2PerYear) * 25).toFixed(0)}
                </Text>
                <Text style={styles.impactLabel}>tons CO₂ saved</Text>
              </View>
              <View style={styles.impactDivider} />
              <View style={styles.impactStat}>
                <Text style={styles.impactValue}>{treesEquivalent * 25}</Text>
                <Text style={styles.impactLabel}>trees equivalent</Text>
              </View>
            </View>
          </Animated.View>

          <TouchableOpacity
            style={styles.cta}
            onPress={() => router.push("/dashboard/register")}
          >
            <Ionicons name="heart" size={18} color="#fff" />
            <Text style={styles.ctaText}>Start Your Green Journey →</Text>
          </TouchableOpacity>
        </Animated.View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scrollContent: { paddingHorizontal: 16, paddingTop: 8 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: { fontSize: 17, fontWeight: "700", color: Colors.text },
  heroCard: {
    backgroundColor: Colors.ecoSoft,
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.eco,
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: Colors.text,
    marginTop: 10,
    marginBottom: 4,
  },
  heroSubtitle: {
    fontSize: 13,
    color: Colors.subText,
    textAlign: "center",
    lineHeight: 18,
  },
  formCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  inputGroup: { marginBottom: 14 },
  inputLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 6,
  },
  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.background,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 12,
  },
  inputSuffix: { fontSize: 14, color: Colors.subText, marginLeft: 4 },
  input: {
    flex: 1,
    fontSize: 16,
    color: Colors.text,
    paddingVertical: 14,
    paddingHorizontal: 8,
  },
  quickLabel: { fontSize: 12, color: Colors.subText, marginBottom: 8 },
  sizeGrid: { flexDirection: "row", gap: 8 },
  sizeBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.background,
    alignItems: "center",
  },
  sizeBtnActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  sizeBtnText: { fontSize: 13, fontWeight: "600", color: Colors.text },
  sizeBtnTextActive: { color: "#fff" },
  mainCard: {
    backgroundColor: Colors.ecoSoft,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.eco,
  },
  mainHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  mainHeaderText: { fontSize: 14, fontWeight: "700", color: Colors.eco },
  mainHighlight: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "center",
    marginBottom: 8,
  },
  mainValue: { fontSize: 48, fontWeight: "800", color: Colors.eco },
  mainUnit: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.eco,
    marginLeft: 4,
  },
  mainNote: { fontSize: 12, color: Colors.subText, textAlign: "center" },
  equivalentsCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  eqTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 12,
  },
  eqGrid: { flexDirection: "row", gap: 10 },
  eqItem: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 12,
  },
  eqIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  eqValue: { fontSize: 20, fontWeight: "800", color: Colors.text },
  eqLabel: { fontSize: 10, color: Colors.subText, textAlign: "center" },
  impactCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  impactTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 10,
  },
  impactStats: { flexDirection: "row", alignItems: "center" },
  impactStat: { flex: 1, alignItems: "center" },
  impactDivider: { width: 1, height: 40, backgroundColor: Colors.border },
  impactValue: { fontSize: 22, fontWeight: "800", color: Colors.eco },
  impactLabel: { fontSize: 11, color: Colors.subText },
  cta: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 10,
  },
  ctaText: { fontSize: 15, fontWeight: "700", color: "#fff" },
});
