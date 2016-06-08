/**
 * Created by shediv on 07/06/16.
 */

var express = require('express');
var router = express.Router();
var publicationCtrl = new (require('../controllers/publication')).Publication();

router.get("/publications", publicationCtrl.getPublications); //... Get all Publications
router.get("/publications/:id", publicationCtrl.getPublicationsByID); //... Search user base on ID
router.post("/publications/:id", publicationCtrl.updatePublicationByID); //... Search user base on ID

module.exports = router;