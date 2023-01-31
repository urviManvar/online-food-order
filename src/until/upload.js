import fs from "fs";
import AWS from 'aws-sdk';

 
// export const uploadFile = (productId, file) => {
//     const path = `./uploads/${productId}`;
//     if (!fs.existsSync(path)) {
//       fs.mkdirSync(path, { recursive: true });
//     }
//     const imagePath = `/uploads/${productId}/${file.name}`;
//     file.mv(`./uploads/${productId}/${file.name}`, (err) => {
//       if (err) {
//         return err;
//       }
//     })
//     return imagePath;

//     imageData.push({
//         path: `/uploads/${productId}/${image.name}`,
//         productId: productId,
//       });
// };

import { Console } from "console";

 const fileUpload = (image,id) =>{
    const data = `./upload/`;

    if(!fs.existsSync(data)){
        fs.mkdirSync(data,{recursive:true});
    }
    image.mv(data+ image.name,(error) =>{
        if(error){
            throw new Error (error.message ||error)
        }
    })
    return {imagepath:`upload/${image.name}`}
}





const  uploadFile = async (req) => {
    
  // const fileName1 = fs.readFileSync(fileName)
  //     console.log("fileName1",fileName1)
   const params = {
         Bucket: 'buketName', 
         Key: "fileName.jpg", 
         Body:req.files.image.data,
         Metadata:{"Content-Type":"image/png"},

      //    ContentType:image/jpeg,
         ACL:"public-read"
     };
  //    console.log("AA",params)
    let data = await s3.upload(params).promise()
    return data.Location;
  };
export {uploadFile,fileUpload}
