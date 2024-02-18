import "react-native-url-polyfill/auto";
import React, { useState, useEffect } from "react";
import { supabase } from "./lib/supabase";
import { ActivityIndicator, StyleSheet, View } from "react-native";

import { Redirect, router } from "expo-router";
import { useSession } from "./hook/useSession";

export default function App() {
  const { session, loading } = useSession();

  if (session) {
    return <Redirect href="/screen/main/list30" />;
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
