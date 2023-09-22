import videoFiles from "../models/videoFiles.js"
export const uploadVideo=async(req,res,next)=>{
    if(req.file === undefined){
        res.status(404).json({message:"Plz upload .mp4 video only"})
    }
    else{
        try {
            console.log(req.body)
            console.log(req.file)
            const file = new videoFiles({
                videoTitle:req.body.title,
                fileName: req.file.originalname,
                filePath: req.file.path,
                fileType: req.file.mimetype,
                fileSize: req.file.size,
                videoChanel: req.body.chanel,
                Uploader: req.body.uploader,
            })

            // console.log(req.body.uploader);
            await file.save()
            res.status(201).send("File Uploaded successfully")
        } catch (error) {
            // console.log(error);
            res.status(400).send(error.message)
        }
    }
}

export const getAllvideos = async(req,res)=>{
    try {
        const files = await videoFiles.find();
        // console.log(files,"GEtted files") 
        res.status(200).send(files)
    } catch (error) {
        res.status(404).send(error.message)
        // console.log(error) 
        
    }
}