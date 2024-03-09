import { Avatar, Button, ListItem } from "@rneui/themed";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useUserData } from "../../hook/useUserData";
import { Frequency } from "../../type/model";
import { FriendRow } from "./FriendRow";

type FriendsListProp = {
  frequency: Frequency;
};

export default function FriendsList({ frequency }: FriendsListProp) {
  const { loading, friends, error } = useUserData();
  const filteredFriends = friends?.filter((f) => f.frequency === frequency);

  return loading || filteredFriends == null ? (
    <ActivityIndicator />
  ) : error ? (
    <Text>Error: {error.message}</Text>
  ) : (
    <View style={styles.container}>
      <FlatList
        data={filteredFriends}
        renderItem={(friend) => {
          return <FriendRow friend={friend.item} />;
        }}
      />
    </View>
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
