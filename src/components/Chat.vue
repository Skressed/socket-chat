<template>
  <div class="chat">
    <div class="chat_connection">
        <div class="chat_rooms">
            <b-form-input type="text" class="roomNameInput" v-model="roomName" placeholder="Название комнаты"/>
            <b-button variant="outline-primary" @click="generateRoom" class="join">Войти в комнату</b-button>            
        </div>
        <b-button class="availableRoom" variant="outline-secondary" @click="roomName=room.name" v-for="room in rooms" :key="room.id">{{room.name}}</b-button>
        <b-card class="chat_block">
          <div class="chat_header">
            <div class="chat_title">Вы находитесь в комнате {{currentRoom}}</div>
          </div>
          <div class="chat_message_wrapper">
            <div class="chat_messages">
              <div v-for="msg in messages" :key="msg.id" class="chat_message">{{msg}}</div>
            </div>
            <div class="chat_input">
              <b-form-input v-on:keyup.enter="sendMessage" :disabled="disabled == 1" class="userMessageInput defaultDisabled" type="text" v-model="userMessage" placeholder="Введите сообщение"/>
              <b-button :disabled="disabled == 1" class="defaultDisabled" variant="outline-primary" @click="sendMessage">Отправить</b-button>
            </div>
          </div>
        </b-card>
        <!--<video style="width: 400px; height: 400px;"></video>-->
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client';
//var Peer = require('simple-peer')

export default {
  name: 'Chat',
  props: {

  },
  data() {
    return {
        userMessage: null,
        roomName: null,
        currentRoom: null,
        connectedUsers: [],
        rooms: [],
        messages: [],
        socket: io('ws://localhost:1010'),
        disabled: 1,
    }
  },
  created() {
    //var peer;
    //var peerstream;

    this.socket.on('giveRooms', (data) => {
        this.rooms = data;
    });
    this.socket.on('newMessage', (data) => {
        this.messages.push(data);
        this.disabled = 0;
    });
    /*this.socket.on('initPeer', (data) => {
        peer = new Peer({initiator: data, stream: peerstream});
        console.log('INITPEER ' + data);
        peer.on('signal', data => {
        this.socket.emit('signal', data, this.roomName);
        });

        peer.on('stream', stream => {
          var video = document.querySelector('video');

          if ('srcObject' in video) {
            video.srcObject = stream
          } else {
            video.src = window.URL.createObjectURL(stream) // for older browsers
          }

          video.play();
        });
    });
    this.socket.on('sendSignal', (data) => {
        peer.signal(data);
        console.log('SENDSIGNAL ' + data);
    });

    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    }).then(gotMedia).catch(() => {})

    function gotMedia(stream) {
      peerstream = stream;
    }*/
  },
  methods: {
      generateRoom() {
          if ((this.roomName) && (!this.currentRoom)) {
            this.socket.emit('create', this.roomName);
            this.currentRoom = this.roomName;
          }
      },
      sendMessage() {
          if ((this.currentRoom)&&(this.userMessage)) {
            this.socket.emit('message', this.currentRoom, this.userMessage)
            this.userMessage = null;
          }
      },
  }
}
</script>

<style scoped>

.roomNameInput {
  width: 65%;
}

.availableRoom {
  margin-left: 2px;
  margin-right: 2px;
}

.chat_rooms {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 16px;
}

.join {
  margin-left: 8px;
}

.chat_block {
  margin-top: 16px;
  min-height: 400px;
  max-height: 400px;
  display: flex;
  flex-direction: column;
}

.card-body {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.chat_header {
  justify-self: flex-start;
}

.chat_messages {
  overflow-y: scroll;
  scrollbar-width: thin;
  max-height: 260px;
  margin-bottom: 8px;
}

.chat_message {
  margin: 8px;
}

.chat_message:nth-child(even) {
  background-color: rgba(0,0,0,0.05);
}

.chat_block, .chat_input {
  justify-self: flex-end;
}

.chat_input {
  display: flex;
  flex-direction: row;
}

.userMessageInput {
  margin-right: 8px;
}
</style>
