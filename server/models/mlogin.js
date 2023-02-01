import mongoose from 'mongoose';

const dbSchema = mongoose.Schema;

const sModelSchema = new dbSchema({
  firstName: String,
  middleName: String,
  lastName: String,
  email: String,
  password: String,
  category: String,
});

const contactsModelSchema = new dbSchema({
  name: String,
  // relation: String,
  place: String,
  invtDate: Date,
});
const smodel = mongoose.model('signUpModel', sModelSchema);
const cmodel = mongoose.model('contacts', contactsModelSchema);
export { smodel, cmodel };
