const multer = require("multer");

const storage = multer.diskStorage({
    destination: "./public/img/cartella_img/",
    filename: (req,file,cb) => {
        const uniqueName = `${Date.now()}-`
    }
})