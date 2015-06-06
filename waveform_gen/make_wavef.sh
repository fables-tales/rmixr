#!/usr/bin/env bash
set -e -x
./waveform/waveform --png-width 840 --png-height 94 --png-color-bg 00000000 --png-color-center ffffffff --png-color-outer ffffffff ../source_audio/$1.mp3 --png ../img/$1.png