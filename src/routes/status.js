const express = require("express");
const axios = require("axios");

const { err, problem, success } = require("../util/responses");
const convert = require("../util/parse");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    if (!req.query.line) problem("Missing line");
    const target = req.query.line.split(",");
    const alerts = await axios(
      "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/camsys%2Fsubway-status.json",
      {
        headers: {
          "x-api-key": req.query.key,
        },
      }
    );

    const status = {};

    for (const line of alerts.data.routeDetails) {
      let details = [];
      if (target.includes(line.route)) {
        for (const detail of line.statusDetails) {
          details.push({
            id: detail.id,
            summary: detail.statusSummary,
            description: convert.text(detail.statusDescription),
            direction: detail.direction,
            start: detail.startDate,
            end: detail.endDate,
          });
        }

        status[line.route] = {
          color: line.color,
          service: line.inService,
          type: line.routeType,
          details,
        };
      }
    }

    return success(res, {
      status,
    });
  } catch (e) {
    return err(res);
  }
});

module.exports = router;
