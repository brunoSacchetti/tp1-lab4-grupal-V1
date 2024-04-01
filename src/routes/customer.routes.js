import {
  Router
} from "express";
import {
  createEmpresa,
  deleteEmpresa,
  editEmpresa,
  renderIndex,
  updateEmpresa,
  renderH,
  renderEmpresa,
  renderHome
 
} from "../controllers/EmpresaController.js";
import {
  renderNoticia,
  createNoticia,
  editNoticia,
  updateNoticia,
  deleteNoticia
} from "../controllers/NoticiaController.js";

const multer  = require('multer');

const router = Router();

const storage = multer.diskStorage({
  destination:function (req,file,callback){
  callback(null,"public/images");
  },
  filename:function (req,file,callback){
      callback(null,file.fieldname + Date.now() + "image" + path.extname(file.originalname));
  }
});
const upload = multer({storage: storage});

upload.single("file-image-user");

router.get("/", renderIndex);
router.get("/home",renderH)
router.get("/home/:id", renderHome);

router.get("/empresa", renderEmpresa)

router.post("/add", createEmpresa);

router.get("/update/:id", editEmpresa);
router.post("/update/:id", updateEmpresa);

router.get("/delete/:id", deleteEmpresa);

//RUTAS - NOTICIA

router.get("/noticia", renderNoticia);

router.post("/addNoticia",upload.single("imagen"),createNoticia);

router.get("/updateNoticia/:id", editNoticia);
router.post("/updateNoticia/:id", updateNoticia);

router.get("/deleteNoticia/:id", deleteNoticia);


export default router;