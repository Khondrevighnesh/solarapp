import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import * as Sharing from "expo-sharing";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";

import Screen from "../components/Screen";
import { Colors } from "../theme/colors";

export default function UploadDocuments() {
  const [documents, setDocuments] = useState<any[]>([]);
  const [fileName, setFileName] = useState("");
  const [selectedDocType, setSelectedDocType] = useState("");

  const documentTypes = [
    { id: "bill", label: "Electricity Bill", icon: "flash" },
    { id: "id", label: "ID Proof", icon: "card" },
    { id: "address", label: "Address Proof", icon: "location" },
    { id: "property", label: "Property Tax", icon: "home" },
    { id: "photo", label: "Photo", icon: "person" },
    { id: "other", label: "Other", icon: "document" },
  ];

  const requiredDocs = [
    { label: "Electricity Bill", desc: "Last 3 months", required: true },
    {
      label: "ID Proof (Aadhaar/PAN)",
      desc: "Government issued",
      required: true,
    },
    { label: "Address Proof", desc: "Voter ID/Passport", required: true },
    { label: "Property Tax Receipt", desc: "Recent year", required: false },
    { label: " Photo", desc: "White background", required: true },
    { label: "Bank Details", desc: "Cancelled cheque", required: true },
  ];

  /* 📄 PICK FILE */
  const pickFile = async () => {
    if (!selectedDocType) {
      Alert.alert(
        "Select Document Type",
        "Please select the type of document you are uploading",
      );
      return;
    }

    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        copyToCacheDirectory: true,
      });

      if (result.canceled) return;

      const file = result.assets[0];
      const docType = documentTypes.find((d) => d.id === selectedDocType);

      const newDoc = {
        id: Date.now().toString(),
        type: selectedDocType,
        typeLabel: docType?.label || "Document",
        name: file.name,
        uri: file.uri,
        size: file.size ? formatFileSize(file.size) : "Unknown",
        uploadedAt: new Date().toLocaleDateString(),
      };

      setDocuments((prev) => [...prev, newDoc]);
      setSelectedDocType("");
    } catch {
      Alert.alert("Error", "Failed to pick document");
    }
  };

  /* ⬇️ DOWNLOAD / OPEN */
  const openFile = async (uri: string) => {
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(uri);
    } else {
      Alert.alert("Cannot open file");
    }
  };

  /* ❌ DELETE */
  const deleteFile = (id: string) => {
    Alert.alert(
      "Delete Document",
      "Are you sure you want to remove this document?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () =>
            setDocuments((prev) => prev.filter((doc) => doc.id !== id)),
        },
      ],
    );
  };

  /* 🚀 SUBMIT */
  const handleSubmit = () => {
    const uploadedTypes = documents.map((d) => d.type);
    const missing = requiredDocs.filter(
      (r) =>
        r.required &&
        !uploadedTypes.includes(r.label.toLowerCase().split(" ")[0]),
    ).length;

    if (documents.length === 0) {
      Alert.alert(
        "No Documents",
        "Please upload at least one document to continue",
      );
      return;
    }

    if (missing > 0) {
      Alert.alert(
        "Incomplete Documents",
        `You still have ${missing} required document(s) to upload. Do you want to submit anyway?`,
        [
          { text: "Upload More", style: "cancel" },
          { text: "Submit Anyway", onPress: () => submitDocs() },
        ],
      );
    } else {
      submitDocs();
    }
  };

  const submitDocs = () => {
    Alert.alert(
      "Submitted ✅",
      "Your documents have been uploaded successfully. Our team will verify them within 24 hours.",
    );
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / 1048576).toFixed(1) + " MB";
  };

  const getDocIcon = (type: string) => {
    const doc = documentTypes.find((d) => d.id === type);
    return doc?.icon || "document";
  };

  return (
    <Screen>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ═══ HEADER ═══ */}
        <Animated.View entering={FadeInDown.delay(100)} style={styles.header}>
          <Text style={styles.headerTitle}>Upload Documents</Text>
          <Text style={styles.headerSubtitle}>
            Add your documents for solar application verification
          </Text>
        </Animated.View>

        {/* ═══ PROGRESS INDICATOR ═══ */}
        <Animated.View
          entering={FadeInDown.delay(150)}
          style={styles.progressCard}
        >
          <View style={styles.progressHeader}>
            <Ionicons name="document-text" size={20} color={Colors.primary} />
            <Text style={styles.progressTitle}>Required Documents</Text>
          </View>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${Math.min((documents.length / requiredDocs.length) * 100, 100)}%`,
                },
              ]}
            />
          </View>
          <Text style={styles.progressText}>
            {documents.length} of {requiredDocs.length} uploaded
          </Text>
        </Animated.View>

        {/* ═══ REQUIREMENTS LIST ═══ */}
        <Animated.View entering={FadeInDown.delay(200)}>
          <Text style={styles.sectionTitle}>Document Checklist</Text>
          <View style={styles.requireCard}>
            {requiredDocs.map((doc, i) => {
              const isUploaded = documents.some((d) =>
                d.typeLabel
                  .toLowerCase()
                  .includes(doc.label.toLowerCase().split(" ")[0]),
              );
              return (
                <View key={i} style={styles.requireItem}>
                  <View style={styles.requireLeft}>
                    <View
                      style={[
                        styles.requireDot,
                        doc.required && styles.requireDotRequired,
                      ]}
                    />
                    <View>
                      <Text style={styles.requireLabel}>{doc.label}</Text>
                      <Text style={styles.requireDesc}>{doc.desc}</Text>
                    </View>
                  </View>
                  <View
                    style={[
                      styles.requireStatus,
                      isUploaded && styles.requireStatusUploaded,
                    ]}
                  >
                    <Ionicons
                      name={isUploaded ? "checkmark-circle" : "circle-outline"}
                      size={20}
                      color={isUploaded ? Colors.eco : Colors.subText}
                    />
                  </View>
                </View>
              );
            })}
          </View>
        </Animated.View>

        {/* ═══ SELECT DOCUMENT TYPE ═══ */}
        <Animated.View entering={FadeInDown.delay(250)}>
          <Text style={styles.sectionTitle}>Select Document Type</Text>
          <View style={styles.typesGrid}>
            {documentTypes.map((type) => (
              <TouchableOpacity
                key={type.id}
                style={[
                  styles.typeCard,
                  selectedDocType === type.id && styles.typeCardActive,
                ]}
                onPress={() => setSelectedDocType(type.id)}
              >
                <View
                  style={[
                    styles.typeIcon,
                    selectedDocType === type.id && styles.typeIconActive,
                  ]}
                >
                  <Ionicons
                    name={type.icon as any}
                    size={20}
                    color={
                      selectedDocType === type.id ? "#fff" : Colors.primary
                    }
                  />
                </View>
                <Text
                  style={[
                    styles.typeLabel,
                    selectedDocType === type.id && styles.typeLabelActive,
                  ]}
                >
                  {type.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>

        {/* ═══ UPLOAD BUTTON ═══ */}
        <Animated.View entering={FadeInDown.delay(300)}>
          <TouchableOpacity
            style={[
              styles.uploadBtn,
              !selectedDocType && styles.uploadBtnDisabled,
            ]}
            onPress={pickFile}
            disabled={!selectedDocType}
          >
            <Ionicons name="cloud-upload-outline" size={24} color="#fff" />
            <Text style={styles.uploadText}>Choose File to Upload</Text>
          </TouchableOpacity>
          {selectedDocType && (
            <Text style={styles.uploadHint}>
              Selected:{" "}
              {documentTypes.find((d) => d.id === selectedDocType)?.label}
            </Text>
          )}
        </Animated.View>

        {/* ═══ UPLOADED DOCUMENTS ═══ */}
        {documents.length > 0 && (
          <Animated.View entering={FadeInUp}>
            <Text style={styles.sectionTitle}>
              Uploaded Documents ({documents.length})
            </Text>
            <View style={styles.docsList}>
              {documents.map((doc) => (
                <Animated.View
                  key={doc.id}
                  entering={FadeInUp}
                  style={styles.docCard}
                >
                  <View style={styles.docLeft}>
                    <View style={styles.docIconWrap}>
                      <Ionicons
                        name={getDocIcon(doc.type) as any}
                        size={22}
                        color={Colors.primary}
                      />
                    </View>
                    <View style={styles.docInfo}>
                      <Text style={styles.docName}>{doc.name}</Text>
                      <View style={styles.docMeta}>
                        <Text style={styles.docMetaText}>{doc.typeLabel}</Text>
                        <View style={styles.docDot} />
                        <Text style={styles.docMetaText}>{doc.size}</Text>
                        <View style={styles.docDot} />
                        <Text style={styles.docMetaText}>{doc.uploadedAt}</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.docActions}>
                    <TouchableOpacity
                      style={styles.docActionBtn}
                      onPress={() => openFile(doc.uri)}
                    >
                      <Ionicons
                        name="download-outline"
                        size={20}
                        color={Colors.info}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.docActionBtn}
                      onPress={() => deleteFile(doc.id)}
                    >
                      <Ionicons
                        name="trash-outline"
                        size={20}
                        color={Colors.danger}
                      />
                    </TouchableOpacity>
                  </View>
                </Animated.View>
              ))}
            </View>
          </Animated.View>
        )}

        {/* ═══ EMPTY STATE ═══ */}
        {documents.length === 0 && (
          <Animated.View
            entering={FadeInUp.delay(100)}
            style={styles.emptyCard}
          >
            <View style={styles.emptyIconWrap}>
              <Ionicons
                name="folder-open-outline"
                size={48}
                color={Colors.subText}
              />
            </View>
            <Text style={styles.emptyTitle}>No Documents Yet</Text>
            <Text style={styles.emptyText}>
              Select a document type above and upload your files to proceed with
              solar application
            </Text>
          </Animated.View>
        )}

        {/* ═══ UPLOAD TIPS ═══ */}
        <Animated.View entering={FadeInDown.delay(350)} style={styles.tipsCard}>
          <View style={styles.tipsHeader}>
            <Ionicons name="bulb" size={20} color={Colors.accent} />
            <Text style={styles.tipsTitle}>Upload Tips</Text>
          </View>
          <View style={styles.tipsList}>
            <View style={styles.tipItem}>
              <Ionicons name="checkmark-circle" size={16} color={Colors.eco} />
              <Text style={styles.tipText}>Accepts PDF, JPG, PNG formats</Text>
            </View>
            <View style={styles.tipItem}>
              <Ionicons name="checkmark-circle" size={16} color={Colors.eco} />
              <Text style={styles.tipText}>
                Maximum file size: 10MB per document
              </Text>
            </View>
            <View style={styles.tipItem}>
              <Ionicons name="checkmark-circle" size={16} color={Colors.eco} />
              <Text style={styles.tipText}>
                Ensure documents are clear and readable
              </Text>
            </View>
            <View style={styles.tipItem}>
              <Ionicons name="checkmark-circle" size={16} color={Colors.eco} />
              <Text style={styles.tipText}>
                All documents verified within 24 hours
              </Text>
            </View>
          </View>
        </Animated.View>

        {/* ═══ SUBMIT BUTTON ═══ */}
        <Animated.View entering={FadeInDown.delay(400)}>
          <TouchableOpacity
            style={[
              styles.submitBtn,
              documents.length === 0 && styles.submitBtnDisabled,
            ]}
            onPress={handleSubmit}
            disabled={documents.length === 0}
          >
            <Ionicons name="checkmark-circle" size={20} color="#fff" />
            <Text style={styles.submitBtnText}>
              {documents.length > 0
                ? `Submit ${documents.length} Document${documents.length > 1 ? "s" : ""}`
                : "Upload Documents to Continue"}
            </Text>
          </TouchableOpacity>
        </Animated.View>

        {/* ═══ HELP SECTION ═══ */}
        <Animated.View entering={FadeInDown.delay(450)} style={styles.helpCard}>
          <View style={styles.helpIconWrap}>
            <Ionicons name="help-circle" size={24} color={Colors.info} />
          </View>
          <View style={styles.helpContent}>
            <Text style={styles.helpTitle}>Need Help?</Text>
            <Text style={styles.helpText}>
              If you face any issues uploading documents, our support team is
              here to help.
            </Text>
          </View>
          <TouchableOpacity style={styles.helpBtn}>
            <Text style={styles.helpBtnText}>Contact Support</Text>
          </TouchableOpacity>
        </Animated.View>

        <View style={{ height: 30 }} />
      </ScrollView>
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
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: Colors.subText,
  },

  // ─── Section Title ───
  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 12,
  },

  // ─── Progress Card ───
  progressCard: {
    backgroundColor: Colors.primarySoft,
    borderRadius: 14,
    padding: 14,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  progressHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  },
  progressTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.primary,
  },
  progressBar: {
    height: 8,
    backgroundColor: Colors.border,
    borderRadius: 4,
    marginBottom: 8,
  },
  progressFill: {
    height: "100%",
    backgroundColor: Colors.primary,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: "600",
  },

  // ─── Requirements Card ───
  requireCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 4,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  requireItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  requireLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  requireDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.border,
  },
  requireDotRequired: {
    backgroundColor: Colors.danger,
  },
  requireLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.text,
  },
  requireDesc: {
    fontSize: 11,
    color: Colors.subText,
    marginTop: 1,
  },
  requireStatus: {
    marginLeft: 10,
  },
  requireStatusUploaded: {
    // Additional style if needed
  },

  // ─── Document Types Grid ───
  typesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 20,
  },
  typeCard: {
    width: "31%",
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.border,
  },
  typeCardActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  typeIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primarySoft,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  typeIconActive: {
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  typeLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: Colors.text,
    textAlign: "center",
  },
  typeLabelActive: {
    color: "#fff",
  },

  // ─── Upload Button ───
  uploadBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 14,
    marginBottom: 8,
  },
  uploadBtnDisabled: {
    backgroundColor: Colors.subText,
    opacity: 0.6,
  },
  uploadText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },
  uploadHint: {
    fontSize: 12,
    color: Colors.subText,
    textAlign: "center",
    marginBottom: 16,
  },

  // ─── Documents List ───
  docsList: {
    marginBottom: 20,
    gap: 10,
  },
  docCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  docLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  docIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: Colors.primarySoft,
    justifyContent: "center",
    alignItems: "center",
  },
  docInfo: {
    flex: 1,
  },
  docName: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 4,
  },
  docMeta: {
    flexDirection: "row",
    alignItems: "center",
  },
  docMetaText: {
    fontSize: 11,
    color: Colors.subText,
  },
  docDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: Colors.subText,
    marginHorizontal: 6,
  },
  docActions: {
    flexDirection: "row",
    gap: 8,
  },
  docActionBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
  },

  // ─── Empty State ───
  emptyCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 30,
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    borderStyle: "dashed",
  },
  emptyIconWrap: {
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 6,
  },
  emptyText: {
    fontSize: 13,
    color: Colors.subText,
    textAlign: "center",
    lineHeight: 18,
  },

  // ─── Tips Card ───
  tipsCard: {
    backgroundColor: Colors.accentSoft,
    borderRadius: 14,
    padding: 14,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.accent,
  },
  tipsHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  },
  tipsTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.accent,
  },
  tipsList: {
    gap: 8,
  },
  tipItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  tipText: {
    fontSize: 13,
    color: Colors.text,
    flex: 1,
  },

  // ─── Submit Button ───
  submitBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: Colors.eco,
    paddingVertical: 16,
    borderRadius: 14,
    marginBottom: 20,
  },
  submitBtnDisabled: {
    backgroundColor: Colors.subText,
    opacity: 0.6,
  },
  submitBtnText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },

  // ─── Help Card ───
  helpCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.infoSoft,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.info,
    gap: 12,
  },
  helpIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  helpContent: {
    flex: 1,
  },
  helpTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.info,
    marginBottom: 2,
  },
  helpText: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 16,
  },
  helpBtn: {
    backgroundColor: Colors.info,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  helpBtnText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#fff",
  },
});
