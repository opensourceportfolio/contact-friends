import { Avatar, Button, ListItem } from "@rneui/themed";
import { router } from "expo-router";
import { useContactFriendsStore } from "../../store";
import type { FriendWithVisit } from "../../type/model";
import { DeleteButton } from "../DeleteButton";
import { LastSeenMessage } from "./LastSeenMessage";

type FriendRowProps = {
  friend: FriendWithVisit;
};

export function FriendRow({ friend }: FriendRowProps) {
  const removeFriend = useContactFriendsStore((s) => s.removeFriend);

  const handleRemoveFriend = () => {
    removeFriend(friend.id);
  };

  return (
    <ListItem.Swipeable
      bottomDivider
      leftWidth={80}
      onPress={() => {
        router.navigate(`/screen/main/friend/${friend.id}`);
      }}
      rightWidth={90}
      rightContent={() => <DeleteButton onPress={handleRemoveFriend} />}
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
      </ListItem.Content>
    </ListItem.Swipeable>
  );
}
