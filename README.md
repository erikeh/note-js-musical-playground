## What is NoteJS?

NoteJS is a gravity-based geometric musical playground, where the collision of various shapes will create different notes and sounds, based on the shape of the collision bodies themselves. No need for a musical background, all the shapes will eventually create a harmonious blend of pleasant tones, and visual flair.

## Why did you make this?

This project was created in 2 days as part of Hack Reactor's 2 day 'MVP' challenge. Rather than creating a simplified imitation of an existing app, I wanted to utilize the time to create something that I believed could bring genuine value, as well as a sense of novelty to the myriad of existing "weekend projects" that have been done over and over again. While I will continue to update some small bugs and performance, the "meat" of the application was done within the first 2 days)

## Motivation

I was highly inspired by the relationship of logic and sound that is present in [Modular Synths](https://www.noiseengineering.us/blog/what-is-a-modular-synth), particularly that of the [ambient music community](https://www.youtube.com/watch?v=GjYENsrLLf4). 


> _A quick primer for the uninitiated: Modular synths, unlike traditional music making, is composed of dozens of individual modules that can produce sound, generate control voltage, create logic, or any combination of the above. A user then uses declarative logic to define a set of "guidelines" for the both the timbre and pitch to be sequenced. This can be as simple as saying "all notes should be random", and as complex as implementing multiple levels of nested logic to define the perfect level of "custom randomness"_


I wanted to create an abstracted, streamlined UI implementation of how modular music is conceived and created, but simple enough that it would be accessible to anybody with a link. Each shape represents a predefined set of declarative logic that one would commonly use in modular synthesis
* Circles - Always play the same note at the set interval
* Triangles - Always randomize the note at the set interval, but make sure that the pitch frequency is defined within the current musical scale
* Pentagon - Never stop playing the defined note (or notes in this case) as long as the signal/gate is active 
* Rectangle - Round-robin through a defined set of musical notes or tones, and with each time the note is "struck" there is a higher and higher chance that this note will stop playing

### Then what does the big black-hole in the middle represent? (*Optional ramblings of a modular synth enthusiast*)

In modular music, whether it be software or hardware, there is a concept of a [gate](https://en.wikipedia.org/wiki/CV/gate#Gate). A **gate** is simply another term for when [control voltage](https://en.wikipedia.org/wiki/CV/gate) (the universal source of control in many hardware synthesizers, and the only option for modular synths, which is essentially AC voltage that is controlled to be anywhere between -10V to +10V) is above a threshold(usually ~8V) to trigger any given logic. The most common use is for a gate to trigger the playing of a **sound** (If you want to get specific, you would actually want to trigger an envelope generator which is technically another CV generator that defines the shape of the volume of the sound, but you get the point)

The black-hole is an abstracted representation of a **gate**. When a piece of logic (e.g. a triangle) makes contact with the **gate** (the black-hole), the gate triggers the logic associated with the triangle body (play a random note and change color). Gates do not have to be brief, they can be held as long as you want. This particular behavior is demonstrated by the pentagon's embedded logic -- A continuous note will play only as long as the **gate** is active, and will otherwise produce no sound.

## Built with

* React - Front-end framework
* MatterJS - Physics library
* HowlerJS - Audio playback library (all sounds were created by yours truly)
* Framer-motion - Animation library for tutorial text
* Express - Back-end framework
