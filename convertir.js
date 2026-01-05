const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

// 1. Ruta de tu carpeta de imágenes
const directorio = "./images";

// Comprobar si la carpeta existe
if (!fs.existsSync(directorio)) {
  console.error("❌ Error: No se encuentra la carpeta /images");
  process.exit(1);
}

// 2. Leer todos los archivos de la carpeta
fs.readdirSync(directorio).forEach((archivo) => {
  const rutaEntrada = path.join(directorio, archivo);
  const extension = path.extname(archivo).toLowerCase();
  const nombreSinExt = path.parse(archivo).name;

  // Solo procesar fotos PNG, JPG o JPEG
  if ([".png", ".jpg", ".jpeg"].includes(extension)) {
    const rutaSalida = path.join(directorio, `${nombreSinExt}.webp`);

    sharp(rutaEntrada)
      .webp({ quality: 80 }) // Calidad balanceada para Lighthouse
      .toFile(rutaSalida)
      .then((info) => {
        console.log(
          `✅ ${archivo} -> ${nombreSinExt}.webp (${(info.size / 1024).toFixed(
            2
          )} KB)`
        );
      })
      .catch((err) => {
        console.error(`❌ Error en ${archivo}:`, err.message);
      });
  }
});
