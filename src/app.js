import express from "express";
import path from "path";
import morgan from "morgan";
import methodOverride from 'method-override';
import bodyParser from 'body-parser';
import customerRoutes from "./routes/customer.routes.js";
import {
  fileURLToPath
} from "url";

const app = express();
app.use(express.json())
// Configurar body-parser para analizar solicitudes application/x-www-form-urlencoded
app.use(express.urlencoded({
  extended: false
})); //Esto es para formData



const __dirname = path.dirname(fileURLToPath(
  import.meta.url));

app.use(methodOverride('_method'));
// settings
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({
  extended: false
}));

// routes
app.use(customerRoutes);

// static files
app.use(express.static(path.join(__dirname, "public")));

// starting the server
export default app;