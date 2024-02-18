import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Alert,
  FlatList,
  ActivityIndicator,
  Text,
} from "react-native";
import { useSession } from "../../../hook/useSession";
import { useContactFriendsStore } from "../../../store";
import { useProfile } from "../../../hook/useProfile";

export default function Frequency() {
  console.log("list");

  const { session } = useSession();
  const profile = useProfile();
  const friends = useContactFriendsStore((s) => s.friends);
  const setFriends = useContactFriendsStore((s) => s.setFriends);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session) {
      setLoading(true);
      profile.then((userData) => {
        setFriends(userData?.friends ?? []);
        setLoading(false);
      });
    }
  }, [session]);

  return loading || friends == null ? (
    <ActivityIndicator />
  ) : (
    <View style={styles.container}>
      <FlatList
        data={friends}
        renderItem={(friend) => {
          console.log({ f: friend.item });
          return <Text>{friend.item.name}</Text>;
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
});
