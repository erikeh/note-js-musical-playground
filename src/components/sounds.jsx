import React, { useState, useEffect, useRef } from 'react'
import { Howl, Howler } from 'howler';
import Matter from 'matter-js';


export const randomSound = (sound) => {
  if (sound) {
    const note = new Howl({
      src: [`${process.env.PUBLIC_URL}/audio/${sound}`],
      volume: 0.5
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

