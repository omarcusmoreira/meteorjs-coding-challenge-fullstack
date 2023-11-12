import React, { useState, useEffect } from 'react';

export const Summary = ({ people, community }) => {
  const [showAllCompanies, setShowAllCompanies] = useState(false);

  useEffect(() => {
    setShowAllCompanies(false);
  }, [people]);

  function countPeopleByCompany(people) {
    const companyCountMap = {};

    people.forEach((person) => {
      const companyName = person.companyName;
      if (companyName) {
        if (companyCountMap[companyName]) {
          companyCountMap[companyName] += 1;
        } else {
          companyCountMap[companyName] = 1;
        }
      }
    })

    const result = Object.entries(companyCountMap)
      .filter(([companyName, count]) => count > 0)
      .map(([companyName, count]) => ({
        companyName: companyName,
        count: count,
      }));

    result.sort((a, b) => b.count - a.count);

    return result;
  }

  const peopleByCompany = countPeopleByCompany(community);

  const displayCount = showAllCompanies ? peopleByCompany.length : 5;


  return (
    
    <div>
      <p id={community.length}>People in the event right now: {community.length}</p>
      <p>People not checked-in: {people.length - community.length}</p>
      <p>
        People by company in the event right now:{' '}
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
                <a onClick={() => setShowAllCompanies(true)}>See more</a>
              </span>
            ) : (
              <span>
                <span>, </span>
                <a onClick={() => setShowAllCompanies(false)}>See less</a>
              </span>
            )}
          </span>
        )}
      </p>
      
    </div>
  );
};

export default Summary;
