import { Button } from "@rneui/base";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { Calendar, type CalendarProps } from "react-native-calendars";
import { AsyncComponent } from "../../../../../../component/AsyncComponent";
import { useVisitData } from "../../../../../../hook/useVisitData";
import { useContactFriendsStore } from "../../../../../../store";

type EditRouteParams = {
  friendId: string;
  visitId: string;
};

export default function Edit() {
  const { friendId, visitId } = useLocalSearchParams<EditRouteParams>();
  const fId = Number.parseInt(friendId);
  const vId = Number.parseInt(visitId);
  const { visit, loading, error } = useVisitData(fId, vId);
  const [dateData, setDateData] = useState<string | undefined>(visit?.date);
  const updateVisit = useContactFriendsStore((s) => s.updateVisit);

  const calendar: CalendarProps = {
    initialDate: visit?.date,
    onDayPress(date) {
      setDateData(date.dateString);
    },
    markedDates: dateData
      ? {
          [dateData]: {
            selected: true,
            disableTouchEvent: true,
          },
        }
      : {},
  };

  async function handlePress() {
    if (dateData && visit) {
      await updateVisit({
        ...visit,
        date: dateData,
      });
    }

    router.back();
  }

  return (
    <AsyncComponent error={error} loading={loading}>
      <View>
        <Stack.Screen
          options={{
            title: "Edit Visit",
            headerShown: true,
          }}
        />
        <Calendar {...calendar} />
        <Button title="Update" onPress={handlePress} />
      </View>
    </AsyncComponent>
  );
}
