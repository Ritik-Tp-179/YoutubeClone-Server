import likeVideo from "../models/likeVideo.js"
import mongoose from "mongoose"

export const likeVideoController = async(req,res)=>{
    const likeVideoData = req.body;
    // console.log(likeVideoData);

    const addToLikedVideo = new likeVideo(likeVideoData);

    try {
        await addToLikedVideo.save();
        res.status(200).json("Added to likedVideo");
        // console.log("Done");
    } catch (error) {
        res.status(400).json(error);
        console.log(error)
        
    }
}

export const getAlllikeVideoController = async(req,res)=>{
    try {
        const files = await likeVideo.find();
        // console.log(files,"GEtted files") 
        res.status(200).send(files)
    } catch (error) {
        res.status(404).send(error.message)
        console.log(error) 
        
    }
}
export const deleteLikeVideoController = async(req,res)=>{
    const {videoId:videoId,Viewer:Viewer} = req.params;
    // console.log(videoId,Viewer)
    try {
        await likeVideo.findOneAndDelete({
            videoId:videoId,Viewer:Viewer
        })
        res.status(200).json({message: "Removed from watch later"})
    } catch (error) {
        res.status(400).json({message: error.message})
        
    }
}