const fs = require('fs');
const path = require('path');
const multer = require('multer');

fs.readdir('uploads', (err) => {
    if(err){
        console.error('uploads 폴더가 없어서 생성');
        fs.mkdirSync('uploads');
    }
});
const uploader = multer({
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

module.exports = uploader;