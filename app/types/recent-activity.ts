import { Instructor } from "../../types/instructor";

export type RecentActivity = {
  _id: string;
  availability: string;
  instructorId: Instructor;
  createdAt: Date;
  updatedAt: Date;
};
