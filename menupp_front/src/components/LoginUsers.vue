<template >
  <CreateNewAccount :handleCreateNewAccount="handleCreateNewAccount"  v-if="createAccountView"/>
  <div v-else class="q-pa-md bg-grey-10 text-white flex justify-center items-center" style="width: 100%; height: 100vh;">
   <form  @submit="handleLogin">
      <h5 class="text-bold text-center ">Menüpp Login </h5>
    <div class="q-gutter-y-md column" style="width: 300px;">
      <q-input v-model="loginAccountData.email" type="email" color="white" standout="bg-grey-10 text-white" dark filled label="Email" required  >
      </q-input>
      <q-input v-model="loginAccountData.password" type="password" color="white" standin="bg-grey-10 text-white" standout="bg-grey-10 text-white" dark filled label="Password" required >
      </q-input>
      <q-btn type="submit" class="bg-blue-7 text-bold" color="white" text-color="white" size="12px" label="Login" />
      <q-btn @click="handleCreateNewAccount" type="button" class="bg-green-7 text-bold" color="white" text-color="white" size="12px" label="Create new account" />
      <span class="text-center bg-red-7">{{ errorMsg }}</span>
    </div>
  </form>
  </div>
</template>
<script>

import CreateNewAccount from './CreateNewAccount.vue'
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'

export default {
  data () {
    return {
      loginAccountData: {
        email: '',
        password: ''
      },
      createAccountView: false,
      errorMsg: ''
    }
  },
  methods: {
    handleLogin (e) {
      e.preventDefault()
      const auth = getAuth()
      signInWithEmailAndPassword(auth, this.loginAccountData.email, this.loginAccountData.password)
        .then((userCredential) => {
          const user = userCredential.user
          console.log(user)
        })
        .catch((error) => {
          const errorMessage = error.message
          this.errorMsg = errorMessage
          if (errorMessage === 'Firebase: Error (auth/wrong-password).') {
            this.errorMsg = 'Incorrect password'
            setTimeout(() => {
              this.errorMsg = ''
            }, 3000)
          }

          if (errorMessage === 'Firebase: Error (auth/user-not-found).') {
            this.errorMsg = 'Email not registered'
            setTimeout(() => {
              this.errorMsg = ''
            }, 3000)
          }
          console.log(errorMessage)
        })
      this.loginAccountData.email = ''
      this.loginAccountData.password = ''
    },
    handleCreateNewAccount () {
      this.createAccountView = !this.createAccountView
    }
  },
  mounted () {
    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid
        console.log(uid)
        this.$router.push('/userimages')
      }
    })
  },
  components: {
    CreateNewAccount
  }

}
</script>
