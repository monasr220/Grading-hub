import express from "express";
import path from "path";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
    destination : (req, file , cb)=>{
        cb(null , "uploads/")
    },
    filename :(req , file  , cb)=>{
        const extname = path.extname(file.originalname);
        cb(null , `${file.fieldname}-${Date.now()}${extname}`);

    },

});

const fileFilter = (req ,file , cb)=>{
    const filetypes = /\.(pdf|docx)$/i;
    const mimetypes = /application\/pdf|application\/vnd\..+wordprocessingml/i;


    const extname = filetypes.test(path.extname(file.originalname));
    const mimetype = mimetypes.test(file.mimetype);

    if(filetypes&& mimetype){
        cb(null , true);

    }
    else{
        cb(new Error("pdf or docx only")  , false);
    }
};

const upload = multer({storage  , fileFilter , limits: {fileSize: 10* 1024 * 1024}});
const uploadSingleDoc= upload.single("doc");

router.post("/" ,(req , res)=>{
    uploadSingleDoc(req , res , (err)=>{
        if(err){
            res.status(400).send({message : err.message});
        }
        else if (req.file){
            res.status(200).send({
                message:"Doc uploaded successfully",
                doc : `${req.file.path}`,
            });

        }
        else{
            res.status(400).send({message:"No file provided"});
        }
    })
});
export default router