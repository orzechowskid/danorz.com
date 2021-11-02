import {
  Document,
  Model
} from 'mongoose';

export type MongooseModel<T> = Model<Document<T>>;
