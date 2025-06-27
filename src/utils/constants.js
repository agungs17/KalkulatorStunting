// file ini di gunakan untuk menampung variable konstanta global
import beratTable from "../json/berat_table.json";
import tinggiTable from "../json/tinggi_table.json";
import tinggiVsBerat from "../json/tinggivsberat_table.json";

export const dataSD = {
  berat: beratTable,
  tinggi: tinggiTable,
  tinggivsberat: tinggiVsBerat,
};

export const orderSD = [
  "min3sd",
  "min2sd",
  "min1sd",
  "m",
  "plus1sd",
  "plus2sd",
  "plus3sd",
];

export const sdColors = {
  min3sd: "#FF0000",
  min2sd: "#FF7F00",
  min1sd: "#FFC300",
  m: "#2ECC71",
  plus1sd: "#3399FF",
  plus2sd: "#6A0DAD",
  plus3sd: "#8E44AD",
};
