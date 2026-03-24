import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  BackHandler
} from "react-native";

import { useState, useCallback } from "react";
import { router, useFocusEffect } from "expo-router";
import Screen from "../components/Screen";
import { useAuth } from "../../context/AuthContext";

import { Colors } from "../theme/colors";
import { Theme } from "../theme/theme";

export default function Dashboard() {

const [clientId,setClientId] = useState("");
const [password,setPassword] = useState("");

/* 🔥 DEMO USERS */
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

/* 🔐 LOGIN */
const { login } = useAuth();

const handleLogin = async ()=>{
  const user = demoUsers[clientId];

  if(user && user.pass === password){

    await login({
      name: user.name,
      email: clientId + "@solar.com", // demo
      plants: user.plants // 👈 ADD THIS
    });

    if(user.plants.length === 1){
      router.replace(`/plants/cards?plantId=${user.plants[0].id}&name=${user.plants[0].name}`);
    }else{
      router.replace("/plants");
    }

  }else{
    Alert.alert("Invalid Login");
  }
};

/* 🔙 ANDROID BACK FIX */
useFocusEffect(
  useCallback(() => {
    const onBackPress = () => {
      Alert.alert("Exit App", "Do you want to exit?", [
        { text: "Cancel", style: "cancel" },
        { text: "Exit", onPress: () => BackHandler.exitApp() }
      ]);
      return true;
    };

    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      onBackPress
    );

    return () => subscription.remove(); // ✅ FIX HERE
  }, [])
);

return(
<Screen>

<KeyboardAvoidingView
style={{flex:1}}
behavior={Platform.OS === "ios" ? "padding" : "height"}
>

<ScrollView contentContainerStyle={{
flexGrow:1,
justifyContent:"center",
padding:20
}}>

<View style={{
backgroundColor:Colors.card,
padding:22,
borderRadius:20,
borderWidth:1,
borderColor:Colors.border
}}>

<Text style={{
fontSize:Theme.font.heading,
fontWeight:"bold"
}}>
Client Login
</Text>

<Text style={{color:Colors.subText,marginVertical:10}}>
Enter credentials
</Text>

<TextInput
placeholder="Client ID"
style={styles.input}
value={clientId}
onChangeText={setClientId}
/>

<TextInput
placeholder="Password"
secureTextEntry
style={styles.input}
value={password}
onChangeText={setPassword}
/>

<TouchableOpacity onPress={handleLogin} style={styles.button}>
<Text style={{color:"white",fontWeight:"bold"}}>Login</Text>
</TouchableOpacity>

</View>

</ScrollView>
</KeyboardAvoidingView>

</Screen>
);
}

const styles = {
input:{
backgroundColor:"#F8FAFC",
padding:14,
borderRadius:12,
marginBottom:12,
borderWidth:1,
borderColor:Colors.border
},
button:{
backgroundColor:Colors.primary,
padding:16,
borderRadius:14,
alignItems:"center",
marginTop:10
}
};