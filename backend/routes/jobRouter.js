import express from 'express';
import { getAllJobs,getmyJobs,postJob,updateJob,deleteJob, getSinglejob } from '../controllers/jobController.js';
import {isAuthorised} from '../middlewares/auth.js';


const router=express.Router();

router.get("/getall",getAllJobs);
router.post("/post",isAuthorised,postJob);
router.get("/getmyjobs",isAuthorised,getmyJobs);
router.put("/update/:id",isAuthorised,updateJob);
router.delete("/delete/:id",isAuthorised,deleteJob);
router.get("/:id",isAuthorised,getSinglejob);



export default router;