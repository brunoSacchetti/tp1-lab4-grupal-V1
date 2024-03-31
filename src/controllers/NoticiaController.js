import {
    pool
} from "../db.js";

export const renderNoticia = async (req, res) => {
    const [noticias] = await pool.query("SELECT * FROM noticia");
    res.render("administrarNoticia", {
      noticia: noticias
    });
};

export const createNoticia = async (req, res) => {
    const newNoticia = req.body;
    const {
        titulo,
        resumen,
        editorHtml,
        publicada,
        fechaPublicacion,
        imagen
        //const selectedOption: selectElement.options[selectElement.selectedIndex], 
        //const idEmpresa = selectedOption.dataset.id,
    }= newNoticia;
  
    const sql = "INSERT INTO noticia (titulo, resumen, contenidoHtml, publicada, fechaPublicacion, imagen) VALUES (?, ?, ?, ?, ?, ?)";
  
    await pool.query(sql, [titulo, resumen, editorHtml, publicada, fechaPublicacion, imagen]);
  
    res.redirect("/noticia");
  };