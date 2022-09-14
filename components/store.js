import { writable } from 'svelte/store';
import { onMount, onDestroy } from 'svelte';

//const count = writable(0);
//count.subscribe(value => {
	//console.log(value);
//}); // logs '0'
//count.set(1); // logs '1'
//count.update(n => n + 1); // logs '2'

export const authUser = writable(null);
export const authSession = writable(null);