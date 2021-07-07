import React, { useState, useEffect, useRef } from 'react'
import { Howl, Howler } from 'howler';
import Matter from 'matter-js';


const randomDrum = (sound) => {
  const sounds = ['kick', 'perc1', 'perc2', 'perc3', 'shaker', 'tamb']
  if (sound) {
    const drum = new Howl({
      src: [`${process.env.PUBLIC_URL}/audio/${sound}.wav`],
      volume: 1
    })
    drum.play();
    return;
  }
  let randomIndex = Math.floor(Math.random() * sounds.length);
  let randomSound = sounds[randomIndex];
  // console.log(randomSound);
  const kick = new Howl({
    src: [`${process.env.PUBLIC_URL}/audio/${randomSound}.wav`],
    volume: 1
  })
  kick.play();
}

export default randomDrum;