
const port = 3000;
const app=require("./app")
const mongoose= require("mongoose");
const urlMongoDb= "mongodb+srv://ivansosatovar:Joinme666@api-udemy.ocq7ci9.mongodb.net/?retryWrites=true&w=majority"

async function connectToDatabase() {
  try {
    await mongoose.connect(urlMongoDb, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("La conexión a la base de datos es exitosa");

    app.listen(port, () => {
      console.log("El servidor está en funcionamiento en http://localhost:" + port);
    });
  } catch (err) {
    console.error("Error de conexión a la base de datos: " + err);
  }
}

connectToDatabase();