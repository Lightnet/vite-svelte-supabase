<script>
  import { get } from 'svelte/store';
  import { onMount, onDestroy } from 'svelte';
  import { supabase } from '../libs/supabaseclient';
  import Account from './auth/Account.svelte';
  import Auth from './auth/Auth.svelte'
  import { authSession } from "./store";

  let session;

  const unsubscribeSession = authSession.subscribe(value => {
    session = value;
    console.log(session)
  });

  const sessionValue = get(authSession);
  console.log(sessionValue)

  onDestroy(() => {
    unsubscribeSession();
  });

  onMount(() => {
    //check if session exist
    let _session = supabase.auth.session();
    if(_session){
      session=_session
      authSession.set(_session)
    }
    //listen if auth change for session
    supabase.auth.onAuthStateChange((_event, _session) => {
      session = _session
      authSession.set(_session)
    })
  })
</script>
<!--Add this line to your web component-->
<!--
<svelte:options tag="my-app" />
-->

<div class="container" style="padding: 50px 0 100px 0">
  {#if !session}
    <Auth />
  {:else}
    <Account {session} />
  {/if}
</div>