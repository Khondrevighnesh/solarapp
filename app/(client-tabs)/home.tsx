import { ScrollView, Text, View } from "react-native";

export default function Home() {
  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontSize: 22 }}>☀️ Good Morning</Text>
      <Text>Pune | Solar Dashboard</Text>

      <View style={{ backgroundColor: "#fff", padding: 20, marginTop: 20 }}>
        <Text>Solar reduces electricity bill</Text>
      </View>
    </ScrollView>
  );
}