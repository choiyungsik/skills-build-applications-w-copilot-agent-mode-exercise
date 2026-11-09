import cors from 'cors';
import express from 'express';
import { connectDatabase } from './config/database';
import {
  ActivityModel,
  LeaderboardModel,
  TeamModel,
  UserModel,
  WorkoutModel,
} from './models';

const app = express();
const port = Number(process.env.PORT ?? 8000);
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(cors());
app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' });
});

app.get('/api/users/', async (_request, response) => {
  response.json(await UserModel.find().lean());
});

app.get('/api/teams/', async (_request, response) => {
  response.json(await TeamModel.find().lean());
});

app.get('/api/activities/', async (_request, response) => {
  response.json(await ActivityModel.find().lean());
});

app.get('/api/leaderboard/', async (_request, response) => {
  response.json(await LeaderboardModel.find().sort({ rank: 1, points: -1 }).lean());
});

app.get('/api/workouts/', async (_request, response) => {
  response.json(await WorkoutModel.find().lean());
});

app.use(
  (error: unknown, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
    console.error('API request failed:', error);
    response.status(500).json({ error: 'Internal server error' });
  },
);

async function startServer() {
  try {
    await connectDatabase();
    app.listen(port, '0.0.0.0', () => {
      console.log(`OctoFit API listening on port ${port}: ${baseUrl}`);
    });
  } catch (error) {
    console.error('Unable to start OctoFit API:', error);
    process.exitCode = 1;
  }
}

void startServer();