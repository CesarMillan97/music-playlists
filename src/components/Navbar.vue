<template>
  <div class="navbar">
     <nav>
        <h1><router-link :to="{name: 'Home'}">Home</router-link></h1>
        <div class="links">
           <router-link :to="{name: 'CreatePlaylist'}" v-if="user">Create Playlist</router-link>
           <button @click="handleSubmit" v-if="user">Logout</button>
           <router-link class="btn" :to="{ name: 'Signup' }" v-if="!user">Sign up</router-link>
           <router-link class="btn" :to="{ name: 'Login' }" v-if="!user">Login</router-link>
        </div>
     </nav>
  </div>
</template>

<script>
import useLogout from '@/composables/useLogout'
import getUser from '@/composables/getUser'
import { useRouter } from 'vue-router'

export default {
   setup(){
      const router = useRouter()      
      const { user } = getUser()
      const { logout } = useLogout()
      const handleSubmit = async() =>{
         await logout()
         console.log('User logged out');
         router.push({ name: 'Login' })
      }
      return { logout, handleSubmit, user }
   }
}
</script>

<style scoped>
   .navbar{
      padding: 16px 10px;
      margin-bottom: 60px;
      background: white;
   }
   nav{
      display: flex;
      align-items: center;
      max-width: 1200px;
      margin: 0 auto;
   }
   nav h1 {
      margin-left: 20px;
   }
   nav .links {
      margin-left: auto;
   }
   nav .links a, button{
      margin-left: 16px;
      font-size: 14px;
   }
</style>