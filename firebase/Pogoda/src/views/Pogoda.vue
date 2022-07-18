<script setup lang="ts">
import Pogoda from "../components/Pogoda.vue"
import Read from "../components/Read.vue"
import { getAuth, signOut  } from"firebase/auth";
import { ref } from 'vue'
import { useRouter} from 'vue-router'
const router = useRouter()
const auth = getAuth();
const user = ref(auth.currentUser);

const wyloguj = () =>{
            signOut(auth).then(() => {
            router.push('/')
            }).catch((error) => {
                //console.log('Error in logout', error)
            });
}
  

</script>
<template>
    
    
    <div class="sticky-top p-4">
    <nav class=" d-flex navbar justify-content-end ">
    <div class="row">
    <div class="col">
    <div class="pe-5"><Read /></div>
    </div>
    <div class="col pt-3">
    <div class="d-flex ">
    <form @submit.prevent ="wyloguj">
      <div v-if="user != null"><button class="btn btn-primary">Wyloguj</button></div>
      </form>
      </div>
      </div>
    </div>
    </nav>
    </div>
    
    
    <div>
   
    <Pogoda />
    
    
    </div>
    
   
    
 
</template>

<style scoped>
.about {
    min-height: 100vh;
    display: flex;
    
  }
</style>