import express from "express";
import bodyParser from "body-parser";
import route from "./route";
import db from "./database";
import cors from "cors";

const port = 4000;
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/fruit", route.getFruit);
app.get("/", route.getRoot);
app.get("/pegawai", db.getPegawai);
app.post("/pegawai", db.createPegawai);
app.delete("/pegawai/:nip", db.deletePegawai);
app.put("/pegawai/:nip", db.updatePegawai);
app.get("/pegawai/search", db.searchPegawai);

app.listen(port, () => {
  console.log("web server jalan di PORT " + port);
});
