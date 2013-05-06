// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.
$(function() {

  var global_current_edit = -1;

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
    "Serve" : "sr",
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
  $("#player-num").attr("tabindex", 1);
  $("#shot-type").attr("tabindex", 2);
  $("#dir-start").attr("tabindex", 3);
  $("#dir-end").attr("tabindex", 4);
  $("#shot-outcome").attr("tabindex", 5);
  $("#submit-button").attr("tabindex", 6);

  $("#player-num-feedback").focus(function(event) {
    $("#player-num-feedback").blur();
  });

  $("#player-num").keyup(function(event) {
  	// Enter is key 13. Space key is 32. 
    if (event.which == 13 || event.which == 32) {  
      $("#player-num").val($("#player-num").val().split(" ").join(""));
      $("#shot-type").focus();
    }

    return false;
  });

  $("#player-num").blur(function() {
    var text = $("#player-num").val()
    var valid = (text.length == 0);
    for (var option in player_num_options) {
      if (player_num_options.hasOwnProperty(option)) {
        if (text == option || text == player_num_options[option]) {
          valid = true;
          break;
        }
        if (text in alternative_player_nums) {
          var alternative_text = alternative_player_nums[text];
          if (alternative_text == option || alternative_text == player_num_options[option]) {
            valid = true;
            break;
          }
        }
      }
    }
    if (!valid) {
      $("#player-num").css('background-color', 'pink');
    } else {
      $("#player-num").css('background-color', 'white');
      $("#player-num-feedback").val($("#player-num").val().replace(/\D/g,''));
    }

    return false
  });

  $("#shot-type").keyup(function(event) {
  	// Enter is key 13. Space key is 32. 
    if (event.which == 13 || event.which == 32) {  
      $("#shot-type").val($("#shot-type").val().split(" ").join(""));
      $("#dir-start").focus();
    }

    return false;
  });

  $("#shot-type").blur(function() {
    var text = $("#shot-type").val();
    if (text.length != 0) {
      $("#shot-type-box").addClass("block");
      var valid = false;
      for (var option in shot_type_options) {
        if (shot_type_options.hasOwnProperty(option) && (text == option || text == shot_type_options[option])) {
          valid = true;
          break;
        }
      }
      if (!valid) {
        $("#shot-type").css('background-color', 'pink');
      } else {
        $("#shot-type").css('background-color', 'white');
      }
    } else {
      $("#shot-type-box").removeClass("block");
    } 

    return false
  });

  $("#dir-start").keyup(function(event) {
  	// Enter is key 13. Space key is 32. 
    if (event.which == 13 || event.which == 32) {  
      $("#dir-start").val($("#dir-start").val().split(" ").join(""));
      $("#dir-end").focus();
    }

    return false;
  });

  $("#dir-start").blur(function() {
    var text = $("#dir-start").val();
    if (text.length != 0) {
      $("#dir-box").removeClass("court");
      $("#dir-box").addClass("shot-start");
      var valid = false;
      for (var option in dir_options) {
        if (dir_options.hasOwnProperty(option) && (text == option || text == dir_options[option])) {
          valid = true;
          break;
        }
      }
      if (!valid) {
        $("#dir-start").css('background-color', 'pink');
      } else {
        $("#dir-start").css('background-color', 'white');
      }
    } else {
      $("#dir-box").addClass("court");
      $("#dir-box").removeClass("shot-start");
    }

    return false
  });

  $("#dir-end").keyup(function(event) {
  	// Enter is key 13. Space key is 32. 
    if (event.which == 13 || event.which == 32) {  
      $("#dir-end").val($("#dir-end").val().split(" ").join(""));
      $("#shot-outcome").focus();
    }

    return false;
  });

  $("#dir-end").blur(function() {
    var text = $("#dir-end").val();
    if (text.length != 0) {
      $("#dir-box").removeClass("shot-start");
      $("#dir-box").addClass("shot-end");
      var valid = false;
      for (var option in dir_options) {
        if (dir_options.hasOwnProperty(option) && (text == option || text == dir_options[option])) {
          valid = true;
          break;
        }
      }
      if (!valid) {
        $("#dir-end").css('background-color', 'pink');
      } else {
        $("#dir-end").css('background-color', 'white');
      }
    } else {
      $("#dir-box").addClass("shot-start");
      $("#dir-box").removeClass("shot-end");
    }

    return false
  });

  $("#shot-outcome").keyup(function(event) {
  	// Enter is key 13. Space key is 32. 
    if (event.which == 13 || event.which == 32) {  
      $("#shot-outcome").val($("#shot-outcome").val().split(" ").join(""));
      $("#submit-button").focus();
    }

    return false;
  });

  $("#shot-outcome").blur(function() {
    var text = $("#shot-outcome").val();
    if (text.length != 0) {
      $("#shot-outcome-box").addClass("kill");
      var valid = false;
      for (var option in shot_outcome_options) {
        if (shot_outcome_options.hasOwnProperty(option) && (text == option || text == shot_outcome_options[option])) {
          valid = true;
          break;
        }
      }
      if (!valid) {
        $("#shot-outcome").css('background-color', 'pink');
      } else {
        $("#shot-outcome").css('background-color', 'white');
      }
    } else {
      $("#shot-outcome-box").removeClass("kill");
    } 

    return false
  });

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

    if (global_current_edit != -1){
      $('#PlayerNumber'+global_current_edit).html(player_num);
      $('#ShotType'+global_current_edit).html(shot_type);
      $('#StartDirection'+global_current_edit).html(start_dir);
      $('#EndDirection'+global_current_edit).html(end_dir);
      $('#ShotOutcome'+global_current_edit).html(shot_outcome);
      global_current_edit = -1;
    }
    else{
    var vals = Array();
    vals.push(Array('PlayerNumber', player_num));
    vals.push(Array('ShotType', shot_type));
    vals.push(Array('StartDirection', start_dir));
    vals.push(Array('EndDirection', end_dir));
    vals.push(Array('ShotOutcome', shot_outcome));
    addToCallStack(vals);

    }
    $('#player-num').val('');
    $('#shot-type').val('');
    $('#dir-start').val('');
    $('#dir-end').val('');
    $('#shot-outcome').val('');

    $("#player-num").css('background-color', 'white');
    $("#shot-type").css('background-color', 'white');
    $("#dir-start").css('background-color', 'white');
    $("#dir-end").css('background-color', 'white');
    $("#shot-outcome").css('background-color', 'white');

    $("#player-num-feedback").val("");
    $("#player-num").focus();

    resetIcons();
    return false;
  });

  function addToCallStack(command){
    var cell = createCommandCell(command);
    $(cell).insertAfter('#command-marker');
    $(cell).slideDown('fast');
  }

  function createCommandCell(command){
    var outer_wrapper = document.createElement('div');
    var wrapper = document.createElement('div');
    var table = document.createElement('table');
    var comRow = document.createElement('span');
    var fieldIndicator = document.createElement('div');
    var translation = document.createElement('div');
    var command_num = document.createElement('div');
    var button_div = document.createElement('div');
    var edit_button = document.createElement('button');

    var wrapper_num = ++num_commands;
    var fiid = "fi" + wrapper_num;
    var foid = "row" + wrapper_num;
    var sb_ele_title = '#' + wrapper_num;


    $(fieldIndicator).attr('id', fiid);

    var command_field;
    var cfid = 'cf_'+wrapper_num;

    for (var i = 0; i < command.length; i++) {
      var command_field = document.createElement('div');
      $(command_field).html(command[i][1]);
      $(command_field).attr('id', command[i][0]+wrapper_num);
      //$(command_field).addClass('transparent');
      //$(command_field).addClass('input-small');
      //$(command_field).addClass('sb-input');
      $(command_field).addClass('span2');
      /*$(command_field).focusout(function(){
        $(this).addClass('transparent');
        $('#'+fiid).html('');
      });
      $(command_field).focusin(function(){
        //console.log('hit');
        $(this).removeClass('transparent');
        $('#' + fiid).html($(this).attr('name'));
      });
      
      if(i == command.length-1){
        $(command_field).attr('id', cfid);
        $(command_field).keyup(function(event) {
          // Enter is key 13. Space key is 32. 
          if (event.which == 32) {  
            $(this).val($(this).val().split(" ").join(""));
            $(comRow).submit();
          }

          return false;
        });
      }
      else{
        $(command_field).keyup(function(event) {
          // Enter is key 13. Space key is 32. 
          if (event.which == 32) {  
            $(this).val($(this).val().split(" ").join(""));
            $(this).next().focus();
          }

          return false;
        });
      }

      $(command_field).keyup(function(event) {
          // Enter is key 13. Space key is 32. 
          if (event.which == 13) {  
            $(this).val($(this).val().split(" ").join(""));
            $(comRow).submit();
          }

          return false;
      });*/

      $(comRow).append(command_field);
    };

    $(edit_button).html('Edit');
    $(edit_button).click(function(){
      $('#player-num').val($('#'+command[0][0]+wrapper_num).html());
      $('#shot-type').val($('#'+command[1][0]+wrapper_num).html());
      $('#dir-start').val($('#'+command[2][0]+wrapper_num).html());
      $('#dir-end').val($('#'+command[3][0]+wrapper_num).html());
      $('#shot-outcome').val($('#'+command[4][0]+wrapper_num).html());

      global_current_edit = wrapper_num;
      console.log('hit');
      
      $('#player-num').focus();
      return false;
    });
    
    $(edit_button).addClass('edit-button');

    $(fieldIndicator).addClass('sb-fi');
    $(translation).html(translateCommand(command));
    $(command_num).html(sb_ele_title);
    $(command_num).css('font-weight', 'bold');
    //$(comRow).addClass('form-inline');
    $(comRow).addClass('row-fluid');
    $(comRow).attr('id', foid);
    /*$(comRow).submit(function(){
      $("#player-num").focus();
      return false;
    });*/
    $(wrapper).addClass('separator');
    $(wrapper).append(command_num);
    $(wrapper).append(comRow);
    $(wrapper).append(fieldIndicator)
    $(wrapper).append(translation);

    $(outer_wrapper).mouseenter(function(){
      if ($(button_div).hasClass('open')) {
        $(button_div).animate({
          left : '+=40px'
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
          left : '+=40px'
        }, 100).removeClass('open');
      } else {
        $(button_div).animate({
          left : 0
        }, 100).addClass('open');
      }
    });

    $(button_div).addClass("button-div");
    $(button_div).append(edit_button);
    //$(button_div).html('edit');
    $(button_div).delay(500).animate({left : '+=40px'},200);

    $(outer_wrapper).addClass('outer-wrapper');
    $(outer_wrapper).attr('id', 'outer-wrapper'+wrapper_num);
    $(outer_wrapper).append(button_div);
    $(outer_wrapper).append(wrapper);

    command_stack.push(wrapper);
    
    return outer_wrapper;
  }

  function resetIcons() {
    $("#player-num-box").removeClass("number12");
    $("#shot-type-box").removeClass("block");
    $("#shot-outcome-box").removeClass("kill");
    $("#dir-box").removeClass("shot-start");
    $("#dir-box").removeClass("shot-end");
    $("#dir-box").addClass("court");
  }

  function translateCommand(command){
    return '';
  }

  $(".player-num-option").click(function(event) {
      $("#player-num").val(event.currentTarget.children[0].innerHTML);
      $("#player-num-box").addClass("number12");
      $("#shot-type").focus();
      $("#player-num").css('background-color', 'white');
  });

  $(".shot-type-option").click(function(event) {
      $("#shot-type").val(event.currentTarget.children[0].innerHTML);
      $("#shot-type-box").addClass("block");
      $("#dir-start").focus();
      $("#shot-type").css('background-color', 'white');
  });

  $(".dir-start-option").click(function(event) {
      $("#dir-start").val(event.currentTarget.children[0].innerHTML);
      $("#dir-box").removeClass("court");
      $("#dir-box").addClass("shot-start");
      $("#dir-end").focus();
      $("#dir-start").css('background-color', 'white');
  });

  $(".dir-end-option").click(function(event) {
      $("#dir-end").val(event.currentTarget.children[0].innerHTML);
      $("#dir-box").removeClass("shot-start");
      $("#dir-box").addClass("shot-end");
      $("#shot-outcome").focus();
      $("#dir-end").css('background-color', 'white');
  });

  $(".shot-outcome-option").click(function(event) {
      $("#shot-outcome").val(event.currentTarget.children[0].innerHTML);
      $("#shot-outcome-box").addClass("kill")
      $("#submit-button").focus();
      $("#shot-outcome").css('background-color', 'white');
  });

  $("#player-num").focus();

})