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
} from "react-native";
import { useState } from "react";
import { Colors } from "../theme/colors";
import Screen from "../components/Screen";

export default function RegisterSolar() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [capacity, setCapacity] = useState("");
  const [year, setYear] = useState("");
  const [issue, setIssue] = useState("");

  const handleSubmit = () => {
    if (!name || !phone || !city) {
      Alert.alert("Error", "Please fill required fields");
      return;
    }

    Alert.alert(
      "Request Submitted ✅",
      "Our solar expert will call you within 2-4 days",
    );

    setName("");
    setPhone("");
    setCity("");
    setCapacity("");
    setYear("");
    setIssue("");
  };

  return (
    <Screen>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ paddingBottom: 40 }}
          >
            {/* 🟢 Solid Header */}
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Solar Services</Text>
              <Text style={styles.headerSub}>Clean • Smart • Reliable</Text>
            </View>

            {/* 🧾 Services Card */}
            <View style={styles.card}>
              <Text style={styles.service}>☀️ Solar AMC Maintenance</Text>
              <Text style={styles.service}>🧹 Panel Cleaning</Text>
              <Text style={styles.service}>🔧 Inverter Repair</Text>
              <Text style={styles.service}>📊 Generation Analytics</Text>
              <Text style={styles.service}>📡 Remote Monitoring</Text>
              <Text style={styles.service}>🚨 Breakdown Support</Text>
            </View>

            {/* 📋 Form */}
            <Text style={styles.sectionTitle}>Register Your Solar Plant</Text>

            <View style={styles.formCard}>
              <TextInput
                placeholder="Full Name"
                placeholderTextColor={Colors.subText}
                style={styles.input}
                value={name}
                onChangeText={setName}
              />

              <TextInput
                placeholder="Contact Number"
                placeholderTextColor={Colors.subText}
                keyboardType="phone-pad"
                style={styles.input}
                value={phone}
                onChangeText={setPhone}
              />

              <TextInput
                placeholder="City"
                placeholderTextColor={Colors.subText}
                style={styles.input}
                value={city}
                onChangeText={setCity}
              />

              <TextInput
                placeholder="Plant Capacity (kW)"
                placeholderTextColor={Colors.subText}
                style={styles.input}
                value={capacity}
                onChangeText={setCapacity}
              />

              <TextInput
                placeholder="Installation Year"
                placeholderTextColor={Colors.subText}
                style={styles.input}
                value={year}
                onChangeText={setYear}
              />

              <TextInput
                placeholder="Any Issue / Requirement"
                placeholderTextColor={Colors.subText}
                style={[styles.input, { height: 90 }]}
                value={issue}
                onChangeText={setIssue}
                multiline
              />

              {/* 🔘 Solid Primary Button */}
              <TouchableOpacity
                style={styles.btn}
                onPress={handleSubmit}
                activeOpacity={0.8}
              >
                <Text style={styles.btnText}>Submit Request</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  // 🟢 Header
  header: {
    backgroundColor: Colors.primary,
    padding: 20,
    paddingTop: 30,
    borderRadius: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  headerSub: {
    color: "#DCFCE7",
    marginTop: 4,
  },

  // 🧾 Card
  card: {
    backgroundColor: Colors.card,
    marginTop: 20,
    padding: 16,
    borderRadius: 14,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },

  service: {
    fontSize: 15,
    marginBottom: 10,
    color: Colors.text,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 20,
    marginTop: 20,
    color: Colors.text,
  },

  // 📋 Form Card
  formCard: {
    backgroundColor: Colors.card,

    marginTop: 20,
    padding: 16,
    borderRadius: 14,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },

  input: {
    backgroundColor: Colors.background,
    padding: 14,
    borderRadius: 10,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    color: Colors.text,
  },

  // 🔘 Button
  btn: {
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },

  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
