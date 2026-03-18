import React from "react";
import {
View,
Text,
ScrollView,
StyleSheet,
TouchableOpacity
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export default function Profile(){

return(
<View style={{flex:1}}>

<ScrollView style={styles.container}>

{/* ⭐ PROFILE HEADER */}
<View style={styles.header}>
  <View style={styles.avatar}>
    <Ionicons name="person" size={40} color="white"/>
  </View>

  <Text style={styles.name}>Demo Client</Text>
  <Text style={styles.email}>demo@gmail.com</Text>

  <View style={styles.badge}>
    <Text style={{color:"white"}}>AMC Active</Text>
  </View>
</View>

{/* ⭐ QUICK ACTIONS */}
<Text style={styles.heading}>Quick Actions</Text>

<View style={styles.row}>

<ActionCard
icon="solar-power"
title="My Plants"
/>

<ActionCard
icon="tools"
title="Service Request"
/>

<ActionCard
icon="file-document"
title="Reports"
/>

</View>

{/* ⭐ PLANT SUMMARY */}
<Text style={styles.heading}>Plant Summary</Text>

<View style={styles.summary}>
  <Text>Total Plants : 2</Text>
  <Text>Total Capacity : 8kW</Text>
  <Text>Last Service : 20 Feb 2026</Text>
</View>

{/* ⭐ SETTINGS */}
<Text style={styles.heading}>Settings</Text>

<SettingItem icon="person-outline" text="Edit Profile"/>
<SettingItem icon="call-outline" text="Contact Support"/>
<SettingItem icon="document-text-outline" text="Terms & Policy"/>
<SettingItem icon="star-outline" text="Rate App"/>

<View style={{height:100}}/>

</ScrollView>

{/* ⭐ LOGOUT BUTTON */}
<View style={styles.sticky}>
  <TouchableOpacity style={styles.logout}>
    <Text style={{color:"white",fontWeight:"bold"}}>
      Logout
    </Text>
  </TouchableOpacity>
</View>

</View>
);
}

/* ⭐ ACTION CARD */
const ActionCard = ({icon,title}:any)=>(
<View style={styles.card}>
  <MaterialCommunityIcons name={icon} size={28} color="#2563EB"/>
  <Text style={{marginTop:8,fontWeight:"bold"}}>
    {title}
  </Text>
</View>
);

/* ⭐ SETTING ITEM */
const SettingItem = ({icon,text}:any)=>(
<View style={styles.setting}>
  <Ionicons name={icon} size={22}/>
  <Text style={{marginLeft:15}}>{text}</Text>
</View>
);

/* ⭐ STYLES */

const styles = StyleSheet.create({
container:{flex:1,backgroundColor:"#F1F5F9"},

header:{
backgroundColor:"#2563EB",
padding:30,
alignItems:"center"
},

avatar:{
backgroundColor:"#1E40AF",
width:80,
height:80,
borderRadius:40,
justifyContent:"center",
alignItems:"center",
marginBottom:10
},

name:{color:"white",fontSize:22,fontWeight:"bold"},
email:{color:"white",marginTop:4},

badge:{
backgroundColor:"#16A34A",
paddingHorizontal:15,
paddingVertical:6,
borderRadius:20,
marginTop:10
},

heading:{
fontSize:20,
fontWeight:"bold",
marginTop:20,
marginBottom:10,
paddingHorizontal:20
},

row:{
flexDirection:"row",
justifyContent:"space-around"
},

card:{
backgroundColor:"white",
padding:20,
borderRadius:16,
alignItems:"center",
width:"28%",
elevation:3
},

summary:{
backgroundColor:"white",
marginHorizontal:20,
padding:15,
borderRadius:12
},

setting:{
backgroundColor:"white",
marginHorizontal:20,
padding:15,
borderRadius:12,
marginBottom:10,
flexDirection:"row",
alignItems:"center"
},

sticky:{
position:"absolute",
bottom:10,
width:"100%",
alignItems:"center"
},

logout:{
backgroundColor:"#DC2626",
padding:15,
borderRadius:30,
width:"90%",
alignItems:"center"
}
});