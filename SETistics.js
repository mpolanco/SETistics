// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.
$(function() {
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
    if ($("#player-num").val().length != 0) {
      $("#player-num-box").addClass("number12");
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
    if ($("#shot-type").val().length != 0) {
      $("#shot-type-box").addClass("block");
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
    if ($("#dir-start").val().length != 0) {
      $("#dir-box").removeClass("court");
      $("#dir-box").addClass("shot-start");
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
    if ($("#dir-end").val().length != 0) {
      $("#dir-box").removeClass("shot-start");
      $("#dir-box").addClass("shot-end");
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
    if ($("#shot-outcome").val().length != 0) {
      $("#shot-outcome-box").addClass("kill");
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
    addToCallStack(vals);
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
    var comRow = document.createElement('tr');
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
      var command_field = document.createElement('td');
      $(command_field).html(command[i][1]);
      $(command_field).attr('id', command[i][0]+wrapper_num);
      //$(command_field).addClass('transparent');
      //$(command_field).addClass('input-small');
      //$(command_field).addClass('sb-input');
      $(command_field).addClass('thin');
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
      $('#'+cfid).focus();
      return false;
    });
    
    $(edit_button).addClass('edit-button');

    $(fieldIndicator).addClass('sb-fi');
    $(translation).html(translateCommand(command));
    $(command_num).html(sb_ele_title);
    $(command_num).css('font-weight', 'bold');
    $(comRow).addClass('form-inline');
    $(comRow).addClass('sb-form');
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
  });

  $(".shot-type-option").click(function(event) {
      $("#shot-type").val(event.currentTarget.children[0].innerHTML);
      $("#shot-type-box").addClass("block");
      $("#dir-start").focus();
  });

  $(".dir-start-option").click(function(event) {
      $("#dir-start").val(event.currentTarget.children[0].innerHTML);
      $("#dir-box").removeClass("court");
      $("#dir-box").addClass("shot-start");
      $("#dir-end").focus();
  });

  $(".dir-end-option").click(function(event) {
      $("#dir-end").val(event.currentTarget.children[0].innerHTML);
      $("#dir-box").removeClass("shot-start");
      $("#dir-box").addClass("shot-end");
      $("#shot-outcome").focus();
  });

  $(".shot-outcome-option").click(function(event) {
      $("#shot-outcome").val(event.currentTarget.children[0].innerHTML);
      $("#shot-outcome-box").addClass("kill")
      $("#submit-button").focus()
  });

  $("#player-num").focus();

})