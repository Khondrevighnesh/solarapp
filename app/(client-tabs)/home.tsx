import React, { useEffect, useState } from "react";
import {
View,
Text,
ScrollView,
TouchableOpacity
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as Location from "expo-location";

import Screen from "../components/Screen";
import { Colors } from "../theme/colors";
import { Theme } from "../theme/theme";
import { useAuth } from "../../context/AuthContext";

/* ⏰ GREETING */
const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning ☀️";
  if (hour < 18) return "Good Afternoon 🌤";
  return "Good Evening 🌙";
};

export default function Home(){

const router = useRouter();
const { user } = useAuth();

const greeting = getGreeting();
const userName = user?.name?.split(" ")[0] || "User";

/* 📍 LOCATION */
const [city, setCity] = useState("Fetching...");

useEffect(() => {
  (async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setCity("Your City");
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      let geo = await Location.reverseGeocodeAsync(loc.coords);

      if (geo.length > 0) {
        setCity(geo[0].city || geo[0].region || "Your Area");
      }
    } catch {
      setCity("Your City");
    }
  })();
}, []);

return(
<Screen>

<ScrollView
showsVerticalScrollIndicator={false}
contentContainerStyle={{
paddingBottom:40,
}}
>

{/* 👋 HEADER */}
<View style={{ marginBottom: 25 }}>

<Text style={{
fontSize: 13,
color: Colors.subText
}}>
{greeting}
</Text>

<Text style={{
fontSize: Theme.font.hero,
fontWeight: "700",
marginTop: 2
}}>
{user ? `${userName} 👋` : "Welcome 👋"}
</Text>

<View style={{
flexDirection: "row",
alignItems: "center",
marginTop: 6
}}>
<Ionicons name="location-outline" size={14} color={Colors.subText}/>
<Text style={{ marginLeft: 5, color: Colors.subText }}>
{city}
</Text>
</View>

</View>


{/* 🌈 HERO */}
<View style={{
backgroundColor:Colors.primary,
padding:24,
borderRadius:24,
marginBottom:30
}}>

<Text style={{
color:"white",
fontSize:28,
fontWeight:"700",
lineHeight:36
}}>
Reduce your electricity bill{"\n"}by 90% ☀️
</Text>

<Text style={{
color:"#ECFDF5",
marginTop:10
}}>
Switch to rooftop solar with subsidy & EMI options
</Text>

<TouchableOpacity
style={{
marginTop:20,
backgroundColor:"white",
padding:14,
borderRadius:14,
alignItems:"center"
}}
onPress={()=>router.push("/dashboard/register")}
>
<Text style={{color:Colors.primary,fontWeight:"600"}}>
Check Solar Feasibility
</Text>
</TouchableOpacity>

</View>


{/* 💰 SAVINGS */}
<View style={{
backgroundColor:"#F8FAFC",
padding:20,
borderRadius:20,
marginBottom:30
}}>

<Text style={{fontSize:16,fontWeight:"600"}}>
Your Bill vs Solar
</Text>

<View style={{
flexDirection:"row",
alignItems:"flex-end",
height:100,
marginTop:20
}}>
<View style={{
width:40,
height:90,
backgroundColor:Colors.danger,
borderRadius:8,
marginRight:20
}}/>

<View style={{
width:40,
height:25,
backgroundColor:Colors.primary,
borderRadius:8
}}/>
</View>

<View style={{flexDirection:"row",justifyContent:"space-between",marginTop:10}}>
<Text style={{color:Colors.subText}}>Current</Text>
<Text style={{color:Colors.danger,fontWeight:"600"}}>₹ 4000</Text>
</View>

<View style={{flexDirection:"row",justifyContent:"space-between"}}>
<Text style={{color:Colors.subText}}>After Solar</Text>
<Text style={{color:Colors.primary,fontWeight:"600"}}>₹ 300</Text>
</View>

<Text style={{
marginTop:10,
fontWeight:"700",
color:Colors.primary
}}>
Save ₹44,000/year
</Text>

<TouchableOpacity
style={{
marginTop:15,
backgroundColor:Colors.primary,
padding:14,
borderRadius:12,
alignItems:"center"
}}
onPress={()=>router.push("/calculators")}
>
<Text style={{color:"white",fontWeight:"600"}}>
Calculate Savings
</Text>
</TouchableOpacity>

</View>


{/* ⚡ SERVICES */}
<View style={{marginBottom:30}}>
<Text style={{fontSize:16,fontWeight:"600",marginBottom:10}}>
Our Services
</Text>

<ServiceItem icon="build-outline" title="AMC Maintenance"/>
<ServiceItem icon="analytics-outline" title="Monitoring System"/>
<ServiceItem icon="cash-outline" title="Subsidy Assistance"/>

</View>


{/* 🔄 HOW IT WORKS */}
<View style={{marginBottom:30}}>
<Text style={{fontSize:16,fontWeight:"600",marginBottom:10}}>
How it works
</Text>

<StepItem step="1" text="Check feasibility"/>
<StepItem step="2" text="Free inspection"/>
<StepItem step="3" text="Installation & net metering"/>
<StepItem step="4" text="Track savings in app"/>

</View>


{/* ⭐ WHY US */}
<View style={{
backgroundColor:"#F8FAFC",
padding:18,
borderRadius:20,
marginBottom:30
}}>

<Text style={{fontSize:16,fontWeight:"600",marginBottom:10}}>
Why Sustainify?
</Text>

<Benefit text="Expert Solar Engineers"/>
<Benefit text="End-to-End EPC + O&M"/>
<Benefit text="Real-time Monitoring"/>
<Benefit text="Affordable AMC"/>

</View>


{/* 📊 APP VALUE */}
<View style={{marginBottom:30}}>

<Text style={{fontSize:16,fontWeight:"600"}}>
Track your solar system 📊
</Text>

<Text style={{marginTop:6,color:Colors.subText}}>
Monitor generation, savings & performance in real-time
</Text>

<TouchableOpacity
style={{
marginTop:15,
backgroundColor:Colors.primary,
padding:14,
borderRadius:12,
alignItems:"center"
}}
onPress={()=>router.push("/dashboard")}
>
<Text style={{color:"white",fontWeight:"600"}}>
View Demo Dashboard
</Text>
</TouchableOpacity>

</View>


{/* ⚡ AMC */}
<View style={{
backgroundColor:"#FEF9C3",
padding:18,
borderRadius:20,
marginBottom:30
}}>

<Text style={{fontWeight:"600"}}>
Upgrade to AMC ⚡
</Text>

<Text style={{marginTop:5,color:Colors.subText}}>
Keep your system at peak performance
</Text>

<TouchableOpacity
style={{
marginTop:12,
backgroundColor:Colors.primary,
padding:12,
borderRadius:10,
alignItems:"center"
}}
>
<Text style={{color:"white",fontWeight:"600"}}>
Explore Plans
</Text>
</TouchableOpacity>

</View>


{/* 🚀 FINAL CTA */}
<View style={{
backgroundColor:Colors.primary,
padding:24,
borderRadius:24,
marginBottom:30
}}>

<Text style={{
color:"white",
fontSize:18,
fontWeight:"700"
}}>
Start your solar journey
</Text>

<Text style={{
color:"#DBEAFE",
marginTop:8
}}>
Book free consultation & get proposal
</Text>

<TouchableOpacity
style={{
marginTop:15,
backgroundColor:"white",
padding:14,
borderRadius:14,
alignItems:"center"
}}
onPress={()=>router.push("/dashboard/register")}
>
<Text style={{color:Colors.primary,fontWeight:"600"}}>
Book Free Consultation
</Text>
</TouchableOpacity>

</View>

</ScrollView>
</Screen>
);
}


/* 🔧 COMPONENTS */

const ServiceItem = ({icon,title}:any)=>(
<View style={{flexDirection:"row",alignItems:"center",marginBottom:10}}>
<Ionicons name={icon} size={20} color={Colors.primary}/>
<Text style={{marginLeft:10}}>{title}</Text>
</View>
);

const StepItem = ({step,text}:any)=>(
<View style={{flexDirection:"row",marginBottom:8}}>
<View style={{
backgroundColor:Colors.primary,
width:22,
height:22,
borderRadius:11,
alignItems:"center",
justifyContent:"center",
marginRight:10
}}>
<Text style={{color:"white",fontSize:12}}>{step}</Text>
</View>
<Text>{text}</Text>
</View>
);

const Benefit = ({text}:any)=>(
<View style={{flexDirection:"row",marginBottom:6}}>
<Ionicons name="checkmark-circle" size={18} color={Colors.primary}/>
<Text style={{marginLeft:8,color:Colors.subText}}>{text}</Text>
</View>
);