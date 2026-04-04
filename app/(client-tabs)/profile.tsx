import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  Image,
  Alert,
  Linking,
  Share,
  StyleSheet,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";

import Screen from "../components/Screen";
import { Colors } from "../theme/colors";
import { useAuth } from "../../context/AuthContext";

export default function Profile() {
  const { user, login, logout } = useAuth();

  const [name, setName] = useState(user?.name || "");
  const [email] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.contact || "");
  const [image, setImage] = useState<string | null>(null);

  const [editModal, setEditModal] = useState(false);
  const [contactModal, setContactModal] = useState(false);
  const [policyModal, setPolicyModal] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.canceled) setImage(result.assets[0].uri);
  };

  const saveProfile = async () => {
    await login({ ...user, name, contact: phone });
    Alert.alert("Success", "Profile updated successfully!");
    setEditModal(false);
  };

  const shareApp = async () => {
    await Share.share({
      message:
        "Download Solar App 🌞 https://play.google.com/store/apps/details?id=com.umakant3525.PV_PROTECT",
    });
  };

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          await logout();
          router.replace("/");
        },
      },
    ]);
  };

  const menuItems = [
    {
      section: "Account",
      items: [
        {
          icon: "person-outline",
          label: "Edit Profile",
          sub: "Update your personal info",
          onPress: () => setEditModal(true),
        },
        {
          icon: "shield-checkmark-outline",
          label: "Privacy & Security",
          sub: "Manage your data & permissions",
          onPress: () => setPolicyModal(true),
        },
        {
          icon: "key-outline",
          label: "Change Password",
          sub: "Update your password",
          onPress: () =>
            Alert.alert("Coming Soon", "Feature under development"),
        },
      ],
    },
    {
      section: "Support",
      items: [
        {
          icon: "headset-outline",
          label: "Contact Support",
          sub: "24/7 solar expert help",
          badge: "24/7",
          badgeColor: Colors.eco,
          onPress: () => setContactModal(true),
        },
        {
          icon: "document-text-outline",
          label: "Terms & Policy",
          sub: "Read our policies",
          onPress: () => setPolicyModal(true),
        },
        {
          icon: "help-circle-outline",
          label: "Help & FAQ",
          sub: "Common questions answered",
          onPress: () => router.push("/schemes"),
        },
      ],
    },
    {
      section: "App",
      items: [
        {
          icon: "star-outline",
          label: "Rate App",
          sub: "Share your feedback",
          onPress: () =>
            Linking.openURL(
              "https://play.google.com/store/apps/details?id=com.umakant3525.PV_PROTECT",
            ),
        },
        {
          icon: "share-social-outline",
          label: "Share App",
          sub: "Tell friends about us",
          onPress: shareApp,
        },
        {
          icon: "cloud-download-outline",
          label: "Check for Updates",
          sub: "Current version 1.0.0",
          onPress: () =>
            Alert.alert("Up to Date", "You are using the latest version"),
        },
        {
          icon: "notifications-outline",
          label: "Notifications",
          sub: "Manage push notifications",
          onPress: () =>
            Alert.alert("Coming Soon", "Notification settings coming soon"),
        },
      ],
    },
  ];

  return (
    <Screen>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ═══ HEADER ═══ */}
        <Animated.View entering={FadeInDown.delay(100)} style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
        </Animated.View>

        {/* ═══ PROFILE CARD ═══ */}
        <Animated.View
          entering={FadeInDown.delay(150)}
          style={styles.profileCard}
        >
          <TouchableOpacity style={styles.avatarContainer} onPress={pickImage}>
            {image ? (
              <Image source={{ uri: image }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarInitial}>
                  {user?.name?.charAt(0).toUpperCase() || "U"}
                </Text>
              </View>
            )}
            <View style={styles.cameraBtn}>
              <Ionicons name="camera" size={14} color="#fff" />
            </View>
          </TouchableOpacity>

          <Text style={styles.userName}>{user?.name || "Solar User"}</Text>
          <Text style={styles.userEmail}>
            {user?.email || "No email added"}
          </Text>
          <Text style={styles.userPhone}>
            {user?.contact ? `+91 ${user.contact}` : "No phone added"}
          </Text>

          <TouchableOpacity
            style={styles.editBtn}
            onPress={() => setEditModal(true)}
          >
            <Ionicons name="pencil" size={14} color={Colors.primary} />
            <Text style={styles.editBtnText}>Edit Profile</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* ═══ MENU SECTIONS ═══ */}
        {menuItems.map((section, sectionIndex) => (
          <Animated.View
            key={sectionIndex}
            entering={FadeInDown.delay(250 + sectionIndex * 50)}
          >
            <Text style={styles.sectionTitle}>{section.section}</Text>
            <View style={styles.menuCard}>
              {section.items.map((item, itemIndex) => (
                <TouchableOpacity
                  key={itemIndex}
                  style={[
                    styles.menuItem,
                    itemIndex < section.items.length - 1 &&
                      styles.menuItemBorder,
                  ]}
                  onPress={item.onPress}
                  activeOpacity={0.7}
                >
                  <View style={styles.menuItemLeft}>
                    <View style={styles.menuIconWrap}>
                      <Ionicons
                        name={item.icon as any}
                        size={20}
                        color={Colors.primary}
                      />
                    </View>
                    <View style={styles.menuItemText}>
                      <View style={styles.menuItemTitleRow}>
                        <Text style={styles.menuItemTitle}>{item.label}</Text>
                        {item.badge && (
                          <View
                            style={[
                              styles.menuBadge,
                              { backgroundColor: item.badgeColor + "20" },
                            ]}
                          >
                            <Text
                              style={[
                                styles.menuBadgeText,
                                { color: item.badgeColor },
                              ]}
                            >
                              {item.badge}
                            </Text>
                          </View>
                        )}
                      </View>
                      <Text style={styles.menuItemSub}>{item.sub}</Text>
                    </View>
                  </View>
                  <Ionicons
                    name="chevron-forward"
                    size={18}
                    color={Colors.subText}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </Animated.View>
        ))}

        {/* ═══ LOGOUT ═══ */}
        <Animated.View entering={FadeInDown.delay(400)}>
          <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={22} color={Colors.danger} />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* ═══ FOLLOW US ═══ */}
        <Animated.View entering={FadeInDown.delay(450)}>
          <Text style={styles.sectionTitle}>Follow Us</Text>
          <View style={styles.socialCard}>
            <Text style={styles.socialTitle}>Stay Connected</Text>
            <Text style={styles.socialSub}>
              Follow us on social media for updates & tips
            </Text>
            <View style={styles.socialRow}>
              <TouchableOpacity
                style={styles.socialBtn}
                onPress={() =>
                  Linking.openURL("https://www.instagram.com/sustainfyenergy/")
                }
              >
                <Ionicons name="logo-instagram" size={24} color="#E1306C" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.socialBtn}
                onPress={() =>
                  Linking.openURL("https://www.facebook.com/sustainfyenergy")
                }
              >
                <Ionicons name="logo-facebook" size={24} color="#1877F2" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.socialBtn}
                onPress={() =>
                  Linking.openURL(
                    "https://www.linkedin.com/company/sustainfy-energy-llp/",
                  )
                }
              >
                <Ionicons name="logo-linkedin" size={24} color="#0A66C2" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.socialBtn}
                onPress={() =>
                  Linking.openURL("https://twitter.com/sustainfyenergy")
                }
              >
                <Ionicons name="logo-twitter" size={24} color="#1DA1F2" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.socialBtn}
                onPress={() =>
                  Linking.openURL("https://youtube.com/@sustainfyenergy")
                }
              >
                <Ionicons name="logo-youtube" size={24} color="#FF0000" />
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>

        {/* ═══ APP VERSION ═══ */}
        <Animated.View
          entering={FadeInDown.delay(500)}
          style={styles.versionCard}
        >
          <Ionicons name="sunny" size={20} color={Colors.accent} />
          <Text style={styles.versionText}>PVprotech v1.0.0</Text>
          <Text style={styles.versionSub}>by Sustanify Energy</Text>
        </Animated.View>

        <View style={{ height: 30 }} />
      </ScrollView>

      {/* ═══ EDIT PROFILE MODAL ═══ */}
      <Modal
        visible={editModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <Screen>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setEditModal(false)}>
                <Ionicons name="close" size={24} color={Colors.text} />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Edit Profile</Text>
              <View style={{ width: 24 }} />
            </View>

            <ScrollView
              contentContainerStyle={styles.modalContent}
              showsVerticalScrollIndicator={false}
            >
              <TouchableOpacity style={styles.modalAvatarContainer}>
                {image ? (
                  <Image source={{ uri: image }} style={styles.modalAvatar} />
                ) : (
                  <View style={styles.modalAvatarPlaceholder}>
                    <Text style={styles.modalAvatarInitial}>
                      {name?.charAt(0).toUpperCase() || "U"}
                    </Text>
                  </View>
                )}
                <TouchableOpacity style={styles.modalCameraBtn}>
                  <Ionicons name="camera" size={16} color="#fff" />
                </TouchableOpacity>
              </TouchableOpacity>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Full Name</Text>
                <TextInput
                  value={name}
                  onChangeText={setName}
                  placeholder="Enter your name"
                  style={styles.input}
                  placeholderTextColor={Colors.subText}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Email Address</Text>
                <TextInput
                  value={email}
                  editable={false}
                  style={[styles.input, styles.inputDisabled]}
                  placeholderTextColor={Colors.subText}
                />
                <Text style={styles.inputHint}>Email cannot be changed</Text>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Phone Number</Text>
                <View style={styles.phoneInput}>
                  <Text style={styles.phoneCode}>+91</Text>
                  <TextInput
                    value={phone}
                    onChangeText={setPhone}
                    placeholder="Enter phone number"
                    style={styles.phoneField}
                    keyboardType="phone-pad"
                    placeholderTextColor={Colors.subText}
                  />
                </View>
              </View>

              <TouchableOpacity style={styles.saveBtn} onPress={saveProfile}>
                <Ionicons name="checkmark-circle" size={20} color="#fff" />
                <Text style={styles.saveBtnText}>Save Changes</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </Screen>
      </Modal>

      {/* ═══ CONTACT SUPPORT MODAL ═══ */}
      <Modal
        visible={contactModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <Screen>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setContactModal(false)}>
                <Ionicons name="close" size={24} color={Colors.text} />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Contact Support</Text>
              <View style={{ width: 24 }} />
            </View>

            <ScrollView
              contentContainerStyle={styles.modalContent}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.supportHero}>
                <View style={styles.supportIconWrap}>
                  <Ionicons name="headset" size={32} color={Colors.primary} />
                </View>
                <Text style={styles.supportTitle}>24/7 Solar Support</Text>
                <Text style={styles.supportSub}>
                  Our solar experts are ready to help you anytime
                </Text>
              </View>

              <View style={styles.supportBadge}>
                <Ionicons name="time" size={18} color={Colors.eco} />
                <Text style={styles.supportBadgeText}>
                  Response within 10 minutes
                </Text>
              </View>

              <View style={styles.supportOptions}>
                <TouchableOpacity
                  style={styles.supportOption}
                  onPress={() => Linking.openURL("tel:+919876543210")}
                >
                  <View
                    style={[
                      styles.supportIcon,
                      { backgroundColor: Colors.ecoSoft },
                    ]}
                  >
                    <Ionicons name="call" size={24} color={Colors.eco} />
                  </View>
                  <View style={styles.supportOptionText}>
                    <Text style={styles.supportOptionTitle}>Call Us</Text>
                    <Text style={styles.supportOptionSub}>+91 9975929989</Text>
                  </View>
                  <Ionicons
                    name="chevron-forward"
                    size={20}
                    color={Colors.subText}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.supportOption}
                  onPress={() => Linking.openURL("https://wa.me/91 9975929989")}
                >
                  <View
                    style={[styles.supportIcon, { backgroundColor: "#E8F5E9" }]}
                  >
                    <Ionicons name="logo-whatsapp" size={24} color="#25D366" />
                  </View>
                  <View style={styles.supportOptionText}>
                    <Text style={styles.supportOptionTitle}>WhatsApp</Text>
                    <Text style={styles.supportOptionSub}>
                      Quick text response
                    </Text>
                  </View>
                  <Ionicons
                    name="chevron-forward"
                    size={20}
                    color={Colors.subText}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.supportOption}
                  onPress={() =>
                    Linking.openURL("mailto:assure@sustainfyenergy.com")
                  }
                >
                  <View
                    style={[
                      styles.supportIcon,
                      { backgroundColor: Colors.infoSoft },
                    ]}
                  >
                    <Ionicons name="mail" size={24} color={Colors.info} />
                  </View>
                  <View style={styles.supportOptionText}>
                    <Text style={styles.supportOptionTitle}>Email</Text>
                    <Text style={styles.supportOptionSub}>
                      assure@sustainfyenergy.com
                    </Text>
                  </View>
                  <Ionicons
                    name="chevron-forward"
                    size={20}
                    color={Colors.subText}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.supportHours}>
                <Ionicons name="business" size={18} color={Colors.subText} />
                <Text style={styles.supportHoursText}>
                  Office Hours: Mon-Sat, 9AM-7PM IST
                </Text>
              </View>
            </ScrollView>
          </View>
        </Screen>
      </Modal>

      {/* ═══ TERMS & POLICY MODAL ═══ */}
      <Modal
        visible={policyModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <Screen>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setPolicyModal(false)}>
                <Ionicons name="close" size={24} color={Colors.text} />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Terms & Policy</Text>
              <View style={{ width: 24 }} />
            </View>

            <ScrollView
              contentContainerStyle={styles.modalContent}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.policySection}>
                <Text style={styles.policyTitle}>Terms of Service</Text>
                <Text style={styles.policyText}>
                  By using Solar App, you agree to our terms of service for
                  solar installation, monitoring, and O&M services. All
                  installations are performed by certified professionals
                  following MNRE guidelines.
                </Text>
              </View>

              <View style={styles.policySection}>
                <Text style={styles.policyTitle}>Privacy Policy</Text>
                <Text style={styles.policyText}>
                  We collect minimal data necessary for solar monitoring
                  services. Your personal information is encrypted and never
                  shared with third parties without consent. Solar plant data is
                  used only for performance monitoring.
                </Text>
              </View>

              <View style={styles.policySection}>
                <Text style={styles.policyTitle}>Warranty Policy</Text>
                <Text style={styles.policyText}>
                  Panel warranty: 25 years (25-year linear power warranty).
                  Inverter warranty: 5-10 years depending on model. Installation
                  warranty: 2 years for workmanship.
                </Text>
              </View>

              <View style={styles.policySection}>
                <Text style={styles.policyTitle}>AMC Terms</Text>
                <Text style={styles.policyText}>
                  Annual Maintenance Contract includes quarterly panel cleaning,
                  bi-annual inspection, and priority support. AMC is renewed
                  annually and can be cancelled with 30 days notice.
                </Text>
              </View>

              <TouchableOpacity
                style={styles.closeBtn}
                onPress={() => setPolicyModal(false)}
              >
                <Text style={styles.closeBtnText}>I Understand</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </Screen>
      </Modal>
    </Screen>
  );
}

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
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: Colors.text,
  },

  // ─── Profile Card ───
  profileCard: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    marginBottom: 12,
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 12,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: "#fff",
  },
  avatarPlaceholder: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: Colors.eco,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "rgba(255,255,255,0.3)",
  },
  avatarInitial: {
    fontSize: 32,
    fontWeight: "700",
    color: "#fff",
  },
  cameraBtn: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.accent,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  userName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 13,
    color: "rgba(255,255,255,0.7)",
    marginBottom: 2,
  },
  userPhone: {
    fontSize: 13,
    color: "rgba(255,255,255,0.7)",
    marginBottom: 12,
  },
  editBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  editBtnText: {
    fontSize: 13,
    fontWeight: "600",
    color: Colors.primary,
  },

  // ─── Stats Row ───
  statsRow: {
    flexDirection: "row",
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statDivider: {
    width: 1,
    backgroundColor: Colors.border,
    marginVertical: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "800",
    color: Colors.text,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 11,
    color: Colors.subText,
  },

  // ─── Section Title ───
  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: Colors.subText,
    marginBottom: 10,
    marginTop: 6,
  },

  // ─── Menu Card ───
  menuCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: "hidden",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 14,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  menuIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: Colors.primarySoft,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  menuItemText: {
    flex: 1,
  },
  menuItemTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  menuItemTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.text,
  },
  menuBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  menuBadgeText: {
    fontSize: 10,
    fontWeight: "600",
  },
  menuItemSub: {
    fontSize: 12,
    color: Colors.subText,
    marginTop: 2,
  },

  // ─── Logout Button ───
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: Colors.dangerSoft,
    paddingVertical: 14,
    borderRadius: 14,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.danger,
  },
  logoutText: {
    fontSize: 15,
    fontWeight: "600",
    color: Colors.danger,
  },

  // ─── Social Card ───
  socialCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  socialTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 4,
  },
  socialSub: {
    fontSize: 12,
    color: Colors.subText,
    marginBottom: 14,
  },
  socialRow: {
    flexDirection: "row",
    gap: 12,
  },
  socialBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.border,
  },

  // ─── Version Card ───
  versionCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 16,
    marginBottom: 10,
  },
  versionText: {
    fontSize: 13,
    fontWeight: "600",
    color: Colors.subText,
  },
  versionSub: {
    fontSize: 12,
    color: Colors.subText,
  },

  // ═══════════════════════════════════
  //  MODAL STYLES
  // ═══════════════════════════════════
  modalContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    backgroundColor: Colors.surface,
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: Colors.text,
  },
  modalContent: {
    padding: 16,
    paddingBottom: 40,
  },

  // ─── Edit Profile Modal ───
  modalAvatarContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  modalAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  modalAvatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  modalAvatarInitial: {
    fontSize: 36,
    fontWeight: "700",
    color: "#fff",
  },
  modalCameraBtn: {
    position: "absolute",
    bottom: 0,
    right: "35%",
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.accent,
    justifyContent: "center",
    alignItems: "center",
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 6,
  },
  input: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontSize: 15,
    color: Colors.text,
  },
  inputDisabled: {
    backgroundColor: Colors.background,
    color: Colors.subText,
  },
  inputHint: {
    fontSize: 11,
    color: Colors.subText,
    marginTop: 4,
  },
  phoneInput: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  phoneCode: {
    paddingHorizontal: 14,
    fontSize: 15,
    color: Colors.subText,
    borderRightWidth: 1,
    borderRightColor: Colors.border,
    paddingVertical: 14,
  },
  phoneField: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontSize: 15,
    color: Colors.text,
  },
  saveBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 14,
    marginTop: 8,
  },
  saveBtnText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },

  // ─── Contact Support Modal ───
  supportHero: {
    alignItems: "center",
    marginBottom: 20,
  },
  supportIconWrap: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.primarySoft,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  supportTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 4,
  },
  supportSub: {
    fontSize: 14,
    color: Colors.subText,
    textAlign: "center",
  },
  supportBadge: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: Colors.ecoSoft,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginBottom: 20,
  },
  supportBadgeText: {
    fontSize: 13,
    fontWeight: "600",
    color: Colors.eco,
  },
  supportOptions: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 16,
  },
  supportOption: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  supportIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  supportOptionText: {
    flex: 1,
  },
  supportOptionTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: Colors.text,
  },
  supportOptionSub: {
    fontSize: 12,
    color: Colors.subText,
    marginTop: 2,
  },
  supportHours: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  supportHoursText: {
    fontSize: 12,
    color: Colors.subText,
  },

  // ─── Policy Modal ───
  policySection: {
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  policyTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 8,
  },
  policyText: {
    fontSize: 13,
    color: Colors.subText,
    lineHeight: 20,
  },
  closeBtn: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
  },
  closeBtnText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#fff",
  },
});
