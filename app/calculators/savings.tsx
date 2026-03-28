// app/calculators/savings.tsx
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

export default function SavingsCalculator() {
  const router = useRouter();
  const [bill, setBill] = useState("");
  const [solarSize, setSolarSize] = useState("");

  const monthlyBill = Number(bill) || 0;
  const solarBill = Math.max(monthlyBill * 0.1, 300);
  const monthlySaving = monthlyBill - solarBill;
  const yearlySaving = monthlySaving * 12;

  const hasResult = bill && solarSize && Number(bill) > 0;

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
          <Text style={styles.headerTitle}>Solar Savings Calculator</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Hero */}
        <Animated.View entering={FadeInDown.delay(100)} style={styles.heroCard}>
          <Ionicons name="trending-down" size={36} color={Colors.eco} />
          <Text style={styles.heroTitle}>Calculate Your Savings</Text>
          <Text style={styles.heroSubtitle}>
            See how much you can reduce your electricity bill with solar
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
                value={bill}
                onChangeText={setBill}
                keyboardType="numeric"
                style={styles.input}
                placeholderTextColor={Colors.subText}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Solar System Size</Text>
            <View style={styles.inputWrap}>
              <TextInput
                placeholder="e.g. 5"
                value={solarSize}
                onChangeText={setSolarSize}
                keyboardType="numeric"
                style={styles.input}
                placeholderTextColor={Colors.subText}
              />
              <Text style={styles.inputSuffix}>kW</Text>
            </View>
          </View>

          <Text style={styles.quickLabel}>Quick Select:</Text>
          <View style={styles.sizeGrid}>
            {[1, 2, 3, 5, 10].map((s) => (
              <TouchableOpacity
                key={s}
                onPress={() => setSolarSize(String(s))}
                style={[
                  styles.sizeBtn,
                  solarSize === String(s) && styles.sizeBtnActive,
                ]}
              >
                <Text
                  style={[
                    styles.sizeBtnText,
                    solarSize === String(s) && styles.sizeBtnTextActive,
                  ]}
                >
                  {s} kW
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>

        {/* Results */}
        {hasResult && (
          <Animated.View entering={FadeInUp}>
            <Animated.View
              entering={FadeInUp.delay(100)}
              style={styles.savingsCard}
            >
              <View style={styles.savingsHeader}>
                <Ionicons name="wallet" size={24} color={Colors.eco} />
                <Text style={styles.savingsHeaderText}>Your Solar Savings</Text>
              </View>

              <View style={styles.compareRow}>
                <View style={styles.compareItem}>
                  <Text style={styles.compareLabel}>Before Solar</Text>
                  <Text style={styles.compareOld}>₹{monthlyBill}</Text>
                  <Text style={styles.comparePeriod}>/month</Text>
                </View>
                <View style={styles.compareArrow}>
                  <Ionicons name="arrow-forward" size={20} color={Colors.eco} />
                </View>
                <View style={styles.compareItem}>
                  <Text style={styles.compareLabel}>After Solar</Text>
                  <Text style={styles.compareNew}>₹{solarBill}</Text>
                  <Text style={styles.comparePeriod}>/month</Text>
                </View>
              </View>

              <View style={styles.savingHighlight}>
                <Text style={styles.savingAmount}>₹{monthlySaving}</Text>
                <Text style={styles.savingPeriod}>/month saved</Text>
              </View>

              <View style={styles.yearlyRow}>
                <View style={styles.yearlyItem}>
                  <Text style={styles.yearlyLabel}>Yearly Saving</Text>
                  <Text style={styles.yearlyValue}>
                    ₹{yearlySaving.toLocaleString()}
                  </Text>
                </View>
                <View style={styles.yearlyDivider} />
                <View style={styles.yearlyItem}>
                  <Text style={styles.yearlyLabel}>25-Year Saving</Text>
                  <Text style={styles.yearlyValue}>
                    ₹{(yearlySaving * 25).toLocaleString()}
                  </Text>
                </View>
              </View>
            </Animated.View>

            <TouchableOpacity
              style={styles.cta}
              onPress={() => router.push("/dashboard/register")}
            >
              <Ionicons name="rocket" size={18} color="#fff" />
              <Text style={styles.ctaText}>Get This System Installed →</Text>
            </TouchableOpacity>
          </Animated.View>
        )}

        <View style={{ height: 30 }} />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
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
  headerTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: Colors.text,
  },
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
  inputGroup: {
    marginBottom: 14,
  },
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
  inputPrefix: {
    fontSize: 16,
    color: Colors.subText,
    marginRight: 4,
  },
  inputSuffix: {
    fontSize: 14,
    color: Colors.subText,
    marginLeft: 4,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: Colors.text,
    paddingVertical: 14,
    paddingHorizontal: 8,
  },
  quickLabel: {
    fontSize: 12,
    color: Colors.subText,
    marginBottom: 8,
  },
  sizeGrid: {
    flexDirection: "row",
    gap: 8,
  },
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
  sizeBtnText: {
    fontSize: 13,
    fontWeight: "600",
    color: Colors.text,
  },
  sizeBtnTextActive: {
    color: "#fff",
  },
  savingsCard: {
    backgroundColor: Colors.ecoSoft,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.eco,
  },
  savingsHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 14,
  },
  savingsHeaderText: {
    fontSize: 15,
    fontWeight: "700",
    color: Colors.eco,
  },
  compareRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  compareItem: {
    alignItems: "center",
    flex: 1,
  },
  compareArrow: {
    paddingHorizontal: 10,
  },
  compareLabel: {
    fontSize: 11,
    color: Colors.subText,
    marginBottom: 3,
  },
  compareOld: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.text,
    textDecorationLine: "line-through",
  },
  compareNew: {
    fontSize: 18,
    fontWeight: "800",
    color: Colors.eco,
  },
  comparePeriod: {
    fontSize: 10,
    color: Colors.subText,
  },
  savingHighlight: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
    gap: 6,
  },
  savingAmount: {
    fontSize: 32,
    fontWeight: "800",
    color: Colors.eco,
  },
  savingPeriod: {
    fontSize: 14,
    color: Colors.eco,
    fontWeight: "600",
  },
  yearlyRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  yearlyItem: {
    flex: 1,
    alignItems: "center",
  },
  yearlyDivider: {
    width: 1,
    height: 30,
    backgroundColor: Colors.border,
  },
  yearlyLabel: {
    fontSize: 11,
    color: Colors.subText,
    marginBottom: 3,
  },
  yearlyValue: {
    fontSize: 15,
    fontWeight: "700",
    color: Colors.text,
  },
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
  ctaText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#fff",
  },
});
