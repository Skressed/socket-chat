<template>
  <div id="app">
    <Calendar class="section"/>
    <Chat class="section"/>
    <Occupated class="section"/>
  </div>
</template>

<script>
import Occupated from './components/Occupated.vue'
import Calendar from './components/Calendar.vue'
import Chat from './components/Chat.vue'

export default {
  name: 'App',
  components: {
    Occupated, Calendar, Chat
  }
}
</script>

<style>
p {
  padding: 0; margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 99vw;
}
</style>
