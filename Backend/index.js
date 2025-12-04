import express from "express";
import connectDb from "./db/db.js";
import userRouter from './routes/user.route.js'
import courseRouter from './routes/course.route.js'
import subscriptionRouter from './routes/subscription.route.js'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

connectDb();

app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/auth",userRouter);
app.use("/course",courseRouter);
app.use("/subscription",subscriptionRouter);



app.listen(8000, () => {
  console.log(`listen on 8000`);
});
