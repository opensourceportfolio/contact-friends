import { Button, Input, Text } from "@rneui/themed";
import * as QueryParams from "expo-auth-session/build/QueryParams";
import * as Linking from "expo-linking";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "../lib/supabase";
import type { Params } from "./confirm";
import { useContactFriendsStore } from "../store";

export default function Auth() {
  const [error, setError] = useState<string>();
  const [email, setEmail] = useState("");
  const friends = useContactFriendsStore((s) => s.friends);
  const setUser = useContactFriendsStore((s) => s.setUser);

  const sendMagicLink = async (email: string) => {
    router.navigate<Params>({ pathname: "/Auth/confirm", params: { email } });
  };

  const createSessionFromUrl = async (url: string) => {
    const { params, errorCode } = QueryParams.getQueryParams(url);
  
    if (errorCode) {
      return setError(errorCode)
    };

    const { access_token, refresh_token } = params;
  
    if (!access_token) {
      return setError("No access token. Invalid url.")
    };
  
    const { data, error } = await supabase.auth.setSession({
      access_token,
      refresh_token,
    });
  
    if (error){
      return setError(error.message)
    };

    setUser(data.user)
  
    router.navigate("/screen/main/late");
  };
  
  const handleUrlChange: Linking.URLListener = (e) => {
    createSessionFromUrl(e.url);
  };

  useEffect(() => {
    const listener = Linking.addEventListener("url", handleUrlChange);
    return () => listener.remove();
  },[]);

  return (
    <SafeAreaView>
      <View>
        <Input
          label="Email"
          leftIcon={{ type: "material", name: "email" }}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="john@doe.email"
          autoCapitalize="none"
        />
        <Button
          disabled={email === ""}
          onPress={() => sendMagicLink(email)}
          title="Send magic link"
        />
        <Text h4>{error}</Text>
      </View>
    </SafeAreaView>
  );
}
