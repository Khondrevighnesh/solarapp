
import React from "react";
import {
View,
Text,
ScrollView,
TouchableOpacity
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { Colors } from "../theme/colors";
import { Theme } from "../theme/theme";
import { GlobalStyles } from "../theme/globalStyles";

export default function Home(){

const router = useRouter();

return(
<ScrollView style={GlobalStyles.container}>

{/* ⭐ HERO SECTION */}
<View style={{
backgroundColor:Colors.primary,
padding:Theme.spacing.xl,
borderBottomLeftRadius:Theme.radius.xl,
borderBottomRightRadius:Theme.radius.xl
}}>

<Text style={{
color:"white",
fontSize:Theme.font.hero,
fontWeight:"bold"
}}>
Reduce Electricity Bill by 90% ☀️
</Text>

<Text style={{
color:"#ECFDF5",
marginVertical:Theme.spacing.sm
}}>
Install rooftop solar with government subsidy & easy EMI.
</Text>

<TouchableOpacity
style={GlobalStyles.button}
onPress={()=>router.push("/register-plant")}
>
<Text style={GlobalStyles.buttonText}>
Check Solar Feasibility
</Text>
</TouchableOpacity>

</View>

{/* ⭐ SAVINGS GRAPH */}
<View style={GlobalStyles.card}>

<Text style={GlobalStyles.title}>
Your Bill vs Solar Bill
</Text>

<View style={{
flexDirection:"row",
alignItems:"flex-end",
height:120,
marginTop:Theme.spacing.md
}}>

<View style={{
width:45,
height:100,
backgroundColor:Colors.danger,
borderRadius:Theme.radius.sm,
marginRight:20
}}/>

<View style={{
width:45,
height:25,
backgroundColor:Colors.secondary,
borderRadius:Theme.radius.sm
}}/>

</View>

<View style={{
flexDirection:"row",
justifyContent:"space-between",
marginTop:Theme.spacing.sm
}}>
<Text>Current Bill</Text>
<Text style={{color:Colors.danger,fontWeight:"bold"}}>
₹ 4000
</Text>
</View>

<View style={{
flexDirection:"row",
justifyContent:"space-between"
}}>
<Text>After Solar</Text>
<Text style={{color:Colors.secondary,fontWeight:"bold"}}>
₹ 300
</Text>
</View>

<Text style={{
color:Colors.accent,
fontSize:Theme.font.title,
fontWeight:"bold",
marginTop:Theme.spacing.sm
}}>
Yearly Saving ₹ 44,000
</Text>

<TouchableOpacity
style={{
backgroundColor:Colors.blue,
padding:14,
borderRadius:Theme.radius.md,
marginTop:Theme.spacing.md,
alignItems:"center"
}}
onPress={()=>router.push("/calculators")}
>
<Text style={{color:"white",fontWeight:"bold"}}>
Calculate Savings
</Text>
</TouchableOpacity>

</View>

{/* ⭐ BENEFITS */}
<View style={GlobalStyles.card}>
<Text style={GlobalStyles.title}>Why Choose Solar?</Text>

<Benefit text="25 Years Electricity Cost Protection"/>
<Benefit text="Government Subsidy up to ₹78,000"/>
<Benefit text="Increase Property Value"/>
<Benefit text="Green & Clean Energy"/>
<Benefit text="Low Maintenance Cost"/>

</View>

{/* ⭐ TESTIMONIAL */}
<View style={GlobalStyles.card}>
<Text style={GlobalStyles.title}>Happy Solar Customers ⭐</Text>

<Text style={{color:Colors.subText,marginTop:Theme.spacing.sm}}>
“My bill reduced from ₹3500 to ₹200 after solar installation.”
</Text>

<Text style={{fontWeight:"bold",marginTop:5}}>
— Rahul Patil, Pune
</Text>

<Text style={{color:Colors.subText,marginTop:Theme.spacing.md}}>
“Monitoring app helps track daily generation.”
</Text>

<Text style={{fontWeight:"bold",marginTop:5}}>
— Sneha Kulkarni, Nashik
</Text>

</View>

{/* ⭐ FINAL CTA */}
<View style={{
backgroundColor:Colors.blue,
padding:Theme.spacing.lg,
borderRadius:Theme.radius.lg,
marginBottom:Theme.spacing.xl
}}>

<Text style={{
color:"white",
fontSize:Theme.font.title,
fontWeight:"bold"
}}>
Start Your Solar Journey Today
</Text>

<Text style={{
color:"#DBEAFE",
marginVertical:Theme.spacing.sm
}}>
Book free site survey & get solar proposal.
</Text>

<TouchableOpacity
style={{
backgroundColor:Colors.secondary,
padding:14,
borderRadius:Theme.radius.md,
alignItems:"center"
}}
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
<View style={{
flexDirection:"row",
alignItems:"center",
marginTop:6
}}>
<Ionicons
name="checkmark-circle"
size={20}
color={Colors.primary}
/>
<Text style={{marginLeft:8}}>
{text}
</Text>
</View>
);