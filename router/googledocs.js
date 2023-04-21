const express = require('express');
const router = express.Router();
const { google } = require('googleapis');
const { authenticate } = require('@google-cloud/local-auth');
const path = require('path');
const {createResume, config} = require('../template/google-doc-template');

const docs = google.docs('v1');
const service = google.drive('v3');

const scopes = [
    'https://www.googleapis.com/auth/documents',
    'https://www.googleapis.com/auth/documents.readonly',
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/drive.file',
    'https://www.googleapis.com/auth/drive.readonly',
];

router.post('/generate', async (req, res) => {
    let { name, email, address, phone, experience, skills, education, certification, summary } = req.body;
    console.log(req.body);


    const auth = await authenticate({
        keyfilePath: path.join(__dirname, "../" + process.env.KEYFILE_PATH),
        scopes: scopes,
    });
    google.options({ auth });
    
    
    let result = await createResume();
    res.json(result.data);
})

module.exports = router;