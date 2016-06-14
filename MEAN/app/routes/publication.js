/**
 * Created by shediv on 07/06/16.
 */

var express = require('express');
var router = express.Router();
var publicationCtrl = new (require('../controllers/publication')).Publication();
var projectCtrl = new (require('../controllers/projectAcl')).ProjectAcl();

router.get("/publications", publicationCtrl.getPublications); //... Get all Publications
router.get("/publications/:id", publicationCtrl.getPublicationsByID); //... Search user base on ID
router.post("/publications", publicationCtrl.addPublication); //... add a new publication
router.put("/publications/:id", publicationCtrl.updatePublicationByID); //... Update user base on ID
router.delete("/publications/:id", publicationCtrl.deletePublicationByID); //... Update user base on ID

router.get("/projectAcl/:id", projectCtrl.getProject); //... Get List of Projects
router.get("/addData", projectCtrl.addTestData); //... Get List of Projects

module.exports = router;