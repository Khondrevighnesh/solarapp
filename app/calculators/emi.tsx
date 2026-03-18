import React,{useState} from "react";
import {View,Text,TextInput,TouchableOpacity,StyleSheet} from "react-native";

export default function EMI(){

const [cost,setCost]=useState("");
const [years,setYears]=useState("");
const [emi,setEmi]=useState<any>(null);

const calculate=()=>{
const r = 0.1/12;
const n = Number(years)*12;
const P = Number(cost);

const emiValue = (P*r*Math.pow(1+r,n))/(Math.pow(1+r,n)-1);
setEmi(emiValue.toFixed(0));
};

return(
<View style={s.container}>
<Text style={s.title}>Solar EMI Calculator</Text>

<TextInput placeholder="Plant Cost ₹" keyboardType="numeric" style={s.input} value={cost} onChangeText={setCost}/>
<TextInput placeholder="Loan Years" keyboardType="numeric" style={s.input} value={years} onChangeText={setYears}/>

<TouchableOpacity style={s.btn} onPress={calculate}>
<Text style={s.btnText}>Calculate EMI</Text>
</TouchableOpacity>

{emi && <Text style={s.result}>Monthly EMI : ₹ {emi}</Text>}
</View>
);
}

const s=StyleSheet.create({
container:{flex:1,backgroundColor:"#F1F5F9",padding:20},
title:{fontSize:22,fontWeight:"bold",marginBottom:20},
input:{backgroundColor:"white",padding:15,borderRadius:10,marginBottom:10},
btn:{backgroundColor:"#16A34A",padding:15,borderRadius:10},
btnText:{color:"white",textAlign:"center",fontWeight:"bold"},
result:{marginTop:20,fontSize:18,fontWeight:"bold"}
});