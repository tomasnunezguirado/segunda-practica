import mongoose from 'mongoose';

export default function configureMongo() {
  const mongo = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`;
  mongoose.connect(mongo, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
      console.log(`MongoDB connection successful to ${process.env.DB_NAME} database`);
  })
  .catch(err => {
      console.log(`Cannot connect to MongoDB ${process.env.DB_NAME} database - ${err}`);
  });
}