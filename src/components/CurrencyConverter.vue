<template>
  <div id="converter">
    <h1>Currency converter</h1>
    <br />
    <strong
      >Input amount of currency and currency abbreviations like in format
      example:
    </strong>
    <br />
    <input
      type="siring"
      v-model="inputStr"
      placeholder="Format example: 15 usd in uah"
      @input="exchangeRate"
    />
    <br />
    <strong v-if="convertFromSelected"
      >{{ amount }} {{ convertFrom }} will cost {{ finalmount.toFixed(4) }}
      {{ convertTo }}</strong
    >
    <br />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useCurrencyService } from "@/services/useCurrencyService";
import { CurrencyModel } from "@/models/CurrencyModel";

const uah = [
  {
    txt: "Українська гривня",
    rate: 1,
    cc: "UAH",
  },
];

const inputStr = ref<string>();
let inputStrTrim = ref<string>();
let amount = ref<number>();
let convertTo = ref<string>();
let convertFrom = ref<string>();
let convertFromCC: number;
let convertToCC: number;
let finalmount: number;
const currs = ref<CurrencyModel[]>([]);
const convertFromSelected = ref(false);

async function exchangeRate() {
  inputStrTrim.value = inputStr.value.toUpperCase().replace(/\s/g, "");
  if (inputStrTrim.value.length > 8) {
    amount.value = inputStrTrim.value.slice(0, -8).valueOf();
    console.log("amount", amount.value);
    convertFrom.value = inputStrTrim.value.slice(-8, -5);
    console.log("convertFrom", convertFrom.value);
    convertTo.value = inputStrTrim.value.slice(-3);
    console.log("convertTo", convertTo.value);
    if (convertFrom.value === "UAH") {
      currs.value = uah;
      console.log("getCurrencyFromUa", currs.value[0].cc);
    } else {
      currs.value = await useCurrencyService().getCurrency(convertFrom.value);
      console.log("getCurrencyFrom", currs.value[0].cc);
    }
    convertFromCC = currs.value[0].rate;
    if (convertTo.value === "UAH") {
      currs.value = uah;
      console.log("getCurrencyToUa", currs.value[0].cc);
    } else {
      currs.value = await useCurrencyService().getCurrency(convertTo.value);
      console.log("getCurrencyTo", currs.value[0].cc);
    }
    convertToCC = currs.value[0].rate;
    finalmount = (convertFromCC / convertToCC) * amount.value;
    console.log("finalmount", finalmount);
    if (finalmount > 0) {
      convertFromSelected.value = true;
    } else {
      convertFromSelected.value = false;
    }
  }
}
</script>

<style>
input {
  width: 830px;
  box-sizing: border-box;
  margin-bottom: 25px;
  margin-right: 25px;
  margin-left: 25px;
  font-size: 25px;
  border-radius: 5px;
}

#converter {
  overflow: hidden;
  border: 1px solid #d3d3d3;
  background: #e8eaeb;
  width: 90%;
  margin: 5% auto 0;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  border-radius: 5px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
}
</style>
