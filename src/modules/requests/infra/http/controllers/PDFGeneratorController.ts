// import firebase from '../../../firebase';
import { initializeApp } from "@firebase/app";
import { Request, Response } from "express";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
// @ts-ignore
import pdf from "html-pdf";
import handlebars from "handlebars";
import puppeteer from "puppeteer";

const config = {
  apiKey: "AIzaSyDgs55RdRUphcenbrJN4SaeGvSrFDh6jbw",
  authDomain: "bvspapp-ab6d1.firebaseapp.com",
  databaseURL: "https://bvspapp-ab6d1.firebaseio.com",
  projectId: "bvspapp-ab6d1",
  storageBucket: "bvspapp-ab6d1.appspot.com",
  messagingSenderId: "71141359891",
  appId: "1:71141359891:web:a5b092368a65cce2c3dae6",
  measurementId: "G-6QG1R39J6R",
};

const app = initializeApp(config);
const db = getFirestore(app);

// import { Container } from './styles';

interface IMachineData {
  description: string;
  description_english: string;
  departments: string[];
}

interface IDepartmentData {
  description: string;
  description_english: string;
}

interface IImageStoraged {
  url: string;
  name: string;
}

interface IBvspPartData {
  oemcode: string;
  bvspcode: string;
  description: string;
  description_insensitive: string;
  description_english: string;
  photos: IImageStoraged[];
  photocover: IImageStoraged;
  machines: string[];
}

export default class PDFGenerator {
  public async generatePDF() {}

  public async index(request: Request, response: Response) {
    const { language } = request.query;

    try {
      const departmentsDB = await getDocs(collection(db, "departments"));
      const departments = departmentsDB.docs.map((doc) => {
        const departmentData = doc.data() as IDepartmentData;
        return {
          id: doc.id,
          name:
            language === "ptbr"
              ? departmentData.description
              : departmentData.description_english,
        };
      });

      const machinesDB = await getDocs(collection(db, "machines"));
      const machines = machinesDB.docs.map((doc) => {
        const machineData = doc.data() as IMachineData;
        return {
          id: doc.id,
          name:
            language === "ptbr"
              ? machineData.description
              : machineData.description_english,
          departments: machineData.departments,
        };
      });

      const partsDB = await getDocs(collection(db, "parts"));
      const parts = partsDB.docs.map((doc) => {
        const partsData = doc.data() as IBvspPartData;
        return {
          id: doc.id,
          name:
            language === "ptbr"
              ? partsData.description
              : partsData.description_english,
          oemcode: partsData.oemcode,
          bvspcode: partsData.bvspcode,
          photo: partsData.photos[0].url,
          machines: partsData.machines,
        };
      });

      const pdfDataFormatted = departments.map((department) => {
        const machineByDepartment = machines
          .filter((machine) => machine.departments.includes(department.id))
          .map((machine) => {
            const partsByMachine = parts.filter((part) =>
              part.machines.includes(machine.id)
            );
            return {
              id: machine.id,
              name: machine.name,
              parts: partsByMachine,
            };
          });

        return {
          id: department.id,
          name: department.name,
          machines: machineByDepartment,
        };
      });

      let html = `
      <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>PDF</title>
  </head>
  <body>
    <style>
    body{
      margin: 0;
      padding: 0;
    }
    body, div[size="A4"] {
      margin: 0;
      box-shadow: 0;
    }

    div[size="A4"] {
      background: white;
      width: 100%;
      height: 100%;
      max-width: 21cm;
      min-height: 29.7cm;
      display: block;
      margin: 0 auto;
      margin-bottom: 0.5cm;
    }

    .paper {
      width: 210mm;
      height: 297mm;
    }

    @page {
      size: A4 portrait;
      margin: 0;
    }
    
    .container {
      margin-top: 32px;
      margin-right: 32px;
      margin-left: 32px;
    }

    .header {
      margin-bottom: 16px;
      display: flex;
      justify-content: center;
    }

    .title {
      display: block;
      width: 80%;
      font-weight: bold;
      font-size: 26px;
      padding-top: 7px;
      padding-bottom: 14px;
      padding-right: 15px;
      padding-left: 15px;
      color: #fff;
      background-color: #d92332;
      border-top-right-radius: 30px;
      border-bottom-left-radius: 30px;
    }
    .grid {
      display: grid;
      align-items: center;
      gap: 20px;
      margin-top: 16px;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(3, 1fr);
      margin-bottom: 16px;
      padding: 8px;
    }
    .grid-item {
      display: flex;
      width: 100%;
      /* justify-content: center; */
      align-items: center;
      flex-direction: column;
      border: 1px solid #cecece;
    }
    .boxe {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

      @media print {
        body{
          margin: 0;
          padding: 0;
        }
        body, div[size="A4"] {
          margin: 0;
          box-shadow: 0;
        }

        div[size="A4"] {
          background: white;
          width: 100%;
          height: 100%;
          max-width: 21cm;
          min-height: 29.7cm;
          display: block;
          margin: 0 auto;
          margin-bottom: 0.5cm;
        }

        .paper {
          width: 210mm;
          height: 297mm;
        }

        @page {
          size: A4 portrait;
          margin: 0;
        }
        
        .container {
          margin-top: 32px;
          margin-right: 32px;
          margin-left: 32px;
        }

        .header {
          margin-bottom: 16px;
          display: flex;
          justify-content: center;
        }

        .title {
          display: block;
          width: 80%;
          font-weight: bold;
          font-size: 26px;
          padding-top: 7px;
          padding-bottom: 14px;
          padding-right: 15px;
          padding-left: 15px;
          color: #fff;
          background-color: #d92332;
          border-top-right-radius: 30px;
          border-bottom-left-radius: 30px;
        }
        .grid {
          display: grid;
          align-items: center;
          gap: 20px;
          margin-top: 16px;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: repeat(3, 1fr);
          margin-bottom: 16px;
          padding: 8px;
        }
        .grid-item {
          display: flex;
          width: 100%;
          /* justify-content: center; */
          align-items: center;
          flex-direction: column;
          border: 1px solid #cecece;
        }
        .boxe {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
      }
    </style>

          {{#each data}} {{#each this.machines}}
          <div size="A4">
          <div class="header">
            <img
              style="width: 10rem"
              src="https://bvsp.netlify.app/static/media/logo.f7e1312b.png"
            />
          </div>
            <span
              style="
                display: block;
                font-weight: bold;
                text-align: center;
                font-size: 26px;
                padding-top: 7px;
                padding-bottom: 14px;
                padding-right: 15px;
                padding-left: 15px;
                color: #fff;
                background-color: #d92332;
                border-top-right-radius: 30px;
                border-bottom-left-radius: 30px;
              "
              >{{this.name}}</span
            >
            <div class="grid">
              {{#each this.parts}}
              <div class="grid-item">
                <img src="{{this.photo}}" height="70px" width="140px" />
                <div class="boxe">
                  <p>{{this.name}}</p>
                  <span>OEMCODE: {{this.oemcode}}</span>
                  <span>BVSPCODE: {{this.bvspcode}}</span>
                </div>
              </div>
              {{/each}}
            </div>
          </div>
          {{/each}} {{/each}}

  </body>
</html>
`;

      var options = {
        format: "A4",
        orientation: "portrait",
        border: "10mm",
        // header: {
        //   height: "45mm",
        //   contents:
        //     '<div style="text-align: center;">Author: Shyam Hajare</div>',
        // },
        footer: {
          height: "28mm",
          contents: {
            default:
              '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
          },
        },
      };

      var document = {
        html: html,
        data: {
          data: pdfDataFormatted,
        },
        path: "./output.pdf",
        type: "",
      };

      // pdf
      //   .create(document, options)
      //   .then((res: any) => {
      //     console.log(res);
      //   })
      //   .catch((err: any) => {
      //     console.log(err);
      //   });

      const template = handlebars.compile(html);
      const result = template({ data: pdfDataFormatted });
      // pdf.create(result).toFile("./test.pdf", function (err, res) {
      //   console.log(res.filename);
      // });
      // response.sendFile("./test.pdf", { root: "." });
      response.send(result);
    } catch (error) {}
  }
}
