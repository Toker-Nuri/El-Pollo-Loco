
/**
 * Audio element for the game sound
 * @type {HTMLAudioElement|null}
 */
const storedSoundSetting = typeof localStorage !== 'undefined'
    ? localStorage.getItem('soundEnabled')
    : null;
let soundEnabled = storedSoundSetting !== null ? storedSoundSetting === 'true' : true;
/**
 * Object containing all sound effects for the game.
 * @type {Object<string, HTMLAudioElement>}
 */

const sounds = {
    coin: new Audio('audio/coin.mp3'),
    boss_intro_sound: new Audio('audio/boss_intro_sound.mp3'),
    boss_dead: new Audio('audio/boss_dead.mp3'),
    bottle_collect: new Audio('audio/bottle_collect.mp3'),
    bottle_shatter: new Audio('audio/bottle_shatter.mp3'),
    bottle_throw: new Audio('audio/bottle_throw.mp3'),
    chicken_die: new Audio('audio/chicken_hurt.mp3'),
    game: new Audio('audio/game.mp3'),
    game_lost: new Audio('audio/game_lost.mp3'),
    game_won: new Audio('audio/game_won.mp3'),
    hurt: new Audio('audio/hurt.mp3'),
    running: new Audio('audio/running_3.mp3')
};

/**
 * Sets the game sound to loop and adjusts its volume and playback rate.
 * @type {HTMLAudioElement}
 */
sounds.running.loop = true;
sounds.running.volume = 0.8;
sounds.running.playbackRate = 4;
sounds.hurt.volume = 0.6;
sounds.chicken_die.volume = 0.4;
sounds.bottle_throw.volume = 0.3;
sounds.bottle_shatter.volume = 0.3;
sounds.bottle_collect.volume = 0.9;
sounds.game.volume = 0.06;
sounds.game.loop = true;
sounds.boss_dead.volume = 0.3;
sounds.boss_intro_sound.volume = 0.3;
sounds.coin.volume = 0.3;

/**
 * Plays a sound by its name if sound is globally enabled.
 *
 * @param {keyof typeof sounds} name - Name/key of the sound in the sounds map.
 * @param {{loop?: boolean, reset?: boolean}} [options] - Playback options.
 * @param {boolean} [options.loop=false] - Whether the sound should loop.
 * @param {boolean} [options.reset=true] - Whether playback should restart from the beginning.
 * @returns {void}
 */
function playSound(name, { loop = false, reset = true } = {}) {
    if (!soundEnabled) return;
    const audio = sounds[name];
    if (!audio) return;

    audio.loop = loop;
    if (reset) audio.currentTime = 0;

    audio.play().catch(() => { });
}

/**
 * Stops a specific sound by name.
 *
 * @param {keyof typeof sounds} name - Name/key of the sound in the sounds map.
 * @param {{reset?: boolean}} [options]
 * @param {boolean} [options.reset=false] - Whether the playback position should be reset to the beginning.
 * @returns {void}
 */
function stopSound(name, { reset = false } = {}) {
    const audio = sounds[name];
    if (!audio) return;
    audio.pause();
    if (reset) audio.currentTime = 0;
}

/**
 * Stops all sounds and resets their playback position.
 *
 * @returns {void}
 */
function stopAllSounds() {
    Object.values(sounds).forEach(a => {
        a.pause();
        a.currentTime = 0;
    });
}

/**
 * Pauses all currently playing sounds without resetting their playback position.
 *
 * @returns {void}
 */
function pauseAllSounds() {
    Object.values(sounds).forEach(a => {
        a.pause();
    });
}

/**
 * Toggles global audio on/off and updates the audio icon image accordingly.
 * When re-enabling audio, background music is resumed/started.
 *
 * @returns {void}
 */
function toggleAudioAndImage() {
    soundEnabled = !soundEnabled;
    if (typeof localStorage !== 'undefined') {
        localStorage.setItem('soundEnabled', soundEnabled ? 'true' : 'false');
    }
    updateAudioUI();
    if (!soundEnabled) {
        pauseAllSounds();
    } else if (typeof world !== 'undefined' && world) {
        playSound('game', { loop: true, reset: false });
    }
}

/**
 * Toggles sound from the settings overlay button.
 * Delegates to toggleAudioAndImage so that button and icon stay in sync.
 */
function toggleSound() {
    toggleAudioAndImage();
}

/**
 * Updates the audio icon and settings button text based on the current soundEnabled state.
 */
function updateAudioUI() {
    const icon = document.getElementById('audio-toggle');
    if (icon) {
        icon.src = soundEnabled ? 'img/icons/SOUND_ON_icon.png' : 'img/icons/SOUND_OFF_icon.png';
        icon.alt = soundEnabled ? 'Sound On' : 'Sound Off';
    }
    const settingsButton = document.getElementById('sound-control-btn');
    if (settingsButton) {
        settingsButton.textContent = soundEnabled ? 'Sound On' : 'Sound Off';
    }
}

if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        updateAudioUI();
    });

}