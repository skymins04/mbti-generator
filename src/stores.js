// stores.js
import { writable } from 'svelte/store';

export const selectedObj = writable('');
export const objInfo = writable({});
export const ctrlKey = writable(false);