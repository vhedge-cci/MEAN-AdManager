var mongoose = require( 'mongoose' );

var publicationSchema = new mongoose.Schema({
  publicationName: {
    type: String
  },
  publicationType: {
    type: String
  },
  publicationLanguage: {
    type: String
  },
  commissionRateForAdvertisments: {
    type: String
  },
  commisionRateForClassifieds: {
    type: String
  },
  isActiveRecord: {
    type: Number 
  }
});

var publication = mongoose.model('publications', publicationSchema);

module.exports = { Publication: publication};
