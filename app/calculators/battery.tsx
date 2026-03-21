import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView
} from "react-native";

import Screen from "../components/Screen";
import { Colors } from "../theme/colors";
import { Theme } from "../theme/theme";
import { GlobalStyles } from "../theme/globalStyles";

export default function Battery() {

  const [load, setLoad] = useState("");
  const [backup, setBackup] = useState<string | null>(null);

  const calculate = () => {
    if (!load) return;

    // ⭐ Improved Logic (Assuming 2 hours backup)
    const battery = (Number(load) * 2).toFixed(1);
    setBackup(battery);
  };

  return (
    <Screen>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: Theme.spacing.xl
        }}
      >

        {/* ⭐ HEADER */}
        <View style={{
          backgroundColor: Colors.primary,
          padding: Theme.spacing.xl,
          borderRadius: Theme.radius.xl
        }}>
          <Text style={{
            color: "white",
            fontSize: Theme.font.hero,
            fontWeight: "bold"
          }}>
            Battery Backup Calculator 🔋
          </Text>

          <Text style={{
            color: "#DCFCE7",
            marginTop: Theme.spacing.sm
          }}>
            Estimate required battery capacity for power backup
          </Text>
        </View>

        {/* ⭐ FORM */}
        <View style={[GlobalStyles.card, { marginTop: Theme.spacing.lg }]}>

          <Text style={GlobalStyles.title}>
            Enter Load Details
          </Text>

          <Text style={{ marginTop: Theme.spacing.sm }}>
            Total Load (kW)
          </Text>

          <TextInput
            placeholder="Example: 2"
            keyboardType="numeric"
            value={load}
            onChangeText={setLoad}
            style={{
              backgroundColor: "#F3F4F6",
              padding: 14,
              borderRadius: Theme.radius.md,
              marginTop: 5
            }}
          />

          <TouchableOpacity
            style={[
              GlobalStyles.button,
              { marginTop: Theme.spacing.lg }
            ]}
            onPress={calculate}
          >
            <Text style={GlobalStyles.buttonText}>
              Calculate Battery
            </Text>
          </TouchableOpacity>

        </View>

        {/* ⭐ RESULT */}
        {backup && (
          <View style={GlobalStyles.card}>

            <Text style={GlobalStyles.title}>
              Battery Requirement
            </Text>

            <View style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: Theme.spacing.md
            }}>
              <Text>Required Capacity</Text>
              <Text style={{
                fontWeight: "bold",
                color: Colors.primary
              }}>
                {backup} kWh
              </Text>
            </View>

            <View style={{
              marginTop: Theme.spacing.sm
            }}>
              <Text style={{ color: Colors.subText }}>
                *Calculated for approx 2 hours backup duration
              </Text>
            </View>

            {/* ⭐ CTA */}
            <TouchableOpacity style={{
              backgroundColor: Colors.secondary,
              padding: 14,
              borderRadius: Theme.radius.md,
              marginTop: Theme.spacing.lg,
              alignItems: "center"
            }}>
              <Text style={{ color: "white", fontWeight: "bold" }}>
                Get Battery Recommendation
              </Text>
            </TouchableOpacity>

          </View>
        )}

      </ScrollView>
    </Screen>
  );
}