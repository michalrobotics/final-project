type User = {
   idfNum: number;
   name: string;
   email: string;
   password: string;
   isManager: boolean;
   tokens: { token: string; _id: string; }[];
   _id: string;
   __v: number;
}

export default User;
