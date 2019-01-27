<template>
    <div class="sea">
      <cell
        v-for="i in 100"
        :key="i"
        :inactive="inactive"
        :coords="[Math.floor((i - 1)/10), i - 1 - Math.floor((i - 1)/10) * 10]"
        :player="player"
        ></cell>
    </div>
</template>

<script>
    export default {
      name: "Sea",
      props: {
        player: String
      },
      computed: {
        inactive() {
          if (this.player === 'player') { return true }
          if (this.player === 'ai') { return false }
        }
      }
    }
</script>

<style scoped>
  .sea {
    width: 250px;
    display: grid;
    grid-template-columns: auto auto auto auto auto auto auto auto auto auto;
    grid-template-rows: auto auto auto auto auto auto auto auto auto auto;
  }
</style>
