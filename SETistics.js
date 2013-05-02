// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.
$(function() {
  var player_num_options = {
      "Home Player 1" : "h1",
      "Home Player 2" : "h2",
      "Home Player 3" : "h3",
      "Home Player 4" : "h4",
      "Home Player 5" : "h5",
      "Home Player 6" : "h6",
      "Away Player 5" : "a5",
      "Away Player 6" : "a6",
      "Away Player 7" : "a7",
      "Away Player 8" : "a8",
      "Away Player 9" : "a9",
      "Away Player 10" : "a10"
  };
  var shot_type_options = {
    "Block" : "bl",
    "Dig" : "dg",
    "Serve" : "sr",
    "Spike" : "sp"
  };
  var dir_options = {
    "Home Pos. 1" : "h1",
    "Home Pos. 2" : "h2",
    "Home Pos. 3" : "h3",
    "Home Pos. 4" : "h4",
    "Home Pos. 5" : "h5",
    "Home Pos. 6" : "h6",
    "Away Pos. 1" : "a1",
    "Away Pos. 2" : "a2",
    "Away Pos. 3" : "a3",
    "Away Pos. 4" : "a4",
    "Away Pos. 5" : "a5",
    "Away Pos. 6" : "a6"
  };
  var shot_outcome_options = {
    "Dug" : "dg",
    "Kill" : "kl",
    "Error" : "er"
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
    if (text.length != 0) {
      $("#player-num-box").addClass("number12");
      var valid = false;
      for (var option in player_num_options) {
        if (player_num_options.hasOwnProperty(option) && (text == option || text == player_num_options[option])) {
          valid = true;
          break;
        }
      }
      if (!valid) {
        $("#player-num").css('background-color', 'pink');
      } else {
        $("#player-num").css('background-color', 'white');
      }
    } else {
      $("#player-num-box").removeClass("number12");
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

    var vals = Array();
    vals.push(Array('Player Number', player_num));
    vals.push(Array('Shot Type', shot_type));
    vals.push(Array('Start Direction', start_dir));
    vals.push(Array('End Direction', end_dir));
    vals.push(Array('Shot Outcome', shot_outcome));

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
    addToCallStack(vals);
    $("#player-num").focus();

    resetIcons();
    return false;
  });

  function addToCallStack(command){
    var cell = createCommandCell(command);
    //console.log('hit addToCallStack' + $(cell));
    $(cell).insertAfter('#command-marker');
    $(cell).slideDown('fast');
    /*if(command_stack.length > 9){
      wrap = command_stack[0];
      $(wrap).remove();
      command_stack.shift();
    }*/
  }

  function createCommandCell(command){
    var outer_wrapper = document.createElement('div');
    var wrapper = document.createElement('div');
    var comForm = document.createElement('form');
    var fieldIndicator = document.createElement('div');
    var translation = document.createElement('div');
    var command_num = document.createElement('div');
    var button_div = document.createElement('div');
    var edit_button = document.createElement('button');

    var wrapper_num = ++num_commands;
    var fiid = "fi" + wrapper_num;
    var foid = "fo" + wrapper_num;
    var sb_ele_title = '#' + wrapper_num;


    $(fieldIndicator).attr('id', fiid);

    var command_field;
    var cfid = 'cf_'+wrapper_num;

    for (var i = 0; i < command.length; i++) {
      var command_field = document.createElement('input');
      $(command_field).val(command[i][1]);
      $(command_field).attr('name', command[i][0]);
      $(command_field).attr('type', 'text');
      $(command_field).addClass('transparent');
      $(command_field).addClass('input-small');
      $(command_field).addClass('sb-input');
      $(command_field).addClass('thin');
      $(command_field).focusout(function(){
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
            $(comForm).submit();
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
            $(comForm).submit();
          }

          return false;
      });

      $(comForm).append(command_field);
    };

    $(edit_button).html('Edit');
    $(edit_button).click(function(){
      $('#'+cfid).focus();
      return false;
    });
    
    $(edit_button).addClass('edit-button');
    /*$(wrapper).mouseover(function(){
      //$(edit_button).css('visibility', 'visible');
      $(edit_button).fadeIn("slow");
    });
    $(wrapper).mouseout(function(){
      //$(edit_button).css('visibility', 'hidden');
      $(edit_button).fadeOut();
    });*/

    //$(comForm).append(edit_button);

    $(fieldIndicator).addClass('sb-fi');
    $(translation).html(translateCommand(command));
    $(command_num).html(sb_ele_title);
    $(command_num).css('font-weight', 'bold');
    $(comForm).addClass('form-inline');
    $(comForm).addClass('sb-form');
    $(comForm).attr('id', foid);
    $(comForm).submit(function(){
      $("#player-num").focus();
      return false;
    });
    $(wrapper).addClass('separator');
    $(wrapper).append(command_num);
    $(wrapper).append(comForm);
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

    //$(button_div).append(edit_button);
    $(button_div).addClass("button-div");
    $(button_div).html('edit');
    $(button_div).delay(500).animate({left : '+=40px'},200);

    $(outer_wrapper).addClass('outer-wrapper');
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