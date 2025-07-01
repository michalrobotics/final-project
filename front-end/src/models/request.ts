import User from "./user";

type Request = {
   _id: string;
   title: string;
   description: string;
   creator: User;
   createdAt: string;
   updatedAt: string;
   __v: number;
   status: {
      state: string;
      description?: string
   }
}

export default Request;
