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

const router = Router();

router.get("/", renderIndex);
router.get("/home",renderH)
router.get("/home/:id", renderHome);

router.get("/empresa", renderEmpresa)

router.post("/add", createEmpresa);

router.get("/update/:id", editEmpresa);
router.post("/update/:id", updateEmpresa);

router.get("/delete/:id", deleteEmpresa);

export default router;