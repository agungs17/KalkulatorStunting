const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();
const fs = require('fs').promises;
const cliProgress = require('cli-progress');

async function importData(jsonData) {
  try {
    const beratLaki = jsonData.berat.l;
    const beratPerempuan = jsonData.berat.p;
    const tinggiLaki = jsonData.tinggi.l;
    const tinggiPerempuan = jsonData.tinggi.p;
    const tinggiVsBeratLaki = jsonData.tinggivsberat.l;
    const tinggiVsBeratPerempuan = jsonData.tinggivsberat.p;

    let totalDocs = 0;

    totalDocs += Object.keys(beratLaki).length + Object.keys(beratPerempuan).length;
    totalDocs += Object.keys(tinggiLaki).length + Object.keys(tinggiPerempuan).length;
    for (const kelompokUsia in tinggiVsBeratLaki) {
      totalDocs += Object.keys(tinggiVsBeratLaki[kelompokUsia]).length;
    }
    for (const kelompokUsia in tinggiVsBeratPerempuan) {
      totalDocs += Object.keys(tinggiVsBeratPerempuan[kelompokUsia]).length;
    }

    const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
    progressBar.start(totalDocs, 0);
    let uploadedDocs = 0;

    async function saveDataToCollection(collectionName, jenisKelamin, data, isBerat = false) {
      for (const key in data) {
        const docData = {
          jenis_kelamin: jenisKelamin.toUpperCase(),
          ...data[key]
        };

        let docId = '';
        if (isBerat) {
          docData.usia_bulan = parseInt(key);
          docId = `b_${jenisKelamin}_${key}`;
        } else {
          docData.usia_bulan = parseInt(key);
          docId = `t_${jenisKelamin}_${key}`;
        }

        await db.collection(collectionName).doc(docId).set(docData);
        uploadedDocs++;
        progressBar.update(uploadedDocs);
      }
    }

    async function saveTinggiVsBerat(collectionName, jenisKelamin, data) {
      for (const kelompokUsia in data) {
        for (const tinggi in data[kelompokUsia]) {
          const docData = {
            jenis_kelamin: jenisKelamin.toUpperCase(),
            kelompok_usia: kelompokUsia,
            tinggi: parseFloat(tinggi.replace(',', '.')),
            ...data[kelompokUsia][tinggi]
          };
          const docId = `tvb_${jenisKelamin}_${kelompokUsia}_${parseFloat(tinggi.replace(',', '.'))}`;
          await db.collection(collectionName).doc(docId).set(docData);
          uploadedDocs++;
          progressBar.update(uploadedDocs);
        }
      }
    }

    // Import Data Berat
    await saveDataToCollection('berat_collections', 'l', beratLaki, true);
    await saveDataToCollection('berat_collections', 'p', beratPerempuan, true);

    // Import Data Tinggi
    await saveDataToCollection('tinggi_collections', 'l', tinggiLaki);
    await saveDataToCollection('tinggi_collections', 'p', tinggiPerempuan);

    // Import Data Tinggi vs Berat
    await saveTinggiVsBerat('tinggivsberat_collections', 'l', tinggiVsBeratLaki);
    await saveTinggiVsBerat('tinggivsberat_collections', 'p', tinggiVsBeratPerempuan);

    progressBar.stop();
    console.log('=== Data Berhasil Di Import ke Firestore ===');

  } catch (error) {
    console.error('Terjadi kesalahan:', error);
  }
}

async function main() {
  try {
    const jsonData = JSON.parse(await fs.readFile('bulk-data.json', 'utf8'));
    await importData(jsonData);
  } catch (error) {
    console.error('Terjadi kesalahan saat membaca file JSON:', error);
  }
}

main();