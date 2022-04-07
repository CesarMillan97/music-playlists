<template>
  <form @submit.prevent="handleSubmit">
     <h4>Create new Playlist</h4>
     <input type="text" placeholder="Playlist Title" required v-model="title">
     <textarea required placeholder="Playlist Description..." v-model="description"></textarea>
     <!-- Upload Image -->
     <label>Upload playlist cover image</label>
     <input type="file" @change="handleChange">
     <div class="error">{{ fileError }}</div>
     <div class="error"></div>
     <button v-if="!isPending">Create</button>
     <button v-if="isPending" disabled>Saving...</button>
  </form>
</template>

<script>
import useStorage from '../../composables/useStorage'
import { ref } from '@vue/reactivity'
import useCollection from '../../composables/useCollection'
import getuser from '../../composables/getUser'
import { timestamp } from '../../firebase/config'
import { useRouter } from 'vue-router'

export default {
   setup(){
      const title = ref('')
      const description = ref('')
      const file = ref(null)
      const fileError = ref(null)
      const isPending = ref(false)
      const router = useRouter()

      const { filePath, url, uploadImage } = useStorage()
      const { error, addDoc } = useCollection('playlists')
      const { user } = getuser()

      const handleSubmit = async() => {
         if (file.value) {
            // Start isPending
            isPending.value = true
            await uploadImage(file.value)
            const res = await addDoc({
               title: title.value,
               description: description.value,
               userId: user.value.uid,
               userName: user.value.displayName,
               coverUrl: url.value,
               filePath: filePath.value,
               songs: [],
               createdAt: timestamp()
            })
            isPending.value = false
            if (!error.value) {
               router.push({ name: 'PlaylistDetails', params: { id: res.id }})
            }
         }
         
      }
      // Allowed file types
      const types = ['image/png', 'image/jpeg']
      const handleChange = (e) => {
         const selected = e.target.files[0]

         if (selected && types.includes(selected.type)) {
            file.value = selected
            console.log(file.value);
            fileError.value = null
         } else {
            file.value = null
            console.log(file.value);
            fileError.value = 'Please select a PNG or JPEG'
         }
      }

      return { isPending, title, description, handleSubmit, handleChange, fileError, filePath, url, uploadImage }
   }
}
</script>

<style>
   input[type="file"]{
      border: 0;
      padding: 0;
   }
   label {
      font-size: 12px;
      display: block;
      margin-top: 30px;
   }
   button{
      margin-bottom: 20px;
   }
</style>