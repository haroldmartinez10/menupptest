<template>
  <router-view />
</template>

<script>
import firebase from './database/firebase'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
  firebase
})
</script>
