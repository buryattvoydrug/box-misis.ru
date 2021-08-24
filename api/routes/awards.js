const router = require("express").Router();
const User = require("../models/User");
const Award = require("../models/Award");

//CREATE Award
router.post("/", async (req, res) => {
  const newAward = new Award(req.body);
  try {
    const savedAward = await newAward.save();
    res.status(200).json(savedAward);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE Award
router.put("/:id", async (req, res) => {
  console.log(req.body)
  try {
    const award = await Award.findById(req.params.id);
      try {
        const updatedAward = await Award.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedAward);
      } catch (err) {
        res.status(500).json(err);
      }
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE Award
router.delete("/:id", async (req, res) => {
  try {
    const award = await Award.findById(req.params.id);
      try {
        await award.delete();
        res.status(200).json("Award has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET Award
router.get("/:id", async (req, res) => {
  try {
    const award = await Award.findById(req.params.id);
    res.status(200).json(award);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL AwardS
router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let Awards;
    if (username) {
      Awards = await Award.find({ username });
    } else if (catName) {
      Awards = await Award.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      Awards = await Award.find();
    }
    res.status(200).json(Awards);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
