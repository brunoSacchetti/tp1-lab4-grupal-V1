import { Router } from "express";
import {
  createCustomers,
  deleteCustomer,
  editCustomer,
  renderCustomers,
  updateCustomer,
  renderHome
} from "../controllers/customerController.js";

const router = Router();

router.get("/", renderCustomers);
router.post("/add", createCustomers);
router.get("/home", renderHome); // Agregar esta línea para la ruta "/home"
router.get("/update/:id", editCustomer);
router.post("/update/:id", updateCustomer);
router.get("/delete/:id", deleteCustomer);

export default router;