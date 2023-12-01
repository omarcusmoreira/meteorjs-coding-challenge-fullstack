import { People } from './people';
import { Meteor } from 'meteor/meteor';


Meteor.methods({
    'people.checkIn'({ peopleId }) {
      // Find the person in the collection by their `_id`
      const person = People.findOne(peopleId);

      if (person) {
        // Update the `checkedIn` property of the person to true
        return People.update(peopleId, { $set: { checkedIn: true, checkInDate: new Date().toLocaleString() } });
      }
        // Handle the case where the person with the provided ID is not found
        throw new Meteor.Error('person-not-found', 'Person not found');
    },
    'people.checkOut'({ peopleId }) {
        // Find the person in the collection by their `_id`
        const person = People.findOne(peopleId);

        if (person) {
          // Update the `checkedIn` property of the person to true
          return People.update(peopleId, { $set: { checkedIn: false, checkOutDate: new Date().toLocaleString() } });
        }
          // Handle the case where the person with the provided ID is not found
          throw new Meteor.Error('person-not-found', 'Person not found');
      },
  });
