const express = require("express");
const axios = require("axios");
const protobuf = require("protobufjs");

const { err, problem, success } = require("../util/responses");
const auth = require("../middleware/auth");

const router = express.Router();

const subwayProto = protobuf.loadSync(path.join("../../protos/mta.proto"));
const feed = subwayProto.lookupType("transit_realtime.FeedMessage");

router.get("/", auth, async (req, res) => {});

module.exports = router;
