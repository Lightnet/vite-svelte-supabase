/*
  Project Name: vite-svelte-supabase
  License: MIT
  Created by: Lightnet
*/

// vite.config.js
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  plugins: [
    svelte({
      /* plugin options */
      //customElement:true
    })
  ]
});