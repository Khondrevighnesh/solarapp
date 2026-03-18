import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function ClientTabs() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="home" options={{
        tabBarIcon: ({color,size}) => <Ionicons name="home" color={color} size={size}/>
      }}/>

      <Tabs.Screen name="calculators" options={{
        tabBarIcon: ({color,size}) => <Ionicons name="calculator" color={color} size={size}/>
      }}/>

      <Tabs.Screen name="schemes" options={{
        tabBarIcon: ({color,size}) => <Ionicons name="document-text" color={color} size={size}/>
      }}/>

      <Tabs.Screen name="knowledge" options={{
        tabBarIcon: ({color,size}) => <Ionicons name="book" color={color} size={size}/>
      }}/>

      <Tabs.Screen name="dashboard" options={{
        tabBarIcon: ({color,size}) => <Ionicons name="grid" color={color} size={size}/>
      }}/>

      <Tabs.Screen name="profile" options={{
        tabBarIcon: ({color,size}) => <Ionicons name="person" color={color} size={size}/>
      }}/>
    </Tabs>
  );
}