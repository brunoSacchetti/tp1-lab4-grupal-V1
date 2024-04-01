import {
  pool
} from "../db.js";


export const renderIndex = async (req, res) => {
  const [empresas] = await pool.query("SELECT * FROM empresa");
  res.render("index", {
    empresas: empresas
  });
};


export const renderEmpresa = async (req, res) => {
  const [empresas] = await pool.query("SELECT * FROM empresa");
  res.render("administrarEmpresa", {
    empresa: empresas
  });
};

export const renderH = async (req, res) => {
  const [empresas] = await pool.query("SELECT * FROM empresa");
  res.render("home", {
    empresa: empresas
  });
};


export const renderHome = async (req, res) => {
  const idEmpresa = req.params.id;
  const sqlEmpresa = 'SELECT id, denominacion FROM empresa WHERE id = ?';
  const sqlNoticias = 'SELECT id, titulo, resumen, publicada, fechaPublicacion FROM noticia WHERE idEmpresa = ?';

  const [empresa] = await pool.query(sqlEmpresa, [idEmpresa]);
  const [noticias] = await pool.query(sqlNoticias, [idEmpresa]);
  res.render("home", {
    empresa: empresa[0], // Solo toma el primer elemento del resultado, ya que esperamos solo una empresa con ese ID
    noticias: noticias
  });
}

export const createEmpresa = async (req, res) => {
  const newEmpresa = req.body;
  const {
    denominacion,
    telefono,
    horario,
    quienesSomos,
    latitud,
    longitud,
    domicilio,
    email
  } = newEmpresa;

  const sql = "INSERT INTO empresa (denominacion, telefono, horarioAtencion, quienesSomos, latitud, longitud, domicilio, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

  await pool.query(sql, [denominacion, telefono, horario, quienesSomos, latitud, longitud, domicilio, email]);

  res.redirect("/empresa");
};

export const editEmpresa = async (req, res) => {
  const {
    id
  } = req.params;
  const [result] = await pool.query("SELECT * FROM empresa WHERE id = ?", [
    id,
  ]);
  res.render("empresa_edit", {
    empresa: result[0]
  });
};

export const updateEmpresa = async (req, res) => {
  const {
    id
  } = req.params;
  const updatedEmpresa = req.body;
  const {
    denominacion,
    telefono,
    horario,
    quienesSomos,
    latitud,
    longitud,
    domicilio,
    email
  } = updatedEmpresa;

  const sql = "UPDATE empresa SET denominacion = ?, telefono = ?, horarioAtencion = ?, quienesSomos = ?, latitud = ?, longitud = ?, domicilio = ?, email = ? WHERE id = ?";

  await pool.query(sql, [denominacion, telefono, horario, quienesSomos, latitud, longitud, domicilio, email, id]);

  res.redirect("/empresa");
};

export const deleteEmpresa = async (req, res) => {
  const {
    id
  } = req.params;
  const result = await pool.query("DELETE FROM empresa WHERE id = ?", [id]);
  if (result.affectedRows === 1) {
    res.json({
      message: "Empresa borrada"
    });
  }
  res.redirect("/empresa");
};