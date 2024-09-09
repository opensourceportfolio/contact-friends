import { Button, Input, Text } from "@rneui/themed";
import type { AuthError } from "@supabase/supabase-js";
import * as QueryParams from "expo-auth-session/build/QueryParams";
import * as Linking from "expo-linking";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "../lib/supabase";
import type { Params } from "./confirm";
import { useContactFriendsStore } from "../store";


const createSessionFromUrl = async (url: string) => {
  const { params, errorCode } = QueryParams.getQueryParams(url);

  if (errorCode) throw new Error(errorCode);
  const { access_token, refresh_token } = params;

  if (!access_token) return;

  const { data, error } = await supabase.auth.setSession({
    access_token,
    refresh_token,
  });

  if (error) throw error;

  router.navigate("/screen/main/late");
};

const handleUrlChange: Linking.URLListener = (e) => {
  createSessionFromUrl(e.url);
};

export default function Auth() {
  const [error, setError] = useState<AuthError>();
  const [email, setEmail] = useState("");
  const friends = useContactFriendsStore((s) => s.friends);

  console.log("Auth", { friends })

  const sendMagicLink = async (email: string) => {
    router.navigate<Params>({ pathname: "/Auth/confirm", params: { email } });
  };

  useEffect(() => {
    const listener = Linking.addEventListener("url", handleUrlChange);
    return () => listener.remove();
  });

  return (
    <SafeAreaView>
      <View>
        <Input
          label="Email"
          leftIcon={{ type: "material", name: "email" }}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="john@doe.email"
          autoCapitalize="words"
        />
        <Button
          disabled={email === ""}
          onPress={() => sendMagicLink(email)}
          title="Sign me in"
        />
        <Text h4>{error?.message}</Text>
      </View>
    </SafeAreaView>
  );
}
