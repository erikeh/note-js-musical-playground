import { Howl } from 'howler';

export const fixedSound = (sound: string) => {
  if (sound) {
    const note = new Howl({
      src: [`${process.env.PUBLIC_URL}/audio/${sound}`],
      volume: 0.4,
    });
    note.play();
    return note;
  }
};

export const randomChord = (sound: string) => {
  if (sound) {
    const chord = new Howl({
      src: [`${process.env.PUBLIC_URL}/audio/${sound}`],
      volume: 0.5,
    });
    chord.play();
    return chord;
  }
};

export const drone1 = new Howl({
  src: [`${process.env.PUBLIC_URL}/audio/pad1.mp3`],
  volume: 0.5,
  loop: true,
});
