$(function(){
	var num_commands = 0;

	$("#player_num").focus();

	$("#command_line").submit(function(){
		console.log('hit');
		$("#btn_submit").click();
		return false;
	});

	$(".input-small").submit(function(){
		console.log('hit');
		$("#btn_submit").click();
		return false;
	});

	$("#btn_submit").click(function(){
		dummyVals = Array(Array('player_num','99'),Array('shot_type','sp'),Array('start_dir','h5'),Array('end_dir','a5'),Array('shot_outcome','k'));
		//var command = retrieveFormVals();
		player_num = $('#player_num').val();
		shot_type = $('#shot_type').val();
		start_dir = $('#start_dir').val();
		end_dir = $('#end_dir').val();
		shot_outcome = $('#shot_outcome').val();

		var vals = Array();
		vals.push(Array('Player Number', player_num));
		vals.push(Array('Shot Type', shot_type));
		vals.push(Array('Start Direction', start_dir));
		vals.push(Array('End Direction', end_dir));
		vals.push(Array('Shot Outcome', shot_outcome));

		$('#player_num').val('');
		$('#shot_type').val('');
		$('#start_dir').val('');
		$('#end_dir').val('');
		$('#shot_outcome').val('');
		console.log(vals);
		addToCallStack(vals);
		$("#player_num").focus();
		return false;
	});

   /*
	*	Retrieves inputs from command line and returns an array with the values of each field
	*
	*	@return - Array of (input_type, val) pairs
	*/
	function retrieveFormVals(){
		var vals = Array();
		vals.append(Array('Player Number', $('#player_num').val()));
		vals.append(Array('Shot Type', $('#shot_type').val()));
		vals.append(Array('Start Direction', $('#start_dir').val()));
		vals.append(Array('End Direction', $('#start_dir').val()));
		vals.append(Array('Shot Outcome', $('#start_dir').val()));
		console.log(vals);
		return vals;
	}

	function addToCallStack(command){
		var cell = createCommandCell(command);
		console.log($(cell));
		$(cell).insertAfter('#cs_title');
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
		/*var comDiv = document.createElement('div');

		$(comDiv).html(command);*/
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