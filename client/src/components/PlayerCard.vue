<template>
  <div class="card bg-gray-500 bg-opacity-75 border-2 p-2 flex">
    <!-- KIRI -->
    <div id="kiri" class="w-4/6">
      <div class="border-b-2 bg-blue-900">
        <p class="text-gray-100 text-2xl">
          <i class="fas fa-chess-king"></i>
          {{player.name}}
        </p>
      </div>

      <div class="flex flex-col">
        <div class="flex flex-col">
          <div class="flex">
            <img
              v-for="(n,i) in player.resources[0].amount"
              :src="require(`../assets/apple.png`)"
              :key="i"
              width="24"
              height="24"
            />
          </div>
          <div class="flex">
            <img
              v-for="(n,i) in player.resources[1].amount"
              :src="require(`../assets/clothes.png`)"
              :key="i"
              width="24"
              height="24"
            />
          </div>
          <div class="flex">
            <img
              v-for="(n,i) in player.resources[2].amount"
              :src="require(`../assets/jewelry.png`)"
              :key="i"
              width="24"
              height="24"
            />
          </div>
        </div>

        <div class="flex flex-col">
          <div class="flex">
            <i class="fa fa-level-up" aria-hidden="true"></i>
            {{player.cart}}
          </div>
          <div class="flex">
            <i class="fas fa-boxes"></i>
            {{player.capacity}}
          </div>
          <div class="flex">
            <img
              v-for="(n,i) in playerAssis"
              :src="require(`../assets/assistant.png`)"
              :key="i"
              width="24"
              height="24"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- END KIRI -->

    <!-- START KANAN -->
    <div id="kanan" class="w-2/6 border ml-2">
      <div class="flex relative">
        <!-- AVATAR -->
        <img
          class="absolute top-0 right-0 -mt-5 -mr-5 rounded-full border-2"
          src="https://dummyimage.com/64.jpg"
          alt
          width="64px"
          height="64px"
          srcset
        />

        <!-- FLEX DIAMOND -->
        <div class="w-1/2 flex flex-col">
          <img
            v-for="(n,i) in 6"
            :class="[player.diamond<=i ? 'opacity-50' : 'opacity-100']"
            :src="require(`../assets/diamond.png`)"
            :key="i"
            width="24"
            height="24"
          />
        </div>

        <!-- FLEX GOLD + MVSPEED -->
        <div class="w-1/2 flex flex-col justify-end font-bold">
          <!-- GOLD -->
          <div class="flex">
            <img :src="require(`../assets/gold.png`)" :key="i" width="24" height="24" />
            <p>{{player.gold}}</p>
          </div>
          <!-- MVSPEED -->
          <div class="flex">
            <p>
              <i class="fas fa-shoe-prints"></i>
              {{player.movement}}
            </p>
          </div>
        </div>
        <!-- END GOLD + MVSPEED -->
      </div>
    </div>
    <!-- END KANAN -->
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