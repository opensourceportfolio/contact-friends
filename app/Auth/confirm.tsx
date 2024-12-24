import { Text } from "@rneui/themed";
import { makeRedirectUri } from "expo-auth-session";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { AsyncComponent } from "../component/AsyncComponent";
import { supabase } from "../lib/supabase";

export type Params = {
  email: string;
};

const redirectTo = makeRedirectUri({});

export default function Confirm() {
  const { email } = useLocalSearchParams<Params>();
  const [action, setAction] = useState<Promise<unknown>>(new Promise(() => {}));

  useEffect(() => {
    setAction(
      supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: redirectTo,
        },
      })
    );
  }, [email]);

  return (
    <AsyncComponent action={action}>
      <View style={styles.container}>
        <Text h2>Check your email</Text>
      </View>
    </AsyncComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
