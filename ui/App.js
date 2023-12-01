import React, { useState, useEffect } from 'react';
import { Texts } from '../infra/constants';
import EventSelector from './components/EventSelector/EventSelector';
import PeopleList from './components/PeopleList/PeopleList';
import Summary from './components/Summary/Summary';
import { People } from '/people/people';
import { Communities } from '/communities/communities';
import { useTracker } from 'meteor/react-meteor-data';
import { Box, HStack, Heading, VStack, Divider } from '@chakra-ui/react';
import { Meteor } from 'meteor/meteor';

export function App() {
  const [selectedCommunityId, setSelectedCommunityId] = useState('');
  const [communityPeople, setCommunityPeople] = useState([]);

  const communities = useTracker(() => Communities.find({}).fetch());
  const people = useTracker(() => People.find({}).fetch());
  const peopleSelected = useTracker(() =>
    people.filter((person) => selectedCommunityId === person.communityId)
  );
  const community = useTracker(() =>
    People.find({ communityId: selectedCommunityId, checkedIn: true }).fetch()
  );

  const handleCommunityChange = (event) => {
    const obj = event.target.value;
    setSelectedCommunityId(obj);
  };

  useEffect(() => {
    setCommunityPeople(peopleSelected);
  }, [selectedCommunityId]);

  const handleCheckIn = (peopleId) => {
    Meteor.call('people.checkIn', { peopleId });
  };

  const handleCheckOut = (peopleId) => {
    Meteor.call('people.checkOut', { peopleId });
  };

  return (
    <VStack h="100vh" w="100%" gap={0}>

      <HStack
        gridColumn="span 2"
        w="100%"
        p={4}
        backgroundColor="teal.500"
        alignItems="flex-start"
        gap={4}
      >

        <VStack display="flex" alignItems="flex-start" h={28}>
          <Heading w={72}>{Texts.HOME_TITLE}</Heading>
          <EventSelector
            communities={communities}
            selectedCommunity={selectedCommunityId}
            onEventChange={handleCommunityChange}
          />
        </VStack>
        <Divider orientation="vertical" size="xl"/>
        <Summary people={communityPeople} community={community} />
      </HStack>

      <Box overflowY="auto" bg="teal.200" p={4} w="100%" h="100vh">
        {communityPeople.length !== 0 ? (
          <PeopleList
            people={communityPeople}
            handleCheckIn={handleCheckIn}
            handleCheckOut={handleCheckOut}
          />
        ) : (
          <Box
            w="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
              {Texts.HOME_NO_EVENT_SELECTED}
          </Box>
        )}
      </Box>
    </VStack>
  );
}
