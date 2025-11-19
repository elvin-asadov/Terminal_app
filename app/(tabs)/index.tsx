import { database } from '@/firebaseConfig';
import { Image } from 'expo-image';
import { push, ref } from 'firebase/database';
import { useState } from 'react';
import { Alert, Dimensions, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

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
    description: 'Təmizlənmədən su ilə ləkəsiz durulama',
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
  {
    icon: '💿',
    title: 'Təkər və Disk Təmizləyicisi',
    description: 'Təkərlər və disklər üçün xüsusi təmizlik',
    pricePerSec: '₼0.029/sec',
    pricePerMin: '₼1.74/min',
    color: '#ae85ff',
  },
];

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [cashModalVisible, setCashModalVisible] = useState(false);
  const [contactlessModalVisible, setContactlessModalVisible] = useState(false);
  const [nfcModalVisible, setNfcModalVisible] = useState(false); // New state for NFC modal
  const [customAmount, setCustomAmount] = useState(5);
  const [selectedAmount, setSelectedAmount] = useState(0); // To store the selected amount for NFC

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

  // New function to handle amount selection and open NFC modal
  const handleAmountSelection = (amount: number) => {
    setSelectedAmount(amount);
    setContactlessModalVisible(false);
    setNfcModalVisible(true);
  }

  return (
    <View style={styles.container}>
        {/* NFC Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={nfcModalVisible}
          onRequestClose={() => setNfcModalVisible(false)}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.cashIconContainer}>
                <Text style={styles.nfcIcon}>📶</Text>
              </View>
              <Text style={styles.modalTitle}>Cihazınızı NFC oxuyucuya yaxınlaşdırın</Text>
              <View style={styles.nfcAmountDisplay}>
                <Text style={styles.nfcAmountText}>Amount: {selectedAmount}.00 ₼</Text>
              </View>
              <Text style={styles.nfcArrow}>↓</Text>
              <View style={styles.nfcReaderContainer}>
                <Text style={styles.nfcReaderIcon}>📶</Text>
                <Text style={styles.nfcReaderText}>NFC Reader</Text>
              </View>
              <Text style={styles.instructions}>
                Hold your device above the NFC reader below
              </Text>
              <View style={styles.cashButtonsContainer}>
                <TouchableOpacity
                  style={styles.completePaymentButton}
                  onPress={() => {
                    recordPayment("NFC Contactless", selectedAmount);
                    setNfcModalVisible(false);
                  }}
                >
                  <Text style={styles.completePaymentButtonText}>Complete Payment ({selectedAmount}.00 ₼)</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setNfcModalVisible(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Contactless Payment Modal (Select Amount) */}
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
                <TouchableOpacity style={styles.amountButton} onPress={() => handleAmountSelection(5)}><Text style={styles.amountButtonText}>5 ₼</Text></TouchableOpacity>
                <TouchableOpacity style={styles.amountButton} onPress={() => handleAmountSelection(10)}><Text style={styles.amountButtonText}>10 ₼</Text></TouchableOpacity>
            </View>
            <View style={styles.amountButtonsContainer}>
                <TouchableOpacity style={styles.amountButton} onPress={() => handleAmountSelection(20)}><Text style={styles.amountButtonText}>20 ₼</Text></TouchableOpacity>
                <TouchableOpacity style={styles.amountButton} onPress={() => handleAmountSelection(50)}><Text style={styles.amountButtonText}>50 ₼</Text></TouchableOpacity>
            </View>
            <View style={styles.customAmountContainer}>
                <Text style={styles.customAmountLabel}>Custom Amount</Text>
                <View style={styles.customAmountInputContainer}>
                    <TouchableOpacity style={styles.customAmountButton} onPress={() => handleAmountChange(-1)}><Text style={styles.customAmountButtonText}>-</Text></TouchableOpacity>
                    <TextInput style={styles.customAmountInput} value={`${customAmount} ₼`} editable={false}/>
                    <TouchableOpacity style={styles.customAmountButton} onPress={() => handleAmountChange(1)}><Text style={styles.customAmountButtonText}>+</Text></TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.useAmountButton} onPress={() => handleAmountSelection(customAmount)}><Text style={styles.amountButtonText}>{`Use ${customAmount} ₼`}</Text></TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => setContactlessModalVisible(false)}><Text style={styles.cancelAmountText}>Cancel</Text></TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Cash Payment Modal */}
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

      {/* Main Payment Options Modal */}
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

      <View style={styles.topBackground}>
        <View style={styles.topLogoContainer}>
          <Image source={require('@/assets/images/logo.png')} style={styles.centralLogo} />
        </View>
        <View style={styles.headerCard}>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>ALTAY Avto MMC</Text>
            <Text style={styles.headerSubtitle}>Premium Özünüxidmət Avtoyuma</Text>
          </View>
          <View style={styles.headerRightContent}>
            <View style={styles.balanceContainer}>
              <Text style={styles.balanceLabel}>BALANS</Text>
              <Text style={styles.balanceAmount}>0.00 ₼</Text>
            </View>
            <View style={styles.activeServiceContainer}>
              <Text style={styles.activeServiceLabel}>AKTİV XİDMƏT</Text>
              <Text style={styles.activeServiceText}>Yuma</Text>
            </View>
            <View style={styles.languageContainer}>
              <Image source={require('@/assets/images/azerbajani_logo.png')} style={styles.flag} />
              <Image source={require('@/assets/images/russian_logo.png')} style={styles.flag} />
              <Image source={require('@/assets/images/engilsh_logo.png')} style={styles.flag} />
            </View>
          </View>
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
            <View style={styles.sidebarBalanceIconContainer}>
              <Text style={styles.sidebarBalanceIcon}>💳</Text>
            </View>
            <Text style={styles.balanceCardTitle}>Balans</Text>
            <Text style={styles.balanceCount}>(0)</Text>
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
  topBackground: {
    backgroundColor: '#1a1d4a',
    paddingTop: 120, // Adjusted to lift the logo further
    paddingBottom: 70, 
    alignItems: 'center',
  },
  topLogoContainer: {
    width: '100%',
    alignItems: 'center',
    position: 'absolute',
    top: 30, // Adjusted to lift the logo higher
    zIndex: 1,
  },
  centralLogo: {
    width: 690, // Increased size
    height: 138, // Increased size
    resizeMode: 'contain',
  },
  headerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 15,
    marginHorizontal: 10,
    padding: 15,
    position: 'absolute',
    bottom: -40, 
    width: '95%',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerTextContainer: {
    marginLeft: 5,
  },
  headerTitle: {
    color: '#333',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: '#666',
    fontSize: 12,
  },
  headerRightContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  balanceContainer: {
    backgroundColor: '#e9fbf0',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
    alignItems: 'center',
  },
  balanceLabel: {
    color: '#2f9e44',
    fontSize: 10,
  },
  balanceAmount: {
    color: '#2f9e44',
    fontSize: 14,
    fontWeight: 'bold',
  },
  activeServiceContainer: {
    backgroundColor: '#e0f2f7',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
    alignItems: 'center',
  },
  activeServiceLabel: {
    color: '#228be6',
    fontSize: 10,
  },
  activeServiceText: {
    color: '#228be6',
    fontSize: 14,
  },
  languageContainer: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  flag: {
    width: 40, // Increased size
    height: 29, // Increased size
    marginLeft: 8,
    borderRadius: 5,
    borderWidth: 0.8,
    borderColor: '#eee',
  },
  mainContent: {
    flexDirection: 'row',
    flex: 1,
  },
  servicesList: {
    flex: 2,
    padding: 10,
    marginTop: 50, 
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    padding: 25,
    marginBottom: 15,
  },
  serviceIcon: {
    fontSize: 35,
  },
  serviceText: {
    flex: 1,
    marginLeft: 20,
  },
  serviceTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  serviceDescription: {
    color: 'white',
    fontSize: 14,
    marginTop: 3
  },
  priceContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  price: {
    color: 'white',
    fontSize: 14,
    marginRight: 12,
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12
  },
  arrow: {
    color: 'white',
    fontSize: 24,
  },
  sidebar: {
    flex: 1,
    padding: 10,
    marginTop: 50, 
  },
  balanceCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
  },
  sidebarBalanceIconContainer: {
    backgroundColor: '#e3fafc',
    padding: 10,
    borderRadius: 50,
    marginBottom: 10,
  },
  sidebarBalanceIcon: {
    fontSize: 24,
    color: '#228be6',
  },
  balanceCardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333'
  },
  balanceCount: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  balanceCardAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2f9e44',
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
    shadowOffset: { width: 0, height: 2 },
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
  nfcInstructions: {
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
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  cancelAmountText: {
    color: '#868e96',
    marginTop: 15,
  },
  nfcIconContainer: {
    backgroundColor: '#e3fafc',
    padding: 15,
    borderRadius: 50,
    marginBottom: 15,
  },
  nfcIcon: {
    fontSize: 32,
    color: '#228be6',
  },
  nfcModalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 15,
  },
  nfcAmountDisplay: {
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
  },
  nfcAmountText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#495057',
  },
  nfcArrow: {
    fontSize: 24,
    color: '#495057',
    marginVertical: 5,
  },
  nfcReaderContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  nfcReaderIcon: {
    fontSize: 48,
    color: '#495057',
  },
  nfcReaderText: {
    fontSize: 16,
    color: '#868e96',
    marginTop: 5,
  },
})
//miov