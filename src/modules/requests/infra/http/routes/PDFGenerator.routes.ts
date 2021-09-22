import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import PDFGenerator from "../controllers/PDFGeneratorController";

const pdfGeneratorRoutes = Router();

const pdfGenerator = new PDFGenerator();

pdfGeneratorRoutes.get(
  "/all",
  celebrate({
    [Segments.QUERY]: {
      language: Joi.string().required(),
    },
  }),
  pdfGenerator.index
);

export default pdfGeneratorRoutes;
