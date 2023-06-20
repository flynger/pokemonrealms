/*
Alex G, flynger, Richard W, Harry

This file fetches and download pokemon sprites with pokemon showdown's api
*/
import Pokedex from "./src/pokedex.js";
import { promises as fs } from 'fs';

async function downloadImg(url, location, species) {
    let image;
    try {
        image = await fetch(`${url}/${species}.gif`);
        if (!image.ok) {
            return;
        }
    } catch (err) {
        console.error(err);
        return;
    }
    const blob = await image.blob();
    const arrayBuffer = await blob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await fs.writeFile(`${location}${species}.gif`, buffer, { flag: 'wx' });
}

let url = 'https://play.pokemonshowdown.com/sprites/gen5ani'
let spriteFormat = ['', '-shiny', '-back', '-back-shiny']
let dir = './client/res/pokemon/showdown_sprites/';
let subDir = ['front/', 'front/shiny/', 'back/', 'back/shiny/']

let counter = 0;

for (let pkmn in Pokedex) {
    if(Pokedex[pkmn].id === 650) break;
    let species = Pokedex[pkmn].species.toLowerCase();
    console.log(species)
    setTimeout(function(){
        for (let i = 0; i < spriteFormat.length; i++) {
        downloadImg(url + spriteFormat[i], dir + subDir[i], species);
        }
    }, 50 * counter);
    counter++;
}