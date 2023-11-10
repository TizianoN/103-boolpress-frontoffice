<script>
import axios from 'axios';
import { store } from '../data/store';

import PostCard from '../components/posts/PostCard.vue';
import ContactForm from '../components/ContactForm.vue';

export default {
  data() {
    return {
      title: 'Home Page',
      featuredPosts: [],
    };
  },
  created() {
    axios.get(store.api.baseUrl + 'posts-featured').then((response) => {
      this.featuredPosts = response.data;
    });
  },
  components: { PostCard, ContactForm },
};
</script>

<template>
  <div class="container">
    <h1 class="my-5">{{ title }}</h1>

    <div class="row row-cols-3">
      <PostCard
        v-for="post in featuredPosts"
        :post="post"
        :key="post.id"
        :isDetail="false" />
    </div>

    <h2>feature</h2>

    <ContactForm />
  </div>
</template>

<style lang="scss" scoped></style>
