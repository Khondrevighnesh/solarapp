// app/calculators/rooftop.tsx
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

export default function RooftopCalculator() {
  const router = useRouter();
  const [roofLength, setRoofLength] = useState("");
  const [roofWidth, setRoofWidth] = useState("");
  const [roofType, setRoofType] = useState("flat");

  const length = Number(roofLength) || 0;
  const width = Number(roofWidth) || 0;
  const totalArea = length * width;

  // Area requirements
  const areaPerKwStandard = 100; // sq ft per kW for standard panels
  const areaPerKwEfficient = 80; // sq ft per kW for high efficiency panels
  const maxSystemStandard = Math.floor(totalArea / areaPerKwStandard);
  const maxSystemEfficient = Math.floor(totalArea / areaPerKwEfficient);

  const hasResult = totalArea > 0;

  const roofTypes = [
    { label: "Flat RCC", value: "flat", icon: "square" },
    { label: "Sloped", value: "sloped", icon: "triangle" },
    { label: "Metal", value: "metal", icon: "construct" },
    { label: "AC Sheet", value: "ac", icon: "grid" },
  ];

  const suitability = [
    {
      label: "Panel Orientation",
      value: "South (Optimal)",
      icon: "compass",
      status: "good",
    },
    {
      label: "Shadow Free",
      value: "No major shadows",
      icon: "sunny",
      status: "good",
    },
    {
      label: "Roof Condition",
      value:
        roofType === "flat"
          ? "Good for flat mount"
          : "Requires special mounting",
      icon: "checkmark-circle",
      status: "neutral",
    },
    {
      label: "Wind Load",
      value: "Standard wind zone",
      icon: "speedometer",
      status: "good",
    },
  ];

  return (
    <Screen>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backBtn}
          >
            <Ionicons name="arrow-back" size={24} color={Colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Rooftop Feasibility</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Hero */}
        <Animated.View entering={FadeInDown.delay(100)} style={styles.heroCard}>
          <Ionicons name="home" size={36} color={Colors.danger} />
          <Text style={styles.heroTitle}>Check Solar Feasibility</Text>
          <Text style={styles.heroSubtitle}>
            Find out how much solar system your rooftop can accommodate
          </Text>
        </Animated.View>

        {/* Info Banner */}
        <Animated.View
          entering={FadeInDown.delay(150)}
          style={styles.infoBanner}
        >
          <Ionicons name="information-circle" size={18} color={Colors.info} />
          <Text style={styles.infoText}>
            Standard panels need ~100 sq ft per kW. High-efficiency panels need
            ~80 sq ft per kW.
          </Text>
        </Animated.View>

        {/* Form */}
        <Animated.View entering={FadeInDown.delay(200)} style={styles.formCard}>
          <Text style={styles.formTitle}>Enter Roof Dimensions</Text>

          <View style={styles.dimensionRow}>
            <View style={styles.dimensionInput}>
              <Text style={styles.inputLabel}>Length</Text>
              <View style={styles.inputWrap}>
                <TextInput
                  placeholder="e.g. 30"
                  value={roofLength}
                  onChangeText={setRoofLength}
                  keyboardType="numeric"
                  style={styles.input}
                  placeholderTextColor={Colors.subText}
                />
                <Text style={styles.inputSuffix}>ft</Text>
              </View>
            </View>
            <View style={styles.dimensionX}>
              <Text style={styles.dimensionXText}>×</Text>
            </View>
            <View style={styles.dimensionInput}>
              <Text style={styles.inputLabel}>Width</Text>
              <View style={styles.inputWrap}>
                <TextInput
                  placeholder="e.g. 20"
                  value={roofWidth}
                  onChangeText={setRoofWidth}
                  keyboardType="numeric"
                  style={styles.input}
                  placeholderTextColor={Colors.subText}
                />
                <Text style={styles.inputSuffix}>ft</Text>
              </View>
            </View>
          </View>

          <View style={styles.totalArea}>
            <Text style={styles.totalAreaLabel}>Total Available Area</Text>
            <Text style={styles.totalAreaValue}>
              {totalArea > 0 ? `${totalArea} sq ft` : "Enter dimensions"}
            </Text>
          </View>

          <Text style={styles.sectionLabel}>Roof Type</Text>
          <View style={styles.roofTypeGrid}>
            {roofTypes.map((type) => (
              <TouchableOpacity
                key={type.value}
                onPress={() => setRoofType(type.value)}
                style={[
                  styles.roofTypeBtn,
                  roofType === type.value && styles.roofTypeBtnActive,
                ]}
              >
                <Ionicons
                  name={type.icon as any}
                  size={20}
                  color={roofType === type.value ? "#fff" : Colors.subText}
                />
                <Text
                  style={[
                    styles.roofTypeBtnText,
                    roofType === type.value && styles.roofTypeBtnTextActive,
                  ]}
                >
                  {type.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>

        {/* Results */}
        {hasResult && (
          <Animated.View entering={FadeInUp}>
            {/* Capacity Result */}
            <Animated.View
              entering={FadeInUp.delay(100)}
              style={styles.resultCard}
            >
              <View style={styles.resultHeader}>
                <Ionicons
                  name="checkmark-circle"
                  size={24}
                  color={Colors.eco}
                />
                <Text style={styles.resultHeaderText}>
                  Maximum Solar Capacity
                </Text>
              </View>

              <View style={styles.capacityHighlight}>
                <View style={styles.capacityItem}>
                  <Text style={styles.capacityValue}>{maxSystemStandard}</Text>
                  <Text style={styles.capacityLabel}>kW Standard</Text>
                </View>
                <View style={styles.capacityDivider} />
                <View style={styles.capacityItem}>
                  <Text style={[styles.capacityValue, { color: Colors.eco }]}>
                    {maxSystemEfficient}
                  </Text>
                  <Text style={styles.capacityLabel}>kW High Efficiency</Text>
                </View>
              </View>

              <Text style={styles.resultNote}>
                * Based on {totalArea} sq ft usable area
              </Text>
            </Animated.View>

            {/* Panel Layout */}
            <Animated.View
              entering={FadeInUp.delay(150)}
              style={styles.layoutCard}
            >
              <Text style={styles.layoutTitle}>Panel Layout Options</Text>

              <View style={styles.layoutItem}>
                <View
                  style={[
                    styles.layoutIcon,
                    { backgroundColor: Colors.warningSoft },
                  ]}
                >
                  <Ionicons name="grid" size={20} color={Colors.warning} />
                </View>
                <View style={styles.layoutInfo}>
                  <Text style={styles.layoutLabel}>
                    Standard Panels ({maxSystemStandard * 4} sq ft each)
                  </Text>
                  <Text style={styles.layoutValue}>
                    ~{Math.floor(totalArea / 40)} panels fit
                  </Text>
                </View>
              </View>

              <View style={styles.layoutItem}>
                <View
                  style={[
                    styles.layoutIcon,
                    { backgroundColor: Colors.ecoSoft },
                  ]}
                >
                  <Ionicons name="grid" size={20} color={Colors.eco} />
                </View>
                <View style={styles.layoutInfo}>
                  <Text style={styles.layoutLabel}>
                    High-Efficiency Panels ({maxSystemEfficient * 4} sq ft each)
                  </Text>
                  <Text style={styles.layoutValue}>
                    ~{Math.floor(totalArea / 30)} panels fit
                  </Text>
                </View>
              </View>
            </Animated.View>

            {/* Suitability Check */}
            <Animated.View
              entering={FadeInUp.delay(200)}
              style={styles.suitabilityCard}
            >
              <Text style={styles.suitabilityTitle}>Feasibility Checklist</Text>
              {suitability.map((item, i) => (
                <View key={i} style={styles.suitabilityItem}>
                  <View
                    style={[
                      styles.suitabilityIcon,
                      {
                        backgroundColor:
                          item.status === "good"
                            ? Colors.ecoSoft
                            : Colors.infoSoft,
                      },
                    ]}
                  >
                    <Ionicons
                      name={item.icon as any}
                      size={16}
                      color={item.status === "good" ? Colors.eco : Colors.info}
                    />
                  </View>
                  <View style={styles.suitabilityInfo}>
                    <Text style={styles.suitabilityLabel}>{item.label}</Text>
                    <Text style={styles.suitabilityValue}>{item.value}</Text>
                  </View>
                  <Ionicons
                    name={
                      item.status === "good"
                        ? "checkmark-circle"
                        : "information-circle"
                    }
                    size={18}
                    color={item.status === "good" ? Colors.eco : Colors.info}
                  />
                </View>
              ))}
            </Animated.View>

            {/* Recommendation */}
            <Animated.View
              entering={FadeInUp.delay(250)}
              style={styles.recommendCard}
            >
              <Ionicons name="bulb" size={24} color={Colors.accent} />
              <View style={styles.recommendText}>
                <Text style={styles.recommendTitle}>Our Recommendation</Text>
                <Text style={styles.recommendDesc}>
                  Your rooftop can support a {maxSystemStandard}-
                  {maxSystemEfficient} kW system.
                  {roofType === "flat"
                    ? " Flat roof is ideal for solar installation."
                    : " Consider elevated mounting for sloped roofs."}
                </Text>
              </View>
            </Animated.View>

            <TouchableOpacity
              style={styles.cta}
              onPress={() => router.push("/dashboard/register")}
            >
              <Ionicons name="calendar" size={18} color="#fff" />
              <Text style={styles.ctaText}>Schedule Site Survey →</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryCta}
              onPress={() => router.push("/calculators/plant-size")}
            >
              <Text style={styles.secondaryCtaText}>Check System Costs →</Text>
            </TouchableOpacity>
          </Animated.View>
        )}

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
    backgroundColor: Colors.dangerSoft,
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.danger,
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
  infoBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: Colors.infoSoft,
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
  },
  infoText: { flex: 1, fontSize: 12, color: Colors.info },
  formCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  formTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 14,
  },
  dimensionRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 12,
    marginBottom: 14,
  },
  dimensionInput: { flex: 1 },
  dimensionX: { paddingBottom: 14 },
  dimensionXText: { fontSize: 20, fontWeight: "600", color: Colors.subText },
  inputLabel: {
    fontSize: 12,
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
  totalArea: {
    backgroundColor: Colors.primarySoft,
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    alignItems: "center",
  },
  totalAreaLabel: { fontSize: 12, color: Colors.primary },
  totalAreaValue: { fontSize: 24, fontWeight: "800", color: Colors.primary },
  sectionLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 8,
  },
  roofTypeGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  roofTypeBtn: {
    flex: 1,
    minWidth: "45%",
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.background,
    alignItems: "center",
    gap: 4,
  },
  roofTypeBtnActive: {
    backgroundColor: Colors.danger,
    borderColor: Colors.danger,
  },
  roofTypeBtnText: { fontSize: 12, fontWeight: "600", color: Colors.text },
  roofTypeBtnTextActive: { color: "#fff" },
  resultCard: {
    backgroundColor: Colors.ecoSoft,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.eco,
  },
  resultHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 14,
  },
  resultHeaderText: { fontSize: 14, fontWeight: "700", color: Colors.eco },
  capacityHighlight: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  capacityItem: { flex: 1, alignItems: "center" },
  capacityValue: { fontSize: 40, fontWeight: "800", color: Colors.warning },
  capacityLabel: { fontSize: 11, color: Colors.subText, marginTop: 4 },
  capacityDivider: { width: 1, height: 50, backgroundColor: Colors.border },
  resultNote: { fontSize: 11, color: Colors.subText, textAlign: "center" },
  layoutCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  layoutTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 12,
  },
  layoutItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  layoutIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  layoutInfo: { flex: 1 },
  layoutLabel: { fontSize: 12, color: Colors.subText },
  layoutValue: { fontSize: 14, fontWeight: "700", color: Colors.text },
  suitabilityCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  suitabilityTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 12,
  },
  suitabilityItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  suitabilityIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  suitabilityInfo: { flex: 1 },
  suitabilityLabel: { fontSize: 12, fontWeight: "600", color: Colors.text },
  suitabilityValue: { fontSize: 11, color: Colors.subText },
  recommendCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: Colors.accentSoft,
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    gap: 12,
    borderWidth: 1,
    borderColor: Colors.accent,
  },
  recommendText: { flex: 1 },
  recommendTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: Colors.accent,
    marginBottom: 4,
  },
  recommendDesc: { fontSize: 12, color: Colors.text, lineHeight: 17 },
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
  secondaryCta: { alignItems: "center", paddingVertical: 12 },
  secondaryCtaText: { fontSize: 14, fontWeight: "600", color: Colors.primary },
});
