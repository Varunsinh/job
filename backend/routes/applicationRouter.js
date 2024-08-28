import express from 'express';
import {employerGetAllApplications,jobSeekerGetAllApplications,jobSeekerDeleteApplication,postApplication} from '../controllers/applicationController.js';
import {isAuthorised} from '../middlewares/auth.js';


const router=express.Router();

router.post("/posted",isAuthorised,postApplication);
router.get("/jobseeker/getall",isAuthorised,jobSeekerGetAllApplications);
router.get("/employer/getall",isAuthorised,employerGetAllApplications);
router.delete("/delete/:id",isAuthorised,jobSeekerDeleteApplication);

export default router;