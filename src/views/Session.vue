<template>
  <div class="wrapper">
    <h2>20Q Game Session ID: {{session_id}}</h2>
    <h3
      v-if="$store.state.messages.role === 'owner'"
    >The session word is: {{$store.state.messages.word}}</h3>
    <h3
      v-if="!sessionStarted && $store.state.messages.role === 'owner'"
    >Ask Player 2 to join the session (ID:{{session_id}})</h3>
    <QuestionItems
      :items="Object.keys($store.state.messages.items).map(k => $store.state.messages.items[k]).sort( (a,b) => ( a.timestamp<b.timestamp ? 1 : (a.timestamp>b.timestamp ? -1 : 0) ))"
      @submitAnswer="submitAnswer"
    />
    <QuestionForm
      v-if="$store.state.messages.role === 'player' && !$store.state.messages.gameStopped"
      @submit="submit"
      :waiting="waiting"
    />
  </div>
</template>

<script>
import QuestionItems from "../components/QuestionItems.vue";
import QuestionForm from "../components/QuestionForm.vue";

export default {
  name: "Session",
  props: {},

  components: { QuestionItems, QuestionForm },

  data() {
    return {
      session_id: this.$route.params.xid
    };
  },

  mounted() {
    this.$webSocketsSend({
      type: "CONNECT",
      session_id: this.$route.params.xid
    });
  },

  computed: {
    waiting() {
      return !!Object.keys(this.$store.state.messages.items).find(k => {
        let i = this.$store.state.messages.items[k];
        return i.type === "question" && !i.answer;
      });
    },

    sessionStarted() {
      return (
        this.$store.state.messages.items &&
        Object.keys(this.$store.state.messages.items).length
      );
    }
  },

  methods: {
    submit(msg) {
      const message = {
        ...msg,
        session_id: this.$route.params.xid
      };

      this.$webSocketsSend(message);
    },

    submitAnswer(data) {
      this.$webSocketsSend({ ...data, session_id: this.$route.params.xid });
    }
  }
};
</script>

<style lang="scss">
.session {
  display: flex;
  flex-direction: column;
}
</style>


