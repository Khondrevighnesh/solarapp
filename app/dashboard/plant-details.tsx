import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import Screen from "../components/Screen";
import { Colors } from "../theme/colors";
import { Theme } from "../theme/theme";

export default function PlantInfo() {
  const plant = {
    name: "Mudra",
    address: "123 Solar Street, Green Valley, Pune",
    locationUrl: "https://maps.google.com/?q=Pune",
    contact: "7249780908",

    capacity: "100 kW",
    modules: 200,
    strings: 12030,

    moduleMake: "SolarTech",
    moduleType: "Monocrystalline",

    inverterMake: "InverterCo",
    inverterModel: "ModelX123",
    inverterSerial: "SN4567890",
    inverterCapacity: "500 kW",

    internet: "WiFi",

    contractStart: "18/06/2025",
    contractEnd: "30/06/2026",

    status: "ACTIVE",
    generationToday: "520 kWh",
    performance: "94%",
    faults: 0,
  };

  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 🔝 HEADER */}
        <View
          style={{
            paddingTop: 10,

            borderRadius: 30,
            margin: 10,
          }}
        >
          <View style={[styles.card, { backgroundColor: Colors.primary }]}>
            <Text style={styles.headerTitle}>{plant.name}</Text>
            <Text style={styles.headerSub}>{plant.address}</Text>

            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>{plant.status}</Text>
            </View>
          </View>
        </View>

        {/* ⚡ QUICK STATS */}
        <View style={styles.rowBetween}>
          <StatCard title="Today" value={plant.generationToday} />
          <StatCard title="PR" value={plant.performance} highlight />
          <StatCard
            title="Faults"
            value={plant.faults === 0 ? "None" : plant.faults}
            danger={plant.faults > 0}
          />
        </View>

        {/* ACTION BUTTONS */}
        <View style={styles.rowButtons}>
          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={() => Linking.openURL(plant.locationUrl)}
          >
            <Text style={styles.btnText}>📍 Location</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryBtn}
            onPress={() => Linking.openURL(`tel:${plant.contact}`)}
          >
            <Text style={styles.secondaryText}>📞 Call</Text>
          </TouchableOpacity>
        </View>

        {/* CONTENT */}
        <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
          <Section title="Overview">
            <Row
              icon="business-outline"
              label="Plant Name"
              value={plant.name}
            />
            <Row
              icon="location-outline"
              label="Site Location"
              value="View Location"
              link
              onPress={() => Linking.openURL(plant.locationUrl)}
            />
            <Row icon="map-outline" label="Address" value={plant.address} />
            <Row icon="call-outline" label="Contact" value={plant.contact} />
          </Section>

          <Section title="Technical">
            <Row
              icon="flash-outline"
              label="Capacity"
              value={plant.capacity}
              highlight
            />
            <Row icon="grid-outline" label="Modules" value={plant.modules} />
            <Row
              icon="git-network-outline"
              label="Strings"
              value={plant.strings}
            />

            <Divider />

            <Row
              icon="cube-outline"
              label="Module Make"
              value={plant.moduleMake}
            />
            <Row
              icon="layers-outline"
              label="Module Type"
              value={plant.moduleType}
            />

            <Divider />

            <Row
              icon="hardware-chip-outline"
              label="Inverter Make"
              value={plant.inverterMake}
            />
            <Row
              icon="settings-outline"
              label="Model"
              value={plant.inverterModel}
            />
            <Row
              icon="barcode-outline"
              label="Serial"
              value={plant.inverterSerial}
            />
            <Row
              icon="battery-charging-outline"
              label="Capacity"
              value={plant.inverterCapacity}
            />

            <Divider />

            <Row icon="wifi-outline" label="Internet" value={plant.internet} />
          </Section>

          <Section title="Performance">
            <Row
              icon="sunny-outline"
              label="Generation"
              value={plant.generationToday}
              accent
            />
            <Row
              icon="trending-up-outline"
              label="Performance"
              value={plant.performance}
              accent
            />
            <Row
              icon="shield-checkmark-outline"
              label="System Health"
              value={plant.faults === 0 ? "Healthy" : "Issue"}
              status={plant.faults === 0}
            />
          </Section>

          <Section title="Contract">
            <Row
              icon="calendar-outline"
              label="Start Date"
              value={plant.contractStart}
            />
            <Row
              icon="calendar-clear-outline"
              label="End Date"
              value={plant.contractEnd}
            />
          </Section>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </Screen>
  );
}

//////////////////////////////////////////////////////

const Section = ({ title, children }: any) => (
  <View style={{ marginBottom: 24 }}>
    <Text style={styles.sectionTitle}>{title}</Text>

    <View style={styles.card}>{children}</View>
  </View>
);

//////////////////////////////////////////////////////

const Row = ({
  icon,
  label,
  value,
  highlight,
  status,
  accent,
  link,
  onPress,
}: any) => {
  const color = link
    ? Colors.primary
    : highlight
      ? Colors.primary
      : accent
        ? Colors.accent
        : status === true
          ? Colors.eco
          : status === false
            ? Colors.danger
            : Colors.text;

  const content = (
    <View style={styles.row}>
      <View style={styles.rowLeft}>
        <Ionicons name={icon} size={18} color={Colors.subText} />
        <Text style={styles.label}>{label}</Text>
      </View>

      <Text style={[styles.value, { color }]}>{value}</Text>
    </View>
  );

  if (onPress)
    return <TouchableOpacity onPress={onPress}>{content}</TouchableOpacity>;

  return content;
};

//////////////////////////////////////////////////////

const Divider = () => <View style={{ height: 10 }} />;

//////////////////////////////////////////////////////

const StatCard = ({ title, value, highlight, danger }: any) => (
  <View style={[styles.card, { width: "31%" }]}>
    <Text style={{ fontSize: 11, color: Colors.subText }}>{title}</Text>

    <Text
      style={{
        marginTop: 4,
        fontWeight: "bold",
        color: highlight ? Colors.accent : danger ? Colors.danger : Colors.text,
      }}
    >
      {value}
    </Text>
  </View>
);

//////////////////////////////////////////////////////

const styles = {
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: Colors.shadow,
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },

  headerTitle: {
    color: Colors.textInverse,
    fontSize: Theme.font.hero,
    fontWeight: "bold",
  },

  headerSub: {
    color: Colors.primarySoft,
    marginTop: 4,
  },

  statusBadge: {
    marginTop: 10,
    backgroundColor: Colors.ecoSoft,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    alignSelf: "flex-start",
  },

  statusText: {
    color: Colors.eco,
    fontWeight: "600",
    fontSize: 12,
  },

  sectionTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: Colors.textSecondary,
    marginBottom: 10,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: Colors.borderLight,
  },

  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  label: {
    color: Colors.subText,
  },

  value: {
    fontWeight: "600",
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },

  rowButtons: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginTop: 16,
  },

  primaryBtn: {
    flex: 1,
    backgroundColor: Colors.primary,
    padding: 12,
    borderRadius: 14,
    alignItems: "center",
    marginRight: 8,
  },

  secondaryBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.primary,
    padding: 12,
    borderRadius: 14,
    alignItems: "center",
  },

  btnText: {
    color: Colors.textInverse,
    fontWeight: "600",
  },

  secondaryText: {
    color: Colors.primary,
    fontWeight: "600",
  },
};
