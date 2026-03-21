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

export default function Rooftop(){

const [area,setArea] = useState("");
const [size,setSize] = useState<any>(null);

const calculate = ()=>{
  if(!area) return;

  const kw = (Number(area)/100).toFixed(1);
  setSize(kw);
};

return(
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
  borderRadius: Theme.radius.lg
}}>
  <Text style={{
    color: "white",
    fontSize: Theme.font.hero,
    fontWeight: "bold"
  }}>
    Rooftop Calculator 🏠
  </Text>

  <Text style={{
    color: "#ECFDF5",
    marginTop: Theme.spacing.sm
  }}>
    Check how much solar you can install on your roof
  </Text>
</View>

{/* ⭐ FORM */}
<View style={GlobalStyles.card}>

  <Text style={{
    fontWeight: "bold",
    marginBottom: 5
  }}>
    Roof Area (Sq.ft)
  </Text>

  <TextInput
    placeholder="Example: 500"
    placeholderTextColor={Colors.subText}
    keyboardType="numeric"
    value={area}
    onChangeText={setArea}
    style={{
      backgroundColor: Colors.background,
      padding: Theme.spacing.md,
      borderRadius: Theme.radius.md
    }}
  />

  <TouchableOpacity
    style={[GlobalStyles.button, { marginTop: Theme.spacing.lg }]}
    onPress={calculate}
  >
    <Text style={GlobalStyles.buttonText}>
      Calculate Capacity
    </Text>
  </TouchableOpacity>

</View>

{/* ⭐ RESULT */}
{size && (
<View style={GlobalStyles.card}>

  <Text style={{
    fontSize: Theme.font.heading,
    fontWeight: "bold",
    marginBottom: Theme.spacing.sm
  }}>
    Result ⚡
  </Text>

  <View style={{
    backgroundColor: "#ECFDF5",
    padding: Theme.spacing.md,
    borderRadius: Theme.radius.md
  }}>
    <Text style={{
      color: Colors.primary,
      fontWeight: "bold",
      fontSize: Theme.font.title
    }}>
      {size} kW System Possible
    </Text>

    <Text style={{
      color: Colors.subText,
      marginTop: 5
    }}>
      Based on your rooftop area
    </Text>
  </View>

</View>
)}

</ScrollView>
</Screen>
);
}