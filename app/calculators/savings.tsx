import React, { useState } from "react";
import {
View,
Text,
ScrollView,
TextInput,
TouchableOpacity,
StyleSheet
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function SolarSavings(){

const [bill,setBill] = useState("");
const [kw,setKw] = useState("");
const [result,setResult] = useState<any>(null);

const calculate = ()=>{

const monthlyBill = Number(bill);
const plantSize = Number(kw);

if(!monthlyBill || !plantSize) return;

// ⭐ REALISTIC SOLAR LOGIC (INDIA AVG)

const unitGeneration = plantSize * 120; // units/month
const savingPerUnit = 8; // ₹
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
<ScrollView style={styles.container}>

{/* HEADER */}
<View style={styles.header}>
<Text style={styles.title}>Solar Savings Calculator ☀️</Text>
<Text style={styles.sub}>
Estimate electricity bill reduction & solar ROI
</Text>
</View>

{/* FORM */}
<View style={styles.form}>

<Text style={styles.label}>Monthly Electricity Bill (₹)</Text>
<TextInput
style={styles.input}
keyboardType="numeric"
placeholder="Example 3000"
value={bill}
onChangeText={setBill}
/>

<Text style={styles.label}>Solar Plant Size (kW)</Text>
<TextInput
style={styles.input}
keyboardType="numeric"
placeholder="Example 3"
value={kw}
onChangeText={setKw}
/>

<TouchableOpacity style={styles.btn} onPress={calculate}>
<Text style={styles.btnText}>Calculate Savings</Text>
</TouchableOpacity>

</View>

{/* RESULT */}
{result && (
<View style={styles.resultCard}>

<Text style={styles.resultTitle}>Estimated Benefits</Text>

<ResultRow title="Monthly Saving" value={`₹ ${result.monthlySaving}`}/>
<ResultRow title="Yearly Saving" value={`₹ ${result.yearlySaving}`}/>
<ResultRow title="Plant Cost" value={`₹ ${result.plantCost}`}/>
<ResultRow title="Govt Subsidy" value={`₹ ${result.subsidy}`}/>
<ResultRow title="Final Investment" value={`₹ ${result.finalCost}`}/>
<ResultRow title="Payback Period" value={`${result.payback} Years`}/>
<ResultRow title="CO₂ Reduction" value={`${result.co2} Ton/Year`}/>

<TouchableOpacity style={styles.cta}>
<Text style={{color:"white",fontWeight:"bold"}}>
Get Solar Quote
</Text>
</TouchableOpacity>

</View>
)}

</ScrollView>
);
}

/* ROW COMPONENT */
const ResultRow = ({title,value}:any)=>(
<View style={styles.row}>
<Text>{title}</Text>
<Text style={styles.bold}>{value}</Text>
</View>
);

const styles = StyleSheet.create({

container:{flex:1,backgroundColor:"#F1F5F9"},

header:{
backgroundColor:"#16A34A",
padding:25,
borderBottomLeftRadius:25,
borderBottomRightRadius:25
},

title:{color:"white",fontSize:24,fontWeight:"bold"},
sub:{color:"#ECFDF5",marginTop:5},

form:{
backgroundColor:"white",
margin:20,
padding:20,
borderRadius:18,
elevation:4
},

label:{fontWeight:"bold",marginTop:10},
input:{
backgroundColor:"#F3F4F6",
padding:12,
borderRadius:10,
marginTop:5
},

btn:{
backgroundColor:"#2563EB",
padding:15,
borderRadius:12,
marginTop:20,
alignItems:"center"
},

btnText:{color:"white",fontWeight:"bold"},

resultCard:{
backgroundColor:"white",
marginHorizontal:20,
padding:20,
borderRadius:18,
elevation:4
},

resultTitle:{
fontSize:20,
fontWeight:"bold",
marginBottom:10
},

row:{
flexDirection:"row",
justifyContent:"space-between",
marginBottom:8
},

bold:{fontWeight:"bold"},

cta:{
backgroundColor:"#F59E0B",
padding:14,
borderRadius:12,
marginTop:15,
alignItems:"center"
}

});