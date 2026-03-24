import React, { useState } from "react";
import {
View,
Text,
TouchableOpacity,
StyleSheet,
ScrollView,
TextInput,
Alert
} from "react-native";

import * as DocumentPicker from "expo-document-picker";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";

import { Ionicons } from "@expo/vector-icons";

import Screen from "../components/Screen";
import { Colors } from "../theme/colors";

export default function UploadDocuments(){

const [documents, setDocuments] = useState<any[]>([]);
const [fileName, setFileName] = useState("");

/* 📄 PICK FILE */
const pickFile = async () => {
  try {
    const result = await DocumentPicker.getDocumentAsync({
      type: "*/*",
      copyToCacheDirectory: true
    });

    if (result.canceled) return;

    const file = result.assets[0];

    if (!fileName) {
      Alert.alert("Enter document name");
      return;
    }

    const newDoc = {
      id: Date.now().toString(),
      name: fileName,
      uri: file.uri,
      originalName: file.name
    };

    setDocuments(prev => [...prev, newDoc]);
    setFileName("");

  } catch {
    Alert.alert("Error picking file");
  }
};

/* ⬇️ DOWNLOAD / OPEN */
const openFile = async (uri: string) => {
  if (await Sharing.isAvailableAsync()) {
    await Sharing.shareAsync(uri);
  } else {
    Alert.alert("Cannot open file");
  }
};

/* ❌ DELETE */
const deleteFile = (id: string) => {
  setDocuments(prev => prev.filter(doc => doc.id !== id));
};

/* 🚀 SUBMIT */
const handleSubmit = () => {
  if (documents.length === 0) {
    Alert.alert("Upload at least one document");
    return;
  }

  Alert.alert("Submitted ✅", "Documents uploaded successfully");
};

return(
<Screen>

<ScrollView contentContainerStyle={{paddingBottom:40}}>

{/* 🔥 HEADER */}
<View style={{marginBottom:25}}>
<Text style={{fontSize:22,fontWeight:"700"}}>
Upload Documents
</Text>
<Text style={{color:Colors.subText,marginTop:5}}>
Add your documents for solar verification
</Text>
</View>


{/* ✏️ NAME INPUT */}
<TextInput
placeholder="Enter document name (e.g. Bill March)"
value={fileName}
onChangeText={setFileName}
style={styles.input}
/>


{/* 📂 UPLOAD BUTTON */}
<TouchableOpacity style={styles.uploadBtn} onPress={pickFile}>
<Ionicons name="cloud-upload-outline" size={20} color="white"/>
<Text style={styles.uploadText}> Upload File</Text>
</TouchableOpacity>


{/* 📋 FILE LIST */}
<View style={{marginTop:20}}>

{documents.map((doc)=>(
<View key={doc.id} style={styles.fileCard}>

<View style={{flex:1}}>
<Text style={{fontWeight:"600"}}>
{doc.name}
</Text>
<Text style={styles.subText}>
{doc.originalName}
</Text>
</View>

{/* ACTIONS */}
<View style={{flexDirection:"row"}}>

<TouchableOpacity onPress={()=>openFile(doc.uri)}>
<Ionicons name="download-outline" size={22} color={Colors.primary}/>
</TouchableOpacity>

<TouchableOpacity
onPress={()=>deleteFile(doc.id)}
style={{marginLeft:15}}
>
<Ionicons name="trash-outline" size={22} color="red"/>
</TouchableOpacity>

</View>

</View>
))}

{documents.length === 0 && (
<Text style={{textAlign:"center",color:Colors.subText}}>
No documents uploaded yet
</Text>
)}

</View>




</ScrollView>
</Screen>
);
}


/* 🎨 STYLES */

const styles = StyleSheet.create({

input:{
backgroundColor:"#F8FAFC",
padding:14,
borderRadius:14,
marginBottom:12,
borderWidth:1,
borderColor:"#E2E8F0"
},

uploadBtn:{
flexDirection:"row",
backgroundColor:Colors.primary,
padding:14,
borderRadius:14,
alignItems:"center",
justifyContent:"center"
},

uploadText:{
color:"white",
fontWeight:"600",
marginLeft:6
},

fileCard:{
flexDirection:"row",
alignItems:"center",
justifyContent:"space-between",
backgroundColor:"#F8FAFC",
padding:16,
borderRadius:16,
marginBottom:12
},

subText:{
fontSize:12,
color:Colors.subText
},

button:{
backgroundColor:Colors.primary,
padding:16,
borderRadius:16,
alignItems:"center",
marginTop:20
},

buttonText:{
color:"white",
fontWeight:"600"
}

});