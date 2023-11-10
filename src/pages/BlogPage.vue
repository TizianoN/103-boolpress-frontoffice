<script>
import PostList from '../components/posts/PostList.vue';

export default {
  data() {
    return {
      title: 'Hello world',
    };
  },

  components: { PostList },
};
</script>

<template>
  <div class="container">
    <h1 class="my-5">Articoli</h1>
    <PostList />
  </div>
</template>

<style lang="scss" scoped></style>
