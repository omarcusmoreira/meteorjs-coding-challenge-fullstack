import React from 'react';
import {Select} from '@chakra-ui/react'

const EventSelector = ({ communities, selectedCommunity, onEventChange }) => {
  return (
    <div>
      <Select 
        variant='filled' 
        placeholder='Select an event' 
        value={selectedCommunity._id} 
        onChange={onEventChange}
        w='100%'
      > 
        {communities.map((community) => (
          <option key={community._id} value={community._id}>
            {community.name}
          </option>
        ))}
      </Select>
    </div>
  );
};

export default EventSelector;

