<script>
import PostCard from '../components/posts/PostCard.vue';
import axios from 'axios';
import { store } from '../data/store';

export default {
  data() {
    return {
      post: null,

      error: {
        hasError: false,
        message: '',
      },
    };
  },

  components: { PostCard },

  created() {
    console.log(store.api.baseUrl + 'posts/' + this.$route.params.slug);
    axios
      .get(store.api.baseUrl + 'posts/' + this.$route.params.slug)
      .then((response) => {
        this.post = response.data;
      })
      .catch((error) => {
        this.$router.push({ name: 'not-found' });
      });
  },
};
</script>

<template>
  <div class="container">
    <h1 class="my-5">Dettaglio post</h1>

    <PostCard
      :post="post"
      :isDetail="true"
      v-if="post" />
  </div>
</template>

<style lang="scss" scoped></style>
