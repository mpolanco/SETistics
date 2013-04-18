$(function(){
	var num_commands = 0;

	$("#player-num").focus();

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
		console.log($(cell));
		$(cell).insertAfter('#cs-title');
	}

	function createCommandCell(command){
		var wrapper = document.createElement('div');
		var comForm = document.createElement('form');
		var fieldIndicator = document.createElement('div');
		var translation = document.createElement('div');
		var wrapper_num = ++num_commands;
		var spanid = "fi" + wrapper_num;


		$(fieldIndicator).attr('id', spanid);

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
				$('#'+spanid).html('');
			});
			$(command_field).focusin(function(){
				console.log('hit');
				$(this).removeClass('transparent');
				$('#' + spanid).html($(this).attr('name'));
			});
			

			$(comForm).append(command_field);
		};

		$(fieldIndicator).addClass('sb-fi');
		$(translation).html(translateCommand(command));
		$(comForm).addClass('form-inline');
		$(comForm).addClass('sb-form');
		$(wrapper).addClass('separator');
		$(wrapper).append(comForm);
		$(wrapper).append(fieldIndicator)
		$(wrapper).append(translation);
		
		return wrapper;
	}

	function translateCommand(command){
		return 'translation';
	}

	});