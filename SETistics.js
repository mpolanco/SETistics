// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.
$(function() {

  var statistics = Array();

  var global_current_edit = -1;

  var youtube_api_player;

  var player_num_options = {
      "HomePlayer1" : "h1",
      "HomePlayer2" : "h2",
      "HomePlayer3" : "h3",
      "HomePlayer4" : "h4",
      "HomePlayer5" : "h5",
      "HomePlayer6" : "h6",
      "AwayPlayer5" : "a5",
      "AwayPlayer6" : "a6",
      "AwayPlayer7" : "a7",
      "AwayPlayer8" : "a8",
      "AwayPlayer9" : "a9",
      "AwayPlayer10" : "a10"
  };
  var shot_type_options = {
    "Block" : "bl",
    "Dig" : "dg",
    "Serve" : "sv",
    "Set" : "st",
    "Spike" : "sp"
  };
  var dir_options = {
    "HomePosition1" : "h1",
    "HomePosition2" : "h2",
    "HomePosition3" : "h3",
    "HomePosition4" : "h4",
    "HomePosition5" : "h5",
    "HomePosition6" : "h6",
    "AwayPosition1" : "a1",
    "AwayPosition2" : "a2",
    "AwayPosition3" : "a3",
    "AwayPosition4" : "a4",
    "AwayPosition5" : "a5",
    "AwayPosition6" : "a6"
  };
  var shot_outcome_options = {
    "Dug" : "dg",
    "Kill" : "kl",
    "Error" : "er"
  };
  var alternative_player_nums = {
    "h0" : "h00",
    "h1" : "h01",
    "h2" : "h02",
    "h3" : "h03",
    "h4" : "h04",
    "h5" : "h05",
    "h6" : "h06",
    "h7" : "h07",
    "h8" : "h08",
    "h9" : "h09",
    "h00" : "h0",
    "h01" : "h1",
    "h02" : "h2",
    "h03" : "h3",
    "h04" : "h4",
    "h05" : "h5",
    "h06" : "h6",
    "h07" : "h7",
    "h08" : "h8",
    "h09" : "h9",
    "a0" : "a00",
    "a1" : "a01",
    "a2" : "a02",
    "a3" : "a03",
    "a4" : "a04",
    "a5" : "a05",
    "a6" : "a06",
    "a7" : "a07",
    "a8" : "a08",
    "a9" : "a09",
    "a00" : "a0",
    "a01" : "a1",
    "a02" : "a2",
    "a03" : "a3",
    "a04" : "a4",
    "a05" : "a5",
    "a06" : "a6",
    "a07" : "a7",
    "a08" : "a8",
    "a09" : "a9"
  };
  var position_x = {
    "h5" : 45,
    "h6" : 45,
    "h1" : 45,
    "h4" : 117,
    "h3" : 117,
    "h2" : 117,
    "a2" : 177,
    "a3" : 177,
    "a4" : 177,
    "a1" : 250,
    "a6" : 250,
    "a5" : 250,
  };
  var position_y = {
    "h5" : 27,
    "h6" : 57,
    "h1" : 87,
    "h4" : 27,
    "h3" : 57,
    "h2" : 87,
    "a2" : 27,
    "a3" : 57,
    "a4" : 87,
    "a1" : 27,
    "a6" : 57,
    "a5" : 87,
  };

  for (var option in player_num_options) {
    if (player_num_options.hasOwnProperty(option)) {
      $('<li><a class="player-num-option">' + option + '<span class="shortcut">' + player_num_options[option] + '</span></a></li>').appendTo("#player-num-options");
    }
  }

  for (var option in shot_type_options) {
    if (shot_type_options.hasOwnProperty(option)) {
      $('<li><a class="shot-type-option">' + option + '<span class="shortcut">' + shot_type_options[option] + '</span></a></li>').appendTo("#shot-type-options");
    }
  }

  for (var option in dir_options) {
    if (dir_options.hasOwnProperty(option)) {
      $('<li><a class="dir-start-option">' + option + '<span class="shortcut">' + dir_options[option] + '</span></a></li>').appendTo("#dir-start-options");
    }
  }

  for (var option in dir_options) {
    if (dir_options.hasOwnProperty(option)) {
      $('<li><a class="dir-end-option">' + option + '<span class="shortcut">' + dir_options[option] + '</span></a></li>').appendTo("#dir-end-options");
    }
  }

  for (var option in shot_outcome_options) {
    if (shot_outcome_options.hasOwnProperty(option)) {
      $('<li><a class="shot-outcome-option">' + option + '<span class="shortcut">' + shot_outcome_options[option] + '</span></a></li>').appendTo("#shot-outcome-options");
    }
  }

  var num_commands = 0;
  var command_stack = Array();

  $("*").attr("tabindex", -1);
  $("#hidden").attr("tabindex", 1);
  $("#player-num").attr("tabindex", 2);
  $("#shot-type").attr("tabindex", 3);
  $("#dir-start").attr("tabindex", 4);
  $("#dir-end").attr("tabindex", 5);
  $("#shot-outcome").attr("tabindex", 6);
  $("#submit-button").attr("tabindex", 7);

  $("#player-num-feedback").focus(function(event) {
    $("#player-num-feedback").blur();
  });

  var redraw_court = function(ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#91003A";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgb(150,150,150)";
    ctx.fillRect(5, 5, 295, 90);
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.fillRect(152, 5, 1, 90);
    ctx.fillRect(92, 5, 1, 90);
    ctx.fillRect(212, 5, 1, 90);
  }

  var canvas = document.getElementById("court");
  var ctx = canvas.getContext('2d');
  redraw_court(ctx);
  ctx.font = '1.5em Helvetica';
  for (var pos = 1; pos <= 6; pos++) {
    var pos_string = pos.toString();
    var home_pos = "h" + pos_string;
    var away_pos = "a" + pos_string;
    ctx.fillText(pos_string, position_x[home_pos], position_y[home_pos]);
    ctx.fillText(pos_string, position_x[away_pos], position_y[away_pos]);
  }

  // draw an arrow from (fromx, fromy) to (tox, toy)
  var canvas_arrow = function(context, fromx, fromy, tox, toy) {
      var headlen = 10;   // length of head in pixels
      var angle = Math.atan2(toy - fromy, tox - fromx);
      context.moveTo(fromx, fromy);
      context.lineTo(tox, toy);
      context.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
      context.moveTo(tox, toy);
      context.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
      context.stroke();
  }

//***********************************************************************************
//***************************   Key Bindings    *************************************
//***********************************************************************************

  $(document).bind('keyup', 'F1', function(){
    $('#player-num').focus();
  });

  $(document).bind('keyup', 'F2', function(){
    $('#shot-type').focus();
  });

  $(document).bind('keyup', 'F3', function(){
    $('#dir-start').focus();
  });

  $(document).bind('keyup', 'F4', function(){
    $('#dir-end').focus();
  });

  $(document).bind('keyup', 'F5', function(){
    $('#shot-outcome').focus();
  });

  $('input').each(function(){
    $(this).bind('keyup', 'F1', function(){$('#player-num').focus();});
    $(this).bind('keyup', 'F2', function(){$('#shot-type').focus();});
    $(this).bind('keyup', 'F3', function(){$('#dir-start').focus();});
    $(this).bind('keyup', 'F4', function(){$('#dir-end').focus();});
    $(this).bind('keyup', 'F5', function(){$('#shot-outcome').focus();});
  });

//***********************************************************************************
//*******************   Efficiency and Safety Checking    ***************************
//***********************************************************************************

  $("input[type=text]").click(function() {
    // Select field contents
    this.select();
  });

  $("#player-num").keyup(function(event) {
  	// Enter is key 13. Space key is 32. 
    if (event.which == 32) {  
      $("#player-num").val($("#player-num").val().split(" ").join(""));
      $("#shot-type").focus();
    }

    return false;
  });

  $("#player-num").blur(function() {
    $(this).removeClass('invalid');
    $("#player-num-feedback").removeClass('invalid');
    $(this).removeClass('valid');
    var text = $("#player-num").val().toLowerCase().trim();
    var valid = (text.length == 0);
    for (var option in player_num_options) {
      if (player_num_options.hasOwnProperty(option)) {
        var lower_option = option.toLowerCase();
        var lower_shortcut = player_num_options[option].toLowerCase();
        if (text == lower_option || text == lower_shortcut) {
          valid = true;
          break;
        }
        if (text in alternative_player_nums) {
          var alternative_text = alternative_player_nums[text].toLowerCase();
          if (alternative_text == lower_option || alternative_text == lower_shortcut) {
            valid = true;
            break;
          }
        }
      }
    }
    if (!valid) {
      $("#player-num").addClass('invalid');
      $("#player-num-feedback").addClass('invalid');
    } else {
      if (text.length) {$("#player-num").addClass('valid');}
      $("#player-num-feedback").val($("#player-num").val().replace(/\D/g,''));
    }

    return false
  });

  $("#shot-type").keyup(function(event) {
  	// Enter is key 13. Space key is 32. 
    if (event.which == 32) {  
      $("#shot-type").val($("#shot-type").val().split(" ").join(""));
      $("#dir-start").focus();
    }

    return false;
  });

  $("#shot-type").blur(function() {
    var text = $("#shot-type").val().trim();
    for (var option in shot_type_options) {
      if (shot_type_options.hasOwnProperty(option)) {
        $("#shot-type-box").removeClass(option.toLowerCase());
      }
    }
    $(this).removeClass('invalid');
    $("#shot-type-box").removeClass('invalid');
    $(this).removeClass('valid');
    if (text.length != 0) {
      var lower_text = text.toLowerCase();
      var valid = false;
      for (var option in shot_type_options) {
        var lower_option = option.toLowerCase();
        var lower_shortcut = shot_type_options[option].toLowerCase();
        if (shot_type_options.hasOwnProperty(option) && (lower_text == lower_option || lower_text == lower_shortcut)) {
          $("#shot-type-box").addClass(lower_option);
          valid = true;
          break;
        }
      }
      if (!valid) {
        $("#shot-type").addClass('invalid');
        $("#shot-type-box").addClass('invalid');
      } 
      else{
        if (text.length) {$("#shot-type").addClass('valid');}
      }
    }

    return false
  });

  $("#dir-start").keyup(function(event) {
  	// Enter is key 13. Space key is 32. 
    if (event.which == 32) {  
      $("#dir-start").val($("#dir-start").val().split(" ").join(""));
      $("#dir-end").focus();
    }
    return false;
  });

  $("#dir-start").blur(function() {
    $(this).removeClass('invalid');
    $(this).removeClass('valid');
    var text = $("#dir-start").val().toLowerCase().trim();
    if (text.length != 0) {
      var valid = false;
      for (var option in dir_options) {
        var lower_option = option.toLowerCase();
        var lower_shortcut = dir_options[option].toLowerCase();
        if (dir_options.hasOwnProperty(option) && (text == lower_option || text == lower_shortcut)) {
          valid = true;
          break;
        }
      }
      if (!valid) {
        $("#dir-start").addClass('invalid');
      } else {
        $("#dir-start").addClass('valid');
      }
    } 

    return false
  });

  $("#dir-end").keyup(function(event) {
  	// Enter is key 13. Space key is 32. 
    if (event.which == 32) {  
      $("#dir-end").val($("#dir-end").val().split(" ").join(""));
      $("#shot-outcome").focus();
    }

    return false;
  });

  $("#dir-end").blur(function() {
    $(this).removeClass('invalid');
    $(this).removeClass('valid');
    var text = $("#dir-end").val().toLowerCase().trim();
    if (text.length != 0) {
      var valid = false;
      for (var option in dir_options) {
        var lower_option = option.toLowerCase();
        var lower_shortcut = dir_options[option].toLowerCase();
        if (dir_options.hasOwnProperty(option) && (text == lower_option || text == lower_shortcut)) {
          valid = true;
          break;
        }
      }
      if (!valid) {
        $("#dir-end").addClass('invalid');
      } else {
        $("#dir-end").addClass('valid');
      }
    } 

    return false
  });

  $("#shot-outcome").keyup(function(event) {
  	// Enter is key 13. Space key is 32. 
    if (event.which == 32) {  
      $("#shot-outcome").val($("#shot-outcome").val().split(" ").join(""));
      $("#submit-button").focus();
    }

    return false;
  });

  $("#shot-outcome").blur(function() {
    for (var option in shot_outcome_options) {
      if (shot_outcome_options.hasOwnProperty(option)) {
        $("#shot-outcome-box").removeClass(option.toLowerCase());
      }
    }
    $(this).removeClass('invalid');
    $("#shot-outcome-box").removeClass('invalid');
    $(this).removeClass('valid');
    var text = $("#shot-outcome").val().toLowerCase().trim();
    if (text.length != 0) {
      var valid = false;
      for (var option in shot_outcome_options) {
        var lower_option = option.toLowerCase();
        var lower_shortcut = shot_outcome_options[option].toLowerCase();
        if (shot_outcome_options.hasOwnProperty(option) && (text == lower_option || text == lower_shortcut)) {
          $("#shot-outcome-box").addClass(lower_option);
          valid = true;
          break;
        }
      }
      if (!valid) {
        $("#shot-outcome").addClass('invalid');
        $("#shot-outcome-box").addClass('invalid');
      } else {
        if (text.length) {$("#shot-outcome").addClass('valid');}
      }
    } else {
    } 

    return false
  });

  $("#submit-button").keydown(function() {
    if (event.which == 9) {
      $("#hidden").focus();
    }
  });

//***********************************************************************************
//********************************* Autocompletes ***********************************
//***********************************************************************************

  $('input').each(function(){
    $(this).autocomplete({source: [], delay: 100, minLength: 0, search: function( event, ui ) {
      $(this).blur();
      $(this).focus();
    }});
  });


//***********************************************************************************
//*********************************  Submissions  ***********************************
//***********************************************************************************


  $("#command-line").submit(function(){
    $("#submit-button").click();
    return false;
  });

  $(".input-small").submit(function(){
    $("#submit-button").click();
    return false;
  });

  $("#submit-button").click(function(){
    player_num = $('#player-num').val();
    shot_type = $('#shot-type').val();
    start_dir = $('#dir-start').val();
    end_dir = $('#dir-end').val();
    shot_outcome = $('#shot-outcome').val();

    //console.log(player_num.length + shot_type.length + start_dir.length + end_dir.length + shot_outcome.length);
    if (player_num.length + shot_type.length + start_dir.length + end_dir.length + shot_outcome.length == 0){
      console.log('hit');
      $(".input").each(function(){
        console.log($(this));
        $(this).animate({backgroundColor: "#FFC0CB"},200);
        $(this).animate({backgroundColor: "#FFFFFF" },500);
      });
      return false;
    }

    if (global_current_edit != -1){
      $('#PlayerNumber'+global_current_edit).html(player_num).removeClass('invalid-text');
      $('#ShotType'+global_current_edit).html(shot_type).removeClass('invalid-text');
      $('#StartDirection'+global_current_edit).html(start_dir).removeClass('invalid-text');
      $('#EndDirection'+global_current_edit).html(end_dir).removeClass('invalid-text');
      $('#ShotOutcome'+global_current_edit).html(shot_outcome).removeClass('invalid-text');

      if($('#player-num').hasClass('invalid')){
        $('#PlayerNumber'+global_current_edit).addClass('invalid-text');
      }
      if($('#shot-type').hasClass('invalid')){
        $('#ShotType'+global_current_edit).addClass('invalid-text');
      }
      if($('#dir-start').hasClass('invalid')){
        $('#StartDirection'+global_current_edit).addClass('invalid-text');
      }
      if($('#dir-end').hasClass('invalid')){
        $('#EndDirection'+global_current_edit).addClass('invalid-text');
      }
      if($('#shot-outcome').hasClass('invalid')){
        $('#ShotOutcome'+global_current_edit).addClass('invalid-text');
      }
      global_current_edit = -1;
    }
    else{
      var timestamp = Date.now();
      var statistic = {
          'player-num' : player_num,
           'shot-type' : shot_type,
           'dir-start' : start_dir,
             'dir-end' : end_dir,
        'shot-outcome' : shot_outcome,
           'timestamp' : timestamp
      };
      console.log("Pushing new statistic: " +statistic);
      console.log("Player#: " +  statistic['player-num']);
      statistics.push(statistic);


      var vals = Array();
      vals.push(Array('PlayerNumber', player_num, $('#player-num').hasClass('invalid')));
      vals.push(Array('ShotType', shot_type, $('#shot-type').hasClass('invalid')));
      vals.push(Array('StartDirection', start_dir, $('#dir-start').hasClass('invalid')));
      vals.push(Array('EndDirection', end_dir, $('#dir-end').hasClass('invalid')));
      vals.push(Array('ShotOutcome', shot_outcome, $('#shot-outcome').hasClass('invalid')));
      vals.push(Array('TimeStamp', timestamp));
      addToCallStack(vals);

    }

    $('input').each(function(){
      $(this).removeClass('invalid');
      $(this).removeClass('valid');
      $(this).val('');
    });

    $("#player-num").focus();

    resetIcons();
    return false;
  });

//***********************************************************************************
//********************************* Command Stack ***********************************
//***********************************************************************************

  function addToCallStack(command){
    var cell = createCommandCell(command);
    $(cell).insertAfter('#command-marker');
    $(cell).slideDown('fast');
  }

  function createCommandCell(command){
    var outer_wrapper = document.createElement('div');
    var wrapper = document.createElement('div');
    var table = document.createElement('table');
    var labelRow = document.createElement('div');
    var comRow = document.createElement('div');
    var fieldIndicator = document.createElement('div');
    var translation = document.createElement('div');
    var command_num = document.createElement('div');
    var time_stamp = document.createElement('div');
    var button_div = document.createElement('div');
    var edit_button = document.createElement('button');
    var delete_button = document.createElement('button');

    var ts = command[command.length-1][1];
    var date = new Date(ts);
    // hours part from the timestamp
    var hours = date.getHours();
    // minutes part from the timestamp
    var minutes = date.getMinutes();
    // seconds part from the timestamp
    var seconds = date.getSeconds();

    var hours = (hours<10)? '0' + hours: hours;
    var minutes = (minutes<10)? '0' + minutes: minutes;
    var seconds = (seconds<10)? '0' + seconds: seconds;

    // will display time in 10:30:23 format
    var formattedTime = hours + ':' + minutes + ':' + seconds; 

    var wrapper_num = ++num_commands;
    var fiid = "fi" + wrapper_num;
    var foid = "row" + wrapper_num;
    var sb_ele_title = '#' + wrapper_num;


    $(fieldIndicator).attr('id', fiid);

    var command_field;
    var cfid = 'cf_'+wrapper_num;

    for (var i = 0; i < command.length-1; i++) {
      var command_field = document.createElement('div');
      $(command_field).html(command[i][1]);
      $(command_field).attr('id', command[i][0]+wrapper_num);
      $(command_field).addClass('span2');
      if(command[i][2]){
        $(command_field).addClass('invalid-text');
      }

      $(comRow).append(command_field);
    };

    $(edit_button).html('<img src="icons/Edit2.png">');
    $(edit_button).click(function(){
      $('#player-num').val($('#'+command[0][0]+wrapper_num).html());
      $('#shot-type').val($('#'+command[1][0]+wrapper_num).html());
      $('#dir-start').val($('#'+command[2][0]+wrapper_num).html());
      $('#dir-end').val($('#'+command[3][0]+wrapper_num).html());
      $('#shot-outcome').val($('#'+command[4][0]+wrapper_num).html());

      $('#player-num').blur();
      $('#shot-type').blur();
      $('#dir-start').blur();
      $('#dir-end').blur();
      $('#shot-outcome').blur();

      global_current_edit = wrapper_num;
      
      $('#player-num').focus();
      return false;
    });
    $(edit_button).css('padding', '3px 3px');
    $(edit_button).addClass('edit-button');
    
    $(delete_button).html('<img src="icons/X.png">');
    $(delete_button).click(function(){
      $(outer_wrapper).slideUp("fast", function() { $(this).remove(); } );
      command_stack.splice(wrapper_num,1);
    });
    $(delete_button).addClass('edit-button');


    $(fieldIndicator).addClass('sb-fi');
    
    $(command_num).html(sb_ele_title);
    $(command_num).addClass('comLabel');
    $(command_num).addClass('span2');

    $(time_stamp).html(formattedTime);
    $(time_stamp).addClass('comLabel2');
    $(time_stamp).addClass('span3');

    $(labelRow).append(command_num);
    $(labelRow).append(time_stamp);
    //$(labelRow).addClass('row-fluid');
    $(labelRow).addClass('labelRow');
    
    $(comRow).addClass('row-fluid');
    $(comRow).addClass('comRow');
    $(comRow).attr('id', foid);
    /*$(comRow).submit(function(){
      $("#player-num").focus();
      return false;
    });*/
    $(wrapper).addClass('separator');
    $(wrapper).append(labelRow);
    $(wrapper).append('<br>')
    $(wrapper).append(comRow);
    $(wrapper).append(fieldIndicator)
    $(wrapper).append(translation);

    $(outer_wrapper).mouseenter(function(){
      if ($(button_div).hasClass('open')) {
        $(button_div).animate({
          left : '+=50px'
        }, 100).removeClass('open');
      } else {
        $(button_div).animate({
          left : 0
        }, 100).addClass('open');
      }
    });

    $(outer_wrapper).mouseleave(function(){
      if ($(button_div).hasClass('open')) {
        $(button_div).animate({
          left : '+=50px'
        }, 100).removeClass('open');
      } else {
        $(button_div).animate({
          left : 0
        }, 100).addClass('open');
      }
    });

    $(button_div).addClass("button-div");
    $(button_div).append(edit_button);
    $(button_div).append("<br>")
    $(button_div).append(delete_button);
    $(button_div).delay(500).animate({left : '+=50px'},200);

    $(outer_wrapper).addClass('outer-wrapper');
    $(outer_wrapper).attr('id', 'outer-wrapper'+wrapper_num);
    $(outer_wrapper).append(button_div);
    $(outer_wrapper).append(wrapper);

    command_stack.push(outer_wrapper);
    
    return outer_wrapper;
  }

//***********************************************************************************
//******************************** Drop Down Menus **********************************
//***********************************************************************************

  function resetIcons() {
    $("#player-num-feedback").val("");
    $("#shot-type-box").removeClass("block");
    for (var option in shot_type_options) {
      if (shot_type_options.hasOwnProperty(option)) {
        $("#shot-type-box").removeClass(option.toLowerCase());
      }
    }
    for (var option in shot_outcome_options) {
      if (shot_outcome_options.hasOwnProperty(option)) {
        $("#shot-outcome-box").removeClass(option.toLowerCase());
      }
    }
    redraw_court(ctx);
    for (var pos = 1; pos <= 6; pos++) {
      var pos_string = pos.toString();
      var home_pos = "h" + pos_string;
      var away_pos = "a" + pos_string;
      ctx.fillText(pos_string, position_x[home_pos], position_y[home_pos]);
      ctx.fillText(pos_string, position_x[away_pos], position_y[away_pos]);
    }
  }

  $(".player-num-option").click(function(event) {
      $("#player-num").val(event.currentTarget.children[0].innerHTML);
      $("#player-num-feedback").val($("#player-num").val().replace(/\D/g,''));
      $("#player-num").blur();
      $("#shot-type").focus();
  });

  $(".shot-type-option").click(function(event) {
      var selection = event.currentTarget.children[0].innerHTML;
      $("#shot-type").val(selection);
      for (var option in shot_type_options) {
        if (shot_type_options.hasOwnProperty(option)) {
          $("#shot-type-box").removeClass(option.toLowerCase());
        }
      }
      for (var option in shot_type_options) {
        if (shot_type_options.hasOwnProperty(option)){
          if (selection == option || selection == shot_type_options[option]) {
            $("#shot-type-box").addClass(option.toLowerCase());
            break;
          }
        }
      }
      $("#shot-type").blur();
      $("#dir-start").focus();
      
  });

  $(".dir-start-option").click(function(event) {
      var selection = event.currentTarget.children[0].innerHTML
      $("#dir-start").val(selection);

      redraw_court(ctx);

      for (var option in dir_options) {
        if (dir_options.hasOwnProperty(option)){
          var shortcut = dir_options[option];
          if (selection == shortcut || $("#dir-end").val() == shortcut) {
            ctx.fillStyle = "#91003A";
            ctx.fillText(shortcut.charAt(1), position_x[shortcut], position_y[shortcut]);
          } else {
            ctx.fillStyle = "rgb(255, 255, 255)";
            ctx.fillText(shortcut.charAt(1), position_x[shortcut], position_y[shortcut]);
          }
        }
      }
      
      $("#dir-start").blur();
      $("#dir-end").focus();
  });

  $(".dir-end-option").click(function(event) {
      var selection = event.currentTarget.children[0].innerHTML;
      $("#dir-end").val(selection);

      redraw_court(ctx);

      for (var option in dir_options) {
        if (dir_options.hasOwnProperty(option)){
          var shortcut = dir_options[option];
          if (selection == shortcut || $("#dir-start").val() == shortcut) {
            ctx.fillStyle = "#91003A";
            ctx.fillText(shortcut.charAt(1), position_x[shortcut], position_y[shortcut]);
          } else {
            ctx.fillStyle = "rgb(255, 255, 255)";
            ctx.fillText(shortcut.charAt(1), position_x[shortcut], position_y[shortcut]);
          }
        }
      }

      $("#dir-end").blur();
      $("#shot-outcome").focus();
  });

  $(".shot-outcome-option").click(function(event) {
      var selection = event.currentTarget.children[0].innerHTML;
      $("#shot-outcome").val(selection);
      for (var option in shot_outcome_options) {
        if (shot_outcome_options.hasOwnProperty(option)) {
          $("#shot-outcome-box").removeClass(option.toLowerCase());
        }
      }
      for (var option in shot_outcome_options) {
        if (shot_outcome_options.hasOwnProperty(option)){
          if (selection == option || selection == shot_outcome_options[option]) {
            $("#shot-outcome-box").addClass(option.toLowerCase());
            break;
          }
        }
      }
      $("#shot-outcome").blur();
      $("#submit-button").focus();
  });


  /*
  var statistic = {
          'player-num' : player_num,
           'shot-type' : shot_type,
           'dir-start' : start_dir,
             'dir-end' : end_dir,
        'shot-outcome' : shot_outcome,
           'timestamp' : timestamp
      };
  */
  $("#recorded-link").click(function(event) {
    $("#main-container").addClass("hidden");
    $("#recorded-statistics").removeClass("hidden");

    for (var statisticIndex in statistics) {
      var statistic = statistics[statisticIndex];
      console.log("Statistic timestamp: " + statistic['timestamp']);
      console.log("Statistic player #: " + statistic['player-num']);
      console.log("Statistic shot type: " + statistic['shot-type']);
      console.log("Statistic start: " + statistic['dir-start']);
      console.log("Statistic end: " + statistic['dir-end']);
      console.log("Statistic outcome: " + statistic['timestamp']);

      var row = document.createElement('tr');

      var timestamp = statistic['timestamp'];
      var timestamp_cell = document.createElement('td');
      var date = new Date(timestamp);
      // hours part from the timestamp
      var hours = date.getHours();
      // minutes part from the timestamp
      var minutes = date.getMinutes();
      // seconds part from the timestamp
      var seconds = date.getSeconds();

      var hours = (hours<10)? '0' + hours: hours;
      var minutes = (minutes<10)? '0' + minutes: minutes;
      var seconds = (seconds<10)? '0' + seconds: seconds;

      // will display time in 10:30:23 format
      var formattedTime = hours + ':' + minutes + ':' + seconds; 
      $(timestamp_cell).html(formattedTime);

      var player_num = statistic['player-num'];
      var player_num_cell = document.createElement('td');
      $(player_num_cell).html(player_num);

      var shot_type = statistic['shot-type'];
      var shot_type_cell = document.createElement('td');
      $(shot_type_cell).html(shot_type);

      var start_dir = statistic['dir-start'];
      var start_dir_cell = document.createElement('td');
      $(start_dir_cell).html(start_dir);

      var end_dir = statistic['dir-end'];
      var end_dir_cell = document.createElement('td');
      $(end_dir_cell).html(end_dir);

      var shot_outcome = statistic['shot-outcome'];
      var shot_outcome_cell = document.createElement('td');
      $(shot_outcome_cell).html(shot_outcome);

      $(row).append(timestamp_cell);
      $(row).append(player_num_cell);
      $(row).append(shot_type_cell);
      $(row).append(start_dir_cell);
      $(row).append(end_dir_cell);
      $(row).append(shot_outcome_cell);
      $("#statTable").append(row);
    }
  });

  $("#player-num").focus();

});

//***********************************************************************************
//********************************* Video Player  ***********************************
//***********************************************************************************

function onYouTubePlayerReady(playerId) {
  console.log("YOUTUBE PLAYER READY");
  youtube_api_player = document.getElementById("ytapiplayer");
}
