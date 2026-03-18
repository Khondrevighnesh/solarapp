import { FlatList, Text, View } from "react-native";
import { tasks } from "../../data/tasks";

export default function Tasks() {
  return (
    <FlatList
      data={tasks}
      keyExtractor={i => i.id}
      renderItem={({ item }) => (
        <View style={{ backgroundColor: "#fff", padding: 20, margin: 10 }}>
          <Text>{item.plant}</Text>
          <Text>{item.issue}</Text>
          <Text>{item.status}</Text>
        </View>
      )}
    />
  );
}