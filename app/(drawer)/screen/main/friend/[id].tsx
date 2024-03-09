import { Button, Divider, ListItem } from "@rneui/themed";
import { Image } from "@rneui/themed";
import { Stack, useLocalSearchParams } from "expo-router";
import { ActivityIndicator, Text, View } from "react-native";
import { useContactFriendsStore } from "../../../../store";

type SearchParams = {
  id: string;
};
export default function Friend() {
  const { id } = useLocalSearchParams<SearchParams>();
  const friends = useContactFriendsStore((s) => s.friends);
  const addVisit = useContactFriendsStore((s) => s.addVisit);
  const friend = friends?.find((f) => f.id.toString() === id);

  const handlePress = () => {
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
      <ListItem>
        <ListItem.Content>
          <ListItem.Title>Frequency</ListItem.Title>
          <ListItem.Subtitle>{friend.frequency}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
      <ListItem>
        <ListItem.Content>
          <ListItem.Title>Days unseen</ListItem.Title>
          <ListItem.Subtitle>0</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      <Divider />
      <Button onPress={handlePress}>Record</Button>
    </View>
  ) : (
    <View>
      <Text>Cannot find friend with id: "{id}"</Text>
    </View>
  );
}
