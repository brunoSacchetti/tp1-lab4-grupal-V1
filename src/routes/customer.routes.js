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
  createNoticia
} from "../controllers/NoticiaController.js";

const router = Router();

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

router.post("/addNoticia", createNoticia);

//router.get("/updateNoticia/:id", editNoticia);
//router.post("/updateNoticia/:id", updateNoticia);

//router.get("/deleteNoticia/:id", deleteNoticia);


export default router;