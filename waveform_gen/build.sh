#!/usr/bin/env bash
set -e -x
git clone git@github.com:andrewrk/waveform.git
# note, does not install depends

cd waveform
make

