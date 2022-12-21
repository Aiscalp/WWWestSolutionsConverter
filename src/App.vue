<template>
  <div class="navbar">
    <div>Актуальний курс валют</div>
    <div class="navbar__btns">
      <button class="btn" @click="$router.push('/')">Курс валют</button>
      <button
        class="btn"
        style="margin-left: 20px"
        @click="$router.push('/converter')"
      >
        Конвертер валют
      </button>
    </div>
  </div>
  <div class="app">
    <suspense>
      <router-view />
    </suspense>
  </div>
</template>

<script></script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
  padding: 20px;
}

.navbar {
  height: 50px;
  background-color: whitesmoke;
  box-shadow: 2px 2px 4px gray;
  display: flex;
  align-items: center;
  padding: 0 15px;
}

.navbar__btns {
  margin-left: auto;
}

.btn {
  padding: 10px 15px;
  background-color: whitesmoke;
  box-shadow: 2px 2px 4px gray;
  border-radius: 5px;
  color: black;
  border: 1px solid darkgray;
}
</style>
