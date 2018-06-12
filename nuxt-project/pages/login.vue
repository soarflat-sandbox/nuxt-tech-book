<template>
  <div>
    <h1>Login</h1>
    <p>
      <button
        type="button"
        @click="addCredential">
        Set credential
      </button>
      <button
        type="button"
        @click="removeCredential">
        Remove credential
      </button>
    </p>
    <p>
      <a href="/">Move to Home</a>
    </p>
  </div>
</template>

<script>
import Cookies from 'universal-cookie';

let cookies;

export default {
  mounted() {
    cookies = new Cookies();
  },
  methods: {
    addCredential() {
      cookies.set('credential', '1');
    },
    removeCredential() {
      cookies.set('credential', '');
    },
  },
};
</script>

<style scoped>
section {
  margin: 16px;
}
</style>
