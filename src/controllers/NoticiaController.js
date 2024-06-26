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
  } = newNoticia;

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

  await pool.query(sql, [titulo, resumen, editorHtml, publicada_bool, fechaPublicacion, imagen, id]);

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


export const renderDetalleNoticias = async (req, res) => {
  const {
    id
  } = req.params;

  // Obtener los datos de la noticia con el id proporcionado
  const [noticia] = await pool.query("SELECT * FROM noticia WHERE id = ?", [id]);

  // Verificar si se encontró la noticia
  if (noticia.length === 0) {
    // Si no se encontró la noticia, redirigir o mostrar un mensaje de error
    return res.status(404).send("Noticia no encontrada");
  }

  // Obtener los datos de la empresa relacionada con la noticia
  const sqlEmpresa = 'SELECT * FROM empresa WHERE id = ?';
  const [empresa] = await pool.query(sqlEmpresa, [noticia[0].idEmpresa]);

  // Verificar si se encontró la empresa
  if (empresa.length === 0) {
    // Si no se encontró la empresa, mostrar un mensaje de error
    return res.status(404).send("Empresa no encontrada");
  }

  // Renderizar la vista "detalle" y pasar los datos de la noticia y la empresa a la vista
  res.render("detalle", {
    noticia: noticia[0],
    empresa: empresa[0]
  });
};


export const renderBuscadorNoticias = async (req, res) => {
  const idEmpresa = req.params.id;
  const sqlEmpresa = 'SELECT id, denominacion FROM empresa';
  const sqlNoticias = 'SELECT id, titulo, resumen, publicada, fechaPublicacion FROM noticia';

  const [empresa] = await pool.query(sqlEmpresa);
  const [noticias] = await pool.query(sqlNoticias);
  res.render("buscador", {
    empresa: empresa, // Solo toma el primer elemento del resultado, ya que esperamos solo una empresa con ese ID
    noticia: noticias
  });
};

export async function searchController(req, res) {
  const query = req.query.query;
  const searchTerm = `%${query}%`; // Texto de búsqueda con comodines para coincidencia parcial
  const limit = 20; // Límite de noticias por página

  try {
    // Consulta para buscar noticias por título o resumen y ordenarlas por fecha de publicación
    const sqlNoticia = `
      SELECT * FROM noticia 
      WHERE titulo LIKE ? OR resumen LIKE ? 
      ORDER BY fechaPublicacion DESC
      LIMIT ?`;
    const [noticias] = await pool.query(sqlNoticia, [searchTerm, searchTerm, limit]);

    // Array para almacenar las consultas de empresas
    const empresasPromises = noticias.map(async (noticia) => {
      const sqlEmpresa = 'SELECT * FROM empresa WHERE id = ?';
      const [empresa] = await pool.query(sqlEmpresa, [noticia.idEmpresa]);
      return empresa[0]; // Obtenemos el primer resultado de la consulta ya que esperamos solo una empresa con ese ID
    });

    // Esperar a que se completen todas las consultas de empresa
    const empresas = await Promise.all(empresasPromises);

    // Renderizar la vista con los resultados de la búsqueda y la información de la empresa asociada a cada noticia
    res.render("buscador", {
      noticias: noticias,
      empresas: empresas, // Array de objetos de empresa
      query: query
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
}