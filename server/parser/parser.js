const readXlsxFile = require("read-excel-file/node");
const mongoose = require("mongoose");
const Missing = require("../models/missing");

mongoose.connect('mongodb://localhost:27017/missing', {}, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Connected to MongoDB");
    }
  });

readXlsxFile("./data/mersin_sehir_hastanesi.xlsx").then(
  (rows) => {
    const data = rows.map((row) => {
      return {
        fullName: `${row[2]} ${row[3]}`,
        city: row[4],
        age: row[5],
        description: 'Mersin Şehir Hastanesi',
        photo: "bilinmiyor",
      };
    });

    data.shift();

    Missing.insertMany(data, (err, docs) => {
      if (err) {
        console.log(err);
      } else {
        console.log(docs);
      }
    });
  }
);
