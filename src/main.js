import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Sea from "./Sea.vue"
import Cell from "./Cell.vue"
import Vuex from 'vuex'

Vue.component("sea", Sea)
Vue.component("cell", Cell)
Vue.use(Vuetify)
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    title:  'Морской бой v0.0.9',
    screen: 'start',
    dialog: false,
    player_name: '',
    ai_name: '',
    ai_matrix: [],
    player_matrix: [],
    player_ships: {},
    ai_ships: {},
    test: false
  },
  mutations: {
    set_title(state, payload) {
      state.title = payload.title
    },
    set_screen(state, payload) {
      state.screen = payload.screen
    },
    set_player_name(state, payload) {
      state.player_name = payload.player_name
    },
    set_ai_name(state, payload) {
      state.ai_name = payload.ai_name
    },
    set_dialog_status(state, payload) {
      state.dialog = payload.dialog
    },
    generate_ship_locations(state) {
      let p_data = generateMatrix()
      let ai_data = generateMatrix()
      let ai_matrix = []
      for (let i = 0; i < 10; i++) { ai_matrix[i] = []; for (let j = 0; j < 10; j++) { ai_matrix[i][j] = 0 } }
      state.player_matrix = p_data.matrix
      state.player_ships = p_data.locations
      state.ai_matrix = ai_matrix
      state.ai_ships = ai_data.locations
    },
    set_ai_ships(state, payload) {
      state.ai_ships = payload.ships
    },
    set_player_ships(state, payload) {
      state.player_ships = payload.ships
    },
    set_player_matrix(state, payload) {
      state.player_matrix = payload.matrix
    },
    set_ai_matrix(state, payload) {
      state.ai_matrix = payload.matrix
    }
  },
  actions: {
    backshot({commit, state}, payload) {
      setTimeout(() => {
        commit('set_player_matrix', {matrix: payload.matrix})
        commit('set_title',{title: 'Ваш ход, ' + state.player_name})
      }, 1000)
    }
  }
})

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})


//генератор матрицы, возвращаем матрицу для представления и список кораблей для логики
function generateMatrix() {
  let ships = [4,3,3,2,2,2,1,1,1,1]
  let matrix = []
  for (let i = 0; i < 10; i++) { matrix[i] = []; for (let j = 0; j < 10; j++) { matrix[i][j] = 0 } }
  let directions = ['x', 'y']
  let locations = { ships_4: [], ships_3: [], ships_2: [], ships_1: [] }
  generator: while(ships.length) {
    let direction = directions[Math.floor(Math.random() * directions.length)]
    let ship = ships[0]
    let max_i = 9
    switch(ship) {
      case 4: max_i = 6; break;
      case 3: max_i = 7; break;
      case 2: max_i = 8; break;
    }
    let indexes = []
    let i = 0
    while (i <= max_i) { indexes[i] = i, i++ }
    let x = indexes[Math.floor(Math.random() * indexes.length)]
    let y = indexes[Math.floor(Math.random() * indexes.length)]
    let loc = []
    if (direction === 'x') {

      let j = x
      while (j < x + ship) {
        if (matrix[j][y] !== 0) { continue  generator; }
        loc.push([j, y])
        j++
      }

      j = x
      while (j < x + ship) {
        matrix[j][y] = 2
        if (y > 0) {matrix[j][y-1] = 1}
        if (y < 9) {matrix[j][y+1] = 1}
        if (j === x && x > 0) {
          matrix[j-1][y] = 1
          if (y > 0) {matrix[j-1][y-1] = 1}
          if (y < 9) {matrix[j-1][y+1] = 1}
        }
        if (j === x + ship - 1 && j < 9 ) {
          matrix[j+1][y] = 1
          if (y > 0) {matrix[j+1][y-1] = 1}
          if (y < 9) {matrix[j+1][y+1] = 1}
        }
        j++
      }
    } else if (direction === 'y') {
      let j = y
      while (j < y + ship) {
        if (matrix[x][j] !== 0) {continue generator;}
        loc.push([x, j])
        j++
      }
      j = y
      while (j < y + ship) {
        matrix[x][j] = 2
        if (x > 0) {matrix[x-1][j] = 1}
        if (x < 9) {matrix[x+1][j] = 1}
        if (j === y && j > 0) {
          matrix[x][j - 1] = 1
          if (x > 0) {matrix[x-1][j-1] = 1}
          if (x < 9) {matrix[x+1][j-1] = 1}
        }
        if (j === y + ship - 1 && j < 9 ) {
          matrix[x][j+1] = 1
          if (x > 0) {matrix[x-1][j+1] = 1}
          if (x < 9) {matrix[x+1][j+1] = 1}
        }
        j++
      }
    }
    switch(ship) {
      case 4: locations.ships_4.push(loc); break;
      case 3: locations.ships_3.push(loc); break;
      case 2: locations.ships_2.push(loc); break;
      case 1: locations.ships_1.push(loc); break;
    }
    ships.shift()
  }
  return {
    matrix: matrix.map(function (item) {
      return item.map(function(val) { switch(val) { case 0:case 1: return 0; break; case 2: return 4; break; }})
    }),
    locations: locations
  }

}
