let soundEnabled = true;

const sounds = {
    coin: new Audio('audio/coin.mp3'),
    boss_intro_sound: new Audio('audio/boss_intro_sound.mp3'),
    boss_Dead: new Audio('audio/boss_dead.mp3'),
    bottle_collect: new Audio('audio/bottle_collect.mp3'),
    bottle_shatter: new Audio('audio/bottle_shatter.mp3'),
    bottle_throw: new Audio('audio/bottle_throw.mp3'),
    chicken_die: new Audio('audio/chicken_hurt.mp3'),
    game_lost: new Audio('audio/game_lost.mp3'),
    game_won: new Audio('audio/game_won.mp3'),
    hurt: new Audio('audio/hurt.mp3'),
    running: new Audio('audio/running_3.mp3')
};

sounds.running.loop = true;
sounds.running.volume = 0.4;
sounds.running.playbackRate = 4;
sounds.chicken_die.volume = 0.3;

function playSound(name, { loop = false, reset = true } = {}) {
    if (!soundEnabled) return;
    const audio = sounds[name];
    if (!audio) return;

    audio.loop = loop;
    if (reset) audio.currentTime = 0;

    audio.play().catch(() => {});
}

function stopSound(name, { reset = false } = {}) {
    const audio = sounds[name];
    if (!audio) return;
    audio.pause();
    if (reset) audio.currentTime = 0;
}

function stopAllSounds() {
    Object.values(sounds).forEach(a => {
        a.pause();
        a.currentTime = 0;
    });
}

function toggleAudioAndImage() {
    soundEnabled = !soundEnabled;
    const icon = document.getElementById('audio-toggle');
    if (!icon) return;

    if (soundEnabled) {
        icon.src = 'img/icons/SOUND_ON_icon.png';
        icon.alt = 'Sound On';
    } else {
        icon.src = 'img/icons/SOUND_OFF_icon.png';
        icon.alt = 'Sound Off';
        stopAllSounds();
    }
}