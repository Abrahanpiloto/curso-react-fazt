import express from "express";
import { Client } from "@notionhq/client";
import cors from "cors";
import bodyParser from "body-parser";

let jsonParser = bodyParser.json();

const app = express();

app.use(cors());

const PORT = 4000;
const HOST = "localhost";

const notion = new Client({
  auth: "secret_56eUFPd1wz1Hcctcdo7wTvMB5R3QToz0R1zOfprQ7OM",
});

const databaseId = "8dbabfea47b745d4826da6429265a485";

// POST request
// POST title, description, createdAt, id
// Funcionalidad: Realizar ingresos de base de datos en una página de Notion con la base de datos que se encuentra arriba
// localhost:4000/submitFormToNotion

app.post("/submitFormNotion", jsonParser, async (req, res) => {
  // req.body
  // {
  //   title: "abrahan"
  //   description:"piloto"
  //   createdAt:"22/02/1983"
  // id: "1"

  // }
  const title = req.body.title;
  const description = req.body.description;
  const createdAt = req.body.createdAt;
  const id = req.body.id;

  try {
    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        title: {
          title: [
            {
              text: {
                content: title,
              },
            },
          ],
        },
        description: {
          text: [
            {
              text: {
                content: description,
              },
            },
          ],
        },
        createdAt: {
          date: [
            {
              text: {
                content: createdAt,
              },
            },
          ],
        },
        id: {
          text: [
            {
              text: {
                content: id,
              },
            },
          ],
        },
      },
    });
    console.log(response);
    console.log("Exito!!");
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, HOST, () => {
  console.log("Starting proxy at " + HOST + ":" + PORT); //localhost:4000
});
