
import {
View,
Text,
TextInput,
TouchableOpacity,
Alert,
ScrollView
} from "react-native";
import { useState, useEffect } from "react";
import { router } from "expo-router";

import { Colors } from "../theme/colors";
import { Theme } from "../theme/theme";
import { GlobalStyles } from "../theme/globalStyles";

export default function Dashboard() {

const [clientId,setClientId] = useState("");
const [password,setPassword] = useState("");
const [logged,setLogged] = useState(false);
const [plants,setPlants] = useState<any[]>([]);
const [userName,setUserName] = useState("");

const demoUsers:any = {
solar123:{
pass:"1234",
name:"Demo Client",
plants:[
{id:1,name:"Pune Plant",generation:"18 kWh"},
{id:2,name:"Mumbai Plant",generation:"25 kWh"}
]
},
plant456:{
pass:"4567",
name:"Single Plant Owner",
plants:[
{id:3,name:"Nagpur Plant",generation:"12 kWh"}
]
}
};

const handleLogin = ()=>{
const user = demoUsers[clientId];

if(user && user.pass === password){
setUserName(user.name);
setPlants(user.plants);
setLogged(true);
}else{
Alert.alert("Invalid Login");
}
};

useEffect(()=>{
if(logged && plants.length === 1){
router.replace(`/dashboard/cards?plantId=${plants[0].id}`);
}
},[logged]);

/* ⭐ MULTIPLE PLANTS */
if(logged && plants.length > 1){
return(
<ScrollView style={GlobalStyles.container}>

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
Welcome {userName} ☀️
</Text>

<Text style={{color:"#DCFCE7",marginTop:5}}>
Select your solar plant to view dashboard
</Text>
</View>

<Text style={{
fontSize:Theme.font.heading,
fontWeight:"bold",
marginTop:Theme.spacing.lg
}}>
Your Plants
</Text>

{plants.map((p)=>(
<TouchableOpacity
key={p.id}
style={GlobalStyles.card}
onPress={()=>router.push(`/dashboard/cards?plantId=${p.id}`)}
>
<Text style={{
fontSize:Theme.font.title,
fontWeight:"bold"
}}>
{p.name}
</Text>

<Text style={{
color:Colors.subText,
marginTop:4
}}>
Today's Generation : {p.generation}
</Text>
</TouchableOpacity>
))}

</ScrollView>
);
}

/* ⭐ LOGIN UI */
return(
<View style={GlobalStyles.container}>

<View style={{
backgroundColor:Colors.primary,
padding:Theme.spacing.xl,
borderRadius:Theme.radius.xl
}}>
<Text style={{
color:"white",
fontSize:Theme.font.hero,
fontWeight:"bold"
}}>
Client Login ☀️
</Text>

<Text style={{
color:"#DCFCE7",
marginTop:5
}}>
Monitor your solar plant performance
</Text>
</View>

<View style={{marginTop:Theme.spacing.xl}}>

<TextInput
placeholder="Client ID"
style={GlobalStyles.input}
value={clientId}
onChangeText={setClientId}
/>

<TextInput
placeholder="Password"
secureTextEntry
style={GlobalStyles.input}
value={password}
onChangeText={setPassword}
/>

<TouchableOpacity
onPress={handleLogin}
style={{
backgroundColor:Colors.primary,
padding:Theme.spacing.lg,
borderRadius:Theme.radius.lg,
alignItems:"center"
}}
>
<Text style={{color:"white",fontWeight:"bold"}}>
Login
</Text>
</TouchableOpacity>

<TouchableOpacity
onPress={()=>router.push("/dashboard/register")}
style={{marginTop:Theme.spacing.md}}
>
<Text style={{
color:Colors.blue,
textAlign:"center"
}}>
Don't have Client ID? Register Solar Plant
</Text>
</TouchableOpacity>

</View>

</View>
);
}