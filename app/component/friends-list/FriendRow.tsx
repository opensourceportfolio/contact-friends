import { Avatar, Button, Icon, ListItem } from "@rneui/themed";
import { Link, router } from "expo-router";
import { type StyleProp, View, type ViewStyle } from "react-native";
import { useContactFriendsStore } from "../../store";
import type { FriendWithVisit } from "../../type/model";
import { SwipeableRow } from "../SwipeableRow";
import { LastSeenMessage } from "./LastSeenMessage";

type FriendRowProps = {
  friend: FriendWithVisit;
  isSelected: boolean;
  onSelect: (friend: FriendWithVisit) => void;
};

const recordStyle: StyleProp<ViewStyle> = {
  width: "100%",
  marginTop: 5,
};
export function FriendRow({ friend, isSelected, onSelect }: FriendRowProps) {
  const addVisit = useContactFriendsStore((s) => s.addVisit);
  const removeFriend = useContactFriendsStore((s) => s.removeFriend);

  const handleUpdateFriend = () => {
    router.push(`/screen/main/friend/edit?friendId=${friend.id}`)
  };

  const handleRemoveFriend = () => {
    removeFriend(friend.id);
  };

  const handleRecordVisit = () => {
    addVisit(new Date(), friend);
  };

  return (
    <SwipeableRow
      onUpdate={handleUpdateFriend}
      onRemove={handleRemoveFriend}
      onPress={() => {
        onSelect(friend);
      }}
    >
      <Avatar
        rounded
        icon={{
          name: "person",
          type: "ionic",
          size: 26,
        }}
        containerStyle={{ backgroundColor: "#c2c2c2" }}
      />
      <ListItem.Content>
        <ListItem.Title>{friend.name}</ListItem.Title>
        <ListItem.Subtitle>
          <LastSeenMessage friend={friend} />
        </ListItem.Subtitle>
        {isSelected && (
          <View style={recordStyle}>
            <Button title="Record" onPress={handleRecordVisit} />
          </View>
        )}
      </ListItem.Content>
      <Link href={`/screen/main/friend/${friend.id}`}>
        <Icon name="chevron-right" />
      </Link>
    </SwipeableRow>
  );
}
