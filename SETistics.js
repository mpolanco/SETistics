// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.
$(function() {
  var num_commands = 0;
  var command_stack = Array();

  $("#player-num").keyup(function(event) {
  	// Enter is key 13. Space key is 32. 
    if (event.which == 13 || event.which == 32) {  
      $("#player-num").val($("#player-num").val().split(" ").join(""));
      $("#shot-type").focus();
    }

    return false;
  });

  $("#shot-type").keyup(function(event) {
  	// Enter is key 13. Space key is 32. 
    if (event.which == 13 || event.which == 32) {  
      $("#shot-type").val($("#shot-type").val().split(" ").join(""));
      $("#dir-start").focus();
    }

    return false;
  });

  $("#dir-start").keyup(function(event) {
  	// Enter is key 13. Space key is 32. 
    if (event.which == 13 || event.which == 32) {  
      $("#dir-start").val($("#dir-start").val().split(" ").join(""));
      $("#dir-end").focus();
    }

    return false;
  });

  $("#dir-end").keyup(function(event) {
  	// Enter is key 13. Space key is 32. 
    if (event.which == 13 || event.which == 32) {  
      $("#dir-end").val($("#dir-end").val().split(" ").join(""));
      $("#shot-outcome").focus();
    }

    return false;
  });

  $("#shot-outcome").keyup(function(event) {
  	// Enter is key 13. Space key is 32. 
    if (event.which == 13 || event.which == 32) {  
      $("#shot-outcome").val($("#shot-outcome").val().split(" ").join(""));
      $("#submit-button").focus();
    }

    return false;
  });



  $("#command-line").submit(function(){
    console.log('hit');
    $("#submit-button").click();
    return false;
  });

  $(".input-small").submit(function(){
    console.log('hit');
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
    console.log(vals);
    addToCallStack(vals);
    $("#player-num").focus();
    return false;
  });

  function addToCallStack(command){
    var cell = createCommandCell(command);
    console.log('hit addToCallStack' + $(cell));
    $(cell).insertAfter('#cs-title');
    if(command_stack.length > 9){
      wrap = command_stack[0];
      $(wrap).remove();
      command_stack.shift();
    }
  }

  function createCommandCell(command){
    var wrapper = document.createElement('div');
    var comForm = document.createElement('form');
    var fieldIndicator = document.createElement('div');
    var translation = document.createElement('div');
    var wrapper_num = ++num_commands;
    var fiid = "fi" + wrapper_num;
    var foid = "fo" + wrapper_num;


    $(fieldIndicator).attr('id', fiid);

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
        console.log('hit');
        $(this).removeClass('transparent');
        $('#' + fiid).html($(this).attr('name'));
      });
      

      $(comForm).append(command_field);
    };

    $(fieldIndicator).addClass('sb-fi');
    $(translation).html(translateCommand(command));
    $(comForm).addClass('form-inline');
    $(comForm).addClass('sb-form');
    $(comForm).attr('id', foid);
    $(comForm).submit(function(){
      $("#player-num").focus();
      return false;
    });
    $(wrapper).addClass('separator');
    $(wrapper).append(comForm);
    $(wrapper).append(fieldIndicator)
    $(wrapper).append(translation);

    command_stack.push(wrapper);
    
    return wrapper;
  }

  function translateCommand(command){
    return 'translation';
  }

  $(".dir-start-option").click(function(event) {
      $("#dir-start").val(event.currentTarget.innerHTML);
  });

  $(".dir-end-option").click(function(event) {
      $("#dir-end").val(event.currentTarget.innerHTML);
  });

  $(".shot-outcome-option").click(function(event) {
      var chosen = event.currentTarget.innerHTML;
      if (chosen == "Dug") {
          $("#shot-outcome").val("d");
      } else if (chosen == "Kill") {
          $("#shot-outcome").val("k");
      } else if (chosen == "Error") {
          $("#shot-outcome").val("e");
      }
  });

  $(".shot-type-option").click(function(event) {
      var chosen = event.currentTarget.innerHTML;
      if (chosen == "Block") {
          $("#shot-type").val("bl");
      } else if (chosen == "Dig") {
          $("#shot-type").val("dg");
      } else if (chosen == "Serve") {
          $("#shot-type").val("sr");
      } else if (chosen == "Spike") {
          $("#shot-type").val("sp");
      }
  });

  $(".player-num-option").click(function(event) {
      var chosen = event.currentTarget.innerHTML.split(' ');
      $("#player-num").val(chosen[0].charAt(0).toLowerCase() + chosen[chosen.length - 1]);
  });

  $("#player-num").focus();

})