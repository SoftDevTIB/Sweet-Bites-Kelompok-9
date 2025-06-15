const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');  // pastikan folder 'uploads/' ada di root project
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // beri nama file unik
  }
});

const upload = multer({ storage: storage });

module.exports = upload;
