// app/calculators/emi.tsx
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

export default function EMICalculator() {
  const router = useRouter();
  const [loanAmount, setLoanAmount] = useState("150000");
  const [tenure, setTenure] = useState("5");
  const [interestRate, setInterestRate] = useState("8.5");

  const principal = Number(loanAmount) || 0;
  const years = Number(tenure) || 1;
  const rate = Number(interestRate) || 1;

  // EMI = [P x R x (1+R)^N] / [(1+R)^N - 1]
  const monthlyRate = rate / 12 / 100;
  const months = years * 12;
  const emi =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1);
  const totalPayment = emi * months;
  const totalInterest = totalPayment - principal;

  const hasResult = principal > 0;

  const tenureOptions = [
    { label: "3 Years", value: "3" },
    { label: "5 Years", value: "5" },
    { label: "7 Years", value: "7" },
    { label: "10 Years", value: "10" },
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
          <Text style={styles.headerTitle}>Solar EMI Calculator</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Hero */}
        <Animated.View entering={FadeInDown.delay(100)} style={styles.heroCard}>
          <Ionicons name="card" size={36} color={Colors.info} />
          <Text style={styles.heroTitle}>Plan Your Solar Finance</Text>
          <Text style={styles.heroSubtitle}>
            Calculate monthly EMI for solar loan with low interest rates
          </Text>
        </Animated.View>

        {/* Info Banner */}
        <Animated.View
          entering={FadeInDown.delay(150)}
          style={styles.infoBanner}
        >
          <Ionicons name="information-circle" size={18} color={Colors.info} />
          <Text style={styles.infoText}>
            Solar loans typically have 6.5% - 9% interest rates with government
            subsidies available
          </Text>
        </Animated.View>

        {/* Form */}
        <Animated.View entering={FadeInDown.delay(200)} style={styles.formCard}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Loan Amount (₹)</Text>
            <View style={styles.inputWrap}>
              <Text style={styles.inputPrefix}>₹</Text>
              <TextInput
                placeholder="e.g. 150000"
                value={loanAmount}
                onChangeText={setLoanAmount}
                keyboardType="numeric"
                style={styles.input}
                placeholderTextColor={Colors.subText}
              />
            </View>
            <Text style={styles.inputHint}>System cost after subsidy</Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Interest Rate (% per annum)</Text>
            <View style={styles.inputWrap}>
              <TextInput
                placeholder="e.g. 8.5"
                value={interestRate}
                onChangeText={setInterestRate}
                keyboardType="numeric"
                style={styles.input}
                placeholderTextColor={Colors.subText}
              />
              <Text style={styles.inputSuffix}>%</Text>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Loan Tenure</Text>
            <View style={styles.tenureGrid}>
              {tenureOptions.map((opt) => (
                <TouchableOpacity
                  key={opt.value}
                  onPress={() => setTenure(opt.value)}
                  style={[
                    styles.tenureBtn,
                    tenure === opt.value && styles.tenureBtnActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.tenureBtnText,
                      tenure === opt.value && styles.tenureBtnTextActive,
                    ]}
                  >
                    {opt.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Quick Amounts */}
          <Text style={styles.quickLabel}>Quick Select Loan Amount:</Text>
          <View style={styles.amountGrid}>
            {[
              { label: "₹1 Lakh", value: "100000" },
              { label: "₹1.5 Lakh", value: "150000" },
              { label: "₹2 Lakh", value: "200000" },
              { label: "₹3 Lakh", value: "300000" },
            ].map((item) => (
              <TouchableOpacity
                key={item.value}
                onPress={() => setLoanAmount(item.value)}
                style={[
                  styles.amountBtn,
                  loanAmount === item.value && styles.amountBtnActive,
                ]}
              >
                <Text
                  style={[
                    styles.amountBtnText,
                    loanAmount === item.value && styles.amountBtnTextActive,
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
            {/* EMI Result */}
            <Animated.View
              entering={FadeInUp.delay(100)}
              style={styles.emiCard}
            >
              <View style={styles.emiHeader}>
                <Ionicons name="wallet" size={24} color={Colors.info} />
                <Text style={styles.emiHeaderText}>Your Monthly EMI</Text>
              </View>

              <View style={styles.emiHighlight}>
                <Text style={styles.emiValue}>
                  ₹{Math.round(emi).toLocaleString()}
                </Text>
                <Text style={styles.emiPeriod}>/month</Text>
              </View>

              <View style={styles.emiBreakdown}>
                <View style={styles.breakdownItem}>
                  <Text style={styles.breakdownLabel}>Principal Amount</Text>
                  <Text style={styles.breakdownValue}>
                    ₹{principal.toLocaleString()}
                  </Text>
                </View>
                <View style={styles.breakdownDivider} />
                <View style={styles.breakdownItem}>
                  <Text style={styles.breakdownLabel}>Total Interest</Text>
                  <Text style={styles.breakdownValue}>
                    ₹{Math.round(totalInterest).toLocaleString()}
                  </Text>
                </View>
                <View style={styles.breakdownDivider} />
                <View style={styles.breakdownItem}>
                  <Text style={styles.breakdownLabel}>Total Payment</Text>
                  <Text style={styles.breakdownValue}>
                    ₹{Math.round(totalPayment).toLocaleString()}
                  </Text>
                </View>
              </View>
            </Animated.View>

            {/* Comparison Card */}
            <Animated.View
              entering={FadeInUp.delay(150)}
              style={styles.comparisonCard}
            >
              <Text style={styles.comparisonTitle}>EMI Comparison</Text>
              <View style={styles.comparisonGrid}>
                <View style={styles.comparisonItem}>
                  <Text style={styles.comparisonLabel}>Without Loan</Text>
                  <Text style={styles.comparisonValue}>₹0/mo</Text>
                </View>
                <View style={styles.comparisonArrow}>
                  <Ionicons
                    name="arrow-forward"
                    size={20}
                    color={Colors.subText}
                  />
                </View>
                <View style={styles.comparisonItem}>
                  <Text style={styles.comparisonLabel}>With EMI</Text>
                  <Text
                    style={[styles.comparisonValue, { color: Colors.info }]}
                  >
                    ₹{Math.round(emi).toLocaleString()}/mo
                  </Text>
                </View>
              </View>
              <View style={styles.savingsNote}>
                <Ionicons
                  name="checkmark-circle"
                  size={14}
                  color={Colors.eco}
                />
                <Text style={styles.savingsNoteText}>
                  Solar savings (₹{Math.round(emi + 1000).toLocaleString()}/mo)
                  exceed EMI!
                </Text>
              </View>
            </Animated.View>

            {/* Tenure Comparison */}
            <Animated.View
              entering={FadeInUp.delay(200)}
              style={styles.tenureCompareCard}
            >
              <Text style={styles.tenureCompareTitle}>
                EMI by Tenure ({tenure} Years)
              </Text>
              <View style={styles.tenureChart}>
                {[
                  {
                    years: "3",
                    emi:
                      (150000 *
                        (8.5 / 12 / 100) *
                        Math.pow(1 + 8.5 / 12 / 100, 36)) /
                      (Math.pow(1 + 8.5 / 12 / 100, 36) - 1),
                  },
                  {
                    years: "5",
                    emi:
                      (150000 *
                        (8.5 / 12 / 100) *
                        Math.pow(1 + 8.5 / 12 / 100, 60)) /
                      (Math.pow(1 + 8.5 / 12 / 100, 60) - 1),
                  },
                  {
                    years: "7",
                    emi:
                      (150000 *
                        (8.5 / 12 / 100) *
                        Math.pow(1 + 8.5 / 12 / 100, 84)) /
                      (Math.pow(1 + 8.5 / 12 / 100, 84) - 1),
                  },
                ].map((item, i) => (
                  <View key={i} style={styles.tenureChartItem}>
                    <Text style={styles.tenureChartYears}>{item.years}yr</Text>
                    <View
                      style={[
                        styles.tenureBar,
                        { height: Math.max(20, (item.emi / 6000) * 40) },
                      ]}
                    />
                    <Text style={styles.tenureChartEMI}>
                      ₹{Math.round(item.emi)}
                    </Text>
                  </View>
                ))}
              </View>
            </Animated.View>

            <TouchableOpacity
              style={styles.cta}
              onPress={() => router.push("/dashboard/register")}
            >
              <Ionicons name="document-text" size={18} color="#fff" />
              <Text style={styles.ctaText}>Apply for Solar Loan →</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryCta}
              onPress={() => router.push("/calculators/savings")}
            >
              <Text style={styles.secondaryCtaText}>Check Savings First →</Text>
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
    backgroundColor: Colors.infoSoft,
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.info,
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
  tenureGrid: { flexDirection: "row", gap: 8 },
  tenureBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.background,
    alignItems: "center",
  },
  tenureBtnActive: { backgroundColor: Colors.info, borderColor: Colors.info },
  tenureBtnText: { fontSize: 12, fontWeight: "600", color: Colors.text },
  tenureBtnTextActive: { color: "#fff" },
  quickLabel: { fontSize: 12, color: Colors.subText, marginBottom: 8 },
  amountGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  amountBtn: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.background,
  },
  amountBtnActive: {
    backgroundColor: Colors.primarySoft,
    borderColor: Colors.primary,
  },
  amountBtnText: { fontSize: 12, fontWeight: "600", color: Colors.text },
  amountBtnTextActive: { color: Colors.primary },
  emiCard: {
    backgroundColor: Colors.infoSoft,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.info,
  },
  emiHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  emiHeaderText: { fontSize: 14, fontWeight: "700", color: Colors.info },
  emiHighlight: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "center",
    marginBottom: 14,
  },
  emiValue: { fontSize: 40, fontWeight: "800", color: Colors.info },
  emiPeriod: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.info,
    marginLeft: 4,
  },
  emiBreakdown: { backgroundColor: "#fff", borderRadius: 12, padding: 12 },
  breakdownItem: { alignItems: "center", paddingVertical: 8 },
  breakdownDivider: { height: 1, backgroundColor: Colors.border },
  breakdownLabel: { fontSize: 11, color: Colors.subText },
  breakdownValue: { fontSize: 15, fontWeight: "700", color: Colors.text },
  comparisonCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  comparisonTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 10,
  },
  comparisonGrid: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  comparisonItem: { flex: 1, alignItems: "center" },
  comparisonArrow: { paddingHorizontal: 10 },
  comparisonLabel: { fontSize: 11, color: Colors.subText },
  comparisonValue: { fontSize: 16, fontWeight: "700", color: Colors.text },
  savingsNote: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: Colors.ecoSoft,
    padding: 10,
    borderRadius: 8,
  },
  savingsNoteText: { flex: 1, fontSize: 12, color: Colors.eco },
  tenureCompareCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  tenureCompareTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 12,
  },
  tenureChart: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    height: 100,
  },
  tenureChartItem: { alignItems: "center" },
  tenureChartYears: { fontSize: 11, color: Colors.subText, marginBottom: 4 },
  tenureBar: {
    width: 40,
    backgroundColor: Colors.primarySoft,
    borderRadius: 4,
    marginBottom: 4,
  },
  tenureChartEMI: { fontSize: 11, fontWeight: "600", color: Colors.text },
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
