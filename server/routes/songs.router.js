const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js')

router.get('/', (req, res) => {
    // res.send(songs);
    let queryText = `SELECT * FROM "songs";`;
    
    pool.query(queryText)
        .then( result => {
            console.log(result.rows);
            res.send(result.rows);
        })
        .catch( err => {
            console.log(err);
            res.sendStatus(500);
        })
});


router.post('/', (req, res) => {
    console.log(req.body);
    
    const queryText = `
        INSERT INTO "songs" (
            "rank", "track", "artist", "published"
        ) VALUES ($1, $2, $3, $4);
    `;

    const values = [req.body.rank, req.body.track, req.body.artist, req.body.published]

    pool.query(queryText, values)
        .then( result => {
            res.sendStatus(201);
        })
        .catch( err => {
            console.log(err);
            res.sendStatus(500);
        })
    // songs.push(req.body);
    // res.sendStatus(200);
});

module.exports = router;