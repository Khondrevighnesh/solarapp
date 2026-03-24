import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";

import Screen from "../components/Screen";
import { Colors } from "../theme/colors";
import { Theme } from "../theme/theme";

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
            paddingBottom: 30,
            paddingHorizontal: 20,
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 26,
              fontWeight: "700",
            }}
          >
            {plant.name}
          </Text>

          <Text
            style={{
              color: "#DCFCE7",
              marginTop: 6,
            }}
          >
            Plant Information System
          </Text>
        </View>

        {/* 🧾 OVERVIEW */}
        <Section title="Overview">
          <Info label="Plant Name" value={plant.name} />

          <TouchableOpacity onPress={() => Linking.openURL(plant.locationUrl)}>
            <Info label="Site Location" value="View Location" highlight />
          </TouchableOpacity>

          <Info label="Address" value={plant.address} />
          <Info label="Contact" value={plant.contact} />
        </Section>

        {/* ⚙️ TECHNICAL */}
        <Section title="Technical Specifications">
          <Info label="Modules" value={plant.modules} />
          <Info label="Capacity" value={plant.capacity} />
          <Info label="Strings" value={plant.strings} />

          <Divider />

          <Info label="Module Make" value={plant.moduleMake} />
          <Info label="Module Type" value={plant.moduleType} />

          <Divider />

          <Info label="Inverter Make" value={plant.inverterMake} />
          <Info label="Model" value={plant.inverterModel} />
          <Info label="Serial No." value={plant.inverterSerial} />
          <Info label="Inverter Capacity" value={plant.inverterCapacity} />

          <Divider />

          <Info label="Internet" value={plant.internet} />
        </Section>

        {/* 📅 CONTRACT */}
        <Section title="Contract">
          <Info label="Start Date" value={plant.contractStart} />
          <Info label="End Date" value={plant.contractEnd} />
        </Section>

        <View style={{ height: 40 }} />
      </ScrollView>
    </Screen>
  );
}

/* 🔹 SECTION CARD */
const Section = ({ title, children }: any) => (
  <View
    style={{
      backgroundColor: "white",
      marginHorizontal: 16,
      marginTop: 16,
      padding: 18,
      borderRadius: 18,
      borderWidth: 1,
      borderColor: "#E5E7EB",
    }}
  >
    <Text
      style={{
        fontSize: 16,
        fontWeight: "700",
        marginBottom: 12,
      }}
    >
      {title}
    </Text>
    {children}
  </View>
);

/* 🔹 INFO ROW */
const Info = ({ label, value, highlight }: any) => (
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      paddingVertical: 8,
    }}
  >
    <Text
      style={{
        color: "#6B7280",
        fontSize: 14,
      }}
    >
      {label}
    </Text>

    <Text
      style={{
        fontWeight: "600",
        fontSize: 14,
        color: highlight ? Colors.primary : "#111827",
      }}
    >
      {value}
    </Text>
  </View>
);

/* 🔹 DIVIDER */
const Divider = () => (
  <View
    style={{
      height: 1,
      backgroundColor: "#F1F5F9",
      marginVertical: 10,
    }}
  />
);
