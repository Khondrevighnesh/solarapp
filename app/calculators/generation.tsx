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

export default function Generation(){

const [size,setSize] = useState("");
const [gen,setGen] = useState<any>(null);

const calculate = ()=>{
  if(!size) return;

  const monthly = (Number(size)*120).toFixed(0);
  setGen(monthly);
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
    Generation Estimator ⚡
  </Text>

  <Text style={{
    color: "#ECFDF5",
    marginTop: Theme.spacing.sm
  }}>
    Estimate how much electricity your solar system will generate
  </Text>
</View>

{/* ⭐ FORM */}
<View style={GlobalStyles.card}>

  <Text style={{
    fontWeight: "bold",
    marginBottom: 5
  }}>
    Solar Plant Size (kW)
  </Text>

  <TextInput
    placeholder="Example: 3"
    placeholderTextColor={Colors.subText}
    keyboardType="numeric"
    value={size}
    onChangeText={setSize}
    style={{
      backgroundColor: Colors.background,
      padding: Theme.spacing.md,
      borderRadius: Theme.radius.md
    }}
  />

  <TouchableOpacity
    style={[GlobalStyles.button,{marginTop: Theme.spacing.lg}]}
    onPress={calculate}
  >
    <Text style={GlobalStyles.buttonText}>
      Estimate Generation
    </Text>
  </TouchableOpacity>

</View>

{/* ⭐ RESULT */}
{gen && (
<View style={GlobalStyles.card}>

  <Text style={{
    fontSize: Theme.font.heading,
    fontWeight: "bold",
    marginBottom: Theme.spacing.sm
  }}>
    Estimated Output 📊
  </Text>

  <View style={{
    backgroundColor: "#ECFDF5",
    padding: Theme.spacing.md,
    borderRadius: Theme.radius.md
  }}>
    <Text style={{
      color: Colors.primary,
      fontSize: Theme.font.title,
      fontWeight: "bold"
    }}>
      {gen} Units / Month
    </Text>

    <Text style={{
      color: Colors.subText,
      marginTop: 5
    }}>
      Based on average Indian solar conditions
    </Text>
  </View>

  {/* ⭐ EXTRA INSIGHTS */}
  <View style={{marginTop: Theme.spacing.md}}>
    <Insight label="Yearly Generation" value={`${(Number(gen)*12).toFixed(0)} Units`} />
    <Insight label="Estimated Savings" value={`₹ ${(Number(gen)*8).toFixed(0)} / month`} />
    <Insight label="CO₂ Reduction" value={`${(Number(size)*1.4).toFixed(1)} Tons/year`} />
  </View>

</View>
)}

</ScrollView>
</Screen>
);
}

/* ⭐ INSIGHT ROW */
const Insight = ({label,value}:any)=>(
<View style={{
  flexDirection:"row",
  justifyContent:"space-between",
  marginTop:6
}}>
  <Text style={{color: Colors.subText}}>
    {label}
  </Text>

  <Text style={{
    fontWeight:"bold",
    color: Colors.text
  }}>
    {value}
  </Text>
</View>
);