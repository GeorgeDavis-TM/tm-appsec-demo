var express = require('express');
var router = express.Router();

var multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})

var upload = multer({ storage: storage });

const s3Client = require('../services/s3/s3.js');
const fileClient = require('../services/file-storage/file-storage.js');
// const azBlobCient = require('../services/azure-blob/azure-blob.js');

router.post('/fileUploadToS3', function(req, res, next) {
  return s3Client.uploadFile(req.body.upload).then (function (result) {
    res.send('File Uploaded. Thank you.');
  }, function (err) {
    res.send('Upload failed. Try again.');
  });
});

router.post('/fileUploadToServer', upload.single('upload'), (req, res, next) => {
  const file = req.file
  if (!file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)
  }
    res.json(file);
  
})

/*
 * router.post('/fileUploadToServer', function(req, res, next) {
  //console.log(req.body);
  //console.log(req.body);
  //console.log(req.body.upload);
  return fileClient.uploadFile(req, res).then (function (result) {
    res.send('File Uploaded. Thank you.');
  }, function (err) {
    console.log(err);
    res.send('Upload failed. Try again.');
  });
});
*
*/

// router.post('/fileUploadToAzBlob', function(req, res, next) {
//   if(azBlobClient.uploadFile(req.body.upload)) {
//     res.send('File Uploaded. Thank you.');
//     console.log("File Uploaded");
//   };
//   res.send('Upload failed. Try again.');
// });

module.exports = router;
