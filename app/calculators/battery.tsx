import React,{useState} from "react";
import {View,Text,TextInput,TouchableOpacity,StyleSheet} from "react-native";

export default function Battery(){

const [load,setLoad]=useState("");
const [backup,setBackup]=useState<any>(null);

const calculate=()=>{
const battery = (Number(load)*2).toFixed(1);
setBackup(battery);
};

return(
<View style={s.container}>
<Text style={s.title}>Battery Backup Calculator</Text>

<TextInput placeholder="Load kW" keyboardType="numeric" style={s.input} value={load} onChangeText={setLoad}/>

<TouchableOpacity style={s.btn} onPress={calculate}>
<Text style={s.btnText}>Calculate</Text>
</TouchableOpacity>

{backup && <Text style={s.result}>Required Battery : {backup} kWh</Text>}
</View>
);
}

const s=StyleSheet.create({
container:{flex:1,backgroundColor:"#F1F5F9",padding:20},
title:{fontSize:22,fontWeight:"bold",marginBottom:20},
input:{backgroundColor:"white",padding:15,borderRadius:10},
btn:{backgroundColor:"#9333EA",padding:15,borderRadius:10,marginTop:20},
btnText:{color:"white",textAlign:"center",fontWeight:"bold"},
result:{marginTop:20,fontSize:18,fontWeight:"bold"}
});