import { Button, ButtonGroup, Image, Input } from "@rneui/themed";
import * as ImageManipulator from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";
import { Stack, router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { frequencyOptions, frequencyValues } from "../../../../model/frequency";
import { useContactFriendsStore } from "../../../../store";

type SearchParams = {
  friendId?: string;
};

export default function Edit() {
  const { friendId } = useLocalSearchParams<SearchParams>();
  const [loading, setLoading] = useState(false);
  const addFriend = useContactFriendsStore((s) => s.addFriend);
  const updateFriend = useContactFriendsStore((s) => s.updateFriend);
  const friends = useContactFriendsStore((s) => s.friends);
  const log = useContactFriendsStore((s) => s.log);
  const friend = friends?.find((f) => friendId && f.id === Number(friendId));
  const isNewFriend = friend == null;

  const initialSelectedIndex = Math.max(
    frequencyOptions.findIndex((f) => friend?.frequency),
    0
  );

  const [name, setName] = useState(friend?.name ?? "");
  const [selectedFrequency, setSelectedFrequency] =
    useState(initialSelectedIndex);
  const [avatar, setAvatar] = useState<string | null>(friend?.avatar ?? null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0,
      base64: true,
    });

    if (result.canceled) {
      return;
    }

    const resizedImage = await ImageManipulator.manipulateAsync(
      result.assets[0].uri,
      [{ resize: { width: 400, height: 300 } }],
      { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG, base64: true }
    );

    setAvatar(resizedImage.base64 ?? null);
  };

  const handleSave = async () => {
    setLoading(true);
    const frequency = frequencyOptions[selectedFrequency];

    try {
      if (friend) {
        await updateFriend({
          id: friend.id,
          name,
          frequency,
          avatar,
          latest_date: friend.latest_date,
        });
      } else {
        await addFriend({ name, frequency, avatar });
      }
    } catch (e) {
      setLoading(false);
      log({ e });
    } finally {
      setLoading(false);
      router.navigate("/screen/main/list30");
    }
  };

  return (
    <View style={styles.layout}>
      <Stack.Screen
        options={{
          title: isNewFriend ? "Edit friend" : "Add new friend",
          headerShown: true,
        }}
      />
      <Input
        label="Name"
        leftIcon={{ type: "ionicon", name: "person-circle" }}
        onChangeText={(text) => setName(text)}
        value={name}
        autoFocus
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
      <View style={styles.avatarPreview}>
        <Image
          style={styles.avatar}
          onPress={pickImage}
          source={{
            uri: avatar
              ? `data:image/jpeg;base64,${avatar}`
              : "https://placehold.co/200/png",
          }}
        />
      </View>
      <Button loading={loading} onPress={handleSave} style={styles.saveButton}>
        Save
      </Button>
    </View>
  );
}

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  avatar: {
    aspectRatio: 1,
    height: screenWidth / 2,
    width: screenWidth / 2,
  },
  avatarPreview: {
    alignItems: "center",
  },
  saveButton: {
    width: "100%",
  },
  layout: {
    gap: 30,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginTop: 20,
  },
});
