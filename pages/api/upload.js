var cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const config = {
  api: {
    bodyParser: {
      sizeLimit: "200mb",
    },
  },
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    console.log("bakend begins...");
    // Process a POST request
    let response = "";
    try {
      let fileStr = req.body.data;
      console.log("backend received");

      response = await cloudinary.uploader.upload_large(fileStr, {
        resource_type: "video",
        chunk_size: 6000000,
      });
      // uploaded_url = uploadedResponse.secure_url;
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ error: "Something wrong" });
    }

    res.status(200).json(response);
  }
}
