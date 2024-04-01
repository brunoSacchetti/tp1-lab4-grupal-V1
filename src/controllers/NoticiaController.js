import {
    pool
} from "../db.js";

export const renderNoticia = async (req, res) => {
    const idEmpresa = req.params.id;
    const sqlEmpresa = 'SELECT id, denominacion FROM empresa';
    const sqlNoticias = 'SELECT id, titulo, resumen, publicada, fechaPublicacion FROM noticia';
  
    const [empresa] = await pool.query(sqlEmpresa);
    const [noticias] = await pool.query(sqlNoticias);
    res.render("administrarNoticia", {
      empresa: empresa, // Solo toma el primer elemento del resultado, ya que esperamos solo una empresa con ese ID
      noticia: noticias
    });
};

export const createNoticia = async (req, res) => {
    const newNoticia = req.body;
    const {
        titulo,
        resumen,
        editorHtml,
        publicada_bool,
        fechaPublicacion,
        imagen,
        idEmpresa
    }= newNoticia;

    const sql = "INSERT INTO noticia (titulo, resumen, contenidoHtml, publicada, fechaPublicacion, imagen, idEmpresa) VALUES (?, ?, ?, ?, ?, ?,?)";
  
    await pool.query(sql, [titulo, resumen, editorHtml, publicada_bool, fechaPublicacion, imagen, idEmpresa]);
  
    res.redirect("/noticia");
  };

