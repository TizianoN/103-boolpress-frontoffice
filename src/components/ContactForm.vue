<script>
import axios from 'axios';
import { store } from '../data/store';

export default {
  data() {
    return {
      fields: {
        email: '',
        name: '',
        message: '',
      },

      messageSent: false,
      success: false,
      loading: false,
      error: {
        message: '',
        hasError: false,
      },
    };
  },

  methods: {
    sendMessage() {
      if (!this.fields.email || !this.fields.name || !this.fields.message)
        return;

      this.messageSent = true;
      this.loading = true;
      this.success = false;
      this.error.hasError = false;

      const data = {
        email: this.fields.email,
        name: this.fields.name,
        message: this.fields.message,
      };

      axios
        .post(store.api.baseUrl + 'message', data)
        .then((response) => {
          this.success = true;
        })
        .catch((error) => {
          this.error.hasError = true;
          this.error.message = error.message;
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<template>
  <div
    v-if="messageSent && success"
    class="alert alert-success">
    Messaggio inviato con successo
  </div>

  <div
    v-if="messageSent && loading"
    class="alert alert-warning">
    Invio in corso
  </div>

  <div
    v-if="messageSent && error.hasError"
    class="alert alert-danger">
    {{ error.message }}
  </div>

  <div v-if="!messageSent || error.hasError">
    <div class="mb-3">
      <label
        for="contactform-email"
        class="form-label"
        >Email address</label
      >
      <input
        v-model="fields.email"
        type="email"
        class="form-control"
        id="contactform-email"
        placeholder="name@example.com" />
    </div>

    <div class="mb-3">
      <label
        for="contactform-name"
        class="form-label"
        >Nome</label
      >
      <input
        v-model="fields.name"
        type="text"
        class="form-control"
        id="contactform-name"
        placeholder="name@example.com" />
    </div>
    <div class="mb-3">
      <label
        for="contactform-message"
        class="form-label"
        >Example textarea</label
      >
      <textarea
        v-model="fields.message"
        class="form-control"
        id="contactform-message"
        rows="3"></textarea>
    </div>

    <button
      class="btn btn-success"
      @click="sendMessage()">
      <font-awesome-icon
        icon="paper-plane"
        class="me-2" />
      Invia messaggio
    </button>
  </div>
</template>

<style lang="scss" scoped></style>
