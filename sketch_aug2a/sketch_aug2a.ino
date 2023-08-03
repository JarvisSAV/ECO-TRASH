#include <SPI.h>
#include <MFRC522.h>

#define RST_PIN 9   // Pin de reinicio del lector RFID
#define SS_PIN 10   // Pin de selección del esclavo para el lector RFID

MFRC522 rfid(SS_PIN, RST_PIN); // Crear instancia para el lector RFID

void setup() {
  Serial.begin(9600);
  SPI.begin();      // Iniciar el bus SPI
  rfid.PCD_Init();  // Iniciar el lector RFID
  Serial.println("Acerca la tarjeta RFID para leer o escribir.");
}

void loop() {
  if (rfid.PICC_IsNewCardPresent() && rfid.PICC_ReadCardSerial()) {
    // Tarjeta detectada, se procede a leer y escribir
    Serial.println("Tarjeta detectada!");

    // Leer el UID de la tarjeta
    Serial.print("UID de la tarjeta: ");
    dump_byte_array(rfid.uid.uidByte, rfid.uid.size);
    Serial.println();

    // Escribir datos en el bloque 4 de la tarjeta
    byte dataToWrite[] = {'H', 'e', 'l', 'l', 'o', '!', '!', '!'};
    if(writeDataToCard(4, dataToWrite, sizeof(dataToWrite))){
      Serial.println("Datos escritos en la tarjeta.");
    } else {
      Serial.println("Error al escribir en la tarjeta.");
    }

    // Leer datos de la tarjeta
    byte dataRead[16]; // Se reserva espacio para leer hasta 16 bytes
    if(readDataFromCard(4, dataRead, sizeof(dataRead))){
      Serial.print("Datos leídos de la tarjeta: ");
      for(int i=0; i<sizeof(dataRead); i++){
        Serial.write(dataRead[i]);
      }
      Serial.println();
    } else {
      Serial.println("Error al leer la tarjeta.");
    }

    rfid.PICC_HaltA(); // Finalizar comunicación con la tarjeta
  }
}

// Función para escribir datos en la tarjeta
bool writeDataToCard(byte blockNumber, byte* data, int dataSize){
  MFRC522::StatusCode status;
  if (rfid.uid.size != 4) {
    Serial.println("Tamaño UID incorrecto. Asegúrate de usar una tarjeta MIFARE.");
    return false;
  }
  if (blockNumber >= 64) {
    Serial.println("Número de bloque inválido.");
    return false;
  }
  status = rfid.MIFARE_Write(blockNumber, data, dataSize);
  return (status == MFRC522::STATUS_OK);
}

// Función para leer datos de la tarjeta
bool readDataFromCard(byte blockNumber, byte* data, int dataSize){
  MFRC522::StatusCode status;
  if (rfid.uid.size != 4) {
    Serial.println("Tamaño UID incorrecto. Asegúrate de usar una tarjeta MIFARE.");
    return false;
  }
  if (blockNumber >= 64) {
    Serial.println("Número de bloque inválido.");
    return false;
  }
 
  return (status == MFRC522::STATUS_OK);
}

void dump_byte_array(byte *buffer, byte bufferSize) {
  for (byte i = 0; i < bufferSize; i++) {
    Serial.print(buffer[i] < 0x10 ? " 0" : " ");
    Serial.print(buffer[i], HEX);
  }
}

