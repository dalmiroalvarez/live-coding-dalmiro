import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

// Configurar __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta del archivo .md
const filePath = path.join(`C:/Users/DCAC_usuario/Desktop/live-coding-dalmiro/assets`, "text.md");

import readline from "readline";

// Función para solicitar el nombre del archivo al usuario
async function askFileName() {
   const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question("Ingresa el nombre del archivo a analizar: ", (readMarkdownFile) => {
      rl.close();
      resolve(readMarkdownFile);
    });
  });
}

// Función para leer el archivo y tokenizar las palabras
async function readAndAnalyzeFile(readMarkdownFile) {
  try {
    // Leer el contenido del archivo
    const data = await fs.readFile(readMarkdownFile, "utf8");

    // Tokenizar en palabras (ignorando puntuación y convirtiendo a minúsculas)
    const words = data
      .toLowerCase()
      .replace(/[^\w\s]/g, "") // Eliminar puntuación
      .split(/\s+/); // Dividir por espacios en blanco

    // Calcular la frecuencia de cada palabra
    const frequencyMap = {};
    for (const word of words) {
      if (word) {
        frequencyMap[word] = (frequencyMap[word] || 0) + 1;
      }
    }

    // Ordenar las palabras por frecuencia de aparición (de mayor a menor)
    const sortedWords = Object.entries(frequencyMap).sort((a, b) => b[1] - a[1]);

    // Mostrar el resultado
    console.log("\nPalabras ordenadas por frecuencia de aparición:");
    sortedWords.forEach(([word, count]) => {
      console.log(`${word}: ${count}`);
    });
  } catch (err) {
    if (err.code === "ENOENT") {
      console.error(`Error: El archivo "${readMarkdownFile}" no se encontró.`);
    } else {
      console.error("Error al leer el archivo:", err.message);
    }
  }
}

askFileName().then(readAndAnalyzeFile);
readAndAnalyzeFile();

// Todo: Que se podria mejorar si tuviera mas tiempo

// Me gustaría  mejorar la UI.
// Permitir filtrar de otras maneras, por ejemplo, por longitud de palabra.
// Cuando se carga el archivo sería bueno notificar al usuario que se está procesando, y que fue cargado
// existosamente.
// Hacerlo responsive.
// Otras formas de tokenizar, que el usuario lo decida.
// Permitir al usuario que guarde estos cambios, que haya un registro o historial de consultas.
