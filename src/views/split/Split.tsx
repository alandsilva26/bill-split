import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import {
  addDummyMembers,
  assignDues,
  modifyMember,
} from '../../store/features/bill/billSlice';

import Bill, { Member } from '../../types/bill';
import { getTotal } from '../../utils/billUtils';

const Split = () => {
  const expense = useAppSelector((state) => state.bill);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(addDummyMembers());
  }, [dispatch]);

  const handleChange = (value: string, index: number) => {};

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>, index: number) => {
    e.preventDefault();
    if (e.currentTarget) {
      const elements = e.currentTarget
        .elements as typeof e.currentTarget.elements & {
        paid: { value: string };
      };

      const member = expense.members[index];
      const val = Number(elements.paid.value);

      dispatch(
        modifyMember({
          index,
          member: { ...member, paid: val },
        })
      );
    }
  };

  return (
    <>
      <h1>Split</h1>
      <hr />
      <div>
        <h2>
          Total Expense: <>{getTotal(expense.members)}</>
        </h2>
      </div>
      <hr />
      <button onClick={() => dispatch(assignDues())}>Calculate</button>
      <hr />
      <div>
        {expense.members.map((user, index) => {
          return (
            <div
              key={index}
              style={{
                width: '100%',
                display: 'flex',
                padding: '1em',
                justifyContent: 'space-evenly',
              }}
            >
              <div>{user.name}</div>&nbsp;
              <div>Due: {user.due && user.due}</div>
              <form action="" onSubmit={(e) => handleSubmit(e, index)}>
                <input
                  type="number"
                  name="paid"
                  onChange={(e) => handleChange(e.target.value, index)}
                  min="0"
                />
              </form>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Split;
