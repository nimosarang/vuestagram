import { createStore } from "vuex";
import axios from "axios";

const store = createStore({
  state() {
    return {
      name: "son",
      age: 20,
      likes: 0,
      좋아요눌렀니: false,
      more: {},
    };
  },
  actions: {
    getData(context) {
      axios.get("https://codingapple1.github.io/vue/more0.json").then((a) => {
        console.log(a.data);
        context.commit("setMore", a.data);
      });
    },
  },
  mutations: {
    setMore(state, data) {
      state.more = data;
    },
    이름변경(state) {
      state.name = "kim";
    },
    나이증가(state, payload) {
      state.age += payload;
    },
    좋아요(state) {
      if (state.좋아요눌렀니 == false) {
        state.likes++;
        state.좋아요눌렀니 = true;
      } else {
        state.likes--;
        state.좋아요눌렀니 = false;
      }
    },
  },
});

export default store;
