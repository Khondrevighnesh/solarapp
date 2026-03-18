import React,{useState} from "react";
import {View,Text,TextInput,TouchableOpacity,StyleSheet} from "react-native";

export default function Generation(){

const [size,setSize]=useState("");
const [gen,setGen]=useState<any>(null);

const calculate=()=>{
const monthly = (Number(size)*120).toFixed(0);
setGen(monthly);
};

return(
<View style={s.container}>
<Text style={s.title}>Generation Estimator</Text>

<TextInput placeholder="Plant Size kW" keyboardType="numeric" style={s.input} value={size} onChangeText={setSize}/>

<TouchableOpacity style={s.btn} onPress={calculate}>
<Text style={s.btnText}>Estimate</Text>
</TouchableOpacity>

{gen && <Text style={s.result}>Monthly Generation : {gen} Units</Text>}
</View>
);
}

const s=StyleSheet.create({
container:{flex:1,backgroundColor:"#F1F5F9",padding:20},
title:{fontSize:22,fontWeight:"bold",marginBottom:20},
input:{backgroundColor:"white",padding:15,borderRadius:10},
btn:{backgroundColor:"#0EA5E9",padding:15,borderRadius:10,marginTop:20},
btnText:{color:"white",textAlign:"center",fontWeight:"bold"},
result:{marginTop:20,fontSize:18,fontWeight:"bold"}
});