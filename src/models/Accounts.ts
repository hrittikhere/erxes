import { Document, model, Model, Schema } from 'mongoose';
import { field } from './utils';

export interface IAccount {
  kind: string;
  token: string;
  tokenSecret?: string;
  expireDate?: string;
  scope?: string;
  name: string;
  uid: string;
}

export interface IAccountDocument extends IAccount, Document {}

export const accountSchema = new Schema({
  _id: field({ pkey: true }),
  kind: {
    type: String,
  },
  token: {
    type: String,
  },
  tokenSecret: {
    type: String,
    optional: true,
  },
  scope: {
    type: String,
    optional: true,
  },
  expireDate: {
    type: String,
    optional: true,
  },
  name: { type: String },
  uid: { type: String },
});

export interface IAccountModel extends Model<IAccountDocument> {
  getAccount(selector): Promise<IAccountDocument>;
}

export const loadClass = () => {
  class Account {
    public static async getAccount(selector) {
      const account = await Accounts.findOne(selector);

      if (!account) {
        throw new Error('Account not found');
      }

      return account;
    }
  }

  accountSchema.loadClass(Account);

  return accountSchema;
};

loadClass();

// tslint:disable-next-line
const Accounts = model<IAccountDocument, IAccountModel>('accounts', accountSchema);

export default Accounts;
