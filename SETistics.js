// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.
$(function() {
  var num_commands = 0;
  var command_stack = Array();

  $("#player-num").keyup(function(event) {
  	// Enter is key 13. Space key is 32. 
    if (event.which == 32) {  
      $("#player-num").val($("#player-num").val().split(" ").join(""));
      $("#player-num-box").addClass("number12");
      $("#shot-type").focus();
    }

    return false;
  });

  $("#shot-type").keyup(function(event) {
  	// Enter is key 13. Space key is 32. 
    if (event.which == 13 || event.which == 32) {  
      $("#shot-type").val($("#shot-type").val().split(" ").join(""));
      $("#shot-type-box").addClass("block");
      $("#dir-start").focus();
    }

    return false;
  });

  $("#dir-start").keyup(function(event) {
  	// Enter is key 13. Space key is 32. 
    if (event.which == 13 || event.which == 32) {  
      $("#dir-start").val($("#dir-start").val().split(" ").join(""));
      $("#dir-box").removeClass("court");
      $("#dir-box").addClass("shot-start");
      $("#dir-end").focus();
    }

    return false;
  });

  $("#dir-end").keyup(function(event) {
  	// Enter is key 13. Space key is 32. 
    if (event.which == 13 || event.which == 32) {  
      $("#dir-end").val($("#dir-end").val().split(" ").join(""));
      $("#dir-box").removeClass("shot-start");
      $("#dir-box").addClass("shot-end");
      $("#shot-outcome").focus();
    }

    return false;
  });

  $("#shot-outcome").keyup(function(event) {
  	// Enter is key 13. Space key is 32. 
    if (event.which == 13 || event.which == 32) {  
      $("#shot-outcome").val($("#shot-outcome").val().split(" ").join(""));
      $("#shot-outcome-box").addClass("kill");
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

    resetIcons();
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

  function resetIcons() {
    $("#player-num-box").removeClass("number12");
    $("#shot-type-box").removeClass("block");
    $("#shot-outcome-box").removeClass("kill");
    $("#dir-box").removeClass("shot-start");
    $("#dir-box").removeClass("shot-end");
    $("#dir-box").addClass("court");
  }

  function translateCommand(command){
    return 'translation';
  }

  $("#player-num").focus();

})