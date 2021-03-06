const df = require("../common/date_format.js");

module.exports = (app, request) => {
  /*
leading to the insert form page.
*/
  let base_get_url = "https://kgng8eutc9.execute-api.us-west-2.amazonaws.com/orders/";
  app.get("/detail/:id", function(req, res) {
    console.log(req.params.id);
    request.get(base_get_url + req.params.id, function(error, response, body) {
      if (error) {
        res.send(err);
      } else {
        console.log(body);
        let data = JSON.parse(body);
        let dateTime = new Date(parseInt(data.date));
        data.date_format = dateTime.format(df.masks.isoDateTime2);
        res.render("detail", data);
      }
    });
  });

  /*
add a new item.
*/
  let insert_url = "https://kgng8eutc9.execute-api.us-west-2.amazonaws.com/orders";
  app.post("/new", function(req, res) {
    request.put({ url: insert_url, json: req.body }, function(err, response, data) {
      if (err) {
        res.send(err);
      } else {
        console.log(data);
        // res.render("index.html");
        res.redirect("/");
      }
    });
  });
};
