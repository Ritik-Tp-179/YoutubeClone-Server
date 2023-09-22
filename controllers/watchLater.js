import watchLater from "../models/watchLater.js"
import mongoose from "mongoose"

export const watchLaterController = async(req,res)=>{
    const watchLaterData = req.body;
    // console.log(watchLaterData);

    const addTowatchLater = new watchLater(watchLaterData);

    try {
        await addTowatchLater.save();
        res.status(200).json("Added to watchLater");
        // console.log("Done");
    } catch (error) {
        res.status(400).json(error);
        console.log(error)
        
    }
}

export const getAllwatchLaterController = async(req,res)=>{
    try {
        const files = await watchLater.find();
        // console.log(files,"GEtted files") 
        res.status(200).send(files)
    } catch (error) {
        res.status(404).send(error.message)
        // console.log(error) 
        
    }
}

export const deletewatchLaterController = async(req,res)=>{
    const {videoId:videoId,Viewer:Viewer} = req.params;
    console.log("/../",videoId,Viewer)
    try {
        await watchLater.findOneAndDelete({
            videoId:videoId,Viewer:Viewer
        })

        console.log("deleted")
        res.status(200).json({message: "Removed from watch later"})
    } catch (error) {
        res.status(400).json({message: error.message})
        
    }
}

