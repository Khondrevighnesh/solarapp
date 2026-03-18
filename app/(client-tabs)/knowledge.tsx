import React, { useState } from "react";
import {
View,
Text,
ScrollView,
StyleSheet,
TouchableOpacity,
Dimensions
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const width = Dimensions.get("window").width;

export default function Knowledge() {

const [openFaq, setOpenFaq] = useState<number | null>(null);

const toggleFaq = (index:number)=>{
  setOpenFaq(openFaq === index ? null : index);
};

return (
<View style={{flex:1}}>

<ScrollView style={styles.container}>

{/* ⭐ GRADIENT HERO */}
<View style={styles.hero}>
  <Text style={styles.heroTitle}>Solar Learning Hub ☀️</Text>
  <Text style={styles.heroSub}>
    Become smart solar owner. Learn savings, system & maintenance.
  </Text>
</View>

{/* ⭐ HORIZONTAL LEARNING */}
<Text style={styles.heading}>Solar Quick Learning</Text>

<ScrollView horizontal showsHorizontalScrollIndicator={false}>

<LearningCard
icon={<MaterialCommunityIcons name="solar-power" size={30} color="white"/>}
title="Solar Basics"
desc="Understand how solar panels generate electricity."
color="#2563EB"
/>

<LearningCard
icon={<Ionicons name="flash" size={30} color="white"/>}
title="Bill Savings"
desc="See how solar reduces electricity bills."
color="#16A34A"
/>

<LearningCard
icon={<Ionicons name="battery-charging" size={30} color="white"/>}
title="Battery System"
desc="Backup power during electricity cuts."
color="#F59E0B"
/>

</ScrollView>

{/* ⭐ INSTALLATION PROCESS */}
<Text style={styles.heading}>Installation Journey</Text>

<StepCard step="1" text="Site Visit & Solar Design"/>
<StepCard step="2" text="Subsidy & Approval Process"/>
<StepCard step="3" text="Installation & Net Meter"/>
<StepCard step="4" text="Monitoring & AMC Support"/>

{/* ⭐ SOLAR TIPS */}
<Text style={styles.heading}>Expert Solar Tips</Text>

<TipCard text="Clean panels every 15 days for maximum generation"/>
<TipCard text="Avoid shadow areas on rooftop installation"/>
<TipCard text="Track generation daily in mobile app"/>

{/* ⭐ VIDEO LEARNING */}
<Text style={styles.heading}>Watch & Learn</Text>

<View style={styles.videoCard}>
  <Ionicons name="play-circle" size={60} color="#2563EB"/>
  <Text style={{marginTop:10}}>How Solar Works (Video)</Text>
</View>

{/* ⭐ ACCORDION FAQ */}
<Text style={styles.heading}>FAQs</Text>

<Faq
q="How long solar panels last?"
a="Solar panels last 25+ years with proper maintenance."
open={openFaq === 0}
onPress={()=>toggleFaq(0)}
/>

<Faq
q="Is subsidy available?"
a="Yes central govt gives subsidy for rooftop solar."
open={openFaq === 1}
onPress={()=>toggleFaq(1)}
/>

<Faq
q="What is AMC?"
a="AMC means Annual Maintenance Contract for service & cleaning."
open={openFaq === 2}
onPress={()=>toggleFaq(2)}
/>

<View style={{height:80}}/>

</ScrollView>

{/* ⭐ STICKY CTA */}
<View style={styles.sticky}>
  <TouchableOpacity style={styles.ctaBtn}>
    <Text style={{color:"white",fontWeight:"bold"}}>Talk to Solar Expert</Text>
  </TouchableOpacity>
</View>

</View>
);
}

/* ⭐ Learning Card */
const LearningCard = ({icon,title,desc,color}:any)=>(
<View style={[styles.learnCard,{backgroundColor:color}]}>
  {icon}
  <Text style={styles.learnTitle}>{title}</Text>
  <Text style={styles.learnDesc}>{desc}</Text>
</View>
);

/* ⭐ Step Card */
const StepCard = ({step,text}:any)=>(
<View style={styles.step}>
  <View style={styles.circle}>
    <Text style={{color:"white"}}>{step}</Text>
  </View>
  <Text>{text}</Text>
</View>
);

/* ⭐ Tip Card */
const TipCard = ({text}:any)=>(
<View style={styles.tip}>
  <Ionicons name="bulb" size={20} color="#F59E0B"/>
  <Text style={{marginLeft:10}}>{text}</Text>
</View>
);

/* ⭐ FAQ */
const Faq = ({q,a,open,onPress}:any)=>(
<TouchableOpacity style={styles.faq} onPress={onPress}>
  <Text style={{fontWeight:"bold"}}>{q}</Text>
  {open && <Text style={{marginTop:5,color:"#6B7280"}}>{a}</Text>}
</TouchableOpacity>
);

/* ⭐ Styles */
const styles = StyleSheet.create({
container:{flex:1,backgroundColor:"#F1F5F9"},

hero:{
backgroundColor:"#16A34A",
padding:25
},

heroTitle:{color:"white",fontSize:26,fontWeight:"bold"},
heroSub:{color:"white",marginTop:6},

heading:{
fontSize:22,
fontWeight:"bold",
marginTop:20,
marginBottom:10,
paddingHorizontal:20
},

learnCard:{
width:width*0.7,
marginLeft:20,
padding:20,
borderRadius:20
},

learnTitle:{
color:"white",
fontSize:18,
fontWeight:"bold",
marginTop:10
},

learnDesc:{
color:"white",
marginTop:5
},

step:{
backgroundColor:"white",
marginHorizontal:20,
padding:15,
borderRadius:12,
marginBottom:10,
flexDirection:"row",
alignItems:"center"
},

circle:{
backgroundColor:"#2563EB",
width:30,
height:30,
borderRadius:15,
justifyContent:"center",
alignItems:"center",
marginRight:10
},

tip:{
backgroundColor:"white",
marginHorizontal:20,
padding:15,
borderRadius:12,
marginBottom:10,
flexDirection:"row",
alignItems:"center"
},

videoCard:{
backgroundColor:"white",
marginHorizontal:20,
padding:25,
borderRadius:16,
alignItems:"center"
},

faq:{
backgroundColor:"white",
marginHorizontal:20,
padding:15,
borderRadius:12,
marginBottom:10
},

sticky:{
position:"absolute",
bottom:10,
width:"100%",
alignItems:"center"
},

ctaBtn:{
backgroundColor:"#2563EB",
padding:15,
borderRadius:30,
width:"90%",
alignItems:"center"
}
});