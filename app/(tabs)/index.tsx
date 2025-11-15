
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import { Image } from 'expo-image';
import { useState } from 'react';
import { database } from '../firebaseConfig';
import { ref, push } from 'firebase/database';

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
  const [cashModalVisible, setCashModalVisible] = useState(false);
  const [contactlessModalVisible, setContactlessModalVisible] = useState(false);
  const [customAmount, setCustomAmount] = useState(5);

  const recordPayment = async (paymentType: string, amount: number) => {
    try {
      const paymentsRef = ref(database, 'payments');
      await push(paymentsRef, {
        paymentType,
        amount,
        timestamp: new Date().toISOString(),
      });
      Alert.alert("Success", `Payment of ${amount} ₼ recorded via ${paymentType}.`);
    } catch (error) {
      Alert.alert("Error", "Failed to record payment.");
      console.error("Error recording payment: ", error);
    }
  };

  const openCashModal = () => {
    setModalVisible(false);
    setCashModalVisible(true);
  }

  const openContactlessModal = () => {
    setModalVisible(false);
    setContactlessModalVisible(true);
  }

  const handleAmountChange = (increment: number) => {
      setCustomAmount(prev => {
          const newValue = prev + increment;
          return newValue > 0 ? newValue : 1;
      });
  }

  return (
    <View style={styles.container}>
        <Modal
        animationType="slide"
        transparent={true}
        visible={contactlessModalVisible}
        onRequestClose={() => setContactlessModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
              <View style={styles.amountIconContainer}>
                  <Text>💳</Text>
              </View>
            <Text style={styles.modalTitle}>Select Amount</Text>
            <Text style={styles.modalSubtitle}>Choose how much to add to your balance</Text>
            <View style={styles.amountButtonsContainer}>
                <TouchableOpacity style={styles.amountButton} onPress={() => {recordPayment("Contactless", 5); setContactlessModalVisible(false);}}><Text style={styles.amountButtonText}>5 ₼</Text></TouchableOpacity>
                <TouchableOpacity style={styles.amountButton} onPress={() => {recordPayment("Contactless", 10); setContactlessModalVisible(false);}}><Text style={styles.amountButtonText}>10 ₼</Text></TouchableOpacity>
            </View>
            <View style={styles.amountButtonsContainer}>
                <TouchableOpacity style={styles.amountButton} onPress={() => {recordPayment("Contactless", 20); setContactlessModalVisible(false);}}><Text style={styles.amountButtonText}>20 ₼</Text></TouchableOpacity>
                <TouchableOpacity style={styles.amountButton} onPress={() => {recordPayment("Contactless", 50); setContactlessModalVisible(false);}}><Text style={styles.amountButtonText}>50 ₼</Text></TouchableOpacity>
            </View>
            <View style={styles.customAmountContainer}>
                <Text style={styles.customAmountLabel}>Custom Amount</Text>
                <View style={styles.customAmountInputContainer}>
                    <TouchableOpacity style={styles.customAmountButton} onPress={() => handleAmountChange(-1)}><Text style={styles.customAmountButtonText}>-</Text></TouchableOpacity>
                    <TextInput style={styles.customAmountInput} value={`${customAmount} ₼`} editable={false}/>
                    <TouchableOpacity style={styles.customAmountButton} onPress={() => handleAmountChange(1)}><Text style={styles.customAmountButtonText}>+</Text></TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.useAmountButton} onPress={() => {recordPayment("Contactless - Custom", customAmount); setContactlessModalVisible(false);}}><Text style={styles.useAmountButtonText}>{`Use ${customAmount} ₼`}</Text></TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => setContactlessModalVisible(false)}><Text style={styles.cancelAmountText}>Cancel</Text></TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={cashModalVisible}
        onRequestClose={() => setCashModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.cashIconContainer}>
              <Text>💰</Text>
            </View>
            <Text style={styles.cashModalTitle}>Nağd pulu terminala daxil edin</Text>
            <View style={styles.cashInsertedContainer}>
              <Text style={styles.cashInsertedLabel}>CASH INSERTED</Text>
              <Text style={styles.cashInsertedAmount}>10.36 ₼</Text>
              <View style={styles.progressBar}><View style={styles.progress} /></View>
            </View>
            <View style={styles.continueContainer}>
              <Text style={styles.arrowIcon}>→</Text>
              <Text style={styles.continueText}>Continue inserting cash</Text>
            </View>
            <Text style={styles.instructions}>
              Insert bills and coins into the terminal on the left side
            </Text>
            <View style={styles.cashButtonsContainer}>
              <TouchableOpacity style={styles.completePaymentButton} onPress={() => {recordPayment("Cash", 10.36); setCashModalVisible(false);}}>
                <Text style={styles.completePaymentButtonText}>Complete Payment (10.36 ₼)</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setCashModalVisible(false)}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

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

            <TouchableOpacity style={[styles.option, { backgroundColor: '#69db7c' }]} onPress={openCashModal}>
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

            <TouchableOpacity style={[styles.option, { backgroundColor: '#64a0ff' }]} onPress={openContactlessModal}>
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

            <TouchableOpacity style={[styles.option, { backgroundColor: '#ae85ff' }]}>
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
    elevation: 5,
    width: '80%'
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
    textAlign: 'center'
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
  cashModalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 15,
    textAlign: 'center'
  },
  cashIconContainer: {
      backgroundColor: '#e9fbf0',
      padding: 15,
      borderRadius: 50,
  },
  cashInsertedContainer: {
      backgroundColor: '#f0fff4',
      borderRadius: 15,
      padding: 20,
      width: '100%',
      alignItems: 'center',
      marginVertical: 10,
  },
  cashInsertedLabel: {
      color: '#2f9e44',
      fontSize: 12,
  },
  cashInsertedAmount: {
      color: '#2f9e44',
      fontSize: 28,
      fontWeight: 'bold',
  },
  progressBar: {
      width: '100%',
      height: 5,
      backgroundColor: '#d3f9d8',
      borderRadius: 5,
      marginTop: 10,
  },
  progress: {
      width: '40%',
      height: '100%',
      backgroundColor: '#51cf66',
      borderRadius: 5,
  },
  continueContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 10,
  },
  arrowIcon: {
      fontSize: 24,
      color: '#495057',
  },
  continueText: {
      marginLeft: 10,
      color: '#495057',
  },
  instructions: {
      color: '#868e96',
      textAlign: 'center',
      marginVertical: 10,
  },
  cashButtonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      marginTop: 20,
  },
  completePaymentButton: {
      backgroundColor: '#12b886',
      paddingVertical: 15,
      paddingHorizontal: 20,
      borderRadius: 30,
      flex: 1,
      marginRight: 10,
      alignItems: 'center'
  },
  completePaymentButtonText: {
      color: 'white',
      fontWeight: 'bold',
  },
  cancelButton: {
      backgroundColor: '#fff0f6',
      paddingVertical: 15,
      paddingHorizontal: 30,
      borderRadius: 30,
  },
  cancelButtonText: {
      color: '#f06595',
      fontWeight: 'bold',
  },
  amountIconContainer: {
    backgroundColor: '#e3fafc',
    padding: 15,
    borderRadius: 50,
    marginBottom: 15,
  },
  amountButtonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
      marginBottom: 10,
  },
  amountButton: {
      backgroundColor: '#12b886',
      paddingVertical: 15,
      paddingHorizontal: 30,
      borderRadius: 15,
      marginHorizontal: 5,
      flex: 1,
      alignItems: 'center'
  },
  amountButtonText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 16,
  },
  customAmountContainer: {
      backgroundColor: '#f8f9fa',
      borderRadius: 15,
      padding: 20,
      width: '100%',
      alignItems: 'center',
      marginVertical: 10,
  },
  customAmountLabel: {
      fontSize: 14,
      color: '#495057',
  },
  customAmountInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 10,
  },
  customAmountButton: {
      backgroundColor: '#e9ecef',
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
  },
  customAmountButtonText: {
      fontSize: 24,
      color: '#495057',
  },
  customAmountInput: {
      borderWidth: 1,
      borderColor: '#dee2e6',
      borderRadius: 10,
      padding: 10,
      marginHorizontal: 10,
      textAlign: 'center',
      fontSize: 18,
      fontWeight: 'bold',
      width: 100,
  },
  useAmountButton: {
      backgroundColor: '#228be6',
      borderRadius: 25,
      paddingVertical: 15,
      paddingHorizontal: 40,
      width: '100%',
      alignItems: 'center',
      marginTop: 10
  },
  useAmountButtonText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 16,
  },
  cancelAmountText: {
      color: '#f06595',
      fontWeight: 'bold',
      marginTop: 15,
  }
});
