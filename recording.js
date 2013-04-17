$(function(){

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
		var cl = $('#command_line');

		console.log(cl);
		dummyVals = Array(Array('player_num','99'),Array('shot_type','sp'),Array('start_dir','h5'),Array('end_dir','a5'),Array('shot_outcome','k'));
		addToCallStack(dummyVals);
		return false;
	});

	function addToCallStack(command){
		var cell = createCommandCell(command);
		console.log($(cell));
		$(cell).insertAfter('#cs_title');
	}

	function createCommandCell(command){
		var wrapper = document.createElement('div');
		var comForm = document.createElement('form');
		var translation = document.createElement('div');

		for (var i = 0; i < command.length; i++) {
			var command_field = document.createElement('input');
			$(command_field).val(command[i][1]);
			$(command_field).attr('name', command[i][0]);
			$(command_field).attr('type', 'text');
			$(command_field).addClass('transparent');
			$(command_field).addClass('input-small');
			$(command_field).addClass('thin');

			$(comForm).append(command_field);
		};
		/*var comDiv = document.createElement('div');

		$(comDiv).html(command);*/
		$(translation).html(translateCommand(command));
		$(comForm).addClass('form-inline');
		$(comForm).addClass('sb-form');
		$(wrapper).addClass('separator');
		$(wrapper).append(comForm);
		$(wrapper).append(translation);
		
		return wrapper;
	}

	function translateCommand(command){
		return 'translation';
	}

	});