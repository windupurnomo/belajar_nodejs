import { Pool } from "pg";

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "bakamla",
  password: "admin123",
  port: 5432
});

const param = {
  getPegawai: (req, res) => {
    const q =
      "select nip, name, phone, email, birth_date, address, department_id from pegawai";
    pool.query(q, (error, result) => {
      if (error) {
        throw error;
      }
      res.json(result.rows);
    });
  },
  createPegawai: (req, res) => {
    const { nip, name, phone, email, birthDate, address } = req.body;
    const param = [nip, name, phone, email, birthDate, address];
    const q = `insert into pegawai
    (nip, name, phone, email, birth_date, address) 
    values ($1, $2, $3, $4, $5, $6)`;
    pool.query(q, param, (error, result) => {
      if (error) res.status(500).send(error);
      else res.status(200).send("sukses");
    });
  },
  deletePegawai: (req, res) => {
    const nip = req.params.nip;
    pool.query("delete from pegawai where nip = $1", [nip], (error, result) => {
      if (error) res.status(500).send(error);
      else res.status(200).send("sukses");
    });
  },
  updatePegawai: (req, res) => {
    const nip = req.params.nip;
    const { name, email, phone, address } = req.body;
    const params = [name, email, phone, address, nip];
    const q = `update pegawai set name = $1, email = $2, 
      phone = $3, address = $4 where nip = $5`;
    pool.query(q, params, (error, result) => {
      if (error) res.status(500).send(error);
      else res.status(200).send("sukses");
    });
  },
  searchPegawai: (req, res) => {
    const keyword = "%" + req.query.keyword.toLowerCase() + "%";
    console.log(keyword);
    const q = `select * from pegawai where 
    lower(nip) like $1 or 
    lower(name) like $2 or 
    lower(address) like $3`;
    pool.query(q, [keyword, keyword, keyword], (error, result) => {
      console.log(error);
      if (error) res.status(500).send(error);
      else res.status(200).json(result.rows);
    });
  }
};

export default param;
