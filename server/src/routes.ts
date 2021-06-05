import express from "express";
import UserRoutes from './routes/controllerRoutes';

const app = express();

app.use(UserRoutes);

export default app;