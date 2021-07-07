import React, { useState, useEffect, useRef } from 'react'
import { Howl, Howler } from 'howler';
import Matter from 'matter-js';


const randomSound = (sound) => {
  const sounds = ['kick', 'perc1', 'perc2', 'perc3', 'shaker', 'tamb']
  if (sound) {
    const note = new Howl({
      src: [`${process.env.PUBLIC_URL}/audio/${sound}.mp3`],
      volume: 1
    })
    note.play();
    console.log(note);
    return note;
  }

}

export default randomSound;