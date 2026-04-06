import ImageKit from "imagekit";

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT!,
});


export const uploadToImagekit=async(file:File)=>{
    const bytes= await file.arrayBuffer();
    const buffer=Buffer.from(bytes);

    try {
        const response = await imagekit.upload({
            file:buffer,
            fileName:file.name,
            folder:"/evenly"
        })

        return response.url
    } catch (error: any) {
        console.log("there is an error while uploading image",error.message);
        
    }
}
export default uploadToImagekit;