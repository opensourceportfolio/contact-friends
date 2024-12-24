import { Button, ListItem } from "@rneui/themed";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { View } from "react-native";
import { AsyncComponent } from "../../../component/AsyncComponent";
import { supabase } from "../../../lib/supabase";
import { useContactFriendsStore } from "../../../store";

export default function Profile() {
  const [action, setAction] = useState(Promise.resolve());
  const user = useContactFriendsStore((s) => s.user);
  const friends = useContactFriendsStore((s) => s.friends);
  const logout = useContactFriendsStore((s) => s.logout);

  async function handleLogout() {
    await supabase.auth.signOut();
    logout();
    router.replace("/Auth");
  }
  return (
    <AsyncComponent action={action}>
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
          <Button onPress={() => setAction(handleLogout())}>Logout</Button>
        </ListItem>
        <ListItem>
          <Link href={"/screen/profile/logViewer"}>Debug</Link>
        </ListItem>
      </View>
    </AsyncComponent>
  );
}
