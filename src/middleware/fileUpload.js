//module
const multer = require("multer");

const _fileSize = 1*1024*1024;

const fileUpload = multer({
  storage:multer.memoryStorage(),
  limits:{
      fileSize:_fileSize,
  },
}).single('file');

module.exports = fileUpload;