<template>
  <div id="app">
    <v-toolbar card dark color="#179be8" >
      <v-tooltip bottom>
        <v-btn
          v-if="screen ==='game'"
          slot="activator"
          icon
          dark
          @click="showDialog"
        >
          <v-icon>replay</v-icon>
        </v-btn>
        <span>Начать заново</span>
      </v-tooltip>
      <v-toolbar-title>{{toolbar_title}}</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-container fluid v-if="screen ==='start'">
      <v-layout align-center justify-center :style="'height: 80vh'">
        <v-flex xs12>
            <v-btn v-if="dialog === false" large color="#E88383" dark @click="showDialog">Начать игру</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
    <v-dialog
      v-model="dialog"
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card tile>
        <v-toolbar card dark color="#8cd6d1">
          <v-btn icon dark @click="hideDialog">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Введите имена персонажей</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <v-container>
            <v-layout row wrap>
              <v-flex xs12 sm5>
                <v-text-field
                  value=""
                  v-model="playerName"
                  placeholder="Нахимов"
                  label="Имя игрока"
                ></v-text-field>
              </v-flex>
              <v-spacer></v-spacer>
              <v-flex xs12 sm5>
                <v-text-field
                  v-model="aiName"
                  value=""
                  placeholder="Осман-Паша"
                  label="Имя компьютера"
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout align-center justify-center>
              <v-btn large color="#E88383" dark @click="startGame">Начать игру</v-btn>
            </v-layout>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-container fluid v-if="screen ==='game'">
      <v-layout row align-center space-between>
          <v-flex sm6 xs12>
            <v-card width="250" :style="'margin:auto;'">
              <sea player="player"></sea>
              <v-card-title primary-title>
                <div class="sea-title">
                  <h3>{{player_name}}</h3>
                  <p>x4 - {{player_ships_count_4}} </p>
                  <p>x3 - {{player_ships_count_3}} </p>
                  <p>x2 - {{player_ships_count_2}} </p>
                  <p>x1 - {{player_ships_count_1}} </p>
                </div>
              </v-card-title>
            </v-card>
          </v-flex>
          <v-flex sm6 xs12>
            <v-card width="250" :style="'margin:auto;'">
              <sea player="ai"></sea>
              <v-card-title primary-title>
                <div class="sea-title">
                  <h3>{{ai_name}}</h3>
                  <p>x4 - {{ai_ships_count_4}} </p>
                  <p>x3 - {{ai_ships_count_3}} </p>
                  <p>x2 - {{ai_ships_count_2}} </p>
                  <p>x1 - {{ai_ships_count_1}} </p>
                </div>
              </v-card-title>
            </v-card>
          </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {//для инпутов
      playerName: '',
      aiName: ''
    }
  },
  computed: {
    //получаем значения из vuex
    toolbar_title() {
      return this.$store.state.title
    },
    screen() {
      return this.$store.state.screen
    },
    dialog() {
      return this.$store.state.dialog
    },
    player_name() {
      return this.$store.state.player_name
    },
    ai_name() {
      return this.$store.state.ai_name
    },
    //подсчет количества оставшихся кораблей
    player_ships_count_4() {
      let arr = this.$store.state.player_ships.ships_4
      let count = 0
      for ( let i = 0; i < arr.length; i++ ) {
        if ( arr[i].length > 0) { count++ }
      }
      return count
    },
    player_ships_count_3() {
      //return this.$store.state.player_ships.ships_3.length
      let arr = this.$store.state.player_ships.ships_3
      let count = 0
      for ( let i = 0; i < arr.length; i++ ) {
        if ( arr[i].length > 0) { count++ }
      }
      return count
    },
    player_ships_count_2() {
      //return this.$store.state.player_ships.ships_2.length
      let arr = this.$store.state.player_ships.ships_2
      let count = 0
      for ( let i = 0; i < arr.length; i++ ) {
        if ( arr[i].length > 0) { count++ }
      }
      return count
    },
    player_ships_count_1() {
      //return this.$store.state.player_ships.ships_1.length
      let arr = this.$store.state.player_ships.ships_1
      let count = 0
      for ( let i = 0; i < arr.length; i++ ) {
        if ( arr[i].length > 0) { count++ }
      }
      return count
    },
    ai_ships_count_4() {
      //return this.$store.state.ai_ships.ships_4.length
      let arr = this.$store.state.ai_ships.ships_4
      let count = 0
      for ( let i = 0; i < arr.length; i++ ) {
        if ( arr[i].length > 0) { count++ }
      }
      return count
    },
    ai_ships_count_3() {
      //return this.$store.state.ai_ships.ships_3.length
      let arr = this.$store.state.ai_ships.ships_3
      let count = 0
      for ( let i = 0; i < arr.length; i++ ) {
        if ( arr[i].length > 0) { count++ }
      }
      return count
    },
    ai_ships_count_2() {
      //return this.$store.state.ai_ships.ships_2.length
      let arr = this.$store.state.ai_ships.ships_2
      let count = 0
      for ( let i = 0; i < arr.length; i++ ) {
        if ( arr[i].length > 0) { count++ }
      }
      return count
    },
    ai_ships_count_1() {
      //return this.$store.state.ai_ships.ships_1.length
      let arr = this.$store.state.ai_ships.ships_1
      let count = 0
      for ( let i = 0; i < arr.length; i++ ) {
        if ( arr[i].length > 0) { count++ }
      }
      return count
    }
  },
  methods: {
    startGame () {
      //начать игру, задать имена пользователей и сгенерировать матрицы
      this.$store.commit('generate_ship_locations')
      if (this.playerName === '') {
        this.$store.commit('set_player_name',{player_name: 'Нахимов'})
      } else {
        this.$store.commit('set_player_name',{player_name: this.playerName})
      }
      if (this.aiName === '') {
        this.$store.commit('set_ai_name',{ai_name: 'Осман-Паша'})
      } else {
        this.$store.commit('set_ai_name',{ai_name: this.aiName})
      }
      this.$store.commit('set_title',{title: 'Ваш ход, ' + this.$store.state.player_name})
      this.$store.commit('set_dialog_status',{dialog: false})
      this.$store.commit('set_screen',{screen: 'game'})
    },
    showDialog: function () {
      //показать высплывающее окно
      this.$store.commit('set_dialog_status', {dialog: true})
    },
    hideDialog() {
      //скрыть высплывающее окно
      this.$store.commit('set_dialog_status',{dialog: false})
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100vh;
  background-color: #bff2ec;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
  .sea-title {
    display: flex; flex-direction: column; align-items: flex-start;
  }
  .sea-title h3 {
    padding-bottom: 10px;
  }
.sea-title p {
  margin-bottom: 0;
}
</style>
