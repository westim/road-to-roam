import { CPlayer } from "./small-player";
// This music has been exported by SoundBox. You can use it with
// http://sb.bitsnbites.eu/player-small.js in your own product.

// See http://sb.bitsnbites.eu/demo.html for an example of how to
// use it in a demo.

// Song data
var song = {
    songData: [
        { // Instrument 0
            i: [
                2, // OSC1_WAVEFORM
                100, // OSC1_VOL
                128, // OSC1_SEMI
                0, // OSC1_XENV
                0, // OSC2_WAVEFORM
                201, // OSC2_VOL
                128, // OSC2_SEMI
                0, // OSC2_DETUNE
                0, // OSC2_XENV
                0, // NOISE_VOL
                0, // ENV_ATTACK
                6, // ENV_SUSTAIN
                58, // ENV_RELEASE
                0, // ENV_EXP_DECAY
                0, // ARP_CHORD
                0, // ARP_SPEED
                0, // LFO_WAVEFORM
                195, // LFO_AMT
                6, // LFO_FREQ
                1, // LFO_FX_FREQ
                2, // FX_FILTER
                135, // FX_FREQ
                0, // FX_RESONANCE
                0, // FX_DIST
                32, // FX_DRIVE
                60, // FX_PAN_AMT
                6, // FX_PAN_FREQ
                60, // FX_DELAY_AMT
                6 // FX_DELAY_TIME
            ],
            // Patterns
            p: [1, 2, 1, 3],
            // Columns
            c: [
                {
                    n: [147, , , , , , 149, , , 151, , , , , 152, 151, , , 149, , , , , , 146, , , 142, , , , , 144, 146],
                    f: []
                },
                {
                    n: [147, , , , , , 144, , , 144, , , , , 143, 144, , , 146, , , , , , 143, , , 139, , , , , , 144],
                    f: []
                },
                {
                    n: [147, , , , , , 144, , , 143, , , , , 141, 143, , , 144, , , , , , , , , 144],
                    f: []
                }
            ]
        },
        { // Instrument 1
            i: [
                2, // OSC1_WAVEFORM
                100, // OSC1_VOL
                128, // OSC1_SEMI
                0, // OSC1_XENV
                3, // OSC2_WAVEFORM
                201, // OSC2_VOL
                128, // OSC2_SEMI
                0, // OSC2_DETUNE
                0, // OSC2_XENV
                0, // NOISE_VOL
                5, // ENV_ATTACK
                6, // ENV_SUSTAIN
                59, // ENV_RELEASE
                0, // ENV_EXP_DECAY
                0, // ARP_CHORD
                0, // ARP_SPEED
                0, // LFO_WAVEFORM
                195, // LFO_AMT
                6, // LFO_FREQ
                1, // LFO_FX_FREQ
                2, // FX_FILTER
                135, // FX_FREQ
                0, // FX_RESONANCE
                0, // FX_DIST
                32, // FX_DRIVE
                21, // FX_PAN_AMT
                6, // FX_PAN_FREQ
                60, // FX_DELAY_AMT
                6 // FX_DELAY_TIME
            ],
            // Patterns
            p: [4, 5, 4, 6],
            // Columns
            c: [
                {
                    n: [],
                    f: []
                },
                {
                    n: [],
                    f: []
                },
                {
                    n: [],
                    f: []
                },
                {
                    n: [120, , , , , , , , , , , , , , , , , , 118],
                    f: []
                },
                {
                    n: [116, , , , , , , , , , , , , , , , , , 115],
                    f: []
                },
                {
                    n: [116, , , , , , , , , 115, , , , , , 119, , , 120, , , 115, , , 111, , , 120],
                    f: []
                }
            ]
        },
    ],
    rowLen: 5513,   // In sample lengths
    patternLen: 36,  // Rows per pattern
    endPattern: 3,  // End pattern
    numChannels: 2  // Number of channels
};

var player = new CPlayer();
player.init(song);

// Generate music...
var done = false;
setInterval(function() {
    if (done) {
        return;
    }

    done = player.generate() >= 1;

    if (done) {
        // Put the generated song in an Audio element.
        var wave = player.createWave();
        var audio = document.createElement("audio");
        audio.src = URL.createObjectURL(new Blob([wave], { type: "audio/wav" }));
        audio.loop = true;
        audio.play();
    }
}, 0);

