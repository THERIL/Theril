<template>
  <div class="w-5/6 relative mt-6 bg-orange-900 border-2 flex flex-col">
    <!-- NAME HEADER -->
    <div class="border-b-2 bg-blue-900">
      <p class="text-gray-100 text-2xl">
        <i class="fas fa-chess-king"></i>
        {{player.name}}
      </p>
    </div>
    <!-- AVATAR -->
    <img
      class="absolute top-0 right-0 -mt-5 -mr-5 rounded-full border-2"
      src="https://dummyimage.com/64.jpg"
      alt
      width="64px"
      height="64px"
      srcset
    />

    <!-- KIRI -->
    <div class="flex">
      <div id="kiri" class="w-4/6">
        <div class="flex flex-col">
          <div class="flex flex-col justify-evenly">
            <div class="flex mt-4">
              <img
                v-for="(n,i) in player.capacity"
                :class="[player.resources[0].amount<=i ? 'opacity-50' : 'opacity-100']"
                :src="require(`../assets/apple.png`)"
                :key="i"
                width="24"
                height="24"
              />
            </div>
            <div class="flex mt-2">
              <img
                v-for="(n,i) in player.capacity"
                :class="[player.resources[1].amount<=ni? 'opacity-50' : 'opacity-100']"
                :src="require(`../assets/clothes.png`)"
                :key="i"
                width="24"
                height="24"
              />
            </div>
            <div class="flex mt-2">
              <img
                v-for="(n,i) in player.capacity"
                :class="[player.resources[2].amount<=i ? 'opacity-50' : 'opacity-100']"
                :src="require(`../assets/jewelry.png`)"
                :key="i"
                width="24"
                height="24"
              />
            </div>
            <!-- <div class="flex mt-2">
              <i class="fas fa-boxes"></i>
              {{player.capacity}}
            </div>-->
            <div class="flex mt-2">
              <img
                v-for="(n,i) in 2"
                :class="[playerAssis<=i ? 'opacity-50' : 'opacity-100']"
                :src="require(`../assets/assistant.png`)"
                :key="i"
                width="24"
                height="24"
              />
            </div>
            <div class="flex items-center mt-2">
              <i class="fa fa-level-up text-gray-100" aria-hidden="true"></i>
              <p class="ml-2 text-gray-100 text-lg font-bold">Cart Lv: {{player.cart}}/4</p>
            </div>
          </div>
        </div>
      </div>
      <!-- END KIRI -->

      <!-- START KANAN -->
      <div id="kanan" class="w-2/6 ml-2">
        <div class="flex flex-col mt-4">
          <!-- FLEX DIAMOND -->
          <div class="w-full flex flex-wrap">
            <div v-for="(n,i) in 6" :key="i" class="w-1/3">
              <img
                :class="[player.diamond<=i ? 'opacity-50' : 'opacity-100']"
                :src="require(`../assets/diamond.png`)"
                :key="i"
                width="24"
                height="24"
              />
            </div>
          </div>
          <div class="flex flex-col">
            <!-- GOLD -->
            <div class="w-full flex">
              <img :src="require(`../assets/gold.png`)" :key="i" width="32" height="32" />
              <p class="text-gray-100 text-xl font-bold">{{player.gold}}</p>
            </div>

            <!-- MVSPEED -->
            <div class="w-full mt-2 flex">
              <div class="w-1/2" v-for="(n,i) in 2" :key="i">
                <i
                  :class="[player.movement<=i ? 'opacity-50' : 'opacity-100']"
                  class="fas fa-shoe-prints text-gray-100"
                ></i>
              </div>
            </div>
          </div>

          <!-- FLEX GOLD + MVSPEED -->
          <!-- <div class="w-1/2 flex flex-col justify-end font-bold">
        
          </div>-->
          <!-- END GOLD + MVSPEED -->
        </div>
      </div>
      <!-- END KANAN -->
    </div>
  </div>
</template>

<script>
export default {
    name: 'PlayerCard',
    props: ['player'],
    computed: {
      playerAssis () {
        let count = 0
        this.player.assistants.map(assistant => assistant.onDuty == false? count++:null)
        return count
      }
    }

}
</script>

<style>
</style>