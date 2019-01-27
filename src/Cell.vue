<!-- Компонент - ячейка -->
<template>
    <div :class="cellClass" @click="shot">
      <v-icon v-if="status === 3">clear</v-icon>
      <v-icon v-if="status === 2">fiber_manual_record</v-icon>
    </div>
</template>

<script>
    export default {
        name: "Cell",
      data () {
        return {
        }
      },
      computed: {
          status() {
            // статус ячейки (пусто, ранен, мимо)
            if (this.player === 'player') { return this.$store.state.player_matrix[this.coords[0]][this.coords[1]] }
            if (this.player === 'ai') { return this.$store.state.ai_matrix[this.coords[0]][this.coords[1]] }
          },
          cellClass() {
            // класс ячейки от статуса (пусто, ранен, мимо)
            if (this.status === 4) {
              return 'cell ship inactive'
            }
            if (this.status === 3) {
              return 'cell injured inactive'
            }
            if (this.status === 2) {
              return 'cell miss inactive'
            }
            if (this.status === 0) {
              if (this.inactive) {
                return 'cell inactive'
              } else {
                return 'cell'
              }
            }
          }
      },
      props:{
        player: String,
        inactive: Boolean,
        coords: Array
      },
      methods: {
        shot: function () {
          //Выстрел по AI
          if(this.status === 0 && this.player === 'ai') {
            let ships = this.$store.state.ai_ships //массив кораблей
            let shot = 'miss' //статус выстрела
            for (let k in ships) { //перебор по массиву коралей на совпадение с координатами
              let _ship_coords = ships[k]
              for (let j = 0; j < _ship_coords.length; j++) {
                let ship_coords = _ship_coords[j]
                for (let i = 0; i < ship_coords.length; i++) {
                  if (this.coords[0] === ship_coords[i][0] && this.coords[1] === ship_coords[i][1]) {
                    ship_coords.splice(i, 1) //вырезаем координату из массива кораблей
                    this.$set( ships[k], j, ship_coords)
                    this.$store.commit('set_ai_ships',{ships: ships})
                    shot = 'injured'
                  }
                }
              }
            }
            let ai_m = this.$store.state.ai_matrix
            switch (shot) {//обновляем матрицу
              case 'injured':
                this.$set(ai_m[this.coords[0]], this.coords[1], 3) //используем set вместо индекса для реактивности
                //ai_m[this.coords[0]][this.coords[1]] = 3
                break;
              case 'miss':
              default:
                this.$set(ai_m[this.coords[0]], this.coords[1], 2)
                //ai_m[this.coords[0]][this.coords[1]] = 2
                break;
            }
            this.$store.commit('set_ai_matrix',{matrix: ai_m})
            this.$store.commit('set_title',{title: 'Ваш ход, ' + this.$store.state.ai_name}) //меняем заголовок
            this.backShot()
          }

        },
        backShot() { //обратный выстрел
          let indexes = []
          let i = 0
          while (i <= 9) { indexes[i] = i, i++ }
          let p_matrix = this.$store.state.player_matrix
          let x = 0
          let y = 0
          while (true) {
            x = indexes[Math.floor(Math.random() * indexes.length)]
            y = indexes[Math.floor(Math.random() * indexes.length)]
            if (p_matrix[x][y] === 2 || p_matrix[x][y] === 3) {continue}
            if (p_matrix[x][y] === 0) {this.$set(p_matrix[x], y, 2);break}
            if (p_matrix[x][y] === 4) {this.$set(p_matrix[x], y, 3);break}
          }
          let ships = this.$store.state.player_ships
          for (let k in ships) {
            let _ship_coords = ships[k]
            for (let j = 0; j < _ship_coords.length; j++) {
              console.log([x,y])
              let ship_coords = _ship_coords[j]
              for (let i = 0; i < ship_coords.length; i++) {
                if (x === ship_coords[i][0] && y === ship_coords[i][1]) {
                  ship_coords.splice(i, 1)
                  this.$set( ships[k], j, ship_coords)
                  this.$store.commit('set_player_ships',{ships: ships})
                }
              }
            }
          }
          this.$store.dispatch('backshot', { //используем action для асинхронности
            matrix: p_matrix //обновляем матрицу игрока
          });
        }
      }
    }
</script>

<style scoped>
  .cell {
    width: 25px;
    height: 25px;
    border-right: 1px solid gray;
    border-bottom: 1px solid gray;
    cursor: pointer;
    position: relative;
  }
  .cell:nth-child(10n) {
    border-right: none;
  }
  .cell::before {
    content: ' ';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    box-shadow: 0 0px 10px 0 rgba(0, 0, 0, 0.5);
    opacity: 0;
    transition: opacity 500ms;
  }
  .cell:hover::before {
    opacity: 1;
  }
  .cell.inactive {
    cursor: default;
  }
  .cell.inactive:hover::before {
    opacity: 0;
  }
  .cell.injured {
    background-color: #E88383;
  }
  .cell.ship {
    background-color: gray;
  }
</style>
