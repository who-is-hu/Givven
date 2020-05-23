var express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const { isLoggedIn } = require('./middlewares');
var router = express.Router();

fs.readdir('uploads', (err) => {
    if(err){
        console.error('uploads 폴더가 없어서 생성');
        fs.mkdirSync('uploads');
    }
});
const upload = multer({
    storage : multer.diskStorage({
        destination(req, file, cb){
            cb(null, 'uploads/');
        },
        filename(req, file, cb){
            const ext = path.extname(file.originalname);
            cb(null, path.basename(file.originalname, ext) + new Date().valueOf() +ext);
        },
    }),
    limits : { fileSize : 5 * 1024 * 1024},
});
router.post('/', isLoggedIn, upload.single('img'), (req, res) => {
    console.log(req.file);
    res.json({ url : `/uploads/${req.file.filename}`});
});

module.exports = router;