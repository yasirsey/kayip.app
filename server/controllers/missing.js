const router = require('express').Router();

const Missing = require('../models/missing');

router.get('/', (req, res) => {
    console.log("test");
    const searchParams = req.query.query;

    Missing.find({
        $or: [
            {fullName: {$regex: searchParams, $options: 'i'}},
            {description: {$regex: searchParams, $options: 'i'}},
        ]
    }, (err, missing) => {
        if (err) {
            console.log(err);
        } else {
            res.json(missing);
        }
    });
});

router.get('/:id', (req, res) => {
    Missing.findById(req.params.id, (err, missing) => {
        if (err) {
            console.log(err);
        } else {
            res.json(missing);
        }
    });
});

router.post('/', (req, res) => {
    let missing = new Missing(req.body);

    missing.save()
        .then(missing => {
            const photo = req.files ? req.files.photo : null;

            photo && photo.mv(__dirname + `/../public/images/${missing._id}.jpg`, err => {
                if (err) {
                    console.log(err);
                }
            });

            res.status(201).json({'message': 'Missing added successfully.'});
        })
        .catch(err => {
            console.log(err)
            res.status(400).send({'message': 'Adding new missing failed.'});
        });
});

module.exports = router;
