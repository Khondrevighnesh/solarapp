import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  BackHandler,
  ActivityIndicator,
  Dimensions,
} from "react-native";

import { useState, useCallback, useEffect } from "react";
import { router, useFocusEffect } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";

import Screen from "../components/Screen";
import { useAuth } from "../../context/AuthContext";
import { clients } from "../../data/clients";

import { Colors } from "../theme/colors";
import { Theme } from "../theme/theme";

const { width } = Dimensions.get("window");

export default function Dashboard() {
  const [clientId, setClientId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { user, login } = useAuth();

  /* 🚀 REDIRECT FUNCTION */
  const redirectUser = () => {
    if (!user?.plants) return;

    if (user.plants.length === 1) {
      router.replace({
        pathname: "/plants/cards",
        params: { plantId: user.plants[0].id },
      });
    } else {
      router.replace("/plants/plant");
    }
  };

  /* 🔐 LOGIN */
  const handleLogin = async () => {
    if (!clientId.trim() || !password.trim()) {
      Alert.alert("Missing Fields", "Please enter Client ID and Password.");
      return;
    }

    setLoading(true);
    const client = clients.find(
      (c) => c.id === clientId && c.password === password,
    );

    if (!client) {
      setLoading(false);
      Alert.alert("Invalid Login", "Please check your Client ID and Password.");
      return;
    }

    await login({
      name: client.name,
      email: clientId + "@solar.com",
      plants: client.plants,
      role: "client",
    });

    // ✅ redirect immediately after login
    if (client.plants.length === 1) {
      router.replace({
        pathname: "/plants/cards",
        params: { plantId: client.plants[0].id },
      });
    } else {
      router.replace("/plants/plant");
    }
  };

  /* 🔥 CRITICAL FIX: ALWAYS REDIRECT ON TAB FOCUS */
  useFocusEffect(
    useCallback(() => {
      if (user?.role === "client") {
        redirectUser(); // ✅ ALWAYS redirect
      }
    }, [user]),
  );

  /* 🔙 BACK BUTTON */
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        Alert.alert("Exit App", "Do you want to exit the app?", [
          { text: "Cancel", style: "cancel" },
          { text: "Exit", onPress: () => BackHandler.exitApp() },
        ]);
        return true;
      };

      const sub = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress,
      );

      return () => sub.remove();
    }, []),
  );

  /* ✅ IMPORTANT: SHOW NOTHING FOR CLIENT - POLISHED LOADING SCREEN */
  if (user?.role === "client") {
    return (
      <Screen>
        <View style={styles.loadingContainer}>
          <Animated.View entering={FadeInDown} style={styles.loadingCard}>
            <Ionicons name="sunny" size={48} color={Colors.primary} />
            <Text style={styles.loadingTitle}>Redirecting to Dashboard...</Text>
            <Text style={styles.loadingSubtitle}>
              Preparing your solar plants overview
            </Text>
            <ActivityIndicator
              size="large"
              color={Colors.primary}
              style={{ marginTop: 20 }}
            />
          </Animated.View>
        </View>
      </Screen>
    );
  }

  /* 🔓 LOGIN UI (ONLY FOR NOT LOGGED USERS) */
  return (
    <Screen>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* ═══ HEADER ═══ */}
          <Animated.View entering={FadeInDown.delay(100)} style={styles.header}>
            <View style={styles.logoIcon}>
              <Ionicons name="sunny" size={32} color={Colors.accent} />
            </View>
            <Text style={styles.headerTitle}>Welcome Back 👋</Text>
            <Text style={styles.headerSubtitle}>
              Sign in to manage your solar plants and monitoring
            </Text>
          </Animated.View>

          {/* ═══ LOGIN CARD ═══ */}
          <Animated.View
            entering={FadeInUp.delay(200)}
            style={styles.loginCard}
          >
            <View style={styles.cardHeader}>
              <Ionicons name="shield-checkmark" size={20} color={Colors.eco} />
              <Text style={styles.cardTitle}>Client Login</Text>
            </View>

            <InputField
              label="Client ID *"
              icon="person-outline"
              placeholder="Enter your Client ID"
              value={clientId}
              onChangeText={setClientId}
              autoCapitalize="none"
            />

            <InputField
              label="Password *"
              icon="lock-closed-outline"
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <TouchableOpacity
              style={[styles.submitBtn, loading && styles.submitBtnLoading]}
              onPress={handleLogin}
              disabled={loading}
              activeOpacity={0.9}
            >
              {loading ? (
                <>
                  <ActivityIndicator size="small" color="#fff" />
                  <Text style={styles.submitBtnText}>Signing In...</Text>
                </>
              ) : (
                <>
                  <Ionicons name="enter" size={20} color="#fff" />
                  <Text style={styles.submitBtnText}>Sign In</Text>
                </>
              )}
            </TouchableOpacity>

            <Text style={styles.disclaimer}>
              Secure login for authorized clients only. Need help? Contact
              support.
            </Text>
          </Animated.View>

          {/* ═══ TRUST INDICATORS ═══ */}
          <Animated.View entering={FadeInUp.delay(300)} style={styles.trustRow}>
            <View style={styles.trustItem}>
              <Ionicons name="shield-checkmark" size={14} color={Colors.eco} />
              <Text style={styles.trustText}>Secure Access</Text>
            </View>
            <View style={styles.trustDot} />
            <View style={styles.trustItem}>
              <Ionicons name="time" size={14} color={Colors.info} />
              <Text style={styles.trustText}>Instant Redirect</Text>
            </View>
            <View style={styles.trustDot} />
            <View style={styles.trustItem}>
              <Ionicons name="people" size={14} color={Colors.primary} />
              <Text style={styles.trustText}>Client Portal</Text>
            </View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}

