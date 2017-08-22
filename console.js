INPUT_HEAD = 'rahulbekal:~ guest$ ';


function initConsole() {
	// handle special keys:
	$(document).keydown(function(e) {
		key = e.which || e.keyCode;

		// if backspace
		if (key === 8 || key === 46) {
			e.preventDefault();
			return backspace();
		}
	})

	// handle letter keys:
	$(document).keypress(function(e){
		key = e.which || e.keyCode;

		// if enter/return
		if (key === 13) {
			return enter();
		}

		// otherwise, insert char into console
		letter = String.fromCharCode(key)
		lastLine = getLastLine();
		lastLine.html(lastLine.html() + letter)

	})

	function backspace() {
		k = getLastLine();
		if (k.html().length > INPUT_HEAD.length) {
			k.html(k.html().slice(0, -1));
		}
	}

	function enter() {
		lastLine = getLastLine()
		input = lastLine.html().slice(INPUT_HEAD.length);
		processInput(input);
		newLine(INPUT_HEAD);
	}
	function processInput(input) {
		commands = {

			'help': 'Welcome. You can type: <br>&nbsp;<span class="blue">bio</span>: Short bio about myself.<br>&nbsp;<span class="blue">social</span>: Get in touch <br>&nbsp;<span class="blue">interests</span>: Fun stuff<br>&nbsp;<span class="blue">languages</span>: A list of languages I have programmed in.<br>&nbsp;<span class= "blue">hackathons</span>: list of hackathons I have attended.<br>&nbsp<span class="blue">clear</span>: clear the page.',
			'bio': 'UCI Computer Science and Engineering Major',
			'social': '<span class="blue">&nbsp;Facebook: <a href="http://www.facebook.com/rahul.bekal.3" target="_blank">Rahul Bekal</a></span> <br><span class="green">&nbsp;Github: &nbsp;&nbsp;<a href="http://www.github.com/rahulb124" target="_blank">@rahulb124</a></span> <br>',
			'interests': 'Programming, Sports, Music',
			'languages': 'C++, Python, Javascript, HTML, PHP, Swift',
			'hackathons':'<span class="light-blue">&nbsp;HS Hacks @ Paypal HQ</span> <br><span class="green">&nbsp;CodeDay SF @ Lookout HQ &nbsp;</span><br><span class="blue">&nbsp;BeyondHacks @ Facebook HQ &nbsp;</span><br><span class="blue">&nbsp;HackUCI @ UCI &nbsp;</span><br><span class="blue">&nbsp;SBHacks @ UCSB &nbsp;</span><br>',
	
		}

		if (input in commands) {
			if (typeof commands[input] === 'function') commands[input]();
			else newLine(commands[input]);
		}
		else if (input == 'clear') {
			location.reload();
		}
		else if (input.length > 0) {
			newLine('-pseudobash: ' + input + ': command not found');
		}
	}

	function newLine(output) {
		k = getLastLine().clone();
		k.html(output);
		$("#console").append(k);
		// auto scroll down
		$("#console").scrollTop($("#console")[0].scrollHeight)
	}
	function getLastLine() {
		return $("#console").find(".consoleLine").last();
	}
}

function initAll() {
	initConsole();
}

$(document).ready(initAll);
