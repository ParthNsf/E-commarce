// import {v2 as cloudinary} from 'cloudinary';

const cloudinary = require("cloudinary").v2

   // Configuration
   cloudinary.config({ 
    cloud_name: "dkff50j9r", 
    api_key: "233519867785754", 
    api_secret: "pimF-70qzofIjMjgBroBD2m_MDs"
});

const fileupload = async (path, foldername) => {
    const uploadResult = await cloudinary.uploader.upload(path, {
        folder: foldername
    }).catch((error)=>{console.log(error)});
    
    console.log("result",uploadResult);

    return uploadResult

}

module.exports = fileupload


// (async function() {

 
    
//     // Upload an image
    
    
//     // Optimize delivery by resizing and applying auto-format and auto-quality
//     const optimizeUrl = cloudinary.url("shoes", {
//         fetch_format: 'auto',
//         quality: 'auto'
//     });
    
//     console.log(optimizeUrl);
    
//     // Transform the image: auto-crop to square aspect_ratio
//     const autoCropUrl = cloudinary.url("shoes", {
//         crop: 'auto',
//         gravity: 'auto',
//         width: 500,
//         height: 500,
//     });
    
//     console.log(autoCropUrl);    
// })();