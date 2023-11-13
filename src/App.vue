<template>
  <div class="header">
    <ul class="header-button-left">
      <li>Cancel</li>
    </ul>
    <ul class="header-button-right">
      <li v-if="step == 1" @click="step++">Next</li>
      <li v-if="step == 2" @click="publish">발행</li>
    </ul>
  </div>

  <!-- <p>{{ $store.state.more }}</p>
  <button @click="$store.dispatch('getData')">더보기</button> -->

  <!-- <p>{{ name }} {{ likes }}</p>
  <button @click="이름변경()">버튼</button> -->
  <!-- 
  <h4>안녕 {{ $store.state.name }}</h4>
  <h4>나이는 {{ $store.state.age }}</h4>
  <button @click="$store.commit('이름변경')">버튼</button>
  <button @click="$store.commit('나이증가', 10)">나이증가 버튼</button> -->

  <Container
    :postdata="postdata"
    :step="step"
    :이미지="이미지"
    @write="작성한글 = $event"
  />
  <!-- <button @click="more()">더보기</button> -->

  <div class="footer">
    <ul class="footer-button-plus">
      <input @change="upload" type="file" id="file" class="inputfile" />
      <label for="file" class="input-plus">+</label>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
import postdata from "./assets/postdata.js";
import Container from "./components/Container.vue";
import { mapState, mapMutations } from "vuex";
export default {
  name: "App",
  data() {
    return {
      postdata,
      moreCount: 0,
      step: 3,
      이미지: "",
      작성한글: "",
      선택한필터: "",
    };
  },
  mounted() {
    this.emitter.on("박스클릭함", (a) => {
      this.선택한필터 = a;
    });
  },
  components: {
    Container,
  },

  computed: {
    // name() {
    //   return this.$store.state.name;
    // },
    ...mapState(["name", "age", "likes"]),
  },

  methods: {
    ...mapMutations(["setMore", "좋아요", "이름변경"]),
    publish() {
      let 내게시물 = {
        name: "에디",
        userImage: "https://picsum.photos/100?random=3",
        postImage: this.이미지,
        likes: 36,
        date: "May 15",
        liked: false,
        content: this.작성한글,
        filter: this.선택한필터,
      };
      this.postdata.unshift(내게시물);
      this.step = 0;
    },
    more() {
      axios
        .get(`https://codingapple1.github.io/vue/more${this.moreCount}.json`)
        .then((결과) => {
          this.postdata.push(결과.data);
        });
      this.moreCount++;
    },
    upload(e) {
      let file = e.target.files;
      let url = URL.createObjectURL(file[0]);
      this.이미지 = url;
      this.step++;
    },
  },
};
</script>

<style>
body {
  margin: 0;
}
ul {
  padding: 5px;
  list-style-type: none;
}
.logo {
  width: 22px;
  margin: auto;
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  top: 13px;
}
.header {
  width: 100%;
  height: 40px;
  background-color: white;
  padding-bottom: 8px;
  position: sticky;
  top: 0;
}
.header-button-left {
  color: skyblue;
  float: left;
  width: 50px;
  padding-left: 20px;
  cursor: pointer;
  margin-top: 10px;
}
.header-button-right {
  color: skyblue;
  float: right;
  width: 50px;
  cursor: pointer;
  margin-top: 10px;
}
.footer {
  width: 100%;
  position: sticky;
  bottom: 0;
  padding-bottom: 10px;
  background-color: white;
}
.footer-button-plus {
  width: 80px;
  margin: auto;
  text-align: center;
  cursor: pointer;
  font-size: 24px;
  padding-top: 12px;
}
.sample-box {
  width: 100%;
  height: 600px;
  background-color: bisque;
}
.inputfile {
  display: none;
}
.input-plus {
  cursor: pointer;
}
</style>
