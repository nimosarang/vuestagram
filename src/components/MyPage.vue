<template>
  <div style="padding: 10px">
    <h4>팔로워</h4>
    <input placeholder="🔍" v-model="searchFollower" @input="search" />
    <div class="post-header" v-for="(a, i) in follower" :key="i">
      <div class="profile" :style="`background-image:url(${a.image})`"></div>
      <span class="profile-name">{{ a.name }}</span>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { onMounted, ref } from "vue";

export default {
  name: "myPage",
  setup() {
    let follower = ref([]);
    let followerOriginal = ref([]);
    let searchFollower = ref("");

    const search = () => {
      let newFollower = followerOriginal.value.filter((a) => {
        return a.name.includes(searchFollower.value);
      });
      follower.value = [...newFollower];
    };

    onMounted(() => {
      axios.get("/follower.json").then((a) => {
        follower.value = a.data;
        followerOriginal.value = [...a.data];
      });
    });

    return { follower, search, searchFollower };
  },
  data() {
    return {};
  },
};
</script>
<style></style>
