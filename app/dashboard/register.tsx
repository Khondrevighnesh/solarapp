import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";

import Screen from "../components/Screen";
import { Colors } from "../theme/colors";

export default function RegisterSolar() {
  const [formData, setFormData] = useState({
    // ─── Personal Details ───
    fullName: "",
    mobile: "",
    email: "",

    // ─── Plant Specifications ───
    plantCity: "",
    plantState: "",
    acCapacity: "",
    dcCapacity: "",
    moduleWattPeak: "",
    numberOfModules: "", // auto‑calculated
    inverterMake: "",
    numberOfInverters: "",
    moduleMake: "",
    consumerNumber: "",
    installationType: "",
    installationDate: "",
    billPhoto: null as string | null, // filename or URI

    // ─── Monitoring Credentials (Optional) ───
    monitoringPlatform: "",
    monitoringUsername: "",
    monitoringPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  // ─── Options for selects ───
  const installationTypes = [
    "Roof Top – Residential",
    "Roof Top – Commercial",
    "Ground Mount",
    "Hybrid System",
    "Other",
  ];

  const monitoringPlatforms = [
    "SolarEdge",
    "Huawei",
    "Fronius",
    "SMA",
    "Other / None",
  ];

  /**
   * Auto‑calculate Number of Modules
   * Formula: ceil( (DC Capacity kWp * 1000) / Module Watt Peak Wp )
   */
  useEffect(() => {
    const dc = parseFloat(formData.dcCapacity);
    const wp = parseFloat(formData.moduleWattPeak);

    if (dc > 0 && wp > 0) {
      const calculated = Math.ceil((dc * 1000) / wp);
      setFormData((prev) => ({
        ...prev,
        numberOfModules: calculated.toString(),
      }));
    } else {
      setFormData((prev) => ({ ...prev, numberOfModules: "" }));
    }
  }, [formData.dcCapacity, formData.moduleWattPeak]);

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Mock file picker – replace with expo-document-picker / react-native-document-picker in production
  const handlePickBillPhoto = () => {
    // Simulate picking a file
    Alert.alert(
      "Choose File",
      "This is a mock file picker.\n\nIn production, integrate a document picker here.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Select Sample Bill",
          onPress: () =>
            updateField("billPhoto", "electricity_bill_jan2026.pdf"),
        },
      ],
    );
  };

  const validate = () => {
    // Personal Details
    if (!formData.fullName.trim()) return "Please enter your full name";
    if (!/^\d{10}$/.test(formData.mobile))
      return "Mobile number must be exactly 10 digits";
    if (!formData.email.includes("@") || !formData.email.trim())
      return "Please enter a valid email address";

    // Plant Specifications
    if (!formData.plantCity.trim()) return "Please enter Plant City";
    if (!formData.plantState.trim()) return "Please enter Plant State";
    if (!formData.acCapacity.trim()) return "Please enter AC Capacity (kW)";
    if (!formData.dcCapacity.trim()) return "Please enter DC Capacity (kWp)";
    if (!formData.moduleWattPeak.trim())
      return "Please enter Module Watt Peak (Wp)";
    if (!formData.numberOfModules)
      return "Number of Modules could not be calculated";
    if (!formData.inverterMake.trim()) return "Please enter Inverter Make";
    if (!formData.numberOfInverters.trim())
      return "Please enter Number of Inverters";
    if (!formData.moduleMake.trim()) return "Please enter Module Make";
    if (!formData.consumerNumber.trim()) return "Please enter Consumer Number";
    if (!formData.installationType) return "Please select Installation Type";
    if (!formData.installationDate.trim())
      return "Please select Installation Date";
    if (!formData.billPhoto) return "Please upload Electricity Bill Photo";

    // Monitoring Credentials (only if any field is filled)
    const anyMonitoringFilled =
      formData.monitoringPlatform.trim() ||
      formData.monitoringUsername.trim() ||
      formData.monitoringPassword.trim() ||
      formData.confirmPassword.trim();

    if (anyMonitoringFilled) {
      if (!formData.monitoringPlatform.trim())
        return "Please enter Monitoring Platform";
      if (!formData.monitoringUsername.trim())
        return "Please enter Monitoring Username";
      if (!formData.monitoringPassword.trim())
        return "Please enter Monitoring Password";
      if (formData.monitoringPassword !== formData.confirmPassword)
        return "Passwords do not match";
    }

    return null;
  };

  const handleSubmit = async () => {
    const error = validate();
    if (error) {
      Alert.alert("Missing Information", error);
      return;
    }

    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);

    Alert.alert(
      "Registration Successful! ✅",
      "Thank you for registering your solar plant.\n\nOur team will verify your details and contact you within 24 hours.",
      [
        {
          text: "OK",
          onPress: () => {
            // Reset form
            setFormData({
              fullName: "",
              mobile: "",
              email: "",
              plantCity: "",
              plantState: "",
              acCapacity: "",
              dcCapacity: "",
              moduleWattPeak: "",
              numberOfModules: "",
              inverterMake: "",
              numberOfInverters: "",
              moduleMake: "",
              consumerNumber: "",
              installationType: "",
              installationDate: "",
              billPhoto: null,
              monitoringPlatform: "",
              monitoringUsername: "",
              monitoringPassword: "",
              confirmPassword: "",
            });
          },
        },
      ],
    );
  };

  return (
    <Screen>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* ═══ HEADER ═══ */}
            <Animated.View
              entering={FadeInDown.delay(100)}
              style={styles.header}
            >
              <View style={styles.logoIcon}>
                <Ionicons name="sunny" size={32} color={Colors.accent} />
              </View>
              <Text style={styles.headerTitle}>Solar Plant Registration</Text>
              <Text style={styles.headerSubtitle}>
                Register your plant for expert support & monitoring
              </Text>
            </Animated.View>

            {/* ═══ PERSONAL DETAILS ═══ */}
            <Animated.View entering={FadeInDown.delay(200)}>
              <SectionHeader icon="person" title="Personal Details" />
              <View style={styles.card}>
                <InputField
                  label="Full Name *"
                  icon="person-outline"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChangeText={(t) => updateField("fullName", t)}
                />

                <View style={styles.row}>
                  <View style={{ flex: 1, marginRight: 10 }}>
                    <Text style={styles.inputLabel}>Mobile Number *</Text>
                    <View style={styles.inputWrap}>
                      <Text style={styles.phoneCode}>+91</Text>
                      <TextInput
                        placeholder="10-digit mobile number"
                        placeholderTextColor={Colors.subText}
                        style={styles.input}
                        value={formData.mobile}
                        onChangeText={(t) => updateField("mobile", t)}
                        keyboardType="number-pad"
                        maxLength={10}
                      />
                    </View>
                  </View>
                  <View style={{ flex: 1 }}>
                    <InputField
                      label="Email Address *"
                      icon="mail-outline"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChangeText={(t) => updateField("email", t)}
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                  </View>
                </View>
              </View>
            </Animated.View>

            {/* ═══ PLANT SPECIFICATIONS ═══ */}
            <Animated.View entering={FadeInDown.delay(250)}>
              <SectionHeader
                icon="hardware-chip"
                title="Plant Specifications"
              />
              <View style={styles.card}>
                {/* Plant Location */}
                <View style={styles.row}>
                  <View style={{ flex: 1, marginRight: 10 }}>
                    <InputField
                      label="Plant Location – City *"
                      icon="location-outline"
                      placeholder="City"
                      value={formData.plantCity}
                      onChangeText={(t) => updateField("plantCity", t)}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <InputField
                      label="Plant Location – State *"
                      icon="map-outline"
                      placeholder="State"
                      value={formData.plantState}
                      onChangeText={(t) => updateField("plantState", t)}
                    />
                  </View>
                </View>

                {/* AC & DC Capacity */}
                <View style={styles.row}>
                  <View style={{ flex: 1, marginRight: 10 }}>
                    <InputField
                      label="AC Capacity (kW) *"
                      icon="flash-outline"
                      placeholder="e.g., 100"
                      value={formData.acCapacity}
                      onChangeText={(t) => updateField("acCapacity", t)}
                      keyboardType="numeric"
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <InputField
                      label="DC Capacity (kWp) *"
                      icon="battery-charging-outline"
                      placeholder="e.g., 110"
                      value={formData.dcCapacity}
                      onChangeText={(t) => updateField("dcCapacity", t)}
                      keyboardType="numeric"
                    />
                  </View>
                </View>

                {/* Module Watt Peak & Auto Modules */}
                <View style={styles.row}>
                  <View style={{ flex: 1, marginRight: 10 }}>
                    <InputField
                      label="Module Watt Peak (Wp) *"
                      icon="solar-outline"
                      placeholder="e.g., 550"
                      value={formData.moduleWattPeak}
                      onChangeText={(t) => updateField("moduleWattPeak", t)}
                      keyboardType="numeric"
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <View style={styles.inputGroup}>
                      <Text style={styles.inputLabel}>
                        Number of Modules *{" "}
                        <Text style={styles.autoHint}>(Auto‑calculated)</Text>
                      </Text>
                      <View style={[styles.inputWrap, styles.disabledInput]}>
                        <Ionicons
                          name="calculator-outline"
                          size={18}
                          color={Colors.subText}
                        />
                        <TextInput
                          placeholder="—"
                          placeholderTextColor={Colors.subText}
                          style={styles.input}
                          value={formData.numberOfModules}
                          editable={false}
                          selectTextOnFocus={false}
                        />
                      </View>
                    </View>
                  </View>
                </View>

                {/* Inverter & Module Make */}
                <View style={styles.row}>
                  <View style={{ flex: 1, marginRight: 10 }}>
                    <InputField
                      label="Inverter Make *"
                      icon="swap-horizontal-outline"
                      placeholder="e.g., SMA, Fronius"
                      value={formData.inverterMake}
                      onChangeText={(t) => updateField("inverterMake", t)}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <InputField
                      label="Number of Inverters *"
                      icon="grid-outline"
                      placeholder="e.g., 2"
                      value={formData.numberOfInverters}
                      onChangeText={(t) => updateField("numberOfInverters", t)}
                      keyboardType="numeric"
                    />
                  </View>
                </View>

                <InputField
                  label="Module Make *"
                  icon="solar-outline"
                  placeholder="e.g., Longi, Trina"
                  value={formData.moduleMake}
                  onChangeText={(t) => updateField("moduleMake", t)}
                />

                <InputField
                  label="Consumer Number *"
                  icon="reader-outline"
                  placeholder="Electricity board consumer number"
                  value={formData.consumerNumber}
                  onChangeText={(t) => updateField("consumerNumber", t)}
                />

                {/* Installation Type */}
                <ChipSelect
                  label="Installation Type *"
                  options={installationTypes}
                  selected={formData.installationType}
                  onSelect={(val) => updateField("installationType", val)}
                />

                {/* Installation Date */}
                <InputField
                  label="Installation Date *"
                  icon="calendar-outline"
                  placeholder="DD/MM/YYYY"
                  value={formData.installationDate}
                  onChangeText={(t) => updateField("installationDate", t)}
                />

                {/* Electricity Bill Photo */}
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>
                    Electricity Bill Photo *{" "}
                    <Text style={styles.secureHint}>🔐 Secure Upload</Text>
                  </Text>
                  <View style={styles.fileUploadWrap}>
                    <TouchableOpacity
                      style={styles.fileUploadBtn}
                      onPress={handlePickBillPhoto}
                    >
                      <Ionicons
                        name="document-attach"
                        size={20}
                        color={Colors.primary}
                      />
                      <Text style={styles.fileUploadText}>Choose File</Text>
                    </TouchableOpacity>

                    {formData.billPhoto ? (
                      <View style={styles.fileInfoRow}>
                        <Ionicons
                          name="checkmark-circle"
                          size={18}
                          color={Colors.eco}
                        />
                        <Text style={styles.fileName} numberOfLines={1}>
                          {formData.billPhoto}
                        </Text>
                        <View style={styles.lockIconBox}>
                          <Ionicons
                            name="lock-closed"
                            size={14}
                            color={Colors.subText}
                          />
                        </View>
                      </View>
                    ) : (
                      <Text style={styles.fileHint}>No file chosen</Text>
                    )}
                  </View>
                </View>
              </View>
            </Animated.View>

            {/* ═══ MONITORING CREDENTIALS (Optional) ═══ */}
            <Animated.View entering={FadeInUp.delay(300)}>
              <SectionHeader
                icon="shield-checkmark"
                title="Monitoring Credentials (Optional)"
              />
              <View style={styles.card}>
                <ChipSelect
                  label="Monitoring Platform"
                  options={monitoringPlatforms}
                  selected={formData.monitoringPlatform}
                  onSelect={(val) => updateField("monitoringPlatform", val)}
                />

                <InputField
                  label="Username"
                  icon="person-outline"
                  placeholder="Enter username"
                  value={formData.monitoringUsername}
                  onChangeText={(t) => updateField("monitoringUsername", t)}
                  autoCapitalize="none"
                />

                <InputField
                  label="Password"
                  icon="lock-closed-outline"
                  placeholder="Enter password"
                  value={formData.monitoringPassword}
                  onChangeText={(t) => updateField("monitoringPassword", t)}
                  secureTextEntry
                />

                <InputField
                  label="Confirm Password"
                  icon="lock-closed-outline"
                  placeholder="Re-enter password"
                  value={formData.confirmPassword}
                  onChangeText={(t) => updateField("confirmPassword", t)}
                  secureTextEntry
                />
              </View>
            </Animated.View>

            {/* ═══ SUBMIT BUTTON ═══ */}
            <Animated.View entering={FadeInUp.delay(350)}>
              <TouchableOpacity
                style={[styles.submitBtn, loading && styles.submitBtnLoading]}
                onPress={handleSubmit}
                disabled={loading}
              >
                {loading ? (
                  <Text style={styles.submitBtnText}>Submitting...</Text>
                ) : (
                  <>
                    <Ionicons name="paper-plane" size={20} color="#fff" />
                    <Text style={styles.submitBtnText}>
                      Complete Registration
                    </Text>
                  </>
                )}
              </TouchableOpacity>

              <Text style={styles.disclaimer}>
                By submitting, you agree to our Terms & Conditions and authorize
                us to contact you regarding your solar plant.
              </Text>

              <View style={styles.trustRow}>
                <View style={styles.trustItem}>
                  <Ionicons
                    name="shield-checkmark"
                    size={14}
                    color={Colors.eco}
                  />
                  <Text style={styles.trustText}>100% Secure</Text>
                </View>
                <View style={styles.trustDot} />
                <View style={styles.trustItem}>
                  <Ionicons name="time" size={14} color={Colors.info} />
                  <Text style={styles.trustText}>24h Response</Text>
                </View>
                <View style={styles.trustDot} />
                <View style={styles.trustItem}>
                  <Ionicons name="people" size={14} color={Colors.primary} />
                  <Text style={styles.trustText}>500+ Clients</Text>
                </View>
              </View>
            </Animated.View>

            <View style={{ height: 30 }} />
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Screen>
  );
}

// ═══════════════════════════════════════
//  REUSABLE COMPONENTS
// ═══════════════════════════════════════

const SectionHeader = ({ icon, title }: { icon: string; title: string }) => (
  <View style={styles.sectionHeader}>
    <View style={styles.sectionIconWrap}>
      <Ionicons name={icon as any} size={16} color={Colors.primary} />
    </View>
    <Text style={styles.sectionTitle}>{title}</Text>
  </View>
);

const InputField = ({ label, icon, ...props }: any) => (
  <View style={styles.inputGroup}>
    <Text style={styles.inputLabel}>{label}</Text>
    <View style={styles.inputWrap}>
      {icon && <Ionicons name={icon} size={18} color={Colors.subText} />}
      <TextInput
        placeholderTextColor={Colors.subText}
        style={styles.input}
        {...props}
      />
    </View>
  </View>
);

const ChipSelect = ({ label, options, selected, onSelect }: any) => (
  <View style={styles.inputGroup}>
    <Text style={styles.inputLabel}>{label}</Text>
    <View style={styles.chipGrid}>
      {options.map((option: string) => (
        <TouchableOpacity
          key={option}
          style={[styles.chip, selected === option && styles.chipActive]}
          onPress={() => onSelect(option)}
        >
          <Text
            style={[
              styles.chipText,
              selected === option && styles.chipTextActive,
            ]}
          >
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>
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
    backgroundColor: Colors.primary,
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    marginBottom: 20,
  },
  logoIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(255,255,255,0.15)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#fff",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 13,
    color: "rgba(255,255,255,0.8)",
  },

  // ─── Section Header ───
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
    marginTop: 4,
  },
  sectionIconWrap: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: Colors.primarySoft,
    justifyContent: "center",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: Colors.text,
  },

  // ─── Card ───
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },

  // ─── Inputs ───
  row: {
    flexDirection: "row",
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 8,
  },
  autoHint: {
    fontSize: 11,
    color: Colors.subText,
    fontWeight: "400",
  },
  secureHint: {
    fontSize: 11,
    color: Colors.info,
    fontWeight: "500",
  },
  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.background,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 12,
    gap: 10,
  },
  disabledInput: {
    backgroundColor: Colors.background,
    opacity: 0.9,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: Colors.text,
    paddingVertical: 14,
  },
  phoneCode: {
    fontSize: 15,
    fontWeight: "600",
    color: Colors.subText,
    borderRightWidth: 1,
    borderRightColor: Colors.border,
    paddingRight: 10,
  },

  // ─── File Upload ───
  fileUploadWrap: {
    backgroundColor: Colors.background,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 12,
  },
  fileUploadBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: Colors.primarySoft,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  fileUploadText: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.primary,
  },
  fileHint: {
    fontSize: 13,
    color: Colors.subText,
    marginTop: 8,
  },
  fileInfoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  fileName: {
    flex: 1,
    fontSize: 13,
    color: Colors.text,
    fontWeight: "500",
  },
  lockIconBox: {
    padding: 4,
    backgroundColor: Colors.background,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.border,
  },

  // ─── Chip Select ───
  chipGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  chipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  chipText: {
    fontSize: 13,
    fontWeight: "600",
    color: Colors.text,
  },
  chipTextActive: {
    color: "#fff",
  },

  // ─── Submit Button ───
  submitBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 14,
    marginTop: 8,
    marginBottom: 12,
  },
  submitBtnLoading: {
    opacity: 0.7,
  },
  submitBtnText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },
  disclaimer: {
    fontSize: 11,
    color: Colors.subText,
    textAlign: "center",
    marginBottom: 16,
    lineHeight: 16,
  },

  // ─── Trust Row ───
  trustRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  trustItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  trustDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.border,
  },
  trustText: {
    fontSize: 12,
    color: Colors.subText,
    fontWeight: "500",
  },
});
