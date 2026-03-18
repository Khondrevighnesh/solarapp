import React,{useState} from "react";
import {View,Text,TextInput,TouchableOpacity,StyleSheet} from "react-native";

export default function Rooftop(){

const [area,setArea]=useState("");
const [size,setSize]=useState<any>(null);

const calculate=()=>{
const kw = (Number(area)/100).toFixed(1);
setSize(kw);
};

return(
<View style={s.container}>
<Text style={s.title}>Rooftop Area Calculator</Text>

<TextInput placeholder="Roof Area Sq.ft" keyboardType="numeric" style={s.input} value={area} onChangeText={setArea}/>

<TouchableOpacity style={s.btn} onPress={calculate}>
<Text style={s.btnText}>Calculate</Text>
</TouchableOpacity>

{size && <Text style={s.result}>Possible Plant Size : {size} kW</Text>}
</View>
);
}

const s=StyleSheet.create({
container:{flex:1,backgroundColor:"#F1F5F9",padding:20},
title:{fontSize:22,fontWeight:"bold",marginBottom:20},
input:{backgroundColor:"white",padding:15,borderRadius:10},
btn:{backgroundColor:"#EF4444",padding:15,borderRadius:10,marginTop:20},
btnText:{color:"white",textAlign:"center",fontWeight:"bold"},
result:{marginTop:20,fontSize:18,fontWeight:"bold"}
});