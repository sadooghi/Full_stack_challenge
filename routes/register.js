var express = require('express');
var router = express.Router();
const fs = require('fs');

router.get('/', function (req, res) {
  res.render('register');
})

router.post('/register', function (req,res) {

  if (fs.existsSync('data.json')) {

    fs.readFile('data.json', 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      if(Object.keys(fs).length > 0){
        let usr_arr = JSON.parse(data);
        let usr_exist = false;
        //check that username is not already registered
        for (var u in usr_arr) {
            if (usr_arr[u]["username"] == req.body.username) {
              res.json({"msg":"username is already registered!"});
              usr_exist = true;
              break;
            }
        }
        if (! usr_exist){
          usr_arr.push(req.body);
          write_to_file(usr_arr);
        }
      } else {
        let user_array = [];
        user_array.push(req.body);
        write_to_file(user_array);
      }
    });
  }
  else{
    let user_array = [];
    user_array.push(req.body);
    write_to_file(user_array);
  }

  function write_to_file (usernames) {
    let to_write = JSON.stringify(usernames);
    fs.writeFile("data.json", to_write, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("saved in file!");
    });
    res.json({"msg":"username created!"});
  }

})

module.exports = router;
