const express = require("express");
const router = require("./todoRoutes");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const cloudinary = require("cloudinary").v2;

// Configuration
cloudinary.config({
  cloud_name: "lgbnx4a2",
  api_key: "667525967743184",
  api_secret: "XYwKofeuhGkAj8IxmcrBCnFdM_c",
});

router.post("/", upload.single("avatar"), async (req, res) => {
  // Upload an image
  const uploadResult = await cloudinary.uploader
    .upload(req.file.path)
    .catch((error) => {
      console.log(error);
    });

  res.status(201).json({
    message: "Image Uploaded",
    url: uploadResult.url,
  });
});

router.delete("/delete-image/:id", async (req, res) => {
  let { id } = req.params;
  const deleteResult = await cloudinary.uploader.destroy(id).catch((error) => {
    console.log(error);
  });
  res.send(deleteResult);
});

module.exports = router;
