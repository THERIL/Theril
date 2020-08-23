<template>
  <div class="card flex">
              <div id="kiri" class="w-4/6">
                  <div >
                    <p>{{player.name}} </p>
                  </div>
                  <div>
                      <div class="flex justify-between">
                          <div>
                              <p>food</p>
                          </div>
                          <div>
                              <p>cart</p>
                          </div>
                        </div>
                      <div class="flex justify-between">
                          <div>
                              <p>cloth</p>
                          </div>
                          <div>
                              <p>capacity</p>
                          </div>
                      </div>
                      <div class="flex justify-between">
                          <div>
                              <p>Jewelry</p>
                          </div>
                          <div>
                              <p>Assistant</p>
                          </div>
                          
                      </div>
                  </div>
              </div>
              <div id="kanan" class="w-2/6">
                  <div>
                      <p>avatar</p>
                  </div>
                  <div>
                      <p>diamond</p>
                  </div>
                  <div>
                      <p>gold</p>
                  </div>
                  <div>
                      <p>move</p>
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