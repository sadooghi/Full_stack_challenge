function checking () {
  $('.alert-danger').hide();
  $('.alert-success').hide();

  //check username, password and re_inter password be filled
  if (document.getElementById('username').value == "" || document.getElementById('password').value == ""){
    document.getElementById('err_alert').innerHTML = 'Please fill all fields.'
    $('#err_alert').css("display", "block");
    return;
  }

  //check username field only contain alpha-numeric values
  if(! /^[a-zA-Z0-9]+$/.test(document.getElementById('username').value)) {
    document.getElementById('err_alert').innerHTML = 'Username can only contain alphabets and numbers.'
    // $('#err_alert').show();
   $('#err_alert').css("display", "block");
    return;
  }

  //check username length not be less than 5 characters
  if (document.getElementById('username').value.length < 5) {
    document.getElementById('err_alert').innerHTML = 'Please choose a longer username. It should at least contain 5 characters.'
    $('#err_alert').css("display", "block");
    return;
  }

  //check that password has a minimum length of 8 characters and contains at least
  // 1 number, 1 uppercase, and 1 lowercase character
  if (! /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(document.getElementById('password').value)) {
    document.getElementById('err_alert').innerHTML = 'Your password should contain at least 8 characters and have at least 1 number, 1 uppercase, and 1 lowercase character.'
    $('#err_alert').css("display", "block");
    return;
  }

  let usr = document.getElementById('username').value;
  let pass = document.getElementById('password').value;
  let userparams = {username: usr, password: pass};

  $.ajax({
    type: "POST",
    url: "/register",
    data: userparams,
    dataType: "json",
    success: function(data){
      if (data.msg === "username is already registered!") {
          document.getElementById('err_alert').innerHTML = 'username is already registered!'
          $('#err_alert').css("display", "block");
      }else {
        $('.alert-success').css("display", "block")
      }
    }  ,
    error: function(data,textStatus, errorThrown){
      console.log(data,textStatus, errorThrown);
    }
  });
}

