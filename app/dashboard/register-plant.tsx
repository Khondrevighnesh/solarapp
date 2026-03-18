import { View, Text, Button } from "react-native";

export default function RegisterPlant() {
  return (
    <View style={{ padding: 20 }}>
      <Text>Register Plant Request</Text>
      <Button title="Submit" onPress={() => alert("Request Sent")} />
    </View>
  );
}