import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";

import Screen from "../components/Screen";
import { Colors } from "../theme/colors";

export default function PlantInfo() {
  const plant = {
    name: "Mudra",
    address: "123 Solar Street, Green Valley, Pune",
    locationUrl: "https://maps.google.com/?q=Pune",
    contact: "7249780908",

    modules: 200,
    capacity: "100 kW",
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
  };

  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 🔝 HEADER */}
        <View
          style={{
            backgroundColor: Colors.primary,
            paddingTop: 60,
            paddingBottom: 28,
            paddingHorizontal: 20,
            borderRadius: 30,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 24,
              fontWeight: "700",
            }}
          >
            {plant.name}
          </Text>

          <Text
            style={{
              color: "#DCFCE7",
              marginTop: 4,
            }}
          >
            Plant Information System
          </Text>
        </View>

        {/* 📍 OVERVIEW */}
        <Section title="Overview">
          <TableRow label="Plant Name" value={plant.name} bold />

          <TouchableOpacity onPress={() => Linking.openURL(plant.locationUrl)}>
            <TableRow label="Location" value="View on Map" highlight />
          </TouchableOpacity>

          <TableRow label="Address" value={plant.address} />
          <TableRow label="Contact" value={plant.contact} />
        </Section>

        {/* ⚙️ TECHNICAL */}
        <Section title="Technical Specifications">
          <TableRow label="Modules" value={plant.modules} />
          <TableRow label="Capacity" value={plant.capacity} bold />
          <TableRow label="Strings" value={plant.strings} />

          <Divider />

          <TableRow label="Module Make" value={plant.moduleMake} />
          <TableRow label="Module Type" value={plant.moduleType} />

          <Divider />

          <TableRow label="Inverter Make" value={plant.inverterMake} />
          <TableRow label="Model" value={plant.inverterModel} />
          <TableRow label="Serial No." value={plant.inverterSerial} />
          <TableRow
            label="Inverter Capacity"
            value={plant.inverterCapacity}
            bold
          />

          <Divider />

          <TableRow label="Internet" value={plant.internet} />
        </Section>

        {/* 📅 CONTRACT */}
        <Section title="Contract">
          <TableRow label="Start Date" value={plant.contractStart} />
          <TableRow label="End Date" value={plant.contractEnd} />
        </Section>

        <View style={{ height: 40 }} />
      </ScrollView>
    </Screen>
  );
}

//////////////////////////////////////////////////////

/* 🔷 SECTION CARD */
const Section = ({ title, children }: any) => (
  <View
    style={{
      backgroundColor: "white",

      marginTop: 16,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: "#E2E8F0",
      overflow: "hidden",
    }}
  >
    {/* Section Header */}
    <View
      style={{
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: "#F8FAFC",
        borderBottomWidth: 1,
        borderColor: "#E2E8F0",
      }}
    >
      <Text
        style={{
          fontSize: 15,
          fontWeight: "700",
          color: Colors.text,
        }}
      >
        {title}
      </Text>
    </View>

    {/* Content */}
    <View style={{ paddingHorizontal: 16 }}>{children}</View>
  </View>
);

//////////////////////////////////////////////////////

/* 🔷 TABLE ROW */
const TableRow = ({ label, value, highlight, bold }: any) => (
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderColor: "#F1F5F9",
    }}
  >
    {/* LEFT */}
    <Text
      style={{
        color: "#64748B",
        fontSize: 13,
        flex: 1,
      }}
    >
      {label}
    </Text>

    {/* RIGHT */}
    <Text
      style={{
        fontSize: 13,
        fontWeight: bold ? "700" : "600",
        color: highlight ? Colors.primary : "#0F172A",
        flex: 1,
        textAlign: "right",
      }}
    >
      {value}
    </Text>
  </View>
);

//////////////////////////////////////////////////////

/* 🔷 DIVIDER */
const Divider = () => (
  <View
    style={{
      height: 8,
    }}
  />
);
