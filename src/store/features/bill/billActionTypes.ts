import { Member } from '../../../types/bill';

interface ModifyMemberPayload {
  index: number;
  member: Member;
}

export type { ModifyMemberPayload };
