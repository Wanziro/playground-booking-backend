const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

const auth = require("../middleware/auth");

const Currencies = require("../model/currencies");

router.post("/new/", auth, async (req, res) => {
  const { name, code, sellPrice, buyPrice } = req.body;
  try {
    await Currencies.create({ name, code, sellPrice, buyPrice });
    return res.status(200).send({ msg: "Currency registered!" });
  } catch (error) {
    return res.status(400).send({ msg: error.message });
  }
});

router.post("/update/", auth, async (req, res) => {
  const { id, name, code, sellPrice, buyPrice } = req.body;
  try {
    await Currencies.updateOne(
      { _id: id },
      { name, code, sellPrice, buyPrice }
    );
    return res.status(200).send({ msg: "Currency updated!" });
  } catch (error) {
    return res.status(400).send({ msg: error.message });
  }
});

router.post("/remove/", auth, async (req, res) => {
  const { id } = req.body;
  try {
    await Currencies.deleteOne({ _id: id });
    return res.status(200).send({ msg: "Currency deleted!" });
  } catch (error) {
    return res.status(400).send({ msg: error.message });
  }
});

router.get("/all/", async (req, res) => {
  try {
    const cur = await Currencies.find({});
    return res.status(200).send({ result: cur });
  } catch (error) {
    return res.status(400).send({ msg: error.message });
  }
});

module.exports = router;
