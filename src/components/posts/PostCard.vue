<script>
export default {
  props: {
    post: Object,
    isDetail: Boolean,
  },

  computed: {
    // abstract() {
    //   let dots = this.post.content.length > 100 ? '...' : '';
    //   return this.post.content.substr(0, 100).trim() + dots;
    // },
  },
};
</script>

<template>
  <div class="col">
    <div class="card h-100">
      <div
        class="card-header d-flex justify-content-between align-items-center">
        <router-link
          :to="{
            name: 'blog-category',
            params: {
              categoryId: post.category_id,
            },
          }"
          class="badge mx-1"
          :style="{
            backgroundColor: post.category.color,
          }">
          {{ post.category.label }}
        </router-link>

        <div>
          <span
            class="badge rounded-pill mx-1"
            v-for="tag in post.tags"
            :key="tag.id"
            :style="{ backgroundColor: tag.color }">
            {{ tag.label }}
          </span>
        </div>
      </div>

      <div class="card-body clearfix">
        <h4>{{ post.title }}</h4>
        <img
          v-if="post.cover_image"
          :src="post.cover_image"
          class="img-fluid mb-1 rounded"
          :class="{
            'float-end': isDetail,
            'w-50': isDetail,
            'ms-1': isDetail,
          }"
          alt="" />
        <p>{{ post.content }}</p>
      </div>

      <div
        class="card-footer"
        v-if="!isDetail">
        <router-link
          :to="{
            name: 'post-detail',
            params: {
              slug: post.slug,
            },
          }"
          class="btn btn-primary"
          >Vedi</router-link
        >
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
