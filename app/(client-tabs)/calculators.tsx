import React from "react";
import {
View,
Text,
ScrollView,
StyleSheet,
TouchableOpacity
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Calculators(){

const router = useRouter();

return(
<ScrollView style={styles.container}>

{/* ⭐ PREMIUM HEADER */}
<View style={styles.header}>
  <Text style={styles.title}>Smart Solar Calculators ☀️</Text>
  <Text style={styles.sub}>
    Plan your solar investment with real-time estimation tools.
    Reduce electricity bills and choose best AMC services.
  </Text>
</View>

{/* ⭐ INTRO SECTION */}
<View style={styles.infoBox}>
  <Text style={styles.infoTitle}>Why Use Our Tools?</Text>

  <Text style={styles.infoText}>• Accurate solar savings estimation</Text>
  <Text style={styles.infoText}>• Choose correct plant capacity</Text>
  <Text style={styles.infoText}>• Finance planning with EMI calculator</Text>
  <Text style={styles.infoText}>• Battery backup sizing</Text>
  <Text style={styles.infoText}>• Rooftop feasibility check</Text>
</View>

{/* ⭐ GRID */}
<View style={styles.grid}>

<CalcCard
icon={<MaterialCommunityIcons name="solar-power" size={32} color="#2563EB"/>}
title="Solar Savings"
desc="Estimate monthly & yearly bill reduction"
onPress={()=>router.push("/calculators/savings")}
/>

<CalcCard
icon={<Ionicons name="flash" size={32} color="#16A34A"/>}
title="Plant Size"
desc="Recommended solar system capacity"
onPress={()=>router.push("/calculators/plant-size")}
/>

<CalcCard
icon={<Ionicons name="cash" size={32} color="#F59E0B"/>}
title="Solar EMI"
desc="Check solar loan monthly EMI"
onPress={()=>router.push("/calculators/emi")}
/>

<CalcCard
icon={<Ionicons name="battery-charging" size={32} color="#9333EA"/>}
title="Battery Backup"
desc="Calculate required battery storage"
onPress={()=>router.push("/calculators/battery")}
/>

<CalcCard
icon={<Ionicons name="analytics" size={32} color="#0EA5E9"/>}
title="Generation Estimator"
desc="Expected solar energy production"
onPress={()=>router.push("/calculators/generation")}
/>

<CalcCard
icon={<Ionicons name="home" size={32} color="#EF4444"/>}
title="Rooftop Area"
desc="Check solar feasibility of roof"
onPress={()=>router.push("/calculators/rooftop")}
/>

</View>

{/* ⭐ LEAD CTA */}
<View style={styles.ctaCard}>
<Text style={styles.ctaTitle}>Need Solar Expert Guidance?</Text>
<Text style={styles.ctaText}>
Our engineers will analyze your electricity bill,
roof space and load requirement to design best solar solution.
</Text>

<TouchableOpacity style={styles.ctaBtn}>
<Text style={{color:"white",fontWeight:"bold"}}>
Request Free Solar Consultation
</Text>
</TouchableOpacity>
</View>

</ScrollView>
);
}

/* ⭐ CARD COMPONENT */
const CalcCard = ({icon,title,desc,onPress}:any)=>(
<TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
{icon}
<Text style={styles.cardTitle}>{title}</Text>
<Text style={styles.cardDesc}>{desc}</Text>
<Text style={styles.open}>Open Calculator →</Text>
</TouchableOpacity>
);

/* ⭐ STYLES */
const styles = StyleSheet.create({

container:{
flex:1,
backgroundColor:"#F1F5F9"
},

header:{
backgroundColor:"#16A34A",
padding:25,
borderBottomLeftRadius:25,
borderBottomRightRadius:25
},

title:{
color:"white",
fontSize:26,
fontWeight:"bold"
},

sub:{
color:"#ECFDF5",
marginTop:6,
lineHeight:20
},

infoBox:{
backgroundColor:"white",
margin:15,
padding:18,
borderRadius:18,
elevation:3
},

infoTitle:{
fontSize:18,
fontWeight:"bold",
marginBottom:8
},

infoText:{
color:"#475569",
marginBottom:4
},

grid:{
flexDirection:"row",
flexWrap:"wrap",
justifyContent:"space-between",
paddingHorizontal:15
},

card:{
backgroundColor:"white",
width:"48%",
padding:20,
borderRadius:20,
marginBottom:15,
alignItems:"center",
elevation:4
},

cardTitle:{
fontWeight:"bold",
fontSize:16,
marginTop:10
},

cardDesc:{
color:"#6B7280",
fontSize:12,
textAlign:"center",
marginTop:4
},

open:{
marginTop:8,
color:"#2563EB",
fontWeight:"bold",
fontSize:12
},

ctaCard:{
backgroundColor:"#111827",
margin:15,
padding:20,
borderRadius:18
},

ctaTitle:{
color:"white",
fontSize:18,
fontWeight:"bold"
},

ctaText:{
color:"#CBD5E1",
marginVertical:10
},

ctaBtn:{
backgroundColor:"#16A34A",
padding:12,
borderRadius:10,
alignItems:"center"
}

});