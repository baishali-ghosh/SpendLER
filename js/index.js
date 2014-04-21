var app = {
  // Application Constructor
  initialize: function() {
    this.bindEvents();
  },
  // Bind Event Listeners
  //
  // Bind any events that are required on startup. Common events are:
  // 'load', 'deviceready', 'offline', and 'online'.
  bindEvents: function() {
    document.addEventListener('deviceready', this.onDeviceReady, false);
  },
  // deviceready Event Handler
  //
  // The scope of 'this' is the event. In order to call the 'receivedEvent'
  // function, we must explicity call 'app.receivedEvent(...);'
  onDeviceReady: function() {
    app.receivedEvent('deviceready');
  },
  // Update DOM on a Received Event
  receivedEvent: function(id) {
    $('#btnRegister').click(function() {
      if($('#password').val() != $('#confirmpassword').val()) {
        var errorMessage = 'Passwords do not match.'
        return app.showErrorDiv(errorMessage);
      } else {
        var formData = $('#registerForm').serialize();

        $.ajax({
          url: 'http://parichu.0fees.us/register.php',
          type: 'Post',
          data: formData,
          crossDomain: true,
          cache: false,
          success: function(retData) {
            //alert(retData);
            var dataObj = JSON.parse(retData);

            if(!dataObj.success) {
              app.showErrorDiv(dataObj.errorMessage);
              return false;
            } else {
              window.location.replace('index.html');
              return false;
            }
          }
        });
      }
      return false;
    });

    $('#btnSignin').click(function() {
      if($('#password').val() == "" || $('#username').val() == "") {
        var errorMessage = 'Both fields required'
        return app.showErrorDiv(errorMessage);
      } else {
        var formData = $('#signInForm').serialize();
        var username = $('#username').val();
        localStorage.username = username;
        //alert($('#username').val());

        $.ajax({
          url: 'http://parichu.0fees.us/signin.php',
          type: 'Post',
          data: formData,
          crossDomain: true,
          cache: false,
          success: function(retData) {
            var dataObj = JSON.parse(retData);

            if(!dataObj.success) {
              app.showErrorDiv(dataObj.errorMessage);
              return false;
            } else {
              if(username == 'anindit')
                window.location.replace('pageanindit.html');
              if(username == 'jeet')
                window.location.replace('pagejeet.html');
              if(username == 'parijit')
                window.location.replace('pageparijit.html');
              if(username == 'baishali')
                window.location.replace('pagebaishali.html');
              if(username == 'rahul')
                window.location.replace('pagerahul.html');
              return false;
            }
          }
        });
      }
      return false;
    });


    if($('#memberList').length > 0) {

      $.ajax({
        url: 'http://parichu.0fees.us/getMembers.php',
        type: 'Post',
        data: {gid: LocalStorage.gid},
        crossDomain: true,
        cache: false,
        success: function(retData) {
          alert(retData);
          var dataObj = JSON.parse(retData);

          if(!dataObj.success) {
            alert(dataObj.errorMessage);
            return false;
          } else {
            alert("Members will be fetched");

            return false;
          }
        },
        error: function(xhr) {
          alert('Error: '+xhr.status);
          return false;
        }
      });

    }

  },

  showErrorDiv: function(message) {
    var elem = $('<span/>').attr({
      'style': 'color:red'
    }).html(message);

    $('#errorDiv').append(elem);
    return false;
  }
};
