import React from 'react';
import { Select, Box } from '@chakra-ui/react';


const EventSelector = ({ communities, selectedCommunity, onEventChange }) => (
      <Box bg="gray.100" borderRadius="8px" w="100%">
      <Select
        variant="filled"
        placeholder="Select an event"
        value={selectedCommunity._id}
        onChange={onEventChange}
      >
        {communities.map((community) => (
          <option key={community._id} value={community._id}>
            {community.name}
          </option>
        ))}
      </Select>
      </Box>
  );

export default EventSelector;
