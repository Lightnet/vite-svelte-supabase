<script>
  import { onMount } from "svelte";
  import { supabase } from "../../libs/supabaseclient";
  import Avatar from './Avatar.svelte'

  export let session;

  let loading = false
  let username="";
  let website="";
  let avatarUrl = null

  onMount(() => {
    getProfile()
  })

  const getProfile = async () => {
    try {
      loading = true
      const { user } = session
      
      const { data, error, status } = await supabase
        .from('profiles')
        .select('username, website, avatar_url')
        .eq('id', user.id)
        .single()
      
      if (error && status !== 406) throw error

      if (data) {
        username = data.username
        website = data.website
        avatarUrl = data.avatar_url
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      }
    } finally {
      loading = false
    }
  }

  const updateProfile = async () => {
    try {
      loading = true
      const { user } = session

      const updates = {
        id: user.id,
        username,
        website,
        avatar_url: avatarUrl,
        updated_at: new Date().toISOString(),
      }

      let { error } = await supabase.from('profiles').upsert(updates)
      
      if (error) {
        throw error
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      }
    } finally {
      loading = false
    }
  }
</script>

<div>
  <div>Email: {session.user.email}</div>
  <div>
    <label for="username">Name</label>
    <input id="username" type="text" bind:value={username} />
  </div>
  <div>
    <label for="website">Website</label>
    <input id="website" type="text" bind:value={website} />
  </div>
  <div>
    <Avatar bind:url={avatarUrl} size={150} on:upload={updateProfile} />
  </div>
  <div>
    <button type="submit" class="button primary block" disabled={loading} on:click={updateProfile}>
      {loading ? 'Saving ...' : 'Update profile'}
    </button>
  </div>
  <button type="button" class="button block" on:click={() => supabase.auth.signOut()}>
    Sign Out
  </button>
</div>