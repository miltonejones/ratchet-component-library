import React from 'react';
import { Center, Flex, Box } from '../UI';

export default function DocNode({ node }) {
  const { label, component: Tag, demos, caption, also } = node;
  return (
    <>
      <Flex column>
        <h3>{label}</h3>
        <Box mb={6}>{caption}</Box>
        {!!also && <Box mb={6}>{also}</Box>}
        <Center className="well">
          {demos.map((demo, i) => (
            <Flex mr={6} align="center" justify="center" column key={i}>
              <Tag {...demo.props} />
              <Box mt={2}>{demo.label}</Box>
            </Flex>
          ))}
        </Center>
      </Flex>
    </>
  );
}
