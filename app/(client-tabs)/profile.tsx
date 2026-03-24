import React, { useState } from "react";
import {
View,
Text,
ScrollView,
TouchableOpacity,
TextInput,
Modal,
Image,
Alert,
Linking,
Share
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";

import Screen from "../components/Screen";
import { Colors } from "../theme/colors";
import { Theme } from "../theme/theme";
import { GlobalStyles } from "../theme/globalStyles";

import { useAuth } from "../../context/AuthContext";

export default function Profile() {

const { user, login, logout } = useAuth();

/* 🔥 LOCAL STATE (SYNC WITH AUTH) */
const [name,setName] = useState(user?.name || "");
const [email] = useState(user?.email || "");
const [phone,setPhone] = useState(user?.contact || "");
const [image,setImage] = useState<string | null>(null);

const [editModal,setEditModal] = useState(false);
const [contactModal,setContactModal] = useState(false);
const [policyModal,setPolicyModal] = useState(false);

/* 📸 IMAGE PICKER */
const pickImage = async () => {
const result = await ImagePicker.launchImageLibraryAsync({
mediaTypes: ImagePicker.MediaTypeOptions.Images,
quality: 1,
});
if (!result.canceled) setImage(result.assets[0].uri);
};

/* 💾 SAVE PROFILE */
const saveProfile = async () => {

await login({
  ...user,
  name,
  contact: phone
});

Alert.alert("Success","Profile Updated");
setEditModal(false);
};

/* ☎ CONTACT */
const submitContact = ()=>{
Alert.alert("Submitted","Our solar expert will contact you shortly");
setContactModal(false);
};

/* 🔗 SHARE */
const shareApp = async () => {
await Share.share({
message: "Download Solar App 🌞 https://play.google.com/store/apps/details?id=com.umakant3525.PV_PROTECT"
});
};

return(
<Screen>

<ScrollView
showsVerticalScrollIndicator={false}
contentContainerStyle={{paddingBottom:40}}
>

{/* ⭐ HEADER */}
<View style={{
backgroundColor:Colors.primary,
padding:Theme.spacing.xl,
borderRadius:20,
alignItems:"center"
}}>

<TouchableOpacity onPress={pickImage}>

{image ? (
<Image source={{uri:image}} style={{width:100,height:100,borderRadius:50}}/>
):(
<View style={{
backgroundColor:"#065F46",
width:100,
height:100,
borderRadius:50,
justifyContent:"center",
alignItems:"center"
}}>
<Text style={{color:"white",fontSize:28,fontWeight:"bold"}}>
{user?.name?.charAt(0) || "U"}
</Text>
</View>
)}

</TouchableOpacity>

<Text style={{color:"white",fontSize:22,fontWeight:"bold",marginTop:10}}>
{user?.name || "User"}
</Text>

<Text style={{color:"#D1FAE5"}}>
{user?.email || "No email"}
</Text>

</View>

{/* ⭐ ACCOUNT */}
<Text style={sectionTitle}>Account</Text>

<SettingItem icon="person-outline" text="Edit Profile" onPress={()=>setEditModal(true)}/>
<SettingItem icon="shield-checkmark-outline" text="Privacy & Security" onPress={()=>setPolicyModal(true)}/>

{/* ⭐ SUPPORT */}
<Text style={sectionTitle}>Support</Text>

<SettingItem icon="call-outline" text="Contact Support" onPress={()=>setContactModal(true)}/>
<SettingItem icon="document-text-outline" text="Terms & Policy" onPress={()=>setPolicyModal(true)}/>

{/* ⭐ APP */}
<Text style={sectionTitle}>App</Text>

<SettingItem
icon="star-outline"
text="Rate App"
onPress={()=>Linking.openURL("https://play.google.com/store/apps/details?id=com.umakant3525.PV_PROTECT")}
/>

<SettingItem icon="share-social-outline" text="Share App" onPress={shareApp}/>

<SettingItem
icon="cloud-download-outline"
text="Check for Updates"
onPress={()=>Alert.alert("Up to Date","You are using latest version")}
/>

<SettingItem
icon="log-out-outline"
text="Logout"
onPress={async ()=>{
await logout();
router.replace("/");
}}
/>

{/* ⭐ FOLLOW */}
<Text style={sectionTitle}>Follow Us</Text>

<View style={{flexDirection:"row",justifyContent:"space-around",marginTop:10}}>

<SocialBtn icon="logo-instagram" color="#E1306C" onPress={()=>Linking.openURL("https://www.instagram.com/sustainfyenergy/")}/>
<SocialBtn icon="logo-facebook" color="#1877F2" onPress={()=>Linking.openURL("https://www.facebook.com/sustainfyenergy")}/>
<SocialBtn icon="logo-linkedin" color="#0A66C2" onPress={()=>Linking.openURL("https://www.linkedin.com/company/sustainfy-energy-llp/")}/>

</View>

</ScrollView>

{/* ================= MODALS ================= */}

{/* ✏ EDIT */}
<Modal visible={editModal} animationType="slide">
<Screen>
<ScrollView>

<Text style={sectionTitle}>Edit Profile</Text>

<TextInput value={name} onChangeText={setName} placeholder="Full Name" style={GlobalStyles.input}/>
<TextInput value={email} editable={false} style={[GlobalStyles.input,{backgroundColor:"#E5E7EB"}]}/>
<TextInput value={phone} onChangeText={setPhone} placeholder="Mobile Number" style={GlobalStyles.input}/>

<TouchableOpacity style={btnGreen} onPress={saveProfile}>
<Text style={btnText}>Save Changes</Text>
</TouchableOpacity>

<TouchableOpacity style={btnGray} onPress={()=>setEditModal(false)}>
<Text>Cancel</Text>
</TouchableOpacity>

</ScrollView>
</Screen>
</Modal>

{/* ☎ CONTACT */}
<Modal visible={contactModal} animationType="slide">
<Screen>
<ScrollView>

<Text style={sectionTitle}>24/7 Solar Support ☀️</Text>

<View style={{
backgroundColor:"#ECFDF5",
padding:15,
borderRadius:12,
marginBottom:15
}}>
<Text style={{fontWeight:"bold",color:"#065F46"}}>
Priority Support
</Text>
<Text style={{color:"#065F46",marginTop:5}}>
Response within 10 minutes
</Text>
</View>

<View style={{flexDirection:"row",justifyContent:"space-between"}}>
<SupportBtn icon="call" text="Call" onPress={()=>Linking.openURL("tel:+919876543210")}/>
<SupportBtn icon="logo-whatsapp" text="WhatsApp" onPress={()=>Linking.openURL("https://wa.me/919876543210")}/>
<SupportBtn icon="mail" text="Email" onPress={()=>Linking.openURL("mailto:support@solarapp.com")}/>
</View>

<TouchableOpacity style={btnGray} onPress={()=>setContactModal(false)}>
<Text>Close</Text>
</TouchableOpacity>

</ScrollView>
</Screen>
</Modal>

{/* 📜 POLICY */}
<Modal visible={policyModal} animationType="slide">
<Screen>
<ScrollView>

<Text style={sectionTitle}>Terms & Policy</Text>

<View style={GlobalStyles.card}>
<Text>Solar installation & AMC services with data privacy & warranty.</Text>
</View>

<TouchableOpacity style={btnGray} onPress={()=>setPolicyModal(false)}>
<Text>Close</Text>
</TouchableOpacity>

</ScrollView>
</Screen>
</Modal>

</Screen>
);
}

/* COMPONENTS */

const SettingItem = ({ icon, text, onPress }: any) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
    
    <View style={[
      GlobalStyles.card,
      {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",

        // ✅ FIX GAP
        marginBottom: 6,        // ↓ reduced from 15
        paddingVertical: 12     // ↓ slightly compact
      }
    ]}>
      
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Ionicons name={icon} size={20} color={Colors.primary} />
        
        <Text style={{
          marginLeft: 12,
          fontWeight: "600"
        }}>
          {text}
        </Text>
      </View>

      <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
    
    </View>

  </TouchableOpacity>
);

const SocialBtn = ({icon,color,onPress}:any)=>(
<TouchableOpacity onPress={onPress} style={{
backgroundColor:"white",
padding:15,
borderRadius:50
}}>
<Ionicons name={icon} size={22} color={color}/>
</TouchableOpacity>
);

const SupportBtn = ({icon,text,onPress}:any)=>(
<TouchableOpacity onPress={onPress} style={{
backgroundColor:"white",
width:"30%",
padding:15,
borderRadius:6,
alignItems:"center"
}}>
<Ionicons name={icon} size={22} color={Colors.primary}/>
<Text style={{marginTop:5,fontSize:12}}>{text}</Text>
</TouchableOpacity>
);

/* COMMON */

const sectionTitle = {
fontSize:18,
fontWeight:"bold",
marginTop:13,
marginBottom:6
};

const btnGreen = {
backgroundColor:Colors.primary,
padding:15,
borderRadius:12,
alignItems:"center",
marginTop:15
};

const btnGray = {
backgroundColor:"#E5E7EB",
padding:15,
borderRadius:12,
alignItems:"center",
marginTop:10
};

const btnText = {
color:"white",
fontWeight:"bold"
};