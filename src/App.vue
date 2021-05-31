<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-toolbar-title>
        BattleShip
        <v-icon>mdi-ferry</v-icon>
        <v-icon>mdi-ferry</v-icon>
      </v-toolbar-title>
  

      <v-spacer></v-spacer>

      <v-btn      
        text
        to="/map/ships"
      >        
        <v-icon>mdi-new-box</v-icon>
        <span>Game</span>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
