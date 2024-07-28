import { Stack, useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { AsyncPage } from "../../../../../component/AsyncPage";
import { VisitRow } from "../../../../../component/visits-list/VisitRow";
import { useVisitsData } from "../../../../../hook/useVisitsData";

type SearchParams = {
  friendId: string;
};

export default function Visits() {
  const { friendId } = useLocalSearchParams<SearchParams>();
  const id = Number.parseInt(friendId);
  const { visits, loading, error } = useVisitsData(id);

  return (
    <AsyncPage loading={loading} error={error}>
      <View>
        <Stack.Screen
          options={{
            title: "Visits",
            headerShown: true,
          }}
        />
        <FlatList
          data={visits}
          renderItem={(visit) => <VisitRow visit={visit.item} />}
        />
      </View>
    </AsyncPage>
  );
}
