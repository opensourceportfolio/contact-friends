import { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import Toast from "react-native-toast-message";
import { useFriendsData } from "../../hook/useFriendsData";
import { lastSeen } from "../../model/frequency";
import type { Frequency, FriendWithVisit } from "../../type/model";
import { AsyncComponent } from "../AsyncComponent";
import { FriendRow } from "./FriendRow";

type FriendsListProp = {
  frequency?: Frequency;
};

export function FriendsList({ frequency }: FriendsListProp) {
  const { loading, friends, error } = useFriendsData();
  const [selectedFriend, setSelectedFriend] = useState<FriendWithVisit>();

  const filteredFriends = friends?.filter((f) => {
    return frequency
      ? f.frequency === frequency
      : lastSeen(f) > Number.parseInt(f.frequency);
  });

  function handleOnSelect(friend: FriendWithVisit) {
    if (friend === selectedFriend) {
      setSelectedFriend(undefined);
    } else {
      setSelectedFriend(friend);
    }
  }

  return (
    <AsyncComponent error={error} loading={loading || filteredFriends == null}>
      <View style={styles.container}>
        <FlatList
          data={filteredFriends}
          renderItem={(friend) => {
            return (
              <FriendRow
                friend={friend.item}
                onSelect={handleOnSelect}
                isSelected={selectedFriend === friend.item}
              />
            );
          }}
        />
      </View>
    </AsyncComponent>
  );
}

const styles = StyleSheet.create({
  container: {},
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
});
