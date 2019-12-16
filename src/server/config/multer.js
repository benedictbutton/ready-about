const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");

aws.config.update({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region: "us-east-1"
});

const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    acl: "public-read",
    bucket: "ready-about",
    key: function(req, file, cb) {
      console.log(file);
      cb(null, file.fieldname + "-" + Date.now()); //use Date.now() for unique file keys
    }
  })
});

module.exports = upload;
