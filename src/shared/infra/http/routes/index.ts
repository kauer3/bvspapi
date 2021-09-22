import { Router } from "express";

import usersRouter from "@modules/users/infra/http/routes/users.routes";
import sessionsRouter from "@modules/users/infra/http/routes/sessions.routes";
import passwordRouter from "@modules/users/infra/http/routes/password.routes";

import requestsRouter from "@modules/requests/infra/http/routes/requests.routes";
import requestsFollowup from "@modules/requests/infra/http/routes/requestsFollowup.routes";
import requestsHistory from "@modules/requests/infra/http/routes/requestsHistory.routes";
import indicatorsRouter from "@modules/requests/infra/http/routes/indicators.routes";
import requestsBudgets from "@modules/requests/infra/http/routes/requestsBudgets.routes";
import requestsCloseOrOpenFollowup from "@modules/requests/infra/http/routes/requestsCloseOrOpenFollowup.routes";
import requestsSale from "@modules/requests/infra/http/routes/requestsSale.routes";
import requestsQuality from "@modules/requests/infra/http/routes/requestsQuality.routes";
import requestsTechnical from "@modules/requests/infra/http/routes/requestsTechnical.routes";
import requestsStatus from "@modules/requests/infra/http/routes/requestsStatus.routes";
import alertRequestRouter from "@modules/requests/infra/http/routes/alertRequest.routes";
import alertsTodayByTypeRequest from "@modules/requests/infra/http/routes/alertsTodayByTypeRequest.routes";
import alertRequestCountToday from "@modules/requests/infra/http/routes/alertRequestCountToday.routes";
import pdfGeneratorRoutes from "@modules/requests/infra/http/routes/PDFGenerator.routes";

import fs from "fs";
// import requestPage from "request-promise-native";
//@ts-ignore
import puppeteer from "puppeteer";
import axios from "axios";
import PDFMerger from "pdf-merger-js";

const routes = Router();

// User Routes
routes.use("/users", usersRouter);
routes.use("/sessions", sessionsRouter);
routes.use("/password", passwordRouter);

// Requests PDFGenerator
routes.use("/pdf", pdfGeneratorRoutes);

// Requests Routes
routes.use("/requests", requestsRouter);
routes.use("/requests/followup", requestsFollowup);
routes.use("/requests/alert", alertRequestRouter);
routes.use("/requests/alert-count", alertRequestCountToday);
routes.use("/requests/alert-byrequest-and-type", alertsTodayByTypeRequest);

routes.use("/requests/close-followup", requestsCloseOrOpenFollowup);
routes.use("/requests/technical", requestsTechnical);
routes.use("/requests/quality", requestsQuality);
routes.use("/requests/sale", requestsSale);
routes.use("/requests/budget", requestsBudgets);

routes.use("/requests/history", requestsHistory);
routes.use("/requests/indicators", indicatorsRouter);
routes.use("/request-status", requestsStatus);

routes.get("/pdf", async (request, res) => {
  const { language, type } = request.query;
  if (type === "new") {
    const response = await axios.get(
      `http://localhost:8080/pdf/all?language=${language}`
    );
    console.log(response.data);
    const browser = await puppeteer.launch();

    const page = await browser.newPage();
    await page.setContent(response.data, { timeout: 0 });
    const getHeaderFooter = () => {
      return `<html>
                <style>html {-webkit-print-color-adjust: exact;} </style>
                <span style="margin: -5em 0 0 0; height: 3mm; z-index: 99999999; 
                       background: red; width: 100%;">Testando</span>
             </html>`;
    };
    await page.pdf({
      path: `invoice-${language}.pdf`,
      format: "a4",
      timeout: 0,
      preferCSSPageSize: true,
      printBackground: true,
      margin: {
        top: "100px",
        bottom: "200px",
        right: "30px",
        left: "30px",
      },
    });
    await browser.close();
    const merger = new PDFMerger();
    merger.add("capa-final.pdf");
    merger.add(`invoice-${language}.pdf`);
    await merger.save(`invoice-${language}-final.pdf`);
    // res.contentType("application/pdf");
    // return res.send(pdfGen);
  } else {
    return res.sendFile(`invoice-${language}-final.pdf`, { root: "." });
  }
  return res.sendFile(`invoice-${language}-final.pdf`, { root: "." });
});

export default routes;
