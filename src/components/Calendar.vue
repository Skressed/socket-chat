<template>
  <div class="calendar-wrapper">
    <p>Время на которое примет специалист: </p>
    <div class="calendar">
        <div class="calendar__interval" v-for="interval in getIntervals" :key="interval.id">
          <b-button variant="outline-info" class="calendar__time" type="submit" @click="signUpForConsultation(interval)" :value="interval.time">{{interval.time}}</b-button>
        </div>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client';
import intervals from '../fixtures/time.json'

export default {
  name: 'Calendar',
  props: {
    
  },
  data() {
      return {
        getIntervals: intervals,
        socket: io('ws://localhost:1010'),
      }
  },
  methods: {
      signUpForConsultation(interval) {
        //this needs to be changed
        //this.userId = 2;
        let time = interval.time;
        //let client_id = this.userId;
        let time_id = interval.id;
        
        this.socket.emit('signUpForConsult', {time_id: time_id, interval_time: time});
      }
  },
}
</script>

<style scoped>
.calendar-wrapper {
    width: 400px;
}

.calendar {
    margin-top: 32px;
    display: grid;
    grid-template-columns: 100px 100px 100px;
    grid-gap: 16px;
    margin-left: 16px;
}
</style>
