import {
View,
Text,
ScrollView,
TouchableOpacity,
BackHandler
} from "react-native";

import { router, useFocusEffect } from "expo-router";
import { useCallback } from "react";

import Screen from "../../components/Screen";
import { Colors } from "../../theme/colors";
import { Theme } from "../../theme/theme";
import { GlobalStyles } from "../../theme/globalStyles";
import { useAuth } from "../../../context/AuthContext";

export default function Plants(){

const { user } = useAuth();

/* 🔙 BACK HANDLER */
useFocusEffect(
  useCallback(() => {
    const handleBackPress = () => {
      router.replace("/dashboard");
      return true;
    };

    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackPress
    );

    return () => subscription.remove();
  }, [])
);

/* ❌ IF NO USER */
if (!user) {
  router.replace("/dashboard");
  return null;
}

return(
<Screen>

<ScrollView style={{flex:1,backgroundColor:Colors.background}}>

{/* HEADER */}
<View style={{
backgroundColor:Colors.primary,
paddingTop:60,
paddingBottom:30,
paddingHorizontal:20,
borderBottomLeftRadius:30,
borderBottomRightRadius:30,
borderTopLeftRadius:30,
borderTopRightRadius:30,
}}>
<Text style={{
color:"white",
fontSize:Theme.font.hero,
fontWeight:"bold"
}}>
Welcome {user.name} ☀️
</Text>

<Text style={{color:"#DCFCE7",marginTop:6}}>
Select your plant
</Text>
</View>

{/* PLANTS */}
<View style={{ padding:5 ,marginTop:6}}>

{user.plants?.map((p:any)=>(
<TouchableOpacity
key={p.id}
style={[GlobalStyles.card,{borderRadius:18, marginBottom:12}]}
onPress={()=>router.push(`/plants/cards?plantId=${p.id}&name=${p.name}`)}
>

<Text style={{
fontSize:Theme.font.title,
fontWeight:"bold"
}}>
{p.name}
</Text>

<Text style={{color:Colors.subText,marginTop:4}}>
Today's Generation: {p.generation}
</Text>

</TouchableOpacity>
))}

</View>

</ScrollView>

</Screen>
);
}