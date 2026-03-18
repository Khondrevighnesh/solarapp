
import React from "react";
import {
View,
Text,
ScrollView,
TouchableOpacity
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { Colors } from "../theme/colors";
import { Theme } from "../theme/theme";
import { GlobalStyles } from "../theme/globalStyles";

export default function Calculators(){

const router = useRouter();

return(
<ScrollView style={GlobalStyles.container}>

{/* ⭐ HEADER */}
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
Smart Solar Calculators ☀️
</Text>

<Text style={{
color:"#ECFDF5",
marginTop:Theme.spacing.sm,
lineHeight:20
}}>
Plan solar investment with accurate estimation tools.
Choose right system size, EMI plan & AMC services.
</Text>
</View>

{/* ⭐ INFO BOX */}
<View style={GlobalStyles.card}>
<Text style={GlobalStyles.title}>Why Use Our Tools?</Text>

<Info text="Accurate solar savings estimation"/>
<Info text="Correct plant capacity recommendation"/>
<Info text="Solar EMI finance planning"/>
<Info text="Battery backup sizing"/>
<Info text="Rooftop feasibility check"/>

</View>

{/* ⭐ CALCULATOR GRID */}
<View style={{
flexDirection:"row",
flexWrap:"wrap",
justifyContent:"space-between"
}}>

<CalcCard
icon={<MaterialCommunityIcons name="solar-power" size={32} color={Colors.blue}/>}
title="Solar Savings"
desc="Monthly & yearly bill reduction"
onPress={()=>router.push("/calculators/savings")}
/>

<CalcCard
icon={<Ionicons name="flash" size={32} color={Colors.secondary}/>}
title="Plant Size"
desc="Recommended system capacity"
onPress={()=>router.push("/calculators/plant-size")}
/>

<CalcCard
icon={<Ionicons name="cash" size={32} color={Colors.accent}/>}
title="Solar EMI"
desc="Check monthly loan EMI"
onPress={()=>router.push("/calculators/emi")}
/>

<CalcCard
icon={<Ionicons name="battery-charging" size={32} color="#9333EA"/>}
title="Battery Backup"
desc="Required battery storage"
onPress={()=>router.push("/calculators/battery")}
/>

<CalcCard
icon={<Ionicons name="analytics" size={32} color={Colors.primary}/>}
title="Generation"
desc="Expected energy production"
onPress={()=>router.push("/calculators/generation")}
/>

<CalcCard
icon={<Ionicons name="home" size={32} color={Colors.danger}/>}
title="Rooftop Area"
desc="Solar feasibility check"
onPress={()=>router.push("/calculators/rooftop")}
/>

</View>

{/* ⭐ FINAL CTA */}
<View style={{
backgroundColor:Colors.blue,
padding:Theme.spacing.lg,
borderRadius:Theme.radius.lg,
marginTop:Theme.spacing.md,
marginBottom:Theme.spacing.xl
}}>

<Text style={{
color:"white",
fontSize:Theme.font.title,
fontWeight:"bold"
}}>
Need Solar Expert Guidance?
</Text>

<Text style={{
color:"#DBEAFE",
marginVertical:Theme.spacing.sm
}}>
Our engineers analyze your electricity bill,
roof space & load requirement to design best solar solution.
</Text>

<TouchableOpacity style={{
backgroundColor:Colors.secondary,
padding:14,
borderRadius:Theme.radius.md,
alignItems:"center"
}}>
<Text style={{color:"white",fontWeight:"bold"}}>
Request Free Consultation
</Text>
</TouchableOpacity>

</View>

</ScrollView>
);
}

/* ⭐ CALCULATOR CARD */
const CalcCard = ({icon,title,desc,onPress}:any)=>(
<TouchableOpacity
onPress={onPress}
activeOpacity={0.8}
style={{
backgroundColor:Colors.card,
width:"48%",
padding:Theme.spacing.md,
borderRadius:Theme.radius.lg,
borderWidth:1,
borderColor:Colors.border,
marginBottom:Theme.spacing.md,
alignItems:"center"
}}
>
{icon}

<Text style={{
fontWeight:"bold",
fontSize:Theme.font.body,
marginTop:Theme.spacing.sm,
textAlign:"center"
}}>
{title}
</Text>

<Text style={{
color:Colors.subText,
fontSize:12,
textAlign:"center",
marginTop:4
}}>
{desc}
</Text>

<Text style={{
marginTop:6,
color:Colors.blue,
fontWeight:"bold",
fontSize:12
}}>
Open Calculator →
</Text>

</TouchableOpacity>
);

/* ⭐ INFO ROW */
const Info = ({text}:any)=>(
<View style={{flexDirection:"row",marginTop:6}}>
<Ionicons name="checkmark-circle" size={18} color={Colors.primary}/>
<Text style={{marginLeft:8}}>{text}</Text>
</View>
);
