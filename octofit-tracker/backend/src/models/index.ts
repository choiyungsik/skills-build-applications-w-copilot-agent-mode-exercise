import mongoose, { Schema, Types } from 'mongoose';

export interface User {
  name: string;
  email: string;
  age: number;
  fitnessGoal: string;
}

export interface Team {
  name: string;
  description: string;
  members: Types.ObjectId[];
}

export interface Activity {
  user: Types.ObjectId;
  team: Types.ObjectId;
  activityType: string;
  durationMinutes: number;
  distanceKm: number;
  caloriesBurned: number;
  date: Date;
}

export interface LeaderboardEntry {
  user: Types.ObjectId;
  team: Types.ObjectId;
  points: number;
  rank: number;
  period: string;
}

export interface Workout {
  name: string;
  description: string;
  category: string;
  durationMinutes: number;
  difficulty: string;
  fitnessGoal: string;
}

const userSchema = new Schema<User>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    age: { type: Number, required: true, min: 13 },
    fitnessGoal: { type: String, required: true },
  },
  { timestamps: true },
);

const teamSchema = new Schema<Team>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
  },
  { timestamps: true },
);

const activitySchema = new Schema<Activity>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    activityType: { type: String, required: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    distanceKm: { type: Number, required: true, min: 0 },
    caloriesBurned: { type: Number, required: true, min: 0 },
    date: { type: Date, required: true },
  },
  { timestamps: true },
);
activitySchema.index({ user: 1, activityType: 1, date: 1 }, { unique: true });

const leaderboardSchema = new Schema<LeaderboardEntry>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    points: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
    period: { type: String, required: true },
  },
  { timestamps: true },
);
leaderboardSchema.index({ user: 1, team: 1, period: 1 }, { unique: true });

const workoutSchema = new Schema<Workout>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    difficulty: { type: String, required: true },
    fitnessGoal: { type: String, required: true },
  },
  { timestamps: true },
);

export const UserModel = mongoose.model<User>('User', userSchema, 'users');
export const TeamModel = mongoose.model<Team>('Team', teamSchema, 'teams');
export const ActivityModel = mongoose.model<Activity>('Activity', activitySchema, 'activities');
export const LeaderboardModel = mongoose.model<LeaderboardEntry>(
  'LeaderboardEntry',
  leaderboardSchema,
  'leaderboards',
);
export const WorkoutModel = mongoose.model<Workout>('Workout', workoutSchema, 'workouts');
