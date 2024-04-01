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
        idEmpresa
    }= newNoticia;

    const imagen = req.file.filename;

    const sql = "INSERT INTO noticia (titulo, resumen, contenidoHtml, publicada, fechaPublicacion, imagen, idEmpresa) VALUES (?, ?, ?, ?, ?, ?,?)";
  
    await pool.query(sql, [titulo, resumen, editorHtml, publicada_bool, fechaPublicacion, imagen, idEmpresa]);
  
    res.redirect("/noticia");
  };
 
export const editNoticia = async (req, res) => {
    const {
      id
    } = req.params;
    const [result] = await pool.query("SELECT * FROM noticia WHERE id = ?", [
      id,
    ]);
    res.render("noticia_edit", {
        noticia: result[0]
    });
};

export const updateNoticia = async (req, res) => {
    const {
      id
    } = req.params;
    const updatedNoticia = req.body;
    const {
        titulo,
        resumen,
        editorHtml,
        publicada_bool,
        fechaPublicacion,
        imagen,
    } = updatedNoticia;
  
    const sql = "UPDATE noticia SET titulo = ?, resumen = ?, contenidoHtml = ?, publicada = ?, fechaPublicacion = ?, imagen = ? WHERE id = ?";
  
    await pool.query(sql, [titulo,resumen,editorHtml,publicada_bool,fechaPublicacion,imagen,id]);
  
    res.redirect("/noticia");
  };

  export const deleteNoticia = async (req, res) => {
    const {
      id
    } = req.params;
    const result = await pool.query("DELETE FROM noticia WHERE id = ?", [id]);
    if (result.affectedRows === 1) {
      res.json({
        message: "Noticia borrada"
      });
    }
    res.redirect("/noticia");
  };