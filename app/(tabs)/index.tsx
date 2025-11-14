
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { Image } from 'expo-image';
import { useState } from 'react';

const services = [
  {
    icon: '💧',
    title: 'Yüksək Təzyiqli Yuma',
    description: 'Güclü su axını ilə kir və qalıqları təmizləyin',
    pricePerSec: '₼0.025/sec',
    pricePerMin: '₼1.50/min',
    color: '#4dabf7',
  },
  {
    icon: '✨',
    title: 'Köpük/Sabun Tətbiqi',
    description: 'Dərin təmizlik üçün zəngin köpük formulası',
    pricePerSec: '₼0.021/sec',
    pricePerMin: '₼1.26/min',
    color: '#748ffc',
  },
  {
    icon: '🖌️',
    title: 'Köpüklü Fırça',
    description: 'Dönən fırçalarla inadkar kirləri təmizləyin',
    pricePerSec: '₼0.029/sec',
    pricePerMin: '₼1.74/min',
    color: '#51cf66',
  },
  {
    icon: '🛡️',
    title: 'Mum Tətbiqi',
    description: 'Parlaqlıq və qoruma üçün qoruyucu mum örtüyü',
    pricePerSec: '₼0.033/sec',
    pricePerMin: '₼1.98/min',
    color: '#fcc419',
  },
  {
    icon: '🌬️',
    title: 'Osmosis Suyu',
    description: 'Təmizlənmiş su ilə ləkəsiz durulama',
    pricePerSec: '₼0.025/sec',
    pricePerMin: '₼1.50/min',
    color: '#22b8cf',
  },
  {
    icon: '🚗',
    title: 'Avtomobilin Altının Yuyulması',
    description: 'Avtomobilinizin altını təmizləyin',
    pricePerSec: '₼0.038/sec',
    pricePerMin: '₼2.28/min',
    color: '#9065db',
  },
  {
    icon: '💨',
    title: 'Hava ilə Qurutma',
    description: 'Sürətli qurutma üçün güclü hava axını',
    pricePerSec: '₼0.017/sec',
    pricePerMin: '₼1.02/min',
    color: '#ff8787',
  },
];

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
       <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Ödəniş Variantları</Text>
            <Text style={styles.modalSubtitle}>Ödəniş Metodunu Seçin</Text>
            
            <TouchableOpacity style={[styles.option, {backgroundColor: '#69db7c'}]}>
              <View style={styles.optionIconContainer}>
                <Text>💰</Text>
              </View>
              <View style={styles.optionTextContainer}>
                <Text style={styles.optionTitle}>Nağd Ödəniş</Text>
                <Text style={styles.optionSubtitle}>Maşında əskinazlar və sikkələrlə ödəyin</Text>
                <View style={styles.optionButton}>
                  <Text style={styles.optionButtonText}>Əskinazlar və ya sikkələr daxil edin</Text>
                </View>
              </View>
              <Text style={styles.arrow}>〉</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.option, {backgroundColor: '#64a0ff'}]}>
              <View style={styles.optionIconContainer}>
                <Text>💳</Text>
              </View>
              <View style={styles.optionTextContainer}>
                <Text style={styles.optionTitle}>Təmassız Ödəniş</Text>
                <Text style={styles.optionSubtitle}>Dərhal ödəmək üçün kartınızı və ya telefonunuzu toxundurun</Text>
                <View style={styles.paymentButtons}>
                  <TouchableOpacity style={styles.paymentButton}><Text>Apple Pay</Text></TouchableOpacity>
                  <TouchableOpacity style={styles.paymentButton}><Text>Google Pay</Text></TouchableOpacity>
                  <TouchableOpacity style={styles.paymentButton}><Text>Təmassız Kart</Text></TouchableOpacity>
                </View>
              </View>
               <Text style={styles.arrow}>〉</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.option, {backgroundColor: '#ae85ff'}]}>
              <View style={styles.optionIconContainer}>
                <Text>📱</Text>
              </View>
              <View style={styles.optionTextContainer}>
                <Text style={styles.optionTitle}>QR Kod Ödənişi</Text>
                <Text style={styles.optionSubtitle}>Mobil ödəniş tətbiqi ilə QR kodu skan edin</Text>
                 <View style={styles.paymentButtons}>
                  <TouchableOpacity style={styles.paymentButton}><Text>PayPal</Text></TouchableOpacity>
                  <TouchableOpacity style={styles.paymentButton}><Text>Venmo</Text></TouchableOpacity>
                  <TouchableOpacity style={styles.paymentButton}><Text>CashApp</Text></TouchableOpacity>
                </View>
              </View>
               <Text style={styles.arrow}>〉</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>
      <View style={styles.header}>
        <Image source={require('@/assets/images/logo.png')} style={styles.logo} />
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>ALTAY Avto MMC</Text>
          <Text style={styles.headerSubtitle}>Premium Özünüxidmət Avtoyuma</Text>
        </View>
        <View style={styles.headerInfo}>
            <View>
                <Text style={styles.balance}>BALANS</Text>
                <Text style={styles.balanceAmount}>0.00 ₼</Text>
            </View>
            <View>
                <Text style={styles.activeService}>AKTİV XİDMƏT</Text>
                <Text style={styles.activeServiceText}>Yuma</Text>
            </View>
        </View>
        <View style={styles.languageContainer}>
          <Image source={{ uri: 'https://i.imgur.com/O2yT4pE.png' }} style={styles.flag} />
          <Image source={{ uri: 'https://i.imgur.com/fCi829k.png' }} style={styles.flag} />
          <Image source={{ uri: 'https://i.imgur.com/wVp7Ecf.png' }} style={styles.flag} />
        </View>
      </View>
      <View style={styles.mainContent}>
        <ScrollView style={styles.servicesList}>
          {services.map((service, index) => (
            <TouchableOpacity key={index} style={[styles.serviceItem, { backgroundColor: service.color }]}>
              <Text style={styles.serviceIcon}>{service.icon}</Text>
              <View style={styles.serviceText}>
                <Text style={styles.serviceTitle}>{service.title}</Text>
                <Text style={styles.serviceDescription}>{service.description}</Text>
                <View style={styles.priceContainer}>
                  <Text style={styles.price}>{service.pricePerSec}</Text>
                  <Text style={styles.price}>{service.pricePerMin}</Text>
                </View>
              </View>
              <Text style={styles.arrow}>〉</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View style={styles.sidebar}>
          <View style={styles.balanceCard}>
            <Text style={styles.balanceCardTitle}>Balans</Text>
            <Text style={styles.balanceCardAmount}>0.00 ₼</Text>
            <TouchableOpacity style={styles.addBalanceButton} onPress={() => setModalVisible(true)}>
              <Text style={styles.addBalanceButtonText}>+ Balans əlavə et</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0c0e2b',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#1a1d4a',
  },
  logo: {
    width: 100,
    height: 50,
    resizeMode: 'contain',
  },
  headerTextContainer: {
    marginLeft: 10,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: 'white',
    fontSize: 12,
  },
  headerInfo: {
      flexDirection: 'row',
      marginLeft: 'auto'
  },
  balance: {
    color: 'white',
    fontSize: 12,
  },
  balanceAmount: {
    color: '#4dff7c',
    fontSize: 16,
    fontWeight: 'bold',
  },
  activeService: {
    color: 'white',
    fontSize: 12,
    marginLeft: 15
  },
  activeServiceText: {
    color: 'white',
    fontSize: 14,
    marginLeft: 15
  },
  languageContainer: {
    flexDirection: 'row',
    marginLeft: 20,
  },
  flag: {
    width: 30,
    height: 20,
    marginLeft: 5,
  },
  mainContent: {
    flexDirection: 'row',
    flex: 1,
  },
  servicesList: {
    flex: 2,
    padding: 10,
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
  },
  serviceIcon: {
    fontSize: 30,
  },
  serviceText: {
    flex: 1,
    marginLeft: 15,
  },
  serviceTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  serviceDescription: {
    color: 'white',
    fontSize: 12,
    marginTop: 2
  },
  priceContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  price: {
    color: 'white',
    fontSize: 12,
    marginRight: 10,
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10
  },
  arrow: {
    color: 'white',
    fontSize: 20,
  },
  sidebar: {
    flex: 1,
    padding: 10,
  },
  balanceCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
  },
  balanceCardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333'
  },
  balanceCardAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 10,
  },
  addBalanceButton: {
    backgroundColor: '#00bfff',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  addBalanceButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  closeButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalSubtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    width: '100%',
  },
  optionIconContainer: {
    marginRight: 15,
  },
  optionTextContainer: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  optionSubtitle: {
    fontSize: 12,
    color: 'white',
  },
  optionButton: {
    marginTop: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignSelf: 'flex-start',
  },
  optionButtonText: {
    fontSize: 12,
  },
  paymentButtons: {
    flexDirection: 'row',
    marginTop: 10,
  },
  paymentButton: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
});
