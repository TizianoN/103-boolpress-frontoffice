<script>
import PostCard from './PostCard.vue';
import PaginationUi from '../ui/PaginationUi.vue';

import axios from 'axios';
import { store } from '../../data/store';

export default {
  data() {
    return {
      posts: [],
      categories: [],
      pagination: [],
    };
  },

  props: {
    categoryId: Number,
    showCategories: Boolean,
  },

  components: { PostCard, PaginationUi },

  methods: {
    fetchPosts(apiUri = this.endpoint) {
      axios.get(apiUri).then((response) => {
        this.posts = response.data.data;
        this.pagination = response.data.links;
      });
    },

    fetchCategories() {
      axios.get(store.api.baseUrl + 'categories').then((response) => {
        this.categories = response.data;
      });
    },
  },

  computed: {
    endpoint() {
      return this.categoryId
        ? store.api.baseUrl + 'posts-by-category/' + this.categoryId
        : store.api.baseUrl + 'posts';
    },
  },

  created() {
    if (this.showCategories) {
      this.fetchCategories();
    }
    this.fetchPosts();
  },
};
</script>

<template>
  <nav v-if="showCategories">
    <hr />
    <router-link
      v-for="category in categories"
      :key="category.id"
      :to="{
        name: 'blog-category',
        params: {
          categoryId: category.id,
        },
      }"
      class="badge mx-1"
      :style="{
        backgroundColor: category.color,
      }">
      {{ category.label }}
    </router-link>
    <hr />
  </nav>

  <PaginationUi
    :pagination="pagination"
    @change-page="fetchPosts" />

  <div class="row row-cols-3 g-4">
    <PostCard
      v-for="post in posts"
      :key="post.id"
      :post="post"
      :isDetail="false" />
  </div>

  <PaginationUi
    :pagination="pagination"
    @change-page="fetchPosts" />
</template>

<style lang="scss" scoped></style>
