import React from "react";
import {
  Flex,
  Avatar,
  Chip,
  Divider,
  List,
  Typography,
  Card,
  Box,
  Stack
} from "../../components/UI/UI.js";

import { AlertTriangle } from "../../icons";


export default function ListStory(args) {
    return   <Flex>
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
      <Card style={{ minWidth: 245 }} dense>
        <List {...args}/>
      </Card>
    </Flex>
}