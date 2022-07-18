<script  lang="ts">
import { defineComponent } from 'vue'
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useRouter } from 'vue-router'

export default defineComponent({
    setup(){
      const auth = getAuth()
      const user = auth.currentUser
      console.log(user)
    },
    data(){
        const router = useRouter();
        const auth = getAuth();
        return{
            login: '',
            haslo: '',
            router,
            auth,
            
        }
    },
    methods:{
        logowanie(){ try{
          signInWithEmailAndPassword(this.auth, this.login, this.haslo)
          .then((userCredential) => {
              // Signed in 
            const user = userCredential.user;
            if(user != null){
              this.router.push({name: 'pogoda'})
            }  
            else{          
            }
                    
                // ...
              })
              .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
              })
  }
  catch{
    console.log('nie udało się')
  }
    },
    
    }
})
</script>
<template>

    <div class="d-flex justify-content-center border colors ">
    
    <div class="container">
    <div class="container">
    <div class="d-flex justify-content-center  ">
    <div class="row">
    <div class="col d-flex justify-content-center pt-2">
    <img alt="Vue logo" class="logo" src="@/assets/logo.webp" width="125" height="125" />
    </div>
    <form @submit.prevent="logowanie">
    <div class="pt-3">
    <input type="text" class="form-control " v-model="login" placeholder="E-mail" required>
    </div>
    <div class="pt-2">
    <input type="password" class="form-control " v-model="haslo" placeholder="Hasło" required>
    </div>
    <div class="row pt-2">
    <div class="d-flex justify-content-center">
    <button type="submit" class="btn btn-primary">Zaloguj</button>
    </div></div>
    </form>
    <div class="row pt-2">
    <div class="d-flex justify-content-center">
    <div>Nie masz konta? <router-link to='/Register'>Zarejestruj się!</router-link></div>
    </div></div>
    
    </div>
    </div>
    </div>
    </div>
    </div>
</template>
<style>
.colors{
  background-color:lightblue;
  border-radius: 25px;
  max-width:500px
}

</style>