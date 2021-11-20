const soundFiles = [
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

const changeSound = (e, audio) => {
    const thisSound = e.target.options[e.target.selectedIndex].value;
    const soundsForm = document.getElementById('sounds-form');
    const soundPath = soundsForm.getAttribute('data-sounds-path') + thisSound;

    if (thisSound === '0') {
        audio.src = '';
        return;
    }

    audio.type = 'audio/ogg';
    audio.src = soundPath;
    audio.load();
};

const changeVolume = (e, audio, volumeIcon) => {
    audio.volume = e.target.value / 100;

    if (e.target.value >= 80) {
        volumeIcon.className = 'icon-volume-high';
    } else if (e.target.value >= 40) {
        volumeIcon.className = 'icon-volume-medium';
    } else if (e.target.value > 0) {
        volumeIcon.className = 'icon-volume-low';
    } else {
        volumeIcon.className = 'icon-volume-mute';
    }
};

const changeState = (audio, stateIcon) => {
    if (!audio.paused) {
        audio.pause();
        stateIcon.className = 'icon-play';
    } else {
        audio.play();
        stateIcon.className = 'icon-pause';
    }
};

const createNewSoundControl = () => {
    const soundsForm = document.getElementById('sounds-form');
    const numberOfSounds = parseInt(soundsForm.getElementsByTagName('select').length, 10);
    const fieldset = document.createElement('fieldset');
    const legend = document.createElement('legend');
    const id = numberOfSounds + 1;
    const legendText = document.createTextNode(' Sound ' + id);
    const legendIcon = document.createElement('span');
    const select = document.createElement('select');
    const stateControl = document.createElement('button');
    const stateIcon = document.createElement('span');
    const volumeControl = document.createElement('input');
    const volumeIcon = document.createElement('span');

    const audio = new Audio();

    fieldset.id = 'sound' + id + '-container';
    legendIcon.className = 'icon-music';
    legend.appendChild(legendIcon);
    legend.appendChild(legendText);

    select.id = 'sound' + id + '-sound';

    select.addEventListener('change', (e) => {
        changeSound(e, audio);

        if (soundsForm.lastChild.getElementsByTagName('select')[0] === e.target) {
            // Create a new sound form if this is the last one
            createNewSoundControl();
        }
    });

    for (const x in soundFiles) {
        if (!Object.hasOwnProperty.call(soundFiles, x)) continue;

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
    volumeControl.addEventListener('change', (e) => {
        changeVolume(e, audio, volumeIcon);
    });

    stateIcon.className = 'icon-pause';
    stateControl.setAttribute('type', 'button');
    stateControl.appendChild(stateIcon);
    stateControl.addEventListener('click', () => {
        changeState(audio, stateIcon);
    });

    audio.id = id;

    audio.addEventListener('canplay', () => {
        audio.play();
    });

    audio.addEventListener('ended', () => {
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
};

createNewSoundControl();