// ═══════════════════════════════════════
//  REUSABLE COMPONENTS
// ═══════════════════════════════════════

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

// ═══════════════════════════════════════
//  STYLES
// ═══════════════════════════════════════
const styles = {
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 40,
  },

  // ─── Header ───
  header: {
    alignItems: "center",
    marginBottom: 40,
    paddingHorizontal: 8,
  },
  logoIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.primary + "10",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: Colors.text,
    marginBottom: 4,
    textAlign: "center",
  },
  headerSubtitle: {
    fontSize: 16,
    color: Colors.subText,
    textAlign: "center",
    lineHeight: 22,
  },

  // ─── Login Card ───
  loginCard: {
    backgroundColor: Colors.surface,
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.border + "40",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.text,
    flex: 1,
  },

  // ─── Inputs ───
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
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
    borderColor: Colors.border + "60",
    paddingHorizontal: 16,
    height: 52,
    gap: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: Colors.text,
    paddingVertical: 0,
  },

  // ─── Submit Button ───
  submitBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: Colors.primary,
    paddingVertical: 18,
    borderRadius: 16,
    marginTop: 8,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  submitBtnLoading: {
    opacity: 0.8,
  },
  submitBtnText: {
    fontSize: 17,
    fontWeight: "700",
    color: "#fff",
  },
  disclaimer: {
    fontSize: 12,
    color: Colors.subText,
    textAlign: "center",
    marginTop: 16,
    lineHeight: 18,
    paddingHorizontal: 8,
  },

  // ─── Trust Row ───
  trustRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    paddingVertical: 12,
  },
  trustItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  trustDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.border,
  },
  trustText: {
    fontSize: 13,
    color: Colors.subText,
    fontWeight: "600",
  },

  // ─── Loading Screen ───
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
    paddingHorizontal: 24,
  },
  loadingCard: {
    backgroundColor: Colors.surface,
    borderRadius: 24,
    padding: 40,
    alignItems: "center",
    maxWidth: width - 48,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    borderWidth: 1,
    borderColor: Colors.primary + "20",
  },
  loadingTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.text,
    marginTop: 16,
    marginBottom: 4,
    textAlign: "center",
  },
  loadingSubtitle: {
    fontSize: 14,
    color: Colors.subText,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 20,
  },
};
