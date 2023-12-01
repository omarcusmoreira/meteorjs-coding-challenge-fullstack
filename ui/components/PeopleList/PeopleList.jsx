import React, { useEffect, useState } from 'react';
import {
  Button, 
  VStack, 
  Table, 
  TableContainer, 
  TableCaption, 
  Thead, 
  Tbody, 
  Tr, 
  Td, 
  Th
} from '@chakra-ui/react'

const PeopleList = ({ people, handleCheckIn, handleCheckOut }) => {

  const [updatedPeople, setUpdatedPeople] = useState([]);

  useEffect(()=>{
    setUpdatedPeople(people)
  }, [people])


  const handleCheckInClick = (personId) => {
    
    handleCheckIn(personId)
    setTimeout(() =>  setUpdatedPeople((prevPeople) => {
      const updatedPeopleList = prevPeople.map((person) => {
        if (person._id === personId) {
          return {
            ...person,
            checkedIn: true,
            checkInDate: new Date().toLocaleString(),
          };
        }
        return person;
      });
      return updatedPeopleList;
    }), 5000)
  };

  const handleCheckOutClick = (personId) => {
    handleCheckOut(personId);
    const updatedPeopleList = updatedPeople.map(person => {
      if (person._id === personId) {
        return { ...person, checkedIn: false, checkOutDate: new Date().toLocaleString() };
      }
      return person;
    });
    setUpdatedPeople(updatedPeopleList)

  };

  function elipsis(string) {
    if (string) {
      if (string.length > 25) {
        return string.slice(0, 22) + '...';
      }
      return string;
    }
  }
  return (
      <TableContainer maxW="100%">
        <Table variant='striped' size='sm'>
          <TableCaption>Event Attendees</TableCaption>
            <Thead>
              <Tr h={12}>
                <Th >Name</Th>
                <Th >Title</Th>
                <Th>Company Name</Th>
                <Th>Checkin Date</Th>
                <Th>Checkout Date</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
            {updatedPeople.map(person => (
              <Tr h={16} key={person._id}>
                <Td>{`${person.firstName} ${person.lastName}`}</Td>
                <Td>{elipsis(person.title) ?? '-' }</Td>
                <Td>{elipsis(person.companyName) ?? '-'}</Td>
                <Td>{person.checkInDate ?? 'Not checked in'}</Td>
                <Td>{person.checkOutDate ?? 'Not checked out'}</Td>
                <Td>
                  <VStack alignItems='flex-start' h={16}>
                    <Button
                      onClick={() => handleCheckInClick(person._id)}
                      isDisabled={person.checkedIn}
                      size="xs"
                      colorScheme='green'
                      >
                      Check-in {`${person.firstName} ${person.lastName}`}
                    </Button>
                    <Button 
                      onClick={() => handleCheckOutClick(person._id)}
                      size="xs"
                      colorScheme='red'
                      isDisabled={!person.checkedIn}
                    >
                      Check-out {`${person.firstName} ${person.lastName}`}
                    </Button>
                  </VStack>
                </Td>
              </Tr>
            ))}
            </Tbody>
          </Table>
        </TableContainer>
  );
};

export default PeopleList;
