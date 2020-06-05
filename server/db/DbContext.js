import mongoose from "mongoose";
import Profile from "../models/Profile";
import Day from "../models/Day";
import Food from "../models/Food";

class DbContext {
  Days = mongoose.model("Day", Day);
  Foods = mongoose.model("Food", Food);
  Profile = mongoose.model("Profile", Profile);
}

export const dbContext = new DbContext();
