import React, { useState, useEffect } from 'react';
import { Box, Text, SimpleGrid, Link } from '@chakra-ui/react';

export const Summary = ({ people, community }) => {
  const [showAllCompanies, setShowAllCompanies] = useState(false);

  useEffect(() => {
    setShowAllCompanies(false);
  }, [people]);

  function countPeopleByCompany(peopleData) {
    const companyCountMap = {};

    peopleData.forEach((person) => {
      const companyName = person.companyName;
      if (companyName) {
        if (companyCountMap[companyName]) {
          companyCountMap[companyName] += 1;
        } else {
          companyCountMap[companyName] = 1;
        }
      }
    });

    const result = Object.entries(companyCountMap)
      .filter(([companyName, count]) => count > 0)
      .map(([companyName, count]) => ({
        companyName,
        count,
      }));

    result.sort((a, b) => b.count - a.count);

    return result;
  }

  const peopleByCompany = countPeopleByCompany(community);

  const displayCount = showAllCompanies ? peopleByCompany.length : 4;


  return (
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing="4" width="100%">
        <Box bg="gray.100" p="4" borderRadius="md" h={140}>
          <Text fontSize="lg" fontWeight="bold">People in the event</Text>
          <Text color="green" fontSize="42">{community.length}</Text>
        </Box>
        <Box bg="gray.100" p="4" borderRadius="md" h={140}>
          <Text fontSize="lg" fontWeight="bold">People not Checked-In </Text>
          <Text color="red" fontSize="42">{people.length - community.length}</Text>
        </Box>
        <Box bg="gray.100" p="4" borderRadius="md" h={140} overflowY="auto">
          <Text fontSize="lg" fontWeight="bold">People by company</Text>
          {peopleByCompany.slice(0, displayCount).map((company, index) => (
            <span key={company.companyName}>
              {`${company.companyName} (${company.count})`}
              {index < displayCount - 1 ? ', ' : ''}
            </span>
          ))}
          {peopleByCompany.length > 5 && (
            <span>
              {!showAllCompanies ? (
                <span>
                  <span>, </span>
                  <Link onClick={() => setShowAllCompanies(true)} sx={{ color: 'blue' }}>See more</Link>
                </span>
              ) : (
                <span>
                  <span>, </span>
                  <Link onClick={() => setShowAllCompanies(false)} sx={{ color: 'blue' }}>See less</Link>
                </span>
              )}
            </span>
          )}
        </Box>
      </SimpleGrid>
  );
};

export default Summary;
