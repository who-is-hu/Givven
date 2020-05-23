const express = require('express');
var router = express.Router();
const imgUploader = require('../utils/imageUploader');
//비동기 이미지 업로드 ex ) 본문 속 이미지 미리보기 기능 대비하여 만듦

router.post('/', imgUploader.single('title_img'), (req, res) => {
    //console.log(req.file);
    res.json({ url : `/uploads/${req.file.filename}`});
});

module.exports = router;