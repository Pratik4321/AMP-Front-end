type Instructor = {
  _id ?: {
    $oid: string; // MongoDB ObjectId is represented as a string
  };
  name: string;
  email: string;
  status ?: "pending" | "approved" | "rejected"; // Assuming status can only be one of these values
  createdAt ?: {
    $date: string; // Date is represented as a string in ISO format
  };
  updatedAt ?: {
    $date: string; // Date is represented as a string in ISO format
  };
};
