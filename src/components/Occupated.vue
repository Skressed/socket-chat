<template>
  <div class="Occupated">
    Зарезервированные интервалы:
    <p v-for="interval in intervals" :key="interval.id">{{interval}}</p>
  </div>
</template>

<script>
import io from 'socket.io-client';

export default {
  name: 'Occupated',
  props: {

  },
  data() {
    return {
      intervals: [],
      socket: io('ws://localhost:1010'),
    }
  },
  created() {
    this.socket.on('signUp', (data) => {
      this.intervals.push(data.interval_time);
      console.log(this.intervals);
    })
  }
}
</script>

<style scoped>

</style>
