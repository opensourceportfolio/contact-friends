import { Stack, useLocalSearchParams } from "expo-router";
import { FlatList } from "react-native-gesture-handler";
import { VisitRow } from "../../../../component/visits-list/VisitRow";
import { ActivityIndicator, View, Text } from "react-native";
import { useVisitsData } from "../../../../hook/useVisitsData";

type SearchParams = {
  friendId: string;
};

export default function Visits() {
  const { friendId } = useLocalSearchParams<SearchParams>();
  const id = parseInt(friendId);
  const { visits, loading, error } = useVisitsData(id);

  return loading ? (
    <ActivityIndicator />
  ) : error ? (
    <Text>Error: {error.message}</Text>
  ) : (
    <View>
      <Stack.Screen
        options={{
          title: "Visits",
          headerShown: true,
        }}
      />
      <FlatList
        data={visits}
        renderItem={(visit) => <VisitRow visit={visit.item}></VisitRow>}
      ></FlatList>
    </View>
  );
}
