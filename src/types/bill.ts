import User from './user';

interface Transaction {
  from: string;
  to: string;
  due: number;
}

interface Member extends User {
  paid?: number | null;
  due?: number | null;
  expects?: number | null;
  pending: Array<Transaction>;
  tempIndex?: number;
}

interface MemberArray extends Array<Member> {
  total(): number;
}

interface Bill {
  total: number | null;
  members: Array<Member>;
}

export default Bill;
export type { Member };
