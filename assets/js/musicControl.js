function changeSound(e, audio) {
	"use strict";
	var thisSound = e.target.options[e.target.selectedIndex].value,
		soundsForm = document.getElementById('sounds-form'),
		soundPath = soundsForm.getAttribute('data-sounds-path') + thisSound,
		urlId = 'sound' + audio.id;

	if (thisSound === "0") {
		audio.src = "";
		return;
	}
	
	audio.type = 'audio/ogg';
	audio.src = soundPath;
	audio.load();

	queryHelper.changeParameter(urlId, 'src', thisSound);
}

function changeVolume(e, audio, volumeIcon) {
	"use strict";
	audio.volume = e.target.value / 100;

	switch(true) {
		case e.target.value > 80:
			volumeIcon.className = 'icon-volume-high';
			break;
		case e.target.value > 40:
			volumeIcon.className = 'icon-volume-medium';
			break;
		case e.target.value > 0:
			volumeIcon.className = 'icon-volume-low';
			break;
		default:
			volumeIcon.className = 'icon-volume-mute';
	}

	var urlId = 'sound' + audio.id;
	queryHelper.changeParameter(urlId, 'vol', e.target.value);
}

function changeState(e, audio, stateIcon) {
	"use strict";
	var newState;

	if (!audio.paused) {
		audio.pause();
		stateIcon.className = 'icon-play';
		newState = 'off';
	}
	else {
		audio.play();
		stateIcon.className = 'icon-pause';
		newState = 'on';
	}

	var urlId = 'sound' + audio.id;
	queryHelper.changeParameter(urlId, 'state', newState);
}

function createNewSoundControl(id) {
	"use strict";

	var	soundsForm = document.getElementById('sounds-form'),
		numberOfSounds = parseInt(soundsForm.getElementsByTagName('select').length, 10),
		id = (id !== undefined) ? id : numberOfSounds + 1,
		fieldset = document.createElement('fieldset'),
		legend = document.createElement('legend'),
		legendText = document.createTextNode(' Sound ' + id),
		legendIcon = document.createElement('span'),
		select = document.createElement('select'),
		stateControl = document.createElement('button'),
		stateIcon = document.createElement('span'),
		volumeControl = document.createElement('input'),
		volumeIcon = document.createElement('span'),
		audio = new Audio(),
		x;

	fieldset.id = 'sound' + id + '-container';
	legendIcon.className = 'icon-music';
	legend.appendChild(legendIcon);
	legend.appendChild(legendText);

	select.id = 'sound' + id + '-sound';

	select.addEventListener('change', function(e) {
		changeSound(e, audio);

		if (soundsForm.lastChild.getElementsByTagName('select')[0] === this) {
			//Create a new sound form if this is the last one
			createNewSoundControl();
		}
	});

	for (x in soundFiles) {
		var option = document.createElement('option');
		option.setAttribute('value', soundFiles[x]);
		option.text = soundFiles[x];
		select.appendChild(option);
	}

	volumeIcon.className = 'icon-volume-medium';
	volumeControl.setAttribute('type', 'range');
	volumeControl.setAttribute('min', 0);
	volumeControl.setAttribute('max', 100);
	volumeControl.setAttribute('value', 80);
	volumeControl.addEventListener('change', function(e) { changeVolume(e, audio, volumeIcon); });

	stateIcon.className = 'icon-pause';
	stateControl.setAttribute('type', 'button');
	stateControl.appendChild(stateIcon);
	stateControl.addEventListener('click', function(e) { changeState(e, audio, stateIcon); });

	audio.id = id;

	audio.addEventListener("canplay", function() {
		audio.play(); 
	});

	audio.addEventListener("ended", function() {
		audio.play(); 
	});

	fieldset.appendChild(legend);
	fieldset.appendChild(select);
	fieldset.appendChild(volumeControl);
	fieldset.appendChild(volumeIcon);
	fieldset.appendChild(stateControl);
	fieldset.appendChild(audio);

	soundsForm.appendChild(fieldset);

	return fieldset;
}

(function start() {
	var queries = queryHelper.getQueries(),
		select, option, soundId, fieldset,
		i, j, k;

	queries = {};

	for (i in queries) {
		if (queries[i]['src'] !== undefined) {
			soundId = i.replace("sound", "");
			fieldset = createNewSoundControl(soundId);
			select = document.getElementById(i + '-sound');

			for (j = 0, k = select.options.length; j < k; j = j + 1) {
				option = select.options[j];

				if (option.value === queries[i]['src']) {
					select.selectedIndex = j;
				}
			}
		}
	}

	createNewSoundControl();
})();