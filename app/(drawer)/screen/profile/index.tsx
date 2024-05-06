import { Button } from "@rneui/themed";
import { router } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";
import { supabase } from "../../../lib/supabase";

export default function Profile() {
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    const response = await supabase.auth.signOut();
    if (response.error) {
      Alert.alert(response.error.message);
    }
    router.replace("/Auth");
  }
  return (
    <Button disabled={loading} onPress={handleLogout}>
      Logout
    </Button>
  );
}
