import { Icon, ListItem } from "@rneui/themed";
import { useState } from "react";
import { FrequencyLabels } from "../model/frequency";
import type { Friend } from "../type/model";

type FrequencyPicker = {
  friend: Friend;
};

export function FrequencyPicker({ friend }: FrequencyPicker) {
  const [isFrequencyExpanded, setFrequencyExpanded] = useState(false);

  const handlePress = () => {
    // biome-ignore lint/style/noArguments: <explanation>
    console.log(arguments);
  };

  return (
    <ListItem.Accordion
      content={
        <ListItem.Content>
          <ListItem.Title>Frequency</ListItem.Title>
          <ListItem.Subtitle>{friend.frequency}</ListItem.Subtitle>
        </ListItem.Content>
      }
      isExpanded={isFrequencyExpanded}
      onPress={() => {
        setFrequencyExpanded(!isFrequencyExpanded);
      }}
    >
      {Object.entries(FrequencyLabels).map(([key, label], i) => (
        <ListItem key={key} bottomDivider onPress={handlePress}>
          <ListItem.Content>
            <ListItem.Title>{label}</ListItem.Title>
          </ListItem.Content>
          {friend.frequency === key ? (
            <ListItem.Content right>
              <Icon name="check" type="font-awesome-5" />
            </ListItem.Content>
          ) : null}
        </ListItem>
      ))}
    </ListItem.Accordion>
  );
}
