function getSoundFiles() {
    var soundFiles = [
        'No sound',
        'birds1.ogg',
        'birds2.ogg',
        'birds3.ogg',
        'birds4.ogg',
        'birds5.ogg',
        'birds6.ogg',
        'birds7.ogg',
        'children1.ogg',
        'children2.ogg',
        'city1.ogg',
        'cows1.ogg',
        'crickets1.ogg',
        'drops1.ogg',
        'fire1.ogg',
        'hens1.ogg',
        'horses1.ogg',
        'horses2.ogg',
        'ocean1.ogg',
        'ocean2.ogg',
        'ocean3.ogg',
        'ocean4.ogg',
        'owl1.ogg',
        'railway1.ogg',
        'rain1.ogg',
        'rain2.ogg',
        'rain3.ogg',
        'rain4.ogg',
        'river1.ogg',
        'river2.ogg',
        'river3.ogg',
        'seagulls1.ogg',
        'sheeps1.ogg',
        'ship1.ogg',
        'ship2.ogg',
        'thunder1.ogg',
        'thunder2.ogg',
        'tropical1.ogg',
        'tropical2.ogg',
        'tropical3.ogg',
        'wind1.ogg',
        'woodland1.ogg',
        'woodland2.ogg',
        'woodland3.ogg'
    ];

    return soundFiles;
}

function changeSound(e, audio) {
    'use strict';

    var thisSound = e.target.options[e.target.selectedIndex].value,
        soundsForm = document.getElementById('sounds-form'),
        soundPath = soundsForm.getAttribute('data-sounds-path') + thisSound,
        urlId = 'sound' + audio.id;

    if (thisSound === '0') {
        audio.src = '';
        return;
    }

    audio.type = 'audio/ogg';
    audio.src = soundPath;
    audio.load();
}

function changeVolume(e, audio, volumeIcon) {
    'use strict';
    audio.volume = e.target.value / 100;

    switch (true) {
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
}

function changeState(e, audio, stateIcon) {
    'use strict';

    if (!audio.paused) {
        audio.pause();
        stateIcon.className = 'icon-play';
    } else {
        audio.play();
        stateIcon.className = 'icon-pause';
    }
}

function createNewSoundControl(id) {
    'use strict';

    var soundsForm = document.getElementById('sounds-form'),
        numberOfSounds = parseInt(soundsForm.getElementsByTagName('select').length, 10),
        fieldset = document.createElement('fieldset'),
        legend = document.createElement('legend'),
        id = id !== undefined ? id : numberOfSounds + 1,
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

    var soundFiles = getSoundFiles();

    for (x in soundFiles) {
        if (!soundFiles.hasOwnProperty(x)) continue;

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
    volumeControl.addEventListener('change', function(e) {
        changeVolume(e, audio, volumeIcon);
    });

    stateIcon.className = 'icon-pause';
    stateControl.setAttribute('type', 'button');
    stateControl.appendChild(stateIcon);
    stateControl.addEventListener('click', function(e) {
        changeState(e, audio, stateIcon);
    });

    audio.id = id;

    audio.addEventListener('canplay', function() {
        audio.play();
    });

    audio.addEventListener('ended', function() {
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
    createNewSoundControl();
})();
