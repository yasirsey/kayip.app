const readXlsxFile = require("read-excel-file/node");
const mongoose = require("mongoose");
const Missing = require("../models/missing");

mongoose.connect("mongodb+srv://missings:Uzumymw_0@cluster0.8sfmozs.mongodb.net/?retryWrites=true&w=majority", {}, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to MongoDB");
  }
});

// readXlsxFile("./data/mersin_sehir_hastanesi.xlsx").then(
//   (rows) => {
//     const data = rows.map((row) => {
//       return {
//         fullName: `${row[2]} ${row[3]}`,
//         city: row[4],
//         age: row[5],
//         description: 'Mersin Şehir Hastanesi',
//         photo: "bilinmiyor",
//       };
//     });

//     data.shift();

//     Missing.insertMany(data, (err, docs) => {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log(docs);
//       }
//     });
//   }
// );

const data = require("./data/tumu.json");

const parsedData = data.map((row) => {
  return {
    fullName: row["İsim Soyisim"],
    city: row["Geldiği Yer"],
    description: `${row["Bulunduğu Hastane"]} - ${row["Bulunduğu Bölüm"]}`,
    photo: "bilinmiyor",
  };
});

Missing.insertMany(parsedData, (err, docs) => {
        if (err) {
          console.log(err);
        } else {
          console.log(docs);
        }
      });