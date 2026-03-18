import { Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { plants } from "../../data/plants";

export default function Analytics() {
  return (
    <LineChart
      data={{
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
        datasets: [{ data: plants[0].generation }]
      }}
      width={Dimensions.get("window").width}
      height={220}
      chartConfig={{
        backgroundGradientFrom: "#fff",
        backgroundGradientTo: "#fff",
        color: () => "#FDB813"
      }}
    />
  );
}