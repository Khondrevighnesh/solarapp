
import React from "react";
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

export default function Profile(){

return(
<View style={{flex:1}}>

<ScrollView style={GlobalStyles.container}>

{/* ⭐ PROFILE HEADER */}
<View style={{
backgroundColor:Colors.primary,
padding:Theme.spacing.xl,
alignItems:"center",
borderBottomLeftRadius:Theme.radius.xl,
borderBottomRightRadius:Theme.radius.xl
}}>
<View style={{
backgroundColor:Colors.blue,
width:90,
height:90,
borderRadius:45,
justifyContent:"center",
alignItems:"center",
marginBottom:Theme.spacing.sm
}}>
<Ionicons name="person" size={42} color="white"/>
</View>

<Text style={{
color:"white",
fontSize:Theme.font.hero,
fontWeight:"bold"
}}>
Demo Client
</Text>

<Text style={{color:"#DCFCE7",marginTop:4}}>
demo@gmail.com
</Text>

<View style={{
backgroundColor:Colors.secondary,
paddingHorizontal:16,
paddingVertical:6,
borderRadius:20,
marginTop:Theme.spacing.sm
}}>
<Text style={{color:"white"}}>AMC Active</Text>
</View>

</View>

{/* ⭐ QUICK ACTION */}
<Text style={sectionTitle}>Quick Actions</Text>

<View style={{
flexDirection:"row",
justifyContent:"space-between"
}}>

<ActionCard icon="solar-power" title="My Plants"/>
<ActionCard icon="tools" title="Service"/>
<ActionCard icon="file-document" title="Reports"/>

</View>

{/* ⭐ SUMMARY */}
<Text style={sectionTitle}>Plant Summary</Text>

<View style={GlobalStyles.card}>
<Text>Total Plants : 2</Text>
<Text style={{marginTop:6}}>Total Capacity : 8kW</Text>
<Text style={{marginTop:6}}>Last Service : 20 Feb 2026</Text>
</View>

{/* ⭐ SETTINGS */}
<Text style={sectionTitle}>Settings</Text>

<SettingItem icon="person-outline" text="Edit Profile"/>
<SettingItem icon="call-outline" text="Contact Support"/>
<SettingItem icon="document-text-outline" text="Terms & Policy"/>
<SettingItem icon="star-outline" text="Rate App"/>

<View style={{height:100}}/>

</ScrollView>

{/* ⭐ LOGOUT CTA */}
<View style={{
position:"absolute",
bottom:15,
width:"100%",
alignItems:"center"
}}>
<TouchableOpacity style={{
backgroundColor:Colors.red,
padding:Theme.spacing.lg,
borderRadius:30,
width:"90%",
alignItems:"center"
}}>
<Text style={{color:"white",fontWeight:"bold"}}>
Logout
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

/* ⭐ ACTION CARD */
const ActionCard = ({icon,title}:any)=>(
<View style={{
backgroundColor:"white",
width:(width-60)/3,
padding:Theme.spacing.lg,
borderRadius:Theme.radius.lg,
alignItems:"center",
elevation:3
}}>
<MaterialCommunityIcons
name={icon}
size={28}
color={Colors.blue}
/>

<Text style={{
marginTop:8,
fontWeight:"bold"
}}>
{title}
</Text>
</View>
);

/* ⭐ SETTING ITEM */
const SettingItem = ({icon,text}:any)=>(
<View style={GlobalStyles.card}>
<View style={{flexDirection:"row",alignItems:"center"}}>
<Ionicons name={icon} size={22}/>
<Text style={{marginLeft:15}}>
{text}
</Text>
</View>
</View>
);
