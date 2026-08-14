import { Text, View } from "react-native";
import CardComFoto from '../components/Profile';

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
    <CardComFoto />
    </View>
  );
}
