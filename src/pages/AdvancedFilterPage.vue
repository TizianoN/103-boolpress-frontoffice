<script>
import axios from 'axios';
import { store } from '../data/store';

import PostCard from '../components/posts/PostCard.vue';

export default {
  data() {
    return {
      filteredPosts: [],
      categories: [],
      tags: [],
    };
  },

  computed: {
    activeFilters() {
      const activeCategories = [];
      const activeTags = [];

      this.categories.forEach((category) => {
        if (category.active) activeCategories.push(category.id);
      });

      this.tags.forEach((tag) => {
        if (tag.active) activeTags.push(tag.id);
      });

      return {
        activeCategories,
        activeTags,
      };
    },
  },

  components: { PostCard },

  methods: {
    fetchPosts() {
      axios
        .post(store.api.baseUrl + 'get-posts-by-filters', this.activeFilters, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          this.filteredPosts = response.data.data;
        });
    },

    fetchCategories() {
      axios.get(store.api.baseUrl + 'categories').then((response) => {
        this.categories = response.data.map((category) => {
          return {
            ...category,
            active: false,
          };
        });
      });
    },

    fetchTags() {
      axios.get(store.api.baseUrl + 'tags').then((response) => {
        this.tags = response.data.map((tag) => {
          return {
            ...tag,
            active: false,
          };
        });
      });
    },

    toggleCategory(category) {
      category.active = !category.active;
      this.fetchPosts();
    },

    toggleTag(tag) {
      tag.active = !tag.active;
      this.fetchPosts();
    },
  },

  created() {
    this.fetchCategories();
    this.fetchTags();
    this.fetchPosts();
  },
};
</script>

<template>
  <div class="container">
    <h1 class="my-5">Ricerca avanzata</h1>
    <div class="row">
      <div class="col-3">
        <h4>Seleziona la categoria</h4>

        <span
          v-for="category in categories"
          :key="category.id"
          :style="{
            backgroundColor: category.color,
          }"
          :class="{
            disabled: !category.active,
          }"
          @click="toggleCategory(category)"
          class="badge mx-1 clickable">
          {{ category.label }}
        </span>

        <hr />
        <h4>Seleziona i tags</h4>

        <span
          v-for="tag in tags"
          :key="tag.id"
          :style="{
            backgroundColor: tag.color,
          }"
          :class="{
            disabled: !tag.active,
          }"
          @click="toggleTag(tag)"
          class="badge mx-1 clickable">
          {{ tag.label }}
        </span>
      </div>
      <div class="col-9">
        <div class="row row-cols-2 g-3">
          <PostCard
            v-for="post in filteredPosts"
            :key="post.id"
            :post="post"
            :isDetail="false" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.disabled {
  background-color: #555 !important;
}

.clickable {
  cursor: pointer;
}
</style>
</style>
