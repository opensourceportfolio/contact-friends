import { Button, ButtonGroup, Image, Input } from "@rneui/themed";
import * as ImagePicker from "expo-image-picker";
import { Stack, router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { View } from "react-native";
import { FrequencyLabels } from "../../../../model/frequency";
import { useContactFriendsStore } from "../../../../store";
import type { Frequency } from "../../../../type/model";

type SearchParams = {
  friendId?: string;
};

export default function Edit() {
  const { friendId } = useLocalSearchParams<SearchParams>();
  const [loading, setLoading] = useState(false);
  const addFriend = useContactFriendsStore((s) => s.addFriend);
  const updateFriend = useContactFriendsStore((s) => s.updateFriend);
  const friends = useContactFriendsStore((s) => s.friends);
  const friend = friends?.find((f) => friendId && f.id === Number(friendId));

  const frequencyOptions = Object.keys(FrequencyLabels) as Frequency[];
  const frequencyValues = Object.values(FrequencyLabels);
  const initialSelectedIndex =
    frequencyOptions.findIndex((f) => friend?.frequency) ?? 0;

  console.log({
    frequencyOptions,
    frequencyValues,
    initialSelectedIndex,
    friend,
  });

  const [name, setName] = useState(friend?.name ?? "");
  const [selectedFrequency, setSelectedFrequency] =
    useState(initialSelectedIndex);
  const [avatar, setAvatar] = useState<string | null>(
    friend?.avatar ?? "https://placehold.co/200/png",
  );

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

    try {
      if (friend) {
        updateFriend({ id: friend.id, name, frequency, avatar, latest_date: friend.latest_date });
      } else {
        addFriend({ name, frequency, avatar });
      }
    } catch (e) {
      setLoading(false);
      console.log({ e });
    } finally {
      setLoading(false);
      router.navigate("/screen/main/list30");
    }
  };

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
