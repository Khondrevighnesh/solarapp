import { FlatList, Text } from "react-native";
import { reports } from "../../data/reports";

export default function Reports() {
  return (
    <FlatList
      data={reports}
      keyExtractor={i => i.id}
      renderItem={({ item }) => (
        <Text style={{ padding: 20 }}>{item.name}</Text>
      )}
    />
  );
}