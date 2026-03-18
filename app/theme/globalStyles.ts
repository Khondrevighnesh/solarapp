import { StyleSheet } from "react-native";
import { Colors } from "./colors";
import { Theme } from "./theme";

export const GlobalStyles = StyleSheet.create({

container:{
flex:1,
backgroundColor:Colors.background,
padding:Theme.spacing.md
},

card:{
backgroundColor:Colors.card,
padding:Theme.spacing.md,
borderRadius:Theme.radius.lg,
borderWidth:1,
borderColor:Colors.border,
marginBottom:Theme.spacing.md
},

title:{
fontSize:Theme.font.heading,
fontWeight:"bold",
color:Colors.text
},

subText:{
color:Colors.subText
},

button:{
backgroundColor:Colors.primary,
padding:14,
borderRadius:Theme.radius.md,
alignItems:"center"
},

buttonText:{
color:"white",
fontWeight:"bold"
}

});