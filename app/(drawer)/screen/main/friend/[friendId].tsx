import { Button, Divider, Image, ListItem } from "@rneui/themed";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { ActivityIndicator, Dimensions, Text, View } from "react-native";
import { LastSeenMessage } from "../../../../component/friends-list/LastSeenMessage";
import { FrequencyLabels } from "../../../../model/frequency";
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

  const screenWidth = Dimensions.get('window').width;

  return friend ? (
    <View>
      <Stack.Screen
        options={{
          title: friend.name,
          headerShown: true,
        }}
      />
      <Image
        source={{ uri: `data:image/jpeg;base64,${friend.avatar}` }}
        containerStyle={{
          aspectRatio: 1,
          width: screenWidth,
          height: screenWidth,
        }}
        PlaceholderContent={<ActivityIndicator />}
      />

      <ListItem>
        <ListItem.Content>
          <ListItem.Title>Frequency</ListItem.Title>
          <ListItem.Subtitle>
            {FrequencyLabels[friend.frequency]}
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>

      <ListItem
        onPress={() => {
          router.navigate(`/screen/main/friend/visits/${friend.id}`);
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
