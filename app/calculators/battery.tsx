// app/calculators/battery.tsx
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

export default function BatteryCalculator() {
  const router = useRouter();
  const [appliances, setAppliances] = useState("");
  const [backupHours, setBackupHours] = useState("4");

  const apps = Number(appliances) || 1000; // watts
  const hours = Number(backupHours) || 1;

  // Battery calculation
  const totalWh = apps * hours;
  const batteryAh = totalWh / 48; // For 48V system
  const batteryCost = Math.ceil(batteryAh / 100) * 80000; // ₹80,000 per 100Ah

  const backupOptions = [
    { label: "2 Hours", value: "2", icon: "time-outline" },
    { label: "4 Hours", value: "4", icon: "time-outline" },
    { label: "6 Hours", value: "6", icon: "time-outline" },
    { label: "8 Hours", value: "8", icon: "time-outline" },
  ];

  const batteryTypes = [
    {
      name: "Lead Acid",
      efficiency: "80%",
      life: "3-5 years",
      cost: "₹",
      color: Colors.subText,
    },
    {
      name: "Lithium (LFP)",
      efficiency: "95%",
      life: "10-15 years",
      cost: "₹₹",
      color: Colors.eco,
    },
    {
      name: "Lithium (NMC)",
      efficiency: "90%",
      life: "5-8 years",
      cost: "₹₹",
      color: Colors.info,
    },
  ];

  const hasResult = appliances !== "";

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
          <Text style={styles.headerTitle}>Battery Backup Calculator</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Hero */}
        <Animated.View entering={FadeInDown.delay(100)} style={styles.heroCard}>
          <Ionicons name="battery-charging" size={36} color="#9333EA" />
          <Text style={styles.heroTitle}>Calculate Battery Needs</Text>
          <Text style={styles.heroSubtitle}>
            Find the right battery storage for your power backup requirements
          </Text>
        </Animated.View>

        {/* Info Banner */}
        <Animated.View
          entering={FadeInDown.delay(150)}
          style={styles.infoBanner}
        >
          <Ionicons name="bulb" size={18} color={Colors.accent} />
          <Text style={styles.infoText}>
            Most homes need 2-4 hours backup. Lithium batteries are recommended
            for long-term savings.
          </Text>
        </Animated.View>

        {/* Form */}
        <Animated.View entering={FadeInDown.delay(200)} style={styles.formCard}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>
              Total Load During Backup (Watts)
            </Text>
            <View style={styles.inputWrap}>
              <TextInput
                placeholder="e.g. 1000"
                value={appliances}
                onChangeText={setAppliances}
                keyboardType="numeric"
                style={styles.input}
                placeholderTextColor={Colors.subText}
              />
              <Text style={styles.inputSuffix}>W</Text>
            </View>
            <Text style={styles.inputHint}>
              Sum of watts for appliances you want to run during backup
            </Text>
          </View>

          {/* Common Load Presets */}
          <Text style={styles.quickLabel}>Common Load Presets:</Text>
          <View style={styles.presetGrid}>
            {[
              { label: "Lights + Fan", value: "500" },
              { label: "TV + Lights", value: "800" },
              { label: "Full House", value: "1500" },
              { label: "AC + More", value: "3000" },
            ].map((item) => (
              <TouchableOpacity
                key={item.value}
                onPress={() => setAppliances(item.value)}
                style={[
                  styles.presetBtn,
                  appliances === item.value && styles.presetBtnActive,
                ]}
              >
                <Text
                  style={[
                    styles.presetBtnText,
                    appliances === item.value && styles.presetBtnTextActive,
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Backup Duration */}
          <Text style={styles.sectionLabel}>Required Backup Duration</Text>
          <View style={styles.durationGrid}>
            {backupOptions.map((opt) => (
              <TouchableOpacity
                key={opt.value}
                onPress={() => setBackupHours(opt.value)}
                style={[
                  styles.durationBtn,
                  backupHours === opt.value && styles.durationBtnActive,
                ]}
              >
                <Ionicons
                  name={opt.icon as any}
                  size={20}
                  color={backupHours === opt.value ? "#fff" : Colors.subText}
                />
                <Text
                  style={[
                    styles.durationBtnText,
                    backupHours === opt.value && styles.durationBtnTextActive,
                  ]}
                >
                  {opt.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>

        {/* Results */}
        {hasResult && (
          <Animated.View entering={FadeInUp}>
            {/* Battery Requirement */}
            <Animated.View
              entering={FadeInUp.delay(100)}
              style={styles.resultCard}
            >
              <View style={styles.resultHeader}>
                <Ionicons name="battery-full" size={24} color="#9333EA" />
                <Text style={styles.resultHeaderText}>
                  Recommended Battery Setup
                </Text>
              </View>

              <View style={styles.batteryHighlight}>
                <Text style={styles.batteryValue}>{Math.ceil(batteryAh)}</Text>
                <Text style={styles.batteryUnit}>Ah</Text>
              </View>
              <Text style={styles.batteryNote}>at 48V system voltage</Text>

              <View style={styles.specsGrid}>
                <View style={styles.specItem}>
                  <Ionicons name="flash" size={18} color={Colors.accent} />
                  <Text style={styles.specValue}>{totalWh} Wh</Text>
                  <Text style={styles.specLabel}>Total Energy</Text>
                </View>
                <View style={styles.specItem}>
                  <Ionicons name="time" size={18} color={Colors.info} />
                  <Text style={styles.specValue}>{hours} Hours</Text>
                  <Text style={styles.specLabel}>Backup Time</Text>
                </View>
              </View>
            </Animated.View>

            {/* Battery Types */}
            <Animated.View
              entering={FadeInUp.delay(150)}
              style={styles.typesCard}
            >
              <Text style={styles.typesTitle}>Battery Type Comparison</Text>
              {batteryTypes.map((type, i) => (
                <View key={i} style={styles.typeItem}>
                  <View
                    style={[
                      styles.typeIndicator,
                      { backgroundColor: type.color },
                    ]}
                  />
                  <View style={styles.typeInfo}>
                    <Text style={styles.typeName}>{type.name}</Text>
                    <Text style={styles.typeSpecs}>
                      {type.efficiency} efficiency • {type.life}
                    </Text>
                  </View>
                  <View style={styles.typeCost}>
                    <Text style={[styles.typeCostText, { color: type.color }]}>
                      {type.cost}
                    </Text>
                    <Text style={styles.typeCostLabel}>Cost</Text>
                  </View>
                </View>
              ))}
            </Animated.View>

            {/* Cost Estimate */}
            <Animated.View
              entering={FadeInUp.delay(200)}
              style={styles.costCard}
            >
              <Text style={styles.costTitle}>Estimated Battery Cost</Text>
              <Text style={styles.costValue}>
                ₹{batteryCost.toLocaleString()}
              </Text>
              <Text style={styles.costNote}>
                For Lithium (LFP) battery system
              </Text>

              <View style={styles.costBreakdown}>
                <View style={styles.costItem}>
                  <Text style={styles.costItemLabel}>Lead Acid</Text>
                  <Text style={styles.costItemValue}>
                    ₹{(batteryCost * 0.5).toLocaleString()}
                  </Text>
                </View>
                <View style={styles.costItem}>
                  <Text style={styles.costItemLabel}>Lithium NMC</Text>
                  <Text style={styles.costItemValue}>
                    ₹{(batteryCost * 0.9).toLocaleString()}
                  </Text>
                </View>
                <View style={styles.costItem}>
                  <Text style={styles.costItemLabel}>Lithium LFP</Text>
                  <Text style={[styles.costItemValue, { color: Colors.eco }]}>
                    ₹{batteryCost.toLocaleString()}
                  </Text>
                </View>
              </View>
            </Animated.View>

            {/* Solar Integration Note */}
            <Animated.View
              entering={FadeInUp.delay(250)}
              style={styles.integrationCard}
            >
              <Ionicons name="sunny" size={24} color={Colors.accent} />
              <View style={styles.integrationText}>
                <Text style={styles.integrationTitle}>Combine with Solar</Text>
                <Text style={styles.integrationDesc}>
                  Add battery backup to your solar system for 24/7 power
                  independence
                </Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={Colors.subText}
              />
            </Animated.View>

            <TouchableOpacity
              style={styles.cta}
              onPress={() => router.push("/dashboard/register")}
            >
              <Ionicons name="battery-charging" size={18} color="#fff" />
              <Text style={styles.ctaText}>Get Battery Quote →</Text>
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
    backgroundColor: "#F3E8FF",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#9333EA",
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
    backgroundColor: Colors.accentSoft,
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
  },
  infoText: { flex: 1, fontSize: 12, color: Colors.accent },
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
  inputPrefix: { fontSize: 16, color: Colors.subText, marginRight: 4 },
  inputSuffix: { fontSize: 14, color: Colors.subText, marginLeft: 4 },
  input: {
    flex: 1,
    fontSize: 16,
    color: Colors.text,
    paddingVertical: 14,
    paddingHorizontal: 8,
  },
  inputHint: { fontSize: 11, color: Colors.subText, marginTop: 4 },
  quickLabel: { fontSize: 12, color: Colors.subText, marginBottom: 8 },
  presetGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },
  presetBtn: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.background,
  },
  presetBtnActive: {
    backgroundColor: Colors.primarySoft,
    borderColor: Colors.primary,
  },
  presetBtnText: { fontSize: 12, fontWeight: "600", color: Colors.text },
  presetBtnTextActive: { color: Colors.primary },
  sectionLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 8,
  },
  durationGrid: { flexDirection: "row", gap: 8 },
  durationBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.background,
    alignItems: "center",
    gap: 4,
  },
  durationBtnActive: { backgroundColor: "#9333EA", borderColor: "#9333EA" },
  durationBtnText: { fontSize: 11, fontWeight: "600", color: Colors.text },
  durationBtnTextActive: { color: "#fff" },
  resultCard: {
    backgroundColor: "#F3E8FF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#9333EA",
  },
  resultHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  resultHeaderText: { fontSize: 14, fontWeight: "700", color: "#9333EA" },
  batteryHighlight: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "center",
    marginBottom: 4,
  },
  batteryValue: { fontSize: 48, fontWeight: "800", color: "#9333EA" },
  batteryUnit: {
    fontSize: 24,
    fontWeight: "700",
    color: "#9333EA",
    marginLeft: 4,
  },
  batteryNote: {
    fontSize: 12,
    color: Colors.subText,
    textAlign: "center",
    marginBottom: 14,
  },
  specsGrid: { flexDirection: "row", gap: 12 },
  specItem: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
  },
  specValue: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.text,
    marginTop: 4,
  },
  specLabel: { fontSize: 11, color: Colors.subText },
  typesCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  typesTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 10,
  },
  typeItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  typeIndicator: { width: 4, height: 36, borderRadius: 2, marginRight: 12 },
  typeInfo: { flex: 1 },
  typeName: { fontSize: 13, fontWeight: "600", color: Colors.text },
  typeSpecs: { fontSize: 11, color: Colors.subText },
  typeCost: { alignItems: "center" },
  typeCostText: { fontSize: 14, fontWeight: "700" },
  typeCostLabel: { fontSize: 10, color: Colors.subText },
  costCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  costTitle: {
    fontSize: 13,
    color: Colors.subText,
    textAlign: "center",
    marginBottom: 4,
  },
  costValue: {
    fontSize: 28,
    fontWeight: "800",
    color: Colors.text,
    textAlign: "center",
  },
  costNote: {
    fontSize: 11,
    color: Colors.subText,
    textAlign: "center",
    marginBottom: 12,
  },
  costBreakdown: {
    flexDirection: "row",
    backgroundColor: Colors.background,
    borderRadius: 10,
    padding: 10,
  },
  costItem: { flex: 1, alignItems: "center" },
  costItemLabel: { fontSize: 10, color: Colors.subText, marginBottom: 2 },
  costItemValue: { fontSize: 13, fontWeight: "700", color: Colors.text },
  integrationCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.accentSoft,
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    gap: 12,
    borderWidth: 1,
    borderColor: Colors.accent,
  },
  integrationText: { flex: 1 },
  integrationTitle: { fontSize: 13, fontWeight: "700", color: Colors.text },
  integrationDesc: { fontSize: 11, color: Colors.subText },
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
