import { Button, Divider, Image, ListItem } from "@rneui/themed";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { useRouteInfo } from "expo-router/build/hooks";
import { ActivityIndicator, Text, View } from "react-native";
import { FrequencyPicker } from "../../../../component/FrequencyPicker";
import { LastSeenMessage } from "../../../../component/friends-list/LastSeenMessage";
import { useContactFriendsStore } from "../../../../store";

type SearchParams = {
  friendId: string;
};
export default function Friend() {
  const { friendId } = useLocalSearchParams<SearchParams>();
  const friends = useContactFriendsStore((s) => s.friends);
  const addVisit = useContactFriendsStore((s) => s.addVisit);
  const friend = friends?.find((f) => f.id.toString() === friendId);

  const handlePress: () => void = () => {
    if (friend) {
      addVisit(new Date(), friend);
    }
  };

  return friend ? (
    <View>
      <Stack.Screen
        options={{
          title: friend.name,
          headerShown: true,
        }}
      />
      <Image
        source={{ uri: "https://source.unsplash.com/random?sig=5" }}
        containerStyle={{
          aspectRatio: 1,
          width: "100%",
          flex: 1,
        }}
        PlaceholderContent={<ActivityIndicator />}
      />

      <FrequencyPicker friend={friend} />

      <ListItem
        onPress={() => {
          router.navigate(`/screen/main/visits/${friend.id}`);
        }}
      >
        <ListItem.Content>
          <ListItem.Title>Days unseen</ListItem.Title>
          <ListItem.Subtitle>
            <LastSeenMessage friend={friend} />
          </ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron color={"black"} />
      </ListItem>
      <Divider />
      <Button onPress={handlePress}>Record</Button>
    </View>
  ) : (
    <View>
      <Text>Cannot find friend with id: "{friendId}"</Text>
    </View>
  );
}
