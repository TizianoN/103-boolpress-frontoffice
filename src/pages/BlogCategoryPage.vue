<script>
import { store } from '../data/store';
import axios from 'axios';

import PostList from '../components/posts/PostList.vue';

export default {
  data() {
    return {
      category: null,
    };
  },

  components: { PostList },

  methods: {
    fetchCategory(
      endpoint = store.api.baseUrl +
        'categories/' +
        this.$route.params.categoryId
    ) {
      axios
        .get(endpoint)
        .then((response) => {
          this.category = response.data;
        })
        .catch((error) => {
          this.$router.push({ name: 'not-found' });
        });
    },
  },

  created() {
    this.fetchCategory();
  },

  beforeRouteUpdate(to) {
    this.fetchCategory(
      store.api.baseUrl + 'categories/' + to.params.categoryId
    );
  },
};
</script>

<template>
  <div class="container">
    <h1 class="my-5">
      Posts by category
      <span
        v-if="category"
        class="badge mx-1"
        :style="{
          backgroundColor: category.color,
        }"
        >{{ category.label }}</span
      >
    </h1>

    <PostList
      :key="category.id"
      :categoryId="category.id"
      :showCategories="true"
      v-if="category" />
  </div>
</template>

<style lang="scss" scoped></style>
