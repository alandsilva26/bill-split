import { Member } from '../types/bill';

export const getTotal = (members: Array<Member>): number => {
  return members.reduce((total, current) => {
    if (current.paid) {
      return total + current.paid;
    }
    return total;
  }, 0);
};
