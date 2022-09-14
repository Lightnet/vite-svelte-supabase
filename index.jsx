/*
  Project Name: vite-preact-supabase
  License: MIT
  Created by: Lightnet
*/

// https://sustainablewww.org/principles/how-to-implement-routes-in-your-svelte-web-application-using-svelte-routing

import "./styles.css";

import App from './components/App.svelte'

const app = new App({
	target: document.body,
  //hydrate: true,
	props: {

	}
});

//console.log(app)
//app.$destroy();

if (import.meta.hot) { //< module.hot
  //console.log(import.meta.hot)
  import.meta.hot.accept() //< module.hot.accept()
  import.meta.hot.dispose(()=>{
    app.$destroy();
  }) //< module.hot.dispose(dispose)
  //console.log("Hot Reload...")
}
/*

*/