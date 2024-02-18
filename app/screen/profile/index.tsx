import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Button, Input } from "react-native-elements";

export default function Profile() {
  const [name, setName] = useState("");
  return (
    <Input
      label="Name"
      leftIcon={{ type: "font-awesome", name: "envelope" }}
      onChangeText={(text) => setName(text)}
      value={name}
      placeholder="email@address.com"
      autoCapitalize={"none"}
    />
  );
}
