import { Button, ListItem } from "@rneui/themed";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Alert, View } from "react-native";
import { supabase } from "../../../lib/supabase";
import { useContactFriendsStore } from "../../../store";

export default function Profile() {
  const [loading] = useState(false);
  const user = useContactFriendsStore((s) => s.user);
  const friends = useContactFriendsStore((s) => s.friends);
  const logout = useContactFriendsStore((s) => s.logout);

  async function handleLogout() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert(error.message);
    } else {
      logout();
      router.replace("/Auth");
    }
  }
  return (
    <React.Fragment>
      <View>
        <ListItem>
          <ListItem.Content>
            <ListItem.Title>Email</ListItem.Title>
          </ListItem.Content>
          <ListItem.Content right>
            <ListItem.Title>{user?.email}</ListItem.Title>
          </ListItem.Content>
        </ListItem>
        <ListItem>
          <Button disabled={loading} onPress={handleLogout}>
            Logout
          </Button>
        </ListItem>
        <ListItem>
          <Link href={"/screen/profile/logViewer"}>Debug</Link>
        </ListItem>
      </View>
    </React.Fragment>
  );
}
