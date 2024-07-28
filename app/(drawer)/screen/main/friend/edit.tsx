import { Button, ButtonGroup, Image, Input } from "@rneui/themed";
import * as ImagePicker from "expo-image-picker";
import { Stack, router } from "expo-router";
import React, { useState } from "react";
import { View } from "react-native";
import { FrequencyLabels } from "../../../../model/frequency";
import { useContactFriendsStore } from "../../../../store";
import type { Frequency } from "../../../../type/model";

export default function Edit() {
  const [name, setName] = useState("");
  const [selectedFrequency, setSelectedFrequency] = useState(0);
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState<string | null>(
    "https://placehold.co/200/png",
  );
  const addFriend = useContactFriendsStore((s) => s.addFriend);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    const frequency = frequencyOptions[selectedFrequency];

    addFriend({ name, frequency, avatar })
      .then((f) => {
        setLoading(false);
        router.navigate("/screen/main/list30");
      })
      .catch((e) => {
        setLoading(false);
        console.log({ e });
      });
  };

  const frequencyOptions = Object.keys(FrequencyLabels) as Frequency[];
  const frequencyValues = Object.values(FrequencyLabels);

  return (
    <View>
      <Stack.Screen
        options={{
          title: "Add new friend",
          headerShown: true,
        }}
      />
      <Input
        label="Name"
        leftIcon={{ type: "ionicon", name: "person-circle" }}
        onChangeText={(text) => setName(text)}
        value={name}
        placeholder="John Doe"
        autoCapitalize="words"
      />
      <ButtonGroup
        buttons={frequencyValues}
        selectedIndex={selectedFrequency}
        onPress={(value) => {
          setSelectedFrequency(value);
        }}
        containerStyle={{ marginBottom: 20 }}
      />
      {avatar && (
        <Image
          onPress={pickImage}
          source={{ uri: avatar }}
          style={{ width: 200, height: 200 }}
        />
      )}
      <Button loading={loading} onPress={handleSave}>
        Save
      </Button>
    </View>
  );
}
