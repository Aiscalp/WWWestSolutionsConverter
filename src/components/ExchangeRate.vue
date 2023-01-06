<template>
  <h1>Курс валют:</h1>
  <strong>Обрана валюта:</strong>
  <select v-model="convertTo" @change="exchangeRate">
    <option v-for="row in uah" :key="row.cc" :value="row.cc" selected>
      {{ row.txt }}({{ row.cc }})
    </option>
    <option v-for="row in currency" :key="row.cc" :value="row.cc">
      {{ row.txt }}({{ row.cc }})
    </option>
  </select>
  <div class="v-table">
    <div class="v-table_header">
      <p class="row">Валюта (Позначення)</p>
      <p v-if="currs.length > 0" class="row">Ціна в {{ currs[0].txt }}</p>
      <p v-else class="row">Ціна в {{ uah[0].txt }}</p>
      <p class="row_check">Обрати</p>
    </div>
    <!-- Українська гривня(UAH) -->
    <!-- <div class="v-table_row" v-for="(row, index) in uah" :key="index">
      <div class="row">{{ row.txt }} ({{ row.cc }})</div>
      <div v-if="currs.length > 0" class="row">
        {{ (row.rate / convertToCC).toFixed(4) }}
      </div>
      <div v-else class="row">
        {{ row.rate.toFixed(4) }}
      </div>
      <input class="check" type="checkbox" id="checkbox" v-model="checked" />
    </div> -->
    <div class="v-table_row" v-for="(row, index) in currency" :key="index">
      <div class="row">{{ row.txt }} ({{ row.cc }})</div>
      <div v-if="currs.length > 0" class="row">
        {{ (row.rate / convertToCC).toFixed(4) }}
      </div>
      <div v-else class="row">
        {{ row.rate.toFixed(4) }}
      </div>
      <input
        @change="saveToLocalStorage"
        class="check"
        type="checkbox"
        id="checkbox"
        v-model="row.isFavourit"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useCurrencyService } from "@/services/useCurrencyService";
import { CurrencyModel } from "@/models/CurrencyModel";

const convertTo = ref<string>();
const currs = ref<CurrencyModel[]>([]);
let convertToCC: number;
const uah = [
  {
    txt: "Українська гривня",
    rate: 1,
    cc: "UAH",
  },
];

convertTo.value = uah[0].cc;

const currency = ref<Array<CurrencyModel>>(await getCurrencies());
currency.value = currency.value.sort((x) => (x.isFavourit ? -1 : 1));

async function getCurrencies(): Promise<CurrencyModel[]> {
  const json = localStorage.getItem("favs");

  var currrs = await useCurrencyService().getCurrs();
  if (json && currrs.length > 0) {
    const favs1 = JSON.parse(json);
    console.log(favs1);
    favs1.forEach(function (value: CurrencyModel) {
      let item1 = currrs.filter((item) => item.cc == value.cc)[0];
      item1.isFavourit = true;
    });
  }

  return currrs;
}

function saveToLocalStorage() {
  console.clear();
  const favs: CurrencyModel[] = [];

  if (currency.value.length > 0) {
    currency.value
      .filter((curr) => curr.isFavourit)
      .forEach(function (value) {
        favs.push(value);
      });

    console.log(favs);
    localStorage.setItem("favs", JSON.stringify(favs));
  }
  return currency.value.sort((x) => (x.isFavourit ? -1 : 1));
}

async function exchangeRate() {
  if (convertTo.value !== undefined) {
    if (convertTo.value === "UAH") {
      currs.value = uah;
    } else {
      currs.value = await useCurrencyService().getCurrency(convertTo.value);
      console.log(currs.value);
    }
    convertToCC = currs.value[0].rate;
  }
}
</script>

<style>
select {
  max-width: 600px;
  box-sizing: border-box;
  margin-bottom: 25px;
  margin-right: 25px;
  margin-left: 5px;
  font-size: 25px;
  background-color: whitesmoke;
  box-shadow: 2px 2px 4px gray;
  border-radius: 5px;
}

strong {
  font-size: 25px;
  margin-left: 25px;
}

h1 {
  text-align: center;
}
.v-table {
  overflow: hidden;
  border: 1px solid #d3d3d3;
  background: #fefefe;
  width: 70%;
  margin: 5% auto 0;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  border-radius: 5px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
}

.v-table_header {
  display: flex;
  justify-content: space-around;
  text-shadow: 1px 1px 1px #fff;
  background: #e8eaeb;
}

.v-table_row {
  display: flex;
  justify-content: space-around;
  background: #f6f6f6;
  border-top: 1px solid #e0e0e0;
}

.row {
  flex-basis: 43.5%;
  padding: 8px 16px;
  text-align: center;
}

.row_check {
  flex-basis: 13%;
  padding: 8px 16px;
  text-align: center;
}

.check {
  flex-basis: 10%;
  margin-top: 11px;
  padding: 8px 16px;
  margin-left: 50px;
}
</style>
