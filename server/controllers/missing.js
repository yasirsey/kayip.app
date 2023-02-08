const router = require("express").Router();

const Missing = require("../models/missing");
const readXlsxFile = require("read-excel-file/node");
const uniqid = require("uniqid");
const fs = require("fs");
const Path = require("path");
const Axios = require("axios");

router.get("/", (req, res) => {
  const searchParams = req.query.query;

  if (!searchParams) return res.json([]);

  Missing.find(
    {
      $or: [
        { fullName: { $regex: searchParams, $options: "i" } },
        { description: { $regex: searchParams, $options: "i" } },
      ],
    },
    null,
    { sort: { createdAt: -1 } },
    (err, missing) => {
      if (err) {
        console.log(err);
      } else {
        res.json(missing);
      }
    }
  );
});

router.get("/count", (req, res) => {
    Missing.countDocuments({}, (err, count) => {
        if (err) {
            console.log(err);
        } else {
            res.json(count);
        }
    });
});

router.get("/:id", (req, res) => {
  Missing.findById(req.params.id, (err, missing) => {
    if (err) {
      console.log(err);
    } else {
      res.json(missing);
    }
  });
});

router.post("/", (req, res) => {
  let missing = new Missing(req.body);

  missing
    .save()
    .then((missing) => {
      const photo = req.files ? req.files.photo : null;

      photo &&
        photo.mv(
          __dirname + `/../../client/static/images/${missing._id}.jpg`,
          (err) => {
            if (err) {
              console.log(err);
            }
          }
        );

      res.status(201).json({ message: "Missing added successfully." });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send({ message: "Adding new missing failed." });
    });
});

router.post("/xls-import", async (req, res) => {
  try {
    if (req.headers["api-key"] != "2b81d372-93eb-4b08-b8f4-5b3d57df6e84")
      throw new Error("Api Key Geçerli Değil");
    let file = req.files.file;

    let uploadPath =
      require.main.path + "/tmp/" + uniqid() + "." + file.name.split(".").pop();
    await file.mv(uploadPath);
    let readXls = await readXlsxFile(uploadPath);
    let countData = 0;
    for (let readXl of readXls) {
      let user = await Missing.find({ fullName: readXl[0] });
      if (!user.length) {
        let img = await saveImg(readXl[4]);
        let missing = new Missing({
          fullName: readXl[0],
          age: parseInt(readXl[1]) || 0,
          city: readXl[2],
          description: readXl[3] || "",
          photo: img || "",
        });

        await missing.save();
        countData += 1;
      }
    }
    return res.json({
      countData: countData,
      message: `Toplam ${countData} içeri aktarıldı`,
    });
  } catch (e) {
    return res.json({
      message: e.message,
    });
  }
});

async function saveImg(url) {
  try {
    let outputFileName = require.main.path + "/uploadImg/" + uniqid() + ".png";
    let path = Path.resolve(require.main.path, "images", outputFileName);
    let writer = fs.createWriteStream(path);

    let reqData = await Axios({
      url,
      method: "GET",
      responseType: "stream",
    });

    reqData.data.pipe(writer);
    return outputFileName;
  } catch (e) {
    console.log(e.message);
    return null;
  }
}

module.exports = router;
