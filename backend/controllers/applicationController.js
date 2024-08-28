import {catchAsyncError} from '../middlewares/catchAsyncError.js';
import ErrorHandler from '../middlewares/error.js';
import {Application} from "../models/applicationSchema.js";
import cloudinary from 'cloudinary';
import {Job} from '../models/jobSchema.js';


export const postApplication=catchAsyncError(async(req,res,next)=>{
    const {role} = req.user;
    if(role === "Employer"){
        return next(new ErrorHandler("Employer is  not allowed to access this resources",400));
    }

    if (!req.files || Object.keys(req.files).length === 0)
    {
        return next(new ErrorHandler("Resume file required!"));
    }

    const {resume}=req.files;

    const allowedFormats=["image/png","image/jpeg","image/webp"];

    if(!allowedFormats.includes(resume.mimetype))
        {
        return next(new ErrorHandler("Invalid file format! Please upload a valid type(png/jpg/webp)",400));

    }

    const cloudinaryResponce=await cloudinary.uploader.upload(
        resume.tempFilePath,
    );
    if(!cloudinaryResponce || cloudinaryResponce.error)
    {
        console.error("cloudinary error:",cloudinaryResponce.error || "unknown error");

        return next(new ErrorHandler("FAILED TO UPLOAD.",500));
    }

    const {name,email,coverletter,phone,address,jobId}=req.body;
    const applicantID={
        user: req.user._id,
        role:"Job Seeker"
    };
    if(!jobId){
        return next(new ErrorHandler("Job not found!",404));
    }
    const jobDetails=await Job.findById(jobId);
    if(!jobDetails){
        return next(new ErrorHandler("Job not found!",404));
    }

    const employerID={
        user:jobDetails.postedBy,
        role:"Employer",
    };
    if(!name || !email || !coverletter || !phone || !address || !applicantID || !employerID || !resume){
        return next(new ErrorHandler("All fields are required!",400));
    }

    const application =await Application.create({
        name , email, coverletter ,phone, address , applicantID , employerID , resume:{

            public_id:cloudinaryResponce.public_id,
            url:cloudinaryResponce.secure_url,
        },
    });

    res.status(200).json({
        success:true,
        message:"Application submitted!",
        application,
    });

});
    


export const employerGetAllApplications =catchAsyncError(async(req,res,next)=>{
    const {role} = req.user;
    if(role === "Job Seeker"){
        return next(new ErrorHandler("Job seeker is not allowed to access this resources",400));
    }

    const {_id}=req.user;
    const applications=await Application.find({'employerID.user':_id});
    res.status(200).json({
        success:true,
        applications 
    });

})

export const jobSeekerGetAllApplications =catchAsyncError(async(req,res,next)=>{
    const {role} = req.user;
    if(role === "Employer"){
        return next(new ErrorHandler("Employer is  not allowed to access this resources",400));
    }

    const {_id}=req.user;
    const applications=await Application.find({'applicantID.user':_id});
    res.status(200).json({
        success:true,
        applications 
    });

});

export const jobSeekerDeleteApplication=catchAsyncError(async(req,res,next)=>{
    const {role} = req.user;
    if(role === "Employer"){
        return next(new ErrorHandler("Employer is  not allowed to access this resources",400));
    }

    const { id }=req.params;
    const application=await Application.findById(id);
    if(!application){
        return next(new ErrorHandler("Application not found",404));
    }
    await application.deleteOne();
    res.status(200).json({
        success:true,
        message:"Application deleted succesfully!!",
    });
});