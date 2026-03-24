import {
View,
Text,
TouchableOpacity,
BackHandler
} from "react-native";

import { useLocalSearchParams, router, useFocusEffect } from "expo-router";
import { useCallback } from "react";

import Screen from "../../components/Screen";
import { Colors } from "../../theme/colors";
import { Theme } from "../../theme/theme";
import { GlobalStyles } from "../../theme/globalStyles";

export default function Cards() {

const { plantId, name }: any = useLocalSearchParams();

/* 🔙 BACK */
useFocusEffect(
  useCallback(() => {
    const handleBackPress = () => {
      router.replace("/plants");
      return true;
    };

    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackPress
    );

    return () => subscription.remove();
  }, [])
);

return(
<Screen>

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
{name} ☀️
</Text>

<Text style={{color:"#DCFCE7",marginTop:6}}>
Plant Dashboard
</Text>
</View>

{/* CARDS */}
<View style={{ marginTop:5}}>

<Card title="Generation" onPress={()=>router.push(`/dashboard/generation?plantId=${plantId}`)}/>
<Card title="Cleaning Cycles" onPress={()=>router.push(`/dashboard/cleaningcycle?plantId=${plantId}`)}/>
<Card title="Reports" onPress={()=>router.push(`/dashboard/reports?plantId=${plantId}`)}/>
<Card title="Plant Details" onPress={()=>router.push(`/dashboard/plant-details?plantId=${plantId}`)}/>
<Card title="Irradiation" onPress={()=>router.push(`/dashboard/irradiation?plantId=${plantId}`)}/>
<Card title="EPI" onPress={()=>router.push(`/dashboard/epi?plantId=${plantId}`)}/>

</View>

</Screen>
);
}

/* CARD */
const Card = ({title,onPress}:any)=>(
<TouchableOpacity
onPress={onPress}
style={[GlobalStyles.card,{
borderRadius:18,
marginBottom:12
}]}
>
<Text style={{
fontSize:Theme.font.title,
fontWeight:"bold"
}}>
{title}
</Text>
</TouchableOpacity>
);