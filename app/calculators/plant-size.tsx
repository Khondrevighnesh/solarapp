// app/calculators/plant-size.tsx
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

export default function PlantSizeCalculator() {
  const router = useRouter();
  const [monthlyBill, setMonthlyBill] = useState("");
  const [roofArea, setRoofArea] = useState("");
  const [appliances, setAppliances] = useState("");

  const bill = Number(monthlyBill) || 0;
  const roof = Number(roofArea) || 0;

  // Calculate recommended system size based on bill
  const recommendedSize =
    bill >= 10000 ? 10 : bill >= 5000 ? 5 : bill >= 3000 ? 3 : 1;
  const panelsNeeded = Math.ceil(recommendedSize / 0.5); // 0.5kW per panel
  const areaRequired = panelsNeeded * 15; // 15 sq ft per panel
  const systemCost = recommendedSize * 50000; // ₹50,000 per kW

  const hasResult = bill > 0;

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
          <Text style={styles.headerTitle}>Plant Size Calculator</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Hero */}
        <Animated.View entering={FadeInDown.delay(100)} style={styles.heroCard}>
          <Ionicons name="flash" size={36} color={Colors.accent} />
          <Text style={styles.heroTitle}>Find Your Right System Size</Text>
          <Text style={styles.heroSubtitle}>
            Get recommended solar capacity based on your electricity usage and
            roof space
          </Text>
        </Animated.View>

        {/* Form */}
        <Animated.View entering={FadeInDown.delay(150)} style={styles.formCard}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Monthly Electricity Bill</Text>
            <View style={styles.inputWrap}>
              <Text style={styles.inputPrefix}>₹</Text>
              <TextInput
                placeholder="e.g. 5000"
                value={monthlyBill}
                onChangeText={setMonthlyBill}
                keyboardType="numeric"
                style={styles.input}
                placeholderTextColor={Colors.subText}
              />
            </View>
            <Text style={styles.inputHint}>
              Average monthly bill helps estimate system size
            </Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Available Roof Area (sq ft)</Text>
            <View style={styles.inputWrap}>
              <TextInput
                placeholder="e.g. 300"
                value={roofArea}
                onChangeText={setRoofArea}
                keyboardType="numeric"
                style={styles.input}
                placeholderTextColor={Colors.subText}
              />
              <Text style={styles.inputSuffix}>sq ft</Text>
            </View>
            <Text style={styles.inputHint}>
              Rough estimate of usable roof space
            </Text>
          </View>

          {/* Quick Bill Select */}
          <Text style={styles.quickLabel}>Quick Select Bill Range:</Text>
          <View style={styles.billGrid}>
            {[
              { label: "< ₹3,000", value: "2000" },
              { label: "₹3-5k", value: "4000" },
              { label: "₹5-10k", value: "7000" },
              { label: "₹10k+", value: "12000" },
            ].map((item) => (
              <TouchableOpacity
                key={item.value}
                onPress={() => setMonthlyBill(item.value)}
                style={[
                  styles.billBtn,
                  monthlyBill === item.value && styles.billBtnActive,
                ]}
              >
                <Text
                  style={[
                    styles.billBtnText,
                    monthlyBill === item.value && styles.billBtnTextActive,
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>

        {/* Results */}
        {hasResult && (
          <Animated.View entering={FadeInUp}>
            {/* Recommendation Card */}
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
                  Recommended System Size
                </Text>
              </View>

              <View style={styles.sizeHighlight}>
                <Text style={styles.sizeValue}>{recommendedSize}</Text>
                <Text style={styles.sizeUnit}>kW</Text>
              </View>

              <View style={styles.specsGrid}>
                <View style={styles.specItem}>
                  <Ionicons name="grid" size={18} color={Colors.accent} />
                  <Text style={styles.specValue}>{panelsNeeded} Panels</Text>
                  <Text style={styles.specLabel}>350W each</Text>
                </View>
                <View style={styles.specItem}>
                  <Ionicons name="resize" size={18} color={Colors.info} />
                  <Text style={styles.specValue}>{areaRequired} sq ft</Text>
                  <Text style={styles.specLabel}>Area needed</Text>
                </View>
              </View>

              {roof > 0 && roof < areaRequired && (
                <View style={styles.warningBox}>
                  <Ionicons name="warning" size={16} color={Colors.warning} />
                  <Text style={styles.warningText}>
                    Your roof area may be insufficient. Consider ground-mounted
                    or larger efficiency panels.
                  </Text>
                </View>
              )}
            </Animated.View>

            {/* Cost Estimate */}
            <Animated.View
              entering={FadeInUp.delay(150)}
              style={styles.costCard}
            >
              <Text style={styles.costTitle}>Estimated System Cost</Text>
              <Text style={styles.costValue}>
                ₹{systemCost.toLocaleString()}
              </Text>
              <Text style={styles.costNote}>Before government subsidy</Text>

              <View style={styles.subsidyBox}>
                <Ionicons name="gift" size={18} color={Colors.eco} />
                <Text style={styles.subsidyText}>
                  After 40% subsidy: ₹{(systemCost * 0.6).toLocaleString()}
                </Text>
              </View>
            </Animated.View>

            {/* Capacity Range */}
            <Animated.View
              entering={FadeInUp.delay(200)}
              style={styles.rangeCard}
            >
              <Text style={styles.rangeTitle}>Available Capacity Options</Text>
              <View style={styles.rangeOptions}>
                {[
                  {
                    size: recommendedSize - 1,
                    cost: (recommendedSize - 1) * 50000,
                  },
                  { size: recommendedSize, cost: recommendedSize * 50000 },
                  {
                    size: recommendedSize + 2,
                    cost: (recommendedSize + 2) * 50000,
                  },
                ].map((option, i) => (
                  <TouchableOpacity
                    key={i}
                    style={[
                      styles.rangeOption,
                      i === 1 && styles.rangeOptionActive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.rangeSize,
                        i === 1 && styles.rangeSizeActive,
                      ]}
                    >
                      {option.size} kW
                    </Text>
                    <Text style={styles.rangeCost}>
                      ₹{((option.cost * 0.6) / 100000).toFixed(1)}L*
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </Animated.View>

            <TouchableOpacity
              style={styles.cta}
              onPress={() => router.push("/dashboard/register")}
            >
              <Ionicons name="chatbubbles" size={18} color="#fff" />
              <Text style={styles.ctaText}>Get Exact Quote →</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryCta}
              onPress={() => router.push("/calculators/emi")}
            >
              <Text style={styles.secondaryCtaText}>Check EMI Options →</Text>
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
    backgroundColor: Colors.accentSoft,
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.accent,
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
  billGrid: { flexDirection: "row", gap: 8 },
  billBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.background,
    alignItems: "center",
  },
  billBtnActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  billBtnText: { fontSize: 12, fontWeight: "600", color: Colors.text },
  billBtnTextActive: { color: "#fff" },
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
    marginBottom: 12,
  },
  resultHeaderText: { fontSize: 14, fontWeight: "700", color: Colors.eco },
  sizeHighlight: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "center",
    marginBottom: 14,
  },
  sizeValue: { fontSize: 48, fontWeight: "800", color: Colors.eco },
  sizeUnit: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.eco,
    marginLeft: 4,
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
  warningBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: Colors.warningSoft,
    borderRadius: 10,
    padding: 12,
    marginTop: 12,
  },
  warningText: { flex: 1, fontSize: 12, color: Colors.warning },
  costCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.border,
  },
  costTitle: { fontSize: 13, color: Colors.subText, marginBottom: 4 },
  costValue: { fontSize: 28, fontWeight: "800", color: Colors.text },
  costNote: { fontSize: 11, color: Colors.subText, marginBottom: 10 },
  subsidyBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: Colors.ecoSoft,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  subsidyText: { fontSize: 13, fontWeight: "700", color: Colors.eco },
  rangeCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  rangeTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 10,
  },
  rangeOptions: { flexDirection: "row", gap: 8 },
  rangeOption: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: "center",
  },
  rangeOptionActive: {
    backgroundColor: Colors.primarySoft,
    borderColor: Colors.primary,
  },
  rangeSize: { fontSize: 14, fontWeight: "600", color: Colors.text },
  rangeSizeActive: { color: Colors.primary },
  rangeCost: { fontSize: 11, color: Colors.subText, marginTop: 2 },
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
