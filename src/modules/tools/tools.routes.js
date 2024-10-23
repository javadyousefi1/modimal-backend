// multer
const multer = require('multer');
const sharp = require('sharp');
// router
const router = require("express").Router();
// Configure multer storage
const { ToolsController } = require('./tools.controller')
// Set up Multer for file uploads
const storage = multer.memoryStorage();

const maxSize = 5048576;


const upload = multer({
  storage: storage, limits: {
      fileSize: maxSize
  }, fileFilter: function (req, file, cb) {
      if (file.mimetype.startsWith("image/")) {
          cb(null, true);
      } else {
          cb(new Error('Invalid file type just accept image types !'), false);
      }
  }
});

router.post('/decrease-image-resolution', upload.single('image'), ToolsController.decreaseImageResolution);

module.exports = {
  toolsRoutes: router
}

