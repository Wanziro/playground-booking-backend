const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const Playgrounds = require("../model/playgrounds");
const PlaygroundsHours = require("../model/playgroundsHours");

router.get("/", async (req, res) => {
  try {
    const playgrounds = await Playgrounds.find({});
    return res.status(200).send({ playgrounds });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

router.get("/client/", async (req, res) => {
  try {
    const playgrounds = await Playgrounds.find({ status: "Active" });
    return res.status(200).send({ playgrounds });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

router.get("/client/:id", async (req, res) => {
  const id = req.params["id"];
  try {
    const playground = await Playgrounds.findOne({ status: "Active", _id: id });
    return res.status(200).send({ playground });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

router.post("/", auth, async (req, res) => {
  const { title, summary, description, image, price } = req.body;
  try {
    const exists = await Playgrounds.findOne({ title });
    if (exists) {
      return res.status(400).send({ msg: "Playground title already exists." });
    }
    const playground = await Playgrounds.create({
      title,
      summary,
      description,
      images: [image],
      price,
    });
    return res.status(200).send({ msg: "Playground saved!", playground });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

router.put("/", auth, async (req, res) => {
  const { title, summary, description, price, id, status } = req.body;
  try {
    const playground = await Playgrounds.updateOne(
      { _id: id },
      {
        title,
        summary,
        description,
        price,
        status,
      }
    );
    return res.status(200).send({ msg: "Playground updated!", playground });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

router.delete("/:id", auth, async (req, res) => {
  const id = req.params["id"];
  try {
    await Playgrounds.deleteOne({ _id: id });
    return res.status(200).send({ msg: "Playground Deleted!" });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

router.post("/hours/", auth, async (req, res) => {
  const { from, to, id } = req.body;
  try {
    const exists = await PlaygroundsHours.findOne({
      from,
      to,
      playgroundId: id,
    });
    if (exists) {
      return res.status(400).send({ msg: "Hour already exists." });
    }
    const playground = await PlaygroundsHours.create({
      from,
      to,
      playgroundId: id,
    });
    return res.status(200).send({ msg: "Hour saved!", playground });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

router.get("/hours/:playgroundId", async (req, res) => {
  const playgroundId = req.params["playgroundId"];
  try {
    const hours = await PlaygroundsHours.find({
      playgroundId,
    });
    return res.status(200).send({ msg: "Hour saved!", hours });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

router.delete("/hours/:id", auth, async (req, res) => {
  const id = req.params["id"];
  try {
    await PlaygroundsHours.deleteOne({
      _id: id,
    });
    return res.status(200).send({ msg: "Hour deleted!" });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

router.post("/images/", auth, async (req, res) => {
  const { images, id } = req.body;
  try {
    const playground = await Playgrounds.updateOne(
      {
        _id: id,
      },
      { images: images }
    );

    return res
      .status(200)
      .send({ msg: "Image added successfully!", playground });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

router.put("/images/", auth, async (req, res) => {
  const { updatedImages, id } = req.body;
  try {
    const playground = await Playgrounds.updateOne(
      {
        _id: id,
      },
      { images: updatedImages }
    );

    return res
      .status(200)
      .send({ msg: "Image added successfully!", playground });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

module.exports = router;
