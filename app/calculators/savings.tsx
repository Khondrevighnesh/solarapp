import React, { useState } from "react";
import {
View,
Text,
ScrollView,
TextInput,
TouchableOpacity
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import Screen from "../components/Screen";

import { Colors } from "../theme/colors";
import { Theme } from "../theme/theme";
import { GlobalStyles } from "../theme/globalStyles";

export default function SolarSavings(){

const [bill,setBill] = useState("");
const [kw,setKw] = useState("");
const [result,setResult] = useState<any>(null);

const calculate = ()=>{

const monthlyBill = Number(bill);
const plantSize = Number(kw);

if(!monthlyBill || !plantSize) return;

// ⭐ SOLAR LOGIC
const unitGeneration = plantSize * 120;
const savingPerUnit = 8;

const monthlySaving = unitGeneration * savingPerUnit;
const yearlySaving = monthlySaving * 12;

const plantCost = plantSize * 55000;
const subsidy = plantSize * 18000;
const finalCost = plantCost - subsidy;

const payback = (finalCost / yearlySaving).toFixed(1);
const co2 = (plantSize * 1.4).toFixed(1);

setResult({
monthlySaving,
yearlySaving,
plantCost,
subsidy,
finalCost,
payback,
co2
});
};

return(
<Screen>

<ScrollView
showsVerticalScrollIndicator={false}
contentContainerStyle={{
paddingBottom:Theme.spacing.xl
}}
>

{/* ⭐ HEADER */}
<View style={{
backgroundColor:Colors.primary,
padding:Theme.spacing.xl,
borderRadius:Theme.radius.lg
}}>

<Text style={{
color:"white",
fontSize:Theme.font.hero,
fontWeight:"bold"
}}>
Solar Savings Calculator ☀️
</Text>

<Text style={{
color:"#ECFDF5",
marginTop:Theme.spacing.sm
}}>
Estimate electricity bill reduction & solar ROI
</Text>

</View>

{/* ⭐ FORM */}
<View style={GlobalStyles.card}>

<Text style={{fontWeight:"bold",marginTop:Theme.spacing.sm}}>
Monthly Electricity Bill (₹)
</Text>

<TextInput
style={{
backgroundColor:Colors.background,
padding:Theme.spacing.md,
borderRadius:Theme.radius.md,
marginTop:5
}}
keyboardType="numeric"
placeholder="Example 3000"
placeholderTextColor={Colors.subText}
value={bill}
onChangeText={setBill}
/>

<Text style={{fontWeight:"bold",marginTop:Theme.spacing.md}}>
Solar Plant Size (kW)
</Text>

<TextInput
style={{
backgroundColor:Colors.background,
padding:Theme.spacing.md,
borderRadius:Theme.radius.md,
marginTop:5
}}
keyboardType="numeric"
placeholder="Example 3"
placeholderTextColor={Colors.subText}
value={kw}
onChangeText={setKw}
/>

<TouchableOpacity
style={[GlobalStyles.button,{marginTop:Theme.spacing.lg}]}
onPress={calculate}
>
<Text style={GlobalStyles.buttonText}>
Calculate Savings
</Text>
</TouchableOpacity>

</View>

{/* ⭐ RESULT */}
{result && (
<View style={GlobalStyles.card}>

<Text style={{
fontSize:Theme.font.heading,
fontWeight:"bold",
marginBottom:Theme.spacing.sm
}}>
Estimated Benefits 📊
</Text>

<ResultRow title="Monthly Saving" value={`₹ ${result.monthlySaving}`}/>
<ResultRow title="Yearly Saving" value={`₹ ${result.yearlySaving}`}/>
<ResultRow title="Plant Cost" value={`₹ ${result.plantCost}`}/>
<ResultRow title="Govt Subsidy" value={`₹ ${result.subsidy}`}/>
<ResultRow title="Final Investment" value={`₹ ${result.finalCost}`}/>
<ResultRow title="Payback Period" value={`${result.payback} Years`}/>
<ResultRow title="CO₂ Reduction" value={`${result.co2} Ton/Year`}/>

{/* ⭐ CTA */}
<TouchableOpacity
style={{
backgroundColor:Colors.accent,
padding:14,
borderRadius:Theme.radius.md,
marginTop:Theme.spacing.md,
alignItems:"center"
}}
>
<Text style={{
color:Colors.text,
fontWeight:"bold"
}}>
Get Solar Quote
</Text>
</TouchableOpacity>

</View>
)}

</ScrollView>
</Screen>
);
}

/* ⭐ ROW */
const ResultRow = ({title,value}:any)=>(
<View style={{
flexDirection:"row",
justifyContent:"space-between",
marginBottom:8
}}>
<Text style={{color:Colors.subText}}>
{title}
</Text>

<Text style={{
fontWeight:"bold",
color:Colors.text
}}>
{value}
</Text>
</View>
);