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

export default function PlantSize(){

const [bill,setBill] = useState("");
const [size,setSize] = useState<any>(null);

const calculate = ()=>{
  if(!bill) return;

  const kw = (Number(bill)/1200).toFixed(1);
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
    Plant Size Calculator ⚡
  </Text>

  <Text style={{
    color: "#ECFDF5",
    marginTop: Theme.spacing.sm
  }}>
    Find the ideal solar system size based on your electricity bill
  </Text>
</View>

{/* ⭐ FORM */}
<View style={GlobalStyles.card}>

  <Text style={{
    fontWeight: "bold",
    marginBottom: 5
  }}>
    Monthly Electricity Bill (₹)
  </Text>

  <TextInput
    placeholder="Example: 3000"
    placeholderTextColor={Colors.subText}
    keyboardType="numeric"
    value={bill}
    onChangeText={setBill}
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
      Calculate Size
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
    Recommended System 📊
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
      {size} kW Solar Plant
    </Text>

    <Text style={{
      color: Colors.subText,
      marginTop: 5
    }}>
      Based on your monthly electricity usage
    </Text>
  </View>

  {/* ⭐ EXTRA INSIGHTS */}
  <View style={{marginTop: Theme.spacing.md}}>
    <Insight label="Monthly Generation" value={`${(Number(size)*120).toFixed(0)} Units`} />
    <Insight label="Estimated Saving" value={`₹ ${(Number(size)*120*8).toFixed(0)}`} />
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