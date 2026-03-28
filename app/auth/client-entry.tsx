import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
} from "react-native";

import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import { router } from "expo-router";
import Animated, {
  FadeInDown,
  FadeInUp,
  FadeIn,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";

import Screen from "../components/Screen";
import { Colors } from "../theme/colors";

export default function ClientEntry() {
  const { login } = useAuth();

  const [step, setStep] = useState(1); // 1: Name/Phone, 2: Email, 3: OTP
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const [generatedOtp, setGeneratedOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const progress = useSharedValue(0);

  // OTP Timer
  useEffect(() => {
    if (otpTimer > 0) {
      timerRef.current = setTimeout(() => {
        setOtpTimer(otpTimer - 1);
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [otpTimer]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  /* 📧 SEND OTP */
  const sendOtp = () => {
    if (!email || !email.includes("@")) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }

    const dummyOtp = "1234";
    setGeneratedOtp(dummyOtp);
    setOtpTimer(30); // 30 second timer
    setStep(3);

    Alert.alert("OTP Sent 📧", `Demo OTP: ${dummyOtp}`);
  };

  /* 🔐 VERIFY OTP */
  const verifyOtp = () => {
    if (otp !== generatedOtp) {
      Alert.alert("Invalid OTP", "Please enter the correct OTP");
      return;
    }

    // Proceed to login
    handleLogin();
  };

  /* 🔐 LOGIN */
  const handleLogin = async () => {
    setLoading(true);

    const role = email.includes("tech")
      ? "technician"
      : email.includes("paid")
        ? "client"
        : "free";

    await login({
      name,
      email,
      contact,
      role,
    });

    setLoading(false);

    if (role === "technician") {
      router.replace("/(tech-tabs)/tasks");
    } else {
      router.replace("/(client-tabs)/home");
    }
  };

  const handleNext = () => {
    if (!name.trim()) {
      Alert.alert("Error", "Please enter your name");
      return;
    }
    if (!contact.trim() || contact.length < 10) {
      Alert.alert("Error", "Please enter a valid mobile number");
      return;
    }
    setStep(2);
  };

  const handleEmailContinue = () => {
    if (!email || !email.includes("@")) {
      Alert.alert("Error", "Please enter a valid email");
      return;
    }
    sendOtp();
  };

  return (
    <Screen>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* ═══ ILLUSTRATION ═══ */}
          <Animated.View
            entering={FadeInDown.delay(100)}
            style={styles.illustration}
          >
            <View style={styles.illustrationCircle}>
              <Ionicons name="sunny" size={60} color={Colors.accent} />
              <View style={styles.illustrationRays}>
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                  <View
                    key={i}
                    style={[
                      styles.ray,
                      {
                        transform: [
                          { rotate: `${angle}deg` },
                          { translateY: -45 },
                        ],
                      },
                    ]}
                  />
                ))}
              </View>
            </View>
            <Text style={styles.illustrationText}>PVprotech</Text>
          </Animated.View>

          {/* ═══ PROGRESS STEPS ═══ */}
          <Animated.View
            entering={FadeInDown.delay(200)}
            style={styles.progressContainer}
          >
            <View style={styles.progressSteps}>
              <View
                style={[
                  styles.progressDot,
                  step >= 1 && styles.progressDotActive,
                ]}
              >
                {step > 1 ? (
                  <Ionicons name="checkmark" size={14} color="#fff" />
                ) : (
                  <Text style={styles.progressDotText}>1</Text>
                )}
              </View>
              <View
                style={[
                  styles.progressLine,
                  step >= 2 && styles.progressLineActive,
                ]}
              />
              <View
                style={[
                  styles.progressDot,
                  step >= 2 && styles.progressDotActive,
                ]}
              >
                {step > 2 ? (
                  <Ionicons name="checkmark" size={14} color="#fff" />
                ) : (
                  <Text style={styles.progressDotText}>2</Text>
                )}
              </View>
              <View
                style={[
                  styles.progressLine,
                  step >= 3 && styles.progressLineActive,
                ]}
              />
              <View
                style={[
                  styles.progressDot,
                  step >= 3 && styles.progressDotActive,
                ]}
              >
                <Text style={styles.progressDotText}>3</Text>
              </View>
            </View>
            <View style={styles.progressLabels}>
              <Text
                style={[
                  styles.progressLabel,
                  step >= 1 && styles.progressLabelActive,
                ]}
              >
                Basic Info
              </Text>
              <Text
                style={[
                  styles.progressLabel,
                  step >= 2 && styles.progressLabelActive,
                ]}
              >
                Email
              </Text>
              <Text
                style={[
                  styles.progressLabel,
                  step >= 3 && styles.progressLabelActive,
                ]}
              >
                Verify
              </Text>
            </View>
          </Animated.View>

          {/* ═══ STEP 1: NAME & PHONE ═══ */}
          {step === 1 && (
            <Animated.View entering={FadeInUp} style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>Get Started</Text>
                <Text style={styles.cardSubtitle}>
                  Enter your basic details to continue
                </Text>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Full Name</Text>
                <View style={styles.inputWrap}>
                  <Ionicons name="person" size={20} color={Colors.subText} />
                  <TextInput
                    placeholder="Enter your full name"
                    value={name}
                    onChangeText={setName}
                    style={styles.input}
                    placeholderTextColor={Colors.subText}
                    autoCapitalize="words"
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Mobile Number</Text>
                <View style={styles.inputWrap}>
                  <Text style={styles.phonePrefix}>+91</Text>
                  <TextInput
                    placeholder="Enter mobile number"
                    value={contact}
                    onChangeText={setContact}
                    style={styles.input}
                    placeholderTextColor={Colors.subText}
                    keyboardType="phone-pad"
                    maxLength={10}
                  />
                </View>
              </View>

              <TouchableOpacity style={styles.primaryBtn} onPress={handleNext}>
                <Text style={styles.primaryBtnText}>Continue</Text>
                <Ionicons name="arrow-forward" size={20} color="#fff" />
              </TouchableOpacity>
            </Animated.View>
          )}

          {/* ═══ STEP 2: EMAIL ═══ */}
          {step === 2 && (
            <Animated.View entering={FadeInUp} style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>Email Verification</Text>
                <Text style={styles.cardSubtitle}>
                  We'll send an OTP to verify your email
                </Text>
              </View>

              <View style={styles.userPreview}>
                <View style={styles.userAvatar}>
                  <Text style={styles.userAvatarText}>
                    {name?.charAt(0)?.toUpperCase() || "U"}
                  </Text>
                </View>
                <View style={styles.userInfo}>
                  <Text style={styles.userName}>{name}</Text>
                  <Text style={styles.userContact}>+91 {contact}</Text>
                </View>
                <TouchableOpacity onPress={() => setStep(1)}>
                  <Ionicons
                    name="create-outline"
                    size={20}
                    color={Colors.primary}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Email Address</Text>
                <View style={styles.inputWrap}>
                  <Ionicons name="mail" size={20} color={Colors.subText} />
                  <TextInput
                    placeholder="Enter your email"
                    value={email}
                    onChangeText={setEmail}
                    style={styles.input}
                    placeholderTextColor={Colors.subText}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
              </View>

              <TouchableOpacity
                style={styles.primaryBtn}
                onPress={handleEmailContinue}
              >
                <Text style={styles.primaryBtnText}>Send OTP</Text>
                <Ionicons name="mail-send" size={20} color="#fff" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.secondaryBtn}
                onPress={() => setStep(1)}
              >
                <Ionicons name="arrow-back" size={16} color={Colors.primary} />
                <Text style={styles.secondaryBtnText}>Go Back</Text>
              </TouchableOpacity>
            </Animated.View>
          )}

          {/* ═══ STEP 3: OTP VERIFICATION ═══ */}
          {step === 3 && (
            <Animated.View entering={FadeInUp} style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={styles.otpIcon}>
                  <Ionicons name="key" size={28} color={Colors.primary} />
                </View>
                <Text style={styles.cardTitle}>Verify OTP</Text>
                <Text style={styles.cardSubtitle}>
                  Enter the 4-digit code sent to{"\n"}
                  <Text style={styles.emailHighlight}>{email}</Text>
                </Text>
              </View>

              <View style={styles.otpContainer}>
                {[0, 1, 2, 3].map((i) => (
                  <View
                    key={i}
                    style={[
                      styles.otpBox,
                      otp.length === i && styles.otpBoxActive,
                    ]}
                  >
                    <Text style={styles.otpText}>{otp[i] ? "●" : ""}</Text>
                  </View>
                ))}
              </View>

              <TextInput
                value={otp}
                onChangeText={(text) => setOtp(text.slice(0, 4))}
                keyboardType="number-pad"
                maxLength={4}
                style={styles.hiddenInput}
                autoFocus
              />

              <TouchableOpacity
                style={styles.primaryBtn}
                onPress={verifyOtp}
                disabled={otp.length !== 4}
              >
                <Text style={styles.primaryBtnText}>Verify & Login</Text>
                <Ionicons name="checkmark-circle" size={20} color="#fff" />
              </TouchableOpacity>

              {/* OTP Timer */}
              <View style={styles.timerContainer}>
                {otpTimer > 0 ? (
                  <View style={styles.timerBox}>
                    <Ionicons
                      name="time-outline"
                      size={16}
                      color={Colors.subText}
                    />
                    <Text style={styles.timerText}>
                      Resend OTP in {formatTime(otpTimer)}
                    </Text>
                  </View>
                ) : (
                  <TouchableOpacity onPress={sendOtp}>
                    <Text style={styles.resendText}>
                      Didn't receive OTP?{" "}
                      <Text style={styles.resendLink}>Resend</Text>
                    </Text>
                  </TouchableOpacity>
                )}
              </View>

              <TouchableOpacity
                style={styles.secondaryBtn}
                onPress={() => setStep(2)}
              >
                <Ionicons name="arrow-back" size={16} color={Colors.primary} />
                <Text style={styles.secondaryBtnText}>Change Email</Text>
              </TouchableOpacity>

              <View style={styles.demoHint}>
                <Ionicons
                  name="information-circle"
                  size={14}
                  color={Colors.info}
                />
                <Text style={styles.demoHintText}>Demo OTP: 1234</Text>
              </View>
            </Animated.View>
          )}

          {/* ═══ FOOTER ═══ */}
          <Animated.View entering={FadeInDown.delay(400)} style={styles.footer}>
            <Text style={styles.footerText}>
              By continuing, you agree to our{" "}
              <Text style={styles.footerLink}>Terms</Text> &{" "}
              <Text style={styles.footerLink}>Privacy Policy</Text>
            </Text>
          </Animated.View>

          {/* ═══ TRUST BADGES ═══ */}
          <Animated.View entering={FadeInUp.delay(500)} style={styles.trustRow}>
            <View style={styles.trustItem}>
              <Ionicons name="shield-checkmark" size={16} color={Colors.eco} />
              <Text style={styles.trustText}>Secure</Text>
            </View>
            <View style={styles.trustDot} />
            <View style={styles.trustItem}>
              <Ionicons name="people" size={16} color={Colors.info} />
              <Text style={styles.trustText}>500+ Users</Text>
            </View>
            <View style={styles.trustDot} />
            <View style={styles.trustItem}>
              <Ionicons name="star" size={16} color={Colors.accent} />
              <Text style={styles.trustText}>4.8★</Text>
            </View>
          </Animated.View>

          <View style={{ height: 30 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}

// ═══════════════════════════════════════
//  STYLES
// ═══════════════════════════════════════
const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
  },

  // ─── Illustration ───
  illustration: {
    alignItems: "center",
    marginBottom: 30,
  },
  illustrationCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.accentSoft,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  illustrationRays: {
    position: "absolute",
    width: 160,
    height: 160,
    justifyContent: "center",
    alignItems: "center",
  },
  ray: {
    position: "absolute",
    width: 3,
    height: 15,
    backgroundColor: Colors.accent,
    borderRadius: 2,
    opacity: 0.4,
  },
  illustrationText: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.text,
    marginTop: 12,
  },

  // ─── Progress Steps ───
  progressContainer: {
    marginBottom: 30,
  },
  progressSteps: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  progressDot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.border,
    justifyContent: "center",
    alignItems: "center",
  },
  progressDotActive: {
    backgroundColor: Colors.primary,
  },
  progressDotText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#fff",
  },
  progressLine: {
    width: 60,
    height: 3,
    backgroundColor: Colors.border,
    marginHorizontal: 4,
  },
  progressLineActive: {
    backgroundColor: Colors.primary,
  },
  progressLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  progressLabel: {
    fontSize: 11,
    color: Colors.subText,
    fontWeight: "500",
  },
  progressLabelActive: {
    color: Colors.primary,
    fontWeight: "600",
  },

  // ─── Card ───
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 24,
    padding: 24,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  cardHeader: {
    alignItems: "center",
    marginBottom: 24,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: Colors.text,
    marginBottom: 6,
  },
  cardSubtitle: {
    fontSize: 14,
    color: Colors.subText,
    textAlign: "center",
    lineHeight: 20,
  },

  // ─── User Preview ───
  userPreview: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.background,
    padding: 12,
    borderRadius: 14,
    marginBottom: 20,
  },
  userAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  userAvatarText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 15,
    fontWeight: "600",
    color: Colors.text,
  },
  userContact: {
    fontSize: 12,
    color: Colors.subText,
    marginTop: 2,
  },

  // ─── Input ───
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 8,
  },
  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.background,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 14,
    gap: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: Colors.text,
    paddingVertical: 16,
  },
  phonePrefix: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.subText,
  },

  // ─── Buttons ───
  primaryBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 14,
    marginTop: 8,
  },
  primaryBtnText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },
  secondaryBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 14,
    marginTop: 10,
  },
  secondaryBtnText: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.primary,
  },

  // ─── OTP ───
  otpIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.primarySoft,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 14,
    marginBottom: 24,
  },
  otpBox: {
    width: 56,
    height: 56,
    borderRadius: 14,
    backgroundColor: Colors.background,
    borderWidth: 2,
    borderColor: Colors.border,
    justifyContent: "center",
    alignItems: "center",
  },
  otpBoxActive: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primarySoft,
  },
  otpText: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.primary,
  },
  hiddenInput: {
    position: "absolute",
    opacity: 0,
    height: 0,
    width: 0,
  },
  emailHighlight: {
    color: Colors.primary,
    fontWeight: "600",
  },

  // ─── Timer ───
  timerContainer: {
    alignItems: "center",
    marginTop: 16,
  },
  timerBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: Colors.background,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  timerText: {
    fontSize: 13,
    color: Colors.subText,
    fontWeight: "500",
  },
  resendText: {
    fontSize: 13,
    color: Colors.subText,
  },
  resendLink: {
    color: Colors.primary,
    fontWeight: "600",
  },
  demoHint: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    marginTop: 14,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: Colors.infoSoft,
    borderRadius: 8,
  },
  demoHintText: {
    fontSize: 12,
    color: Colors.info,
    fontWeight: "600",
  },

  // ─── Footer ───
  footer: {
    alignItems: "center",
    marginBottom: 20,
  },
  footerText: {
    fontSize: 12,
    color: Colors.subText,
    textAlign: "center",
    lineHeight: 18,
  },
  footerLink: {
    color: Colors.primary,
    fontWeight: "600",
  },

  // ─── Trust Row ───
  trustRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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
    marginHorizontal: 12,
  },
  trustText: {
    fontSize: 12,
    color: Colors.subText,
    fontWeight: "500",
  },
});
