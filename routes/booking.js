const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Axios = require("axios");

const { randomNumber } = require("../helpers/");

const Playgrounds = require("../model/playgrounds");
const PlaygroundsHours = require("../model/playgroundsHours");
const BookedHours = require("../model/bookedHours");
const Transactions = require("../model/transactions");

router.post("/", auth, async (req, res) => {
  const {
    id,
    organisationName,
    selectedHours,
    price,
    bookedDate,
    phoneNumber,
  } = req.body;
  const amount = price * selectedHours.length;
  try {
    if (selectedHours.length === 0) {
      return res
        .status(400)
        .send({ msg: "Please choose hours you want to book" });
    }
    for (let i = 0; i < selectedHours.length; i++) {
      const isBooked = await BookedHours.findOne({
        from: selectedHours[i].from,
        to: selectedHours[i].to,
        playgroundId: id,
      });
      if (isBooked) {
        return res.status(400).send({
          msg: `This playground has already been booked same date, same hour: ${selectedHours[i].from}-${selectedHours[i].to}`,
        });
      }
    }
    //payment
    const trans = await Axios.get("https://www.uuidgenerator.net/api/version4");
    if (trans) {
      const transactionId = trans.data;
      const organizationId = "10fddf2a-0883-41c0-aa6d-74c98ec3b792";
      const description = "payment request with endpoints for playground";
      const callbackUrl = `https://medequip-backend.herokuapp.com/api/transactions/`;

      const pay = await Axios.post(
        "https://opay-api.oltranz.com/opay/paymentrequest",
        {
          telephoneNumber: phoneNumber,
          amount: amount,
          organizationId: organizationId,
          description: description,
          callbackUrl: callbackUrl,
          transactionId: transactionId,
        }
      );
      if (pay) {
        await Transactions.create({
          randomTransactionId: randomNumber(),
          status: pay.data.status,
          transactionId,
          userId: req.user.user_id,
          bookedDate,
          amountPaid: amount,
          playgroundId: id,
          bookedDate,
          organisationName,
        });

        //book hours
        for (let i = 0; i < selectedHours.length; i++) {
          await BookedHours.create({
            transactionId: transactionId,
            from: selectedHours[i].from,
            to: selectedHours[i].to,
            playgroundId: id,
            userId: req.user.user_id,
            bookedDate,
          });
        }
        //book hours
        return res
          .status(201)
          .json({ msg: pay.data.description, success: true });
      }
    } else {
      return res.status(400).send({
        msg: "Something went wrong, try again later!",
      });
    }
    //payment

    // const playgrounds = await Playgrounds.find({});
    // return res.status(200).send({ playgrounds });
  } catch (error) {
    return res.status(400).send({ msg: error.message });
  }
});

module.exports = router;
