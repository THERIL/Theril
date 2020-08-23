<template>
  <div class="card bg-gray-500 bg-opacity-75 border-2 p-2 flex">
    <div id="kiri" class="w-4/6 border">
      <div class="border-b-2">
        <p>
          <i class="fas fa-chess-king"></i>
          {{player.name}}
        </p>
      </div>
      <div>
        <div class="flex justify-evenly">
          <div>
            <p>
              <i class="fas fa-drumstick-bite text-red-600"></i> 1
            </p>
          </div>
          <div>
            <p>
              <i class="fa fa-level-up" aria-hidden="true"></i>L1
            </p>
          </div>
        </div>
        <div class="flex justify-evenly">
          <div>
            <p>
              <i class="fas fa-tshirt text-green-600"></i> 1
            </p>
          </div>
          <div>
            <p>
              <i class="fas fa-boxes"></i> 3
            </p>
          </div>
        </div>
        <div class="flex justify-evenly">
          <div>
            <p>
              <i class="fas fa-ring text-blue-600"></i> 1
            </p>
          </div>
          <div>
            <p>
              <i class="fas fa-hands-helping"></i> 2
            </p>
          </div>
        </div>
      </div>
    </div>
    <div id="kanan" class="w-2/6 border ml-2">
      <div>
        <p>avatar</p>
      </div>
      <div>
        <p>
          <i class="fas fa-gem text-red-400"></i> 1
        </p>
      </div>
      <div>
        <p>
          <i class="fas fa-coins text-yellow-500"></i>
          {{player.gold}}10
        </p>
      </div>
      <div>
        <p>
          <i class="fas fa-shoe-prints"></i>
          {{player.movement}}1
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'PlayerCard',
    props: ['player']

}
</script>

<style>
</style>