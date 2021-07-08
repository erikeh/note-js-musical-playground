import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux';
import { Howl, Howler } from 'howler';
import Matter from 'matter-js';

const randomSound = (sound) => {
  if (sound) {
    const note = new Howl({
      src: [`${process.env.PUBLIC_URL}/audio/${sound}`],
      volume: 0.5,
      onend: () => {

      }
    })
    note.play();

    return note;
  }

}

const randomChord = (sound) => {
  if (sound) {
    const chord = new Howl({
      src: [`${process.env.PUBLIC_URL}/audio/${sound}`],
      volume: 0.5
    })
    chord.play();
    return chord;
  }
}
const Sounds = () => {

  const dispatch = useDispatch();

}

