import { Request } from 'express';
import { JwtPayload } from './jwt-payload.interface';
import { REQUEST_USER_KEY } from '../constants/auth.constants';

export type RequestWithUser = Request & {
  [REQUEST_USER_KEY]: JwtPayload;
};
