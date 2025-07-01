import type { Request } from "express";
import type { ParsedQs } from 'qs';

const User = require('../models/user');

export interface AuthRequest extends Request {
   user: typeof User;
   token: string;
}

export interface RequestQuery extends ParsedQs {
   creator?: string;
   state?: string;
   title?: string;
   from?: string;
   until?: string;
}
