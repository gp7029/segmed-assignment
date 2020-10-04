const imageData = [
    {
        id: "1",
        title: "Brown Rock Formation Under Night Sky",
        owner: "Daniel Morris",
        url: "https://gs-assignment-segmed.s3.us-east-2.amazonaws.com/daniel-morris-pg0olwZdNoY-unsplash.jpg",
        category: "Nature", 
        format: "JPEG",
        flagged: 0
    },
    {
        id: "2",
        title: "Body Of Water",
        owner: "David Becker",
        url: "https://gs-assignment-segmed.s3.us-east-2.amazonaws.com/david-becker-94QVSLxCunY-unsplash.jpg",
        category: "Nature", 
        format: "JPEG",
        flagged: 0
    },
    {
        id: "3",
        title: "Green Trees On Mountain",
        owner: "Denis",
        url: "https://gs-assignment-segmed.s3.us-east-2.amazonaws.com/denis-QrIlMNQvxyg-unsplash.jpg",
        category: "Nature", 
        format: "JPEG",
        flagged: 0
    },
    {
        id: "4",
        title: "Bee On Purple Flower",
        owner: "Dustin Humes",
        url: "https://gs-assignment-segmed.s3.us-east-2.amazonaws.com/dustin-humes-q16S3U2HUrA-unsplash.jpg",
        category: "Nature", 
        format: "JPEG",
        flagged: 0
    },
    {
        id: "5",
        title: "Deer",
        owner: "Dylan Taylor",
        url: "https://gs-assignment-segmed.s3.us-east-2.amazonaws.com/dylan-taylor-5tYVBC-hgNc-unsplash.jpg",
        category: "Nature", 
        format: "JPEG",
        flagged: 0
    },
    {
        id: "6",
        title: "White Moon In Sky",
        owner: "Ezequiel Garrido",
        url: "https://gs-assignment-segmed.s3.us-east-2.amazonaws.com/ezequiel-garrido-bi9JQmizpDs-unsplash.jpg",
        category: "Nature", 
        format: "JPEG",
        flagged: 0
    },
    {
        id: "7",
        title: "White House On A Rocky Beach",
        owner: "Greg Jeanneau",
        url: "https://gs-assignment-segmed.s3.us-east-2.amazonaws.com/greg-jeanneau-4eDJnQDI0qo-unsplash.jpg",
        category: "Nature", 
        format: "JPEG",
        flagged: 0
    },
    {
        id: "8",
        title: "Leaves",
        owner: "Joshua Eckstein",
        url: "https://gs-assignment-segmed.s3.us-east-2.amazonaws.com/joshua-eckstein-6Gu8bzj1NAI-unsplash.jpg",
        category: "Nature", 
        format: "JPEG", 
        flagged: 0
    }
]

/**
 * 
 * @param {Object} res - response object to be sent back to frontend
 * @param {String} message - Message feedback
 * @param {Object} payload - json object representing data from database
 */
const handleSuccess = (res, message, payload = {}) => {
    res.status(200).send({
        payload,
        message
    })
}

/**
 * 
 * @param {Object} res - response object to be sent back to frontend
 * @param {String} message - Message feedback
 * @param {Object} err - json object representing database error
 */
const handleError = (res, message, err = null) => {
    if (!err) {
        res.status(500).send({
            payload: {},
            message
        });   
    } else {
        res.status(500).send({
            payload: err,
            message
        });
    }
}

module.exports = {
    imageData,
    handleError,
    handleSuccess
}