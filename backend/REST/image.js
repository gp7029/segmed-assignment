const express = require('express');
const router = express.Router();
const {handleError, handleSuccess} = require('../utilities');
const dbConnectionFactory = require('../db/connection');


/**
 * GET resource that returns all the images in the database
 */
router.get('/v1/images', (req, res)=>{

    // Reusing db object saved as a local variable in req object
    let db = req.app.locals.db;
    if (!db){
        db = dbConnectionFactory();
    }
    db.all('SELECT * FROM imageData', (err, rows)=>{
        if (err){
            handleError(res, message="ERROR: Unable to retreive images", err)
            return;
        }
        handleSuccess(res, message="SUCCESS: Images fetched successfully", rows)
        return;
    })
})

/**
 * POST resource that updates the 'flagged' value of a given image id.
 */
router.post('/v1/images/:id', (req, res)=>{
    const image_id = req.params.id;
    let db = req.app.locals.db;

    // Ideally we'd extract POSTable attributes from req.body and update them programmatically, 
    // instead of hardcoding (hard-accessing ?) 'flagged' attribute
    const new_flagged_value = req.body.flagged;

    if (!db){
        db = dbConnectionFactory();
    }

    db.run("UPDATE imageData SET flagged = ? WHERE id = ?", [new_flagged_value, image_id], (err)=>{
        if (err){
            handleError(res, message="ERROR: Unable to update flag", err);
            return;
        }
        handleSuccess(res, message="SUCCESS: Flag updated Successfully", {})
        return;
    })
})


module.exports = router;