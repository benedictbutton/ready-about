import mongoose from 'mongoose';
import user from './user';
import word from './word';

const startServices = () => {
  user();
  word();
};

startServices();
