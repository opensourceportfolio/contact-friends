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
import { useFriendsData } from "../../hook/useFriendsData";
import { Frequency } from "../../type/model";
import { FriendRow } from "./FriendRow";
import { lastSeen } from "../../model/frequency";

type FriendsListProp = {
  frequency?: Frequency;
};

export function FriendsList({ frequency }: FriendsListProp) {
  const { loading, friends, error } = useFriendsData();
  const filteredFriends = friends?.filter((f) => {
    return frequency ? f.frequency === frequency : lastSeen(f) > parseInt(f.frequency);
  });

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
