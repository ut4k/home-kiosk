<template>
  <h1>おうちコントロールパネル</h1>
  <div class="home">
    <img usemap="#interact" src="./assets/room.png" />
    <map name="interact">
      <area
        shape="poly"
        coords="142,71,134,116,32,145,13,141,10,91,124,62,124,62"
        href="#"
        alt="エアコン"
        @click="controlAirConditioner"
      />
      <area
        shape="poly"
        coords="195,98,197,87,209,74,225,72,277,74,294,86,298,99,286,107,270,111,231,113,207,106,207,106"
        href="#"
        alt="シーリングライト"
        @click="controlCeilingLight"
      />
      <area
        shape="poly"
        coords="359,419,351,278,429,306,465,322,461,436,425,449,360,422,360,422"
        href="#"
        alt="パソコン"
        @click="controlPC"
      />
      <area
        shape="poly"
        coords="179,294,141,294,100,305,92,313,95,360,123,379,181,358,181,358"
        href="#"
        alt="テレビ"
        @click="controlTV"
      />
    </map>
  </div>
</template>

<style>
@font-face {
  font-family: "pixel";
  src: url("assets/Nosutaru-dotMPlusH-10-Regular.ttf");
}

body {
  background: #292929;
}

h1 {
  font-family: "pixel";
  color: #ff69fa;
}

#app {
  text-align: center;
}

img {
  image-rendering: pixelated;
  image-rendering: -moz-crisp-edges;
  image-rendering: crisp-edges;
}
</style>

<script>
export default {
  apiUrl: "",
  mounted() {
    this.apiUrl = process.env.VUE_APP_API_URL;
  },
  methods: {
    apiCall(apiPath) {
      let url = new URL(this.apiUrl + apiPath);
      fetch(url)
        .then((response) => {
          this.statusGet = response.status;
          return response.json();
        })
        .then((data) => {
          console.log(data);
          //TODO 通信の成功失敗を出す
        })
        .catch(() => {
          console.log("something gone wrong!");
          //TODO 通信の成功失敗を出す
        });
    },
    controlAirConditioner() {
      this.apiCall("air-conditioner/on");
    },
    controlCeilingLight() {
      this.apiCall("ceiling-light/on");
    },
    controlPC() {
      this.apiCall("pc/on");
    },
    controlTV() {
      this.apiCall("tv/on");
    },
  },
};
</script>
