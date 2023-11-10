<script>
import axios from "axios";
import { store } from "../data/store";
import { createHydrationRenderer } from "vue";

export default {
  data() {
    return {
      title: "Home Page",
      featuredPosts: [],
    };
  },
  created() {
    axios.get(store.api.baseUrl + "posts-featured").then((response) => {
      this.featuredPosts = response.data;
    });
  },
};
</script>

<template>
  <div class="container">
    <h1 class="my-5">{{ title }}</h1>
    ...
  </div>
</template>

<style lang="scss" scoped></style>
