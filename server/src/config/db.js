import mongoose from 'mongoose';

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ai_interview_prep';
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`[MongoDB] Connected successfully: ${conn.connection.host} (${conn.connection.name})`);
    return { status: 'connected', host: conn.connection.host, db: conn.connection.name };
  } catch (error) {
    console.error(`[MongoDB] Connection error: ${error.message}`);
    console.warn(`[MongoDB] Please make sure MongoDB is running locally or provide a valid MONGODB_URI (e.g. MongoDB Atlas) in server/.env`);
    return { status: 'disconnected', error: error.message };
  }
};

export const getDBStatus = () => {
  const states = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
  };
  const stateCode = mongoose.connection.readyState;
  return {
    state: states[stateCode] || 'unknown',
    readyState: stateCode,
    host: mongoose.connection.host || null,
    name: mongoose.connection.name || null,
  };
};
