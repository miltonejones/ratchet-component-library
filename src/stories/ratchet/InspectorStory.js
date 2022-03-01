import React from "react";
import {
  Center,
  Card,
  Divider,
  List,
  Flex,
  Box,
  Inspector,
} from "../../components/UI/UI.js";
import { AlertTriangle } from "../../icons";

export default function InspectorStory() {
  return (
    <Center mt={8}>
      <Inspector>
        <Card mr={6} style={{ minWidth: 245 }}>
          <List
            dense
            items={[
              <Flex sx={{ margin: 12 }} align="center">
                <AlertTriangle /> <Box ml={2}>Inbox</Box>
              </Flex>,
              <Box sx={{ margin: 12 }}>Drafts</Box>,
              <Divider />,
              <Box sx={{ margin: 12 }}>Trash</Box>,
              <Box sx={{ margin: 12 }}>Spam</Box>,
            ]}
          />
        </Card>
      </Inspector>
    </Center>
  );
}
