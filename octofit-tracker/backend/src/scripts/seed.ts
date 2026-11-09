import mongoose from 'mongoose';
import { connectDatabase } from '../config/database';
import {
  ActivityModel,
  LeaderboardModel,
  TeamModel,
  UserModel,
  WorkoutModel,
} from '../models';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await connectDatabase();

    const userData = [
      { name: 'Avery Chen', email: 'avery.chen@example.com', age: 29, fitnessGoal: 'Build endurance' },
      { name: 'Jordan Rivera', email: 'jordan.rivera@example.com', age: 34, fitnessGoal: 'Improve strength' },
      { name: 'Morgan Patel', email: 'morgan.patel@example.com', age: 26, fitnessGoal: 'Stay active' },
      { name: 'Riley Brooks', email: 'riley.brooks@example.com', age: 31, fitnessGoal: 'Build endurance' },
    ];
    const users = await Promise.all(
      userData.map(({ email, ...data }) =>
        UserModel.findOneAndUpdate(
          { email },
          { $set: { email, ...data } },
          { upsert: true, returnDocument: 'after', runValidators: true },
        ),
      ),
    );

    const teamData = [
      {
        name: 'Morning Movers',
        description: 'A friendly team building a consistent morning routine.',
        members: [users[0]._id, users[1]._id],
      },
      {
        name: 'Trail Blazers',
        description: 'A group focused on outdoor cardio and weekend hikes.',
        members: [users[2]._id, users[3]._id],
      },
    ];
    const teams = await Promise.all(
      teamData.map(({ name, ...data }) =>
        TeamModel.findOneAndUpdate(
          { name },
          { $set: { name, ...data } },
          { upsert: true, returnDocument: 'after', runValidators: true },
        ),
      ),
    );

    const activities = [
      {
        user: users[0]._id,
        team: teams[0]._id,
        activityType: 'running',
        durationMinutes: 32,
        distanceKm: 5.2,
        caloriesBurned: 360,
        date: new Date('2026-11-07T07:30:00.000Z'),
      },
      {
        user: users[1]._id,
        team: teams[0]._id,
        activityType: 'cycling',
        durationMinutes: 45,
        distanceKm: 14.5,
        caloriesBurned: 410,
        date: new Date('2026-11-08T08:00:00.000Z'),
      },
      {
        user: users[2]._id,
        team: teams[1]._id,
        activityType: 'hiking',
        durationMinutes: 60,
        distanceKm: 6.8,
        caloriesBurned: 480,
        date: new Date('2026-11-08T09:00:00.000Z'),
      },
      {
        user: users[3]._id,
        team: teams[1]._id,
        activityType: 'running',
        durationMinutes: 28,
        distanceKm: 4.4,
        caloriesBurned: 315,
        date: new Date('2026-11-09T06:45:00.000Z'),
      },
    ];
    await Promise.all(
      activities.map(({ user, activityType, date, ...data }) =>
        ActivityModel.findOneAndUpdate(
          { user, activityType, date },
          { $set: { user, activityType, date, ...data } },
          { upsert: true, returnDocument: 'after', runValidators: true },
        ),
      ),
    );

    const leaderboardEntries = [
      { user: users[0]._id, team: teams[0]._id, points: 860, rank: 1, period: '2026-11' },
      { user: users[1]._id, team: teams[0]._id, points: 740, rank: 2, period: '2026-11' },
      { user: users[2]._id, team: teams[1]._id, points: 920, rank: 1, period: '2026-11' },
      { user: users[3]._id, team: teams[1]._id, points: 680, rank: 2, period: '2026-11' },
    ];
    await Promise.all(
      leaderboardEntries.map(({ user, team, period, ...data }) =>
        LeaderboardModel.findOneAndUpdate(
          { user, team, period },
          { $set: { user, team, period, ...data } },
          { upsert: true, returnDocument: 'after', runValidators: true },
        ),
      ),
    );

    const workoutData = [
      {
        name: 'Steady 5K Run',
        description: 'A conversational-pace run to build aerobic endurance.',
        category: 'cardio',
        durationMinutes: 35,
        difficulty: 'beginner',
        fitnessGoal: 'Build endurance',
      },
      {
        name: 'Full-Body Strength',
        description: 'A balanced circuit of bodyweight strength exercises.',
        category: 'strength',
        durationMinutes: 40,
        difficulty: 'intermediate',
        fitnessGoal: 'Improve strength',
      },
      {
        name: 'Mobility and Recovery',
        description: 'Gentle mobility work and stretching for active recovery.',
        category: 'flexibility',
        durationMinutes: 20,
        difficulty: 'beginner',
        fitnessGoal: 'Stay active',
      },
    ];
    await Promise.all(
      workoutData.map(({ name, ...data }) =>
        WorkoutModel.findOneAndUpdate(
          { name },
          { $set: { name, ...data } },
          { upsert: true, returnDocument: 'after', runValidators: true },
        ),
      ),
    );

    console.log(
      `Database seeding complete: ${users.length} users, ${teams.length} teams, ` +
        `${activities.length} activities, ${leaderboardEntries.length} leaderboard entries, ` +
        `${workoutData.length} workouts.`,
    );
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

void seedDatabase();
