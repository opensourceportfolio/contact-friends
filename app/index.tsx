import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import "react-native-url-polyfill/auto";

import { Redirect } from "expo-router";
import { useSession } from "./hook/useSession";

export default function App() {
  const { session, loading } = useSession();

  if (session) {
    return <Redirect href="/screen/main/late" />;
  }

  if (!loading && session == null) {
    return <Redirect href="/Auth" />;
  }

  return (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});
