import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const UserSchema = new Schema({
  name: {
    type: String,
    required: 'Digite o nome'
  },
  email: {
    type: String,
    required: 'Digite o email'
  },
  password: {
    type: String,
    required: 'Digite o email'
  },
  create_date: {
    type: Date,
    default: Date.now
  }
})