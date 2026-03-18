
import React, { useState } from "react";
import {
View,
Text,
ScrollView,
TouchableOpacity,
Dimensions
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import { Colors } from "../theme/colors";
import { Theme } from "../theme/theme";
import { GlobalStyles } from "../theme/globalStyles";

const width = Dimensions.get("window").width;

export default function Knowledge() {

const [openFaq, setOpenFaq] = useState<number | null>(null);

const toggleFaq = (i:number)=>{
setOpenFaq(openFaq === i ? null : i);
};

return (
<View style={{flex:1}}>

<ScrollView style={GlobalStyles.container}>

{/* ⭐ HERO */}
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
Solar Learning Hub ☀️
</Text>

<Text style={{
color:"#ECFDF5",
marginTop:Theme.spacing.sm
}}>
Learn solar savings, system design & maintenance tips.
</Text>
</View>

{/* ⭐ QUICK LEARNING */}
<Text style={sectionTitle}>Solar Quick Learning</Text>

<ScrollView horizontal showsHorizontalScrollIndicator={false}>

<LearningCard
icon={<MaterialCommunityIcons name="solar-power" size={30} color="white"/>}
title="Solar Basics"
desc="How solar panels generate electricity"
color={Colors.blue}
/>

<LearningCard
icon={<Ionicons name="flash" size={30} color="white"/>}
title="Bill Savings"
desc="Reduce electricity bills up to 90%"
color={Colors.secondary}
/>

<LearningCard
icon={<Ionicons name="battery-charging" size={30} color="white"/>}
title="Battery Backup"
desc="Power during electricity cuts"
color={Colors.accent}
/>

</ScrollView>

{/* ⭐ INSTALLATION JOURNEY */}
<Text style={sectionTitle}>Installation Journey</Text>

<StepCard step="1" text="Site Survey & Solar Design"/>
<StepCard step="2" text="Subsidy Documentation"/>
<StepCard step="3" text="Installation & Net Metering"/>
<StepCard step="4" text="Monitoring & AMC Service"/>

{/* ⭐ SOLAR TIPS */}
<Text style={sectionTitle}>Expert Solar Tips</Text>

<TipCard text="Clean panels every 15 days"/>
<TipCard text="Avoid shadow areas on rooftop"/>
<TipCard text="Track generation in mobile app"/>

{/* ⭐ VIDEO */}
<Text style={sectionTitle}>Watch & Learn</Text>

<View style={GlobalStyles.card}>
<Ionicons name="play-circle" size={60} color={Colors.blue}/>
<Text style={{marginTop:Theme.spacing.sm}}>
How Solar Works (Video Guide)
</Text>
</View>

{/* ⭐ FAQ */}
<Text style={sectionTitle}>FAQs</Text>

<Faq
q="How long solar panels last?"
a="Solar panels typically last 25+ years."
open={openFaq===0}
onPress={()=>toggleFaq(0)}
/>

<Faq
q="Is subsidy available?"
a="Yes government provides rooftop solar subsidy."
open={openFaq===1}
onPress={()=>toggleFaq(1)}
/>

<Faq
q="What is AMC?"
a="AMC is annual maintenance contract for service & cleaning."
open={openFaq===2}
onPress={()=>toggleFaq(2)}
/>

<View style={{height:90}}/>

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
padding:16,
borderRadius:30,
width:"90%",
alignItems:"center"
}}>
<Text style={{color:"white",fontWeight:"bold"}}>
Talk to Solar Expert
</Text>
</TouchableOpacity>
</View>

</View>
);
}

/* ⭐ SECTION TITLE */
const sectionTitle = {
fontSize:Theme.font.heading,
fontWeight:"bold",
marginTop:Theme.spacing.lg,
marginBottom:Theme.spacing.sm
};

/* ⭐ LEARNING CARD */
const LearningCard = ({icon,title,desc,color}:any)=>(
<View style={{
width:width*0.7,
marginRight:Theme.spacing.md,
backgroundColor:color,
padding:Theme.spacing.lg,
borderRadius:Theme.radius.xl
}}>
{icon}
<Text style={{
color:"white",
fontSize:Theme.font.title,
fontWeight:"bold",
marginTop:Theme.spacing.sm
}}>
{title}
</Text>
<Text style={{color:"white",marginTop:4}}>
{desc}
</Text>
</View>
);

/* ⭐ STEP CARD */
const StepCard = ({step,text}:any)=>(
<View style={GlobalStyles.card}>
<View style={{flexDirection:"row",alignItems:"center"}}>
<View style={{
backgroundColor:Colors.blue,
width:32,
height:32,
borderRadius:16,
justifyContent:"center",
alignItems:"center",
marginRight:10
}}>
<Text style={{color:"white"}}>{step}</Text>
</View>
<Text>{text}</Text>
</View>
</View>
);

/* ⭐ TIP CARD */
const TipCard = ({text}:any)=>(
<View style={GlobalStyles.card}>
<View style={{flexDirection:"row",alignItems:"center"}}>
<Ionicons name="bulb" size={20} color={Colors.accent}/>
<Text style={{marginLeft:10}}>{text}</Text>
</View>
</View>
);

/* ⭐ FAQ */
const Faq = ({q,a,open,onPress}:any)=>(
<TouchableOpacity style={GlobalStyles.card} onPress={onPress}>
<Text style={{fontWeight:"bold"}}>{q}</Text>
{open && <Text style={{
marginTop:5,
color:Colors.subText
}}>{a}</Text>}
</TouchableOpacity>
);
