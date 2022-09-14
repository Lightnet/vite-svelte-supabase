<script>
  import { createEventDispatcher } from "svelte";
  import { supabase } from "../../libs/supabaseclient";

  export let size;
  export let url;
  
  let avatarUrl = null
  let uploading = false
  let files;

  const dispatch = createEventDispatcher()

  const downloadImage = async (path) => {
    try {
      const { data, error } = await supabase.storage.from('avatars').download(path)

      if (error) {
        throw error
      }

      const url = URL.createObjectURL(data)
      avatarUrl = url
    } catch (error) {
      if (error instanceof Error) {
        console.log('Error downloading image: ', error.message)
      }
    }
  }

  const uploadAvatar = async () => {
    try {
      uploading = true

      if (!files || files.length === 0) {
        throw new Error('You must select an image to upload.')
      }

      const file = files[0]
      const fileExt = file.name.split('.').pop()
      const filePath = `${Math.random()}.${fileExt}`

      let { error } = await supabase.storage
        .from('avatars')
        .upload(filePath, file)
      
      if (error) {
        throw error
      }

      url = filePath
      dispatch('upload')
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      }
    } finally {
      uploading = false
    }
  }

  $: if (url) downloadImage(url)
</script>

<div style="width: {size}px" aria-live="polite">
  {#if avatarUrl}  
    <img
      width={size}
      height={size}
      src={avatarUrl}
      alt={avatarUrl ? 'Avatar' : 'No image'}
      class="avatar image"
      style="height: {size}px, width: {size}px"
    />
  {:else}
    <div
      class="avatar no-image"
      style="height: {size}px, width: {size}px"
    />
  {/if}
  <div style="width: {size}px">
    <label class="button primary block" for="single">
      {uploading ? 'Uploading ...' : 'Upload avatar'}
    </label>
    <span style="display:none">
      <input
        type="file"
        id="single"
        accept="image/*"
        bind:files
        on:change={uploadAvatar}
        disabled={uploading}
      />
    </span>
  </div>
</div>