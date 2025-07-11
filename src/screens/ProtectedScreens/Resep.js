import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import data from '../../json/resep_balita.json';
import Header from '../../atomic/molecules/Header';
import Container from '../../atomic/atoms/Container';
import Icon from '../../atomic/atoms/Icon';

const flatKategori = [];

Object.values(data).forEach((item) => {
  if (item.usia && item.resep) {
    const resepUtama = item.resep.filter((r) => !r.usia);
    flatKategori.push({ usia: item.usia, resep: resepUtama });

    item.resep.forEach((r) => {
      if (r.usia && r.resep) {
        flatKategori.push({ usia: r.usia, resep: r.resep });
      }
    });
  }
});

const usiaOptions = Array.from(
  new Map(flatKategori.map((item) => [item.usia, { label: item.usia, value: item.usia }])).values()
);

const Resep = () => {
  const [selectedUsia, setSelectedUsia] = useState(usiaOptions[0]?.value || '');
  const kategori = flatKategori.find((item) => item.usia === selectedUsia);

  return (
    <Container useEarlyReturn useSafeArea>
      <Header useBack title="Resep" />
      <Container usePaddingHorizontal>
        <ScrollView style={{ marginTop: 20 }}>
          <Text style={styles.title}> Resep Makanan Balita</Text>
          <Text style={styles.subtitle}>
            Pilih usia anak untuk menampilkan resep yang sesuai
          </Text>

          <View style={styles.dropdownWrapper}>
            <Text style={styles.label}>Usia Balita:</Text>
            <Dropdown
              style={styles.dropdown}
              data={usiaOptions}
              labelField="label"
              valueField="value"
              value={selectedUsia}
              onChange={(item) => setSelectedUsia(item.value)}
              placeholder="Pilih Usia"
              placeholderStyle={styles.placeholder}
              selectedTextStyle={styles.selectedText}
              itemTextStyle={styles.itemText}
              containerStyle={styles.dropdownList}
            />
          </View>

          {kategori?.resep?.map((resep, idx) => (
            <View key={idx} style={styles.card}>
              <Image source={{ uri: resep.gambar }} style={styles.image} />
              <Text style={styles.resepTitle}>
                <Icon name="bowl-mix" size={20} color="#2563eb" /> {resep.nama}
              </Text>

              <View style={styles.sectionTitle}>
                <Icon name="format-list-bulleted" size={16} />
                <Text style={styles.sectionText}>Bahan:</Text>
              </View>
              {Array.isArray(resep.bahan) &&
                resep.bahan.map((bahan, i) => (
                  <Text key={i} style={styles.textItem}>• {bahan}</Text>
                ))}

              <View style={styles.sectionTitle}>
                <Icon name="chef-hat" size={16} />
                <Text style={styles.sectionText}>Cara Membuat:</Text>
              </View>
              {Array.isArray(resep.cara_membuat) &&
                resep.cara_membuat.map((langkah, i) => (
                  <Text key={i} style={styles.textItem}>
                    {i + 1}. {langkah}
                  </Text>
                ))}

              <View style={styles.sectionTitle}>
                <Icon name="information-outline" size={16} />
                <Text style={styles.sectionText}>Informasi Gizi:</Text>
              </View>
              <Text style={styles.textItem}>
                Energi: {resep.informasi_gizi_per_porsi?.energi}
              </Text>
              <Text style={styles.textItem}>
                Protein: {resep.informasi_gizi_per_porsi?.protein}
              </Text>
              <Text style={styles.textItem}>
                Lemak: {resep.informasi_gizi_per_porsi?.lemak}
              </Text>
              <Text style={styles.textItem}>Jumlah Porsi: {resep.jumlah_porsi}</Text>
            </View>
          ))}
        </ScrollView>
      </Container>
    </Container>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 4,
    color: '#1e293b',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    color: '#64748b',
  },
  dropdownWrapper: {
    marginBottom: 24,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: '#333',
  },
  dropdown: {
    height: 50,
    borderColor: '#cbd5e1',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    backgroundColor: '#f0fdfa',
  },
  placeholder: {
    color: '#94a3b8',
  },
  selectedText: {
    color: '#111',
    fontSize: 16,
  },
  itemText: {
    color: '#000',
    fontSize: 14,
  },
  dropdownList: {
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 4,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 18,
    marginBottom: 28,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 14,
  },
  resepTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: 12,
  },
  sectionTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 6,
  },
  sectionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
    marginLeft: 6,
  },
  textItem: {
    fontSize: 14,
    lineHeight: 20,
    color: '#334155',
    marginBottom: 4,
  },
});

export default Resep;
