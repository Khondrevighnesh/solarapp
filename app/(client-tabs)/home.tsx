import React from "react";
import {
View,
Text,
ScrollView,
TouchableOpacity
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import Screen from "../components/Screen";
import { Colors } from "../theme/colors";
import { Theme } from "../theme/theme";
import { GlobalStyles } from "../theme/globalStyles";

export default function Home(){

const router = useRouter();

return(
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
Install rooftop solar with subsidy & easy EMI plans.
</Text>

<TouchableOpacity
style={GlobalStyles.button}
onPress={()=>router.push("/dashboard/register")}
>
<Text style={GlobalStyles.buttonText}>
Check Solar Feasibility
</Text>
</TouchableOpacity>

</View>



{/* ⭐ SAVINGS */}
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

<View style={{flexDirection:"row",justifyContent:"space-between",marginTop:10}}>
<Text>Current Bill</Text>
<Text style={{color:Colors.danger,fontWeight:"bold"}}>₹ 4000</Text>
</View>

<View style={{flexDirection:"row",justifyContent:"space-between"}}>
<Text>After Solar</Text>
<Text style={{color:Colors.secondary,fontWeight:"bold"}}>₹ 300</Text>
</View>

<Text style={{
color:Colors.accent,
fontSize:Theme.font.title,
fontWeight:"bold",
marginTop:10
}}>
Yearly Saving ₹ 44,000
</Text>

<TouchableOpacity
style={{
backgroundColor:Colors.blue,
padding:14,
borderRadius:Theme.radius.md,
marginTop:15,
alignItems:"center"
}}
onPress={()=>router.push("/calculators")}
>
<Text style={{color:"white",fontWeight:"bold"}}>
Calculate Savings
</Text>
</TouchableOpacity>

</View>

{/* ⭐ SERVICES */}
<View style={GlobalStyles.card}>
<Text style={GlobalStyles.title}>Our Services</Text>


<ServiceItem icon="build-outline" title="AMC Maintenance"/>
<ServiceItem icon="analytics-outline" title="Monitoring System"/>
<ServiceItem icon="cash-outline" title="Subsidy Assistance"/>

</View>

{/* ⭐ HOW IT WORKS */}
<View style={GlobalStyles.card}>
<Text style={GlobalStyles.title}>How It Works</Text>

<StepItem step="1" text="Check solar feasibility"/>
<StepItem step="2" text="Free site inspection"/>
<StepItem step="3" text="Installation & net metering"/>
<StepItem step="4" text="Track savings from app"/>

</View>

{/* ⭐ WHY US */}
<View style={GlobalStyles.card}>
<Text style={GlobalStyles.title}>Why Sustainify Energy?</Text>

<Benefit text="Expert Solar Engineers"/>
<Benefit text="End-to-End EPC + O&M"/>
<Benefit text="Real-time Monitoring App"/>
<Benefit text="Affordable AMC Plans"/>


</View>

{/* ⭐ APP VALUE */}
<View style={GlobalStyles.card}>
<Text style={GlobalStyles.title}>Track Your Solar System 📊</Text>

<Text style={{marginTop:10,color:Colors.subText}}>
Monitor generation, savings & performance in real-time.
</Text>

<TouchableOpacity
style={GlobalStyles.button}
onPress={()=>router.push("/dashboard")}
>
<Text style={GlobalStyles.buttonText}>
View Demo Dashboard
</Text>
</TouchableOpacity>

</View>

{/* ⭐ TESTIMONIAL */}

{/* ⭐ AMC CONVERSION */}
<View style={{
backgroundColor:"#FEF3C7",
padding:Theme.spacing.lg,
borderRadius:Theme.radius.lg,
marginTop:Theme.spacing.lg
}}>

<Text style={{fontWeight:"bold",fontSize:16}}>
Upgrade to AMC Anytime ⚡
</Text>

<Text style={{marginTop:5}}>
Keep your solar system running at peak efficiency with our maintenance plans.
</Text>

<TouchableOpacity
style={{
backgroundColor:Colors.primary,
padding:12,
borderRadius:10,
marginTop:10,
alignItems:"center"
}}
>
<Text style={{color:"white",fontWeight:"bold"}}>
Explore AMC Plans
</Text>
</TouchableOpacity>

</View>

{/* ⭐ FINAL CTA */}
<View style={{
backgroundColor:Colors.blue,
padding:Theme.spacing.lg,
borderRadius:Theme.radius.lg,
marginTop:Theme.spacing.xl
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
marginVertical:10
}}>
Book free consultation & get solar proposal.
</Text>

<TouchableOpacity
style={{
backgroundColor:Colors.secondary,
padding:14,
borderRadius:Theme.radius.md,
alignItems:"center"
}}

onPress={()=>router.push("/dashboard/register")}
>
<Text style={{color:"white",fontWeight:"bold"}}>
Book Free Consultation
</Text>
</TouchableOpacity>

</View>

</ScrollView>
</Screen>
);
}

/* ⭐ COMPONENTS */

const TrustItem = ({title,subtitle}:any)=>(
<View style={{alignItems:"center"}}>
<Text style={{fontWeight:"bold",fontSize:16,color:Colors.primary}}>
{title}
</Text>
<Text style={{fontSize:12,color:Colors.subText}}>
{subtitle}
</Text>
</View>
);

const ServiceItem = ({icon,title}:any)=>(
<View style={{flexDirection:"row",alignItems:"center",marginTop:8}}>
<Ionicons name={icon} size={20} color={Colors.primary}/>
<Text style={{marginLeft:10}}>{title}</Text>
</View>
);

const StepItem = ({step,text}:any)=>(
<View style={{flexDirection:"row",marginTop:8}}>
<Text style={{
backgroundColor:Colors.primary,
color:"white",
width:22,
height:22,
textAlign:"center",
borderRadius:11,
marginRight:10
}}>
{step}
</Text>
<Text>{text}</Text>
</View>
);

const Benefit = ({text}:any)=>(
<View style={{flexDirection:"row",marginTop:6}}>
<Ionicons name="checkmark-circle" size={20} color={Colors.primary}/>
<Text style={{marginLeft:8}}>{text}</Text>
</View>
);