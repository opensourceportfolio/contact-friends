import { Button } from "@rneui/themed";
import { router } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";
import { supabase } from "../../../lib/supabase";
import { useContactFriendsStore } from "../../../store";

export default function Profile() {
  const [loading] = useState(false);
  const logout = useContactFriendsStore((s) => s.logout);

  async function handleLogout() {
    const response = await supabase.auth.signOut();
    if (response.error) {
      Alert.alert(response.error.message);
    }
    logout();
    router.replace("/Auth");
  }
  return (
    <Button disabled={loading} onPress={handleLogout}>
      Logout
    </Button>
  );
}
