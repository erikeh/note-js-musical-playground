import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux';
import { Howl, Howler } from 'howler';
import Matter from 'matter-js';

export const fixedSound = (sound) => {
  if (sound) {
    const note = new Howl({
      src: [`${process.env.PUBLIC_URL}/audio/${sound}`],
      volume: 0.4,
    })
    note.play();
    return note;
  }
}

export const randomChord = (sound) => {
  if (sound) {
    const chord = new Howl({
      src: [`${process.env.PUBLIC_URL}/audio/${sound}`],
      volume: 0.5
    })
    chord.play();
    return chord;
  }
}

export const drone1 = new Howl({
  src: [`${process.env.PUBLIC_URL}/audio/pad1.mp3`],
  volume: 0.5,
  loop: true,
})