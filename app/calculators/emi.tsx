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

export default function EMI() {

  const [cost, setCost] = useState("");
  const [years, setYears] = useState("");
  const [emi, setEmi] = useState<string | null>(null);

  const calculate = () => {
    if (!cost || !years) return;

    const r = 0.1 / 12; // 10% interest
    const n = Number(years) * 12;
    const P = Number(cost);

    const emiValue =
      (P * r * Math.pow(1 + r, n)) /
      (Math.pow(1 + r, n) - 1);

    setEmi(emiValue.toFixed(0));
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
            Solar EMI Calculator 💰
          </Text>

          <Text style={{
            color: "#DCFCE7",
            marginTop: Theme.spacing.sm
          }}>
            Plan your solar investment with easy monthly EMI calculation
          </Text>
        </View>

        {/* ⭐ FORM */}
        <View style={[GlobalStyles.card, { marginTop: Theme.spacing.lg }]}>

          <Text style={GlobalStyles.title}>
            Enter Details
          </Text>

          <Text style={{ marginTop: Theme.spacing.sm }}>
            Plant Cost (₹)
          </Text>
          <TextInput
            placeholder="Example: 150000"
            keyboardType="numeric"
            value={cost}
            onChangeText={setCost}
            style={{
              backgroundColor: "#F3F4F6",
              padding: 14,
              borderRadius: Theme.radius.md,
              marginTop: 5
            }}
          />

          <Text style={{ marginTop: Theme.spacing.md }}>
            Loan Duration (Years)
          </Text>
          <TextInput
            placeholder="Example: 5"
            keyboardType="numeric"
            value={years}
            onChangeText={setYears}
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
              Calculate EMI
            </Text>
          </TouchableOpacity>

        </View>

        {/* ⭐ RESULT */}
        {emi && (
          <View style={[GlobalStyles.card]}>

            <Text style={GlobalStyles.title}>
              EMI Breakdown
            </Text>

            <View style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: Theme.spacing.md
            }}>
              <Text>Monthly EMI</Text>
              <Text style={{ fontWeight: "bold", color: Colors.primary }}>
                ₹ {emi}
              </Text>
            </View>

            <View style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 6
            }}>
              <Text>Total Payment</Text>
              <Text style={{ fontWeight: "bold" }}>
                ₹ {Number(emi) * Number(years) * 12}
              </Text>
            </View>

            <View style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 6
            }}>
              <Text>Interest Paid</Text>
              <Text style={{ fontWeight: "bold", color: Colors.danger }}>
                ₹ {(Number(emi) * Number(years) * 12 - Number(cost)).toFixed(0)}
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
                Get Solar Loan Assistance
              </Text>
            </TouchableOpacity>

          </View>
        )}

      </ScrollView>
    </Screen>
  );
}