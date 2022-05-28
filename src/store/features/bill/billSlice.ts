import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

// types
import Bill, { Member } from '../../../types/bill';
import { ModifyMemberPayload } from './billActionTypes';

// utils
import { getTotal } from '../../../utils/billUtils';

const initialState: Bill = {
  total: 0,
  members: [],
};

export const billSlice = createSlice({
  name: 'bill',
  initialState,
  reducers: {
    addDummyMembers: (state) => {
      state.members = [
        {
          name: 'alan',
          due: null,
          pending: [],
          expects: null,
        },
        {
          name: 'sujoy',
          due: null,
          pending: [],
          expects: null,
        },
        {
          name: 'mark',
          due: null,
          pending: [],
          expects: null,
        },
        {
          name: 'priyen',
          due: null,
          pending: [],
          expects: null,
        },
      ];
    },
    modifyMember: (state, action: PayloadAction<ModifyMemberPayload>) => {
      state.members[action.payload.index] = action.payload.member;
      state.total = getTotal(state.members);
    },
    assignDues: (state) => {
      const expense = current(state);
      // calculate Average
      const avg = getTotal(expense.members) / expense.members.length;
      // people who have paid more
      let paymentQueue: Array<Member> = [];
      // people who need to pay
      let dueQueue: Array<Member> = [];
      // people with no pending payments
      let clearedQueue: Array<Member> = [];

      expense.members.forEach((member, index) => {
        const tempIndex: number = index;

        if (!member.paid) {
          dueQueue.push({ ...member, paid: 0, due: avg, tempIndex });
          return;
        }

        if (member.paid > avg) {
          paymentQueue.push({ ...member, due: 0, expects: member.paid - avg });
        } else if (member.paid === avg) {
          clearedQueue.push({ ...member, due: 0, paid: avg, expects: 0 });
        } else {
          dueQueue.push({ ...member, due: avg - member.paid, tempIndex });
        }
      });

      // assign dues
      paymentQueue.forEach((member) => {
        let due = member.paid! - avg;
        console.log('Member is ', member.name, 'expects', due);
        while (due !== 0) {
          const curr = dueQueue[dueQueue.length - 1];
          console.log('Currently calculating', curr.name, 'to', member.name);
          const paid = curr.paid ?? 0;
          curr.due = avg - paid;
          // should pay all or some
          let paidTo = 0;
          if (curr.due !== 0) {
            if (due > curr.due) {
              paidTo = curr.due;
              due = due - paidTo;
              curr.due = 0;
            } else if (due === curr.due) {
              paidTo = curr.due;
              due = 0;
              curr.due = 0;
            } else {
              paidTo = due;
              curr.due = curr.due - paidTo;
              due = 0;
            }
          }

          curr.pending = [
            ...curr.pending,
            {
              to: member.name,
              from: curr.name,
              due: paidTo,
            },
          ];

          console.log(
            'Now',
            curr.name,
            'owes',
            curr.due,
            'but ',
            member.name,
            'expects ',
            due
          );

          if (curr.due === 0) {
            const popped = dueQueue.pop();
            dueQueue.unshift(popped!);
          }
        }
      });

      dueQueue.forEach((member, index) => {
        if (member.tempIndex) {
          state.members[member.tempIndex] = member;
        }
      });
    },
  },
});

export const { addDummyMembers, modifyMember, assignDues } = billSlice.actions;

export default billSlice.reducer;
