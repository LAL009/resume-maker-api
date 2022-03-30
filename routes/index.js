var express = require('express');
let ejs = require('ejs');
var router = express.Router();
let pdf = require("html-pdf");
let path = require("path");

let options = {
  "height": "11.7in",
  "width": "8.3in",
  "header": {
    "height": "45mm",
    "contents": '<div style="text-align: center;">Author: Marc Bachmann</div>'
  },
  "footer": {
    "height": "28mm",
    "contents": {
      first: 'Cover page',
      2: 'Second page', // Any page number is working. 1-based index
      default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
      last: 'Last Page'
    }
  }
};

/* GET home page. */
router.get('/', async function (req, res, next) {

  let readFile = await ejs.renderFile(path.join(__dirname, '..', 'views', "index.ejs"), { title: 'Express' }, options);

  pdf.create(readFile, options).toFile("report.pdf", function (err, data) {
    if (err) {
      res.send(err);
    } else {
      res.render('index', { title: 'Express' });
    }
  });


});

module.exports = router;
