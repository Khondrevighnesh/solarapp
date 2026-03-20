
import React from "react";
import {
View,
Text,
ScrollView,
TouchableOpacity,
Dimensions
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Screen from "../components/Screen";


import { Colors } from "../theme/colors";
import { Theme } from "../theme/theme";
import { GlobalStyles } from "../theme/globalStyles";

const width = Dimensions.get("window").width;

export default function Schemes() {
return (

 <Screen>

<ScrollView
showsVerticalScrollIndicator={false}
contentContainerStyle={{
paddingBottom:40,
backgroundColor:Colors.background
}}
style={{backgroundColor:Colors.background}}
>

{/* ⭐ HERO */}
<View style={{
backgroundColor:Colors.primary,
padding:Theme.spacing.xl,
borderRadius:20,
alignItems:"center"
}}>
<Text style={{
color:"white",
fontSize:Theme.font.hero,
fontWeight:"bold"
}}>
Install Solar & Save ☀️
</Text>

<Text style={{
color:"#ECFDF5",
marginTop:Theme.spacing.sm,
marginBottom:Theme.spacing.md
}}>
Government subsidy + EMI options make solar affordable.
</Text>

<TouchableOpacity style={{
backgroundColor:Colors.accent,
padding:Theme.spacing.md,
borderRadius:Theme.radius.md,
alignItems:"center"
}}>
<Text style={{color:"white",fontWeight:"bold"}}>
Check Eligibility
</Text>
</TouchableOpacity>
</View>

{/* ⭐ SCHEMES */}
<Text style={sectionTitle}>Solar Schemes & Services</Text>

<SolarCard
icon={<MaterialCommunityIcons name="solar-power" size={28} color={Colors.secondary}/>}
title="PM Surya Ghar Subsidy"
desc="Get subsidy up to ₹78,000 for rooftop solar."
badge="Gov Approved"
/>

<SolarCard
icon={<Ionicons name="card" size={26} color={Colors.blue}/>}
title="Solar EMI Plan"
desc="Install solar with EMI starting ₹1500/month."
badge="Popular"
/>

<SolarCard
icon={<Ionicons name="shield-checkmark" size={26} color={Colors.accent}/>}
title="AMC Maintenance"
desc="Cleaning, monitoring & priority breakdown support."
badge="Recommended"
/>

{/* ⭐ BENEFITS */}
<Text style={sectionTitle}>Why Go Solar?</Text>

<View style={{
flexDirection:"row",
flexWrap:"wrap",
justifyContent:"space-between"
}}>
<Benefit icon="flash" text="90% Bill Saving"/>
<Benefit icon="leaf" text="Green Energy"/>
<Benefit icon="home" text="Property Value"/>
<Benefit icon="battery-charging" text="Backup Power"/>
</View>

{/* ⭐ TRUST */}
<View style={{
backgroundColor:"#ECFDF5",
marginTop:Theme.spacing.lg,
padding:Theme.spacing.lg,
borderRadius:Theme.radius.lg,
alignItems:"center"
}}>
<Text style={{
fontWeight:"bold",
fontSize:Theme.font.title
}}>
Trusted by 1200+ Solar Customers ⭐
</Text>

<Text style={{
color:Colors.subText,
marginTop:6,
textAlign:"center"
}}>
Govt Approved Vendor • Fast Installation • 25 Year Warranty
</Text>
</View>

<View style={{height:100}}/>

</ScrollView>

{/* ⭐ STICKY CTA */}
<View style={{
position:"absolute",
bottom:15,
width:"100%",
alignItems:"center"
}}>
<TouchableOpacity style={{
backgroundColor:Colors.blue,
padding:Theme.spacing.lg,
borderRadius:30,
width:"90%",
alignItems:"center"
}}>
<Text style={{color:"white",fontWeight:"bold"}}>
Register Solar Plant
</Text>
</TouchableOpacity>
</View>
 </Screen>

);
}

/* ⭐ SECTION TITLE */
const sectionTitle = {
fontSize:Theme.font.heading,
fontWeight:"bold",
marginTop:Theme.spacing.lg,
marginBottom:Theme.spacing.sm
};

/* ⭐ SOLAR CARD */
const SolarCard = ({icon,title,desc,badge}:any)=>(
<View style={GlobalStyles.card}>

<View style={{flexDirection:"row"}}>
<View style={{
backgroundColor:"#ECFDF5",
padding:12,
borderRadius:Theme.radius.md,
marginRight:10
}}>
{icon}
</View>

<View style={{flex:1}}>
<Text style={{
fontSize:Theme.font.title,
fontWeight:"bold"
}}>
{title}
</Text>

<Text style={{
color:Colors.subText,
marginTop:4
}}>
{desc}
</Text>

<View style={{
backgroundColor:"#DCFCE7",
alignSelf:"flex-start",
paddingHorizontal:10,
paddingVertical:4,
borderRadius:20,
marginTop:6
}}>
<Text style={{
color:Colors.secondary,
fontWeight:"bold",
fontSize:12
}}>
{badge}
</Text>
</View>

</View>
</View>

<TouchableOpacity style={{
backgroundColor:Colors.primary,
marginTop:Theme.spacing.md,
padding:Theme.spacing.sm,
borderRadius:Theme.radius.md,
alignItems:"center"
}}>
<Text style={{color:"white",fontWeight:"bold"}}>
Apply Now
</Text>
</TouchableOpacity>

</View>
);

/* ⭐ BENEFIT */
const Benefit = ({icon,text}:any)=>(
<View style={{
backgroundColor:"white",
width:(width-60)/2,
padding:Theme.spacing.lg,
borderRadius:Theme.radius.lg,
alignItems:"center",
marginBottom:Theme.spacing.md
}}>
<Ionicons name={icon} size={26} color={Colors.secondary}/>
<Text style={{
marginTop:6,
fontWeight:"600"
}}>
{text}
</Text>
</View>
);