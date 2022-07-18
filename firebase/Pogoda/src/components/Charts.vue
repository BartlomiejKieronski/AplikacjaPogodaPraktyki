<template>
<div>
 <p> <router-link to="/Pogoda">  Powrót do Pogody</router-link></p>
<div>
  <LineChart :chart-data="TemperaturaData" />
</div>
<div>
  <LineChart :chart-data="WilgotnoscData" />
</div>

</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, onBeforeMount } from 'vue'
import { LineChart } from 'vue-chart-3';
import { Chart, registerables } from "chart.js";
import { collection, getDocs, doc, setDoc,addDoc, onSnapshot, limit, where, query, orderBy} from 'firebase/firestore'
import { db } from '@/firebase'
import { useRouter, useRoute} from 'vue-router'
import { getAuth, signOut  } from"firebase/auth";
Chart.register(...registerables);

export default defineComponent({
  name: 'Home',
  components: { LineChart },
  setup() {
    const msg = ref('< Powrót do pogody')
    const auth = getAuth()
    const user = auth.currentUser
    const email = user.email
    const router = useRouter()
    const route = useRoute()
    var iden = ref(route.params.id)
    
    //dane do bazy
    const PogodaCollection = collection(db , 'user', `${email}`,'Temperatury')
    const WilgotnoscCollection = collection(db , 'user',`${email}`,'Wilgotnosc')
    const PogodaQuerry = query(PogodaCollection, orderBy('dataNow', 'desc'), limit(100))
    const WilgotnoscQuerry = query(WilgotnoscCollection, orderBy('dataNow', 'desc'), limit(100))
   //zmienne przechowujące dane
    const temperatura = ref([])
    const wilgotnosc = ref([])
    
    const dataTemp = ref([])
    const dataWil = ref([])
    
    
    
    //pobieranie temepratury z bazy
    onSnapshot(PogodaQuerry, (querySnapshot)=>{
                    let dane = []
                    
                    querySnapshot.forEach((doc)=>{
                        const  obserwowane = {
                            temperatura: doc.data().Temperatura,
                            id: doc.data().id,
                            data: doc.data().data,
                            datanow: doc.data().dataNow
                         }
                        dane.push(obserwowane)
                      console.log(obserwowane)
                        
                    })
                    //console.log(dane)
                    //filtrowanie danych
                    for(var i=0; i<dane.length;i++){
                      if(dane[i].id == iden.value){
                       temperatura.value.push(dane[i].temperatura)
                       dataTemp.value.push(dane[i].data)
                    }}
                    //console.log(temperatura)
                    //console.log(dataTemp)

  })

  //pobieranie danych wilgotności z bazy
  onSnapshot(WilgotnoscQuerry, (querySnapshot)=>{
                    let danewil= []
                    
                    querySnapshot.forEach((doc)=>{
                        const wil= {
                            Wilogtnosc: doc.data().Wilogtnosc,
                            id: doc.data().id,
                            data: doc.data().data,
                            datanow: doc.data().dataNow
                         }
                        danewil.push(wil)
                        //console.log(wil)
                        
                    })
                    //console.log(dane)
                    //filtrowanie danych
                    for(var a=0; a<danewil.length;a++){
                       if(danewil[a].id == iden.value){
                       wilgotnosc.value.push(danewil[a].Wilogtnosc)
                       dataWil.value.push(danewil[a].data)
                       
                    }}
                    //console.log(wilgotnosc)
                    
                    
  })

  //wykres temperatury
  const TemperaturaData = {
      labels: dataTemp.value,
      datasets: [
        {
            label:'temperatura',
          data: temperatura.value,
          backgroundColor: '#000080'
        },
      ],
    };
    //wykres wilgotności
    const WilgotnoscData = {
      labels: dataWil.value,
      datasets: [
        {
          label:'Wilgotnosc',
          data: wilgotnosc.value,
          backgroundColor: '#000080'
        },
      ],
    };
    var i = 0

    return {WilgotnoscData, TemperaturaData, temperatura, wilgotnosc, dataTemp };
  },
});
</script>