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

export default function Home(){

const router = useRouter();

return(
<ScrollView style={styles.container}>

{/* ⭐ HERO */}
<View style={styles.hero}>
<Text style={styles.heroTitle}>Reduce Your Electricity Bill by 90% ☀️</Text>
<Text style={styles.heroSub}>
Install rooftop solar with govt subsidy & easy EMI plans.
</Text>

<TouchableOpacity
style={styles.heroBtn}
onPress={()=>router.push("/register-plant")}
>
<Text style={styles.heroBtnText}>Check Solar Feasibility</Text>
</TouchableOpacity>
</View>

{/* ⭐ SAVINGS GRAPH PREVIEW */}
<View style={styles.graphCard}>
<Text style={styles.graphTitle}>Your Bill vs Solar Bill</Text>

<View style={styles.graphBox}>
<View style={styles.bar1}/>
<View style={styles.bar2}/>
</View>

<View style={styles.row}>
<Text>Current Bill</Text>
<Text style={styles.red}>₹ 4000</Text>
</View>

<View style={styles.row}>
<Text>After Solar</Text>
<Text style={styles.green}>₹ 300</Text>
</View>

<Text style={styles.yearSave}>Yearly Saving ₹ 44,000</Text>

<TouchableOpacity
style={styles.calcBtn}
onPress={()=>router.push("/calculators")}
>
<Text style={{color:"white",fontWeight:"bold"}}>
Calculate Your Savings
</Text>
</TouchableOpacity>
</View>

{/* ⭐ BENEFITS */}
<View style={styles.card}>
<Text style={styles.cardTitle}>Why Choose Solar?</Text>

<Benefit text="25 Years Electricity Cost Protection"/>
<Benefit text="Government Subsidy up to ₹78,000"/>
<Benefit text="Increase Property Value"/>
<Benefit text="Green & Sustainable Energy"/>
<Benefit text="Low Maintenance Cost"/>

</View>

{/* ⭐ EMI OFFER */}
<View style={styles.emiCard}>
<MaterialCommunityIcons name="solar-power" size={30} color="#FACC15"/>
<Text style={styles.emiTitle}>Solar @ ₹1499 EMI</Text>
<Text style={styles.emiSub}>
Install solar now and pay from electricity savings.
</Text>

<TouchableOpacity
style={styles.quoteBtn}
onPress={()=>router.push("/register-plant")}
>
<Text style={{color:"white",fontWeight:"bold"}}>
Get Free Quote
</Text>
</TouchableOpacity>
</View>

{/* ⭐ TESTIMONIAL */}
<View style={styles.testimonial}>
<Text style={styles.testTitle}>Happy Solar Customers ⭐</Text>

<View style={styles.testCard}>
<Text style={styles.testText}>
“My electricity bill reduced from ₹3500 to ₹200 after installing solar.
Excellent service & AMC support.”
</Text>
<Text style={styles.testName}>— Rahul Patil, Pune</Text>
</View>

<View style={styles.testCard}>
<Text style={styles.testText}>
“Installation was smooth. Monitoring app helps track generation daily.”
</Text>
<Text style={styles.testName}>— Sneha Kulkarni, Nashik</Text>
</View>

</View>

{/* ⭐ FINAL CTA */}
<View style={styles.finalCta}>
<Text style={styles.finalTitle}>Start Your Solar Journey Today</Text>
<Text style={styles.finalSub}>
Book free site survey & get custom solar proposal.
</Text>

<TouchableOpacity
style={styles.finalBtn}
onPress={()=>router.push("/register-plant")}
>
<Text style={{color:"white",fontWeight:"bold"}}>
Book Free Consultation
</Text>
</TouchableOpacity>
</View>

</ScrollView>
);
}

/* ⭐ BENEFIT ROW */
const Benefit = ({text}:any)=>(
<View style={styles.benefitRow}>
<Ionicons name="checkmark-circle" size={20} color="#16A34A"/>
<Text style={{marginLeft:8}}>{text}</Text>
</View>
);

const styles = StyleSheet.create({

container:{flex:1,backgroundColor:"#F1F5F9"},

hero:{
backgroundColor:"#16A34A",
padding:25,
borderBottomLeftRadius:25,
borderBottomRightRadius:25
},

heroTitle:{color:"white",fontSize:26,fontWeight:"bold"},
heroSub:{color:"#ECFDF5",marginVertical:10},

heroBtn:{
backgroundColor:"#2563EB",
padding:14,
borderRadius:12,
alignItems:"center"
},

heroBtnText:{color:"white",fontWeight:"bold"},

graphCard:{
backgroundColor:"white",
margin:15,
padding:20,
borderRadius:18
},

graphTitle:{color:"black",fontSize:18,fontWeight:"bold"},

graphBox:{
flexDirection:"row",
alignItems:"flex-end",
height:120,
marginTop:20,
marginBottom:10
},

bar1:{
width:40,
height:100,
backgroundColor:"#EF4444",
marginRight:20,
borderRadius:8
},

bar2:{
width:40,
height:20,
backgroundColor:"#22C55E",
borderRadius:8
},

row:{
flexDirection:"row",
justifyContent:"space-between",
marginTop:5
},

red:{color:"#F87171",fontWeight:"bold"},
green:{color:"#4ADE80",fontWeight:"bold"},

yearSave:{
color:"#FACC15",
fontSize:20,
fontWeight:"bold",
marginTop:10
},

calcBtn:{
backgroundColor:"#2563EB",
padding:12,
borderRadius:10,
marginTop:15,
alignItems:"center"
},

card:{
backgroundColor:"white",
margin:15,
padding:18,
borderRadius:18,
elevation:4
},

cardTitle:{fontSize:18,fontWeight:"bold",marginBottom:10},

benefitRow:{
flexDirection:"row",
alignItems:"center",
marginBottom:6
},

emiCard:{
backgroundColor:"white",
margin:15,
padding:20,
borderRadius:18
},

emiTitle:{color:"black",fontSize:18,fontWeight:"bold",marginTop:5},
emiSub:{color:"black",marginVertical:10},

quoteBtn:{
backgroundColor:"#16A34A",
padding:12,
borderRadius:10,
alignItems:"center"
},

testimonial:{
margin:15
},

testTitle:{fontSize:18,fontWeight:"bold",marginBottom:10},

testCard:{
backgroundColor:"white",
padding:15,
borderRadius:15,
marginBottom:10,
elevation:3
},

testText:{color:"#374151"},
testName:{marginTop:5,fontWeight:"bold"},

finalCta:{
backgroundColor:"#2563EB",
margin:15,
padding:20,
borderRadius:18
},

finalTitle:{color:"white",fontSize:18,fontWeight:"bold"},
finalSub:{color:"#DBEAFE",marginVertical:10},

finalBtn:{
backgroundColor:"#16A34A",
padding:14,
borderRadius:10,
alignItems:"center"
}

});