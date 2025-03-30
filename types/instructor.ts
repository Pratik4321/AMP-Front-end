export type Instructor = {
  Offering: string;
  Campus: string;
  Delivery: string;
  Name: string;
  Email: string;
  Courses: string;
  status?: "pending" | "available" | "not-available";
  createdAt: Date;
  updatedAt: Date;
};
//

export type InstructorResponse = {
  _id: string;
  availability: string;
  instructorId: Instructor;
  createdAt: Date;
  updatedAt: Date;
};
