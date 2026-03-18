import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert
} from "react-native";
import { useState } from "react";

export default function RegisterSolar() {

  const [name,setName] = useState("");
  const [phone,setPhone] = useState("");
  const [city,setCity] = useState("");
  const [capacity,setCapacity] = useState("");
  const [year,setYear] = useState("");
  const [issue,setIssue] = useState("");

  const handleSubmit = () => {
    if(!name || !phone || !city){
      Alert.alert("Error","Please fill required fields");
      return;
    }

    Alert.alert(
      "Request Submitted ✅",
      "Our solar expert will call you within 2-4 days"
    );

    setName("");
    setPhone("");
    setCity("");
    setCapacity("");
    setYear("");
    setIssue("");
  }

  return (
    <ScrollView style={styles.container}>

      <Text style={styles.heading}>Solar Services</Text>

      <View style={styles.serviceCard}>
        <Text style={styles.service}>☀️ Solar AMC Maintenance</Text>
        <Text style={styles.service}>🧹 Panel Cleaning</Text>
        <Text style={styles.service}>🔧 Inverter Repair</Text>
        <Text style={styles.service}>📊 Generation Analytics</Text>
        <Text style={styles.service}>📡 Remote Monitoring</Text>
        <Text style={styles.service}>🚨 Breakdown Support</Text>
      </View>

      <Text style={styles.heading}>Register Your Solar Plant</Text>

      <TextInput
        placeholder="Full Name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <TextInput
        placeholder="Contact Number"
        keyboardType="phone-pad"
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
      />

      <TextInput
        placeholder="City"
        style={styles.input}
        value={city}
        onChangeText={setCity}
      />

      <TextInput
        placeholder="Plant Capacity (kW)"
        style={styles.input}
        value={capacity}
        onChangeText={setCapacity}
      />

      <TextInput
        placeholder="Installation Year"
        style={styles.input}
        value={year}
        onChangeText={setYear}
      />

      <TextInput
        placeholder="Any Issue / Requirement"
        style={[styles.input,{height:80}]}
        value={issue}
        onChangeText={setIssue}
        multiline
      />

      <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
        <Text style={styles.btnText}>Submit Request</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#F1F5F9",
    padding:20
  },
  heading:{
    fontSize:22,
    fontWeight:"bold",
    marginBottom:15,
    marginTop:10
  },
  serviceCard:{
    backgroundColor:"white",
    padding:15,
    borderRadius:12,
    marginBottom:20
  },
  service:{
    fontSize:16,
    marginBottom:8
  },
  input:{
    backgroundColor:"white",
    padding:14,
    borderRadius:10,
    marginBottom:15
  },
  btn:{
    backgroundColor:"#16A34A",
    padding:16,
    borderRadius:12,
    alignItems:"center",
    marginTop:10
  },
  btnText:{
    color:"white",
    fontSize:16,
    fontWeight:"bold"
  }
});