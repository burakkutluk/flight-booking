## Uçuş Rezervasyon Uygulaması 
Kullanıcılar konum ve tarih bilgilerini girerek uçuş arayabilir ve rezervasyon yapabilir.

## Ana Ekran
![home](https://github.com/user-attachments/assets/14f143ea-4f1d-4ec7-a2a4-08659317ef39)

## Uçuşlarım Ekranı
![book (2)](https://github.com/user-attachments/assets/e43b7fe9-c281-462d-969f-ee0796b19123)

## Kullanılan Teknolojiler
React TailwindCSS Nodejs MongoDB Schiphol PublicFlight API

### Installation Guide

## Requirements
* Nodejs
* Mongodb 

Both should be installed and make sure mongodb is running.

## Installation

git clone https://github.com/burakkutluk/flight-booking

Now install the dependencies

cd server
npm init -y

We are almost done, Now just start the development server.

For Frontend.

npm start

Now open localhost:3000 in your browser.

For Backend.

.env example;
```
MONGODB_URI=YOUR_MONGODB 
SCHIPHOL_APP_ID=YOUR_APP_ID
SCHIPHOL_APP_KEY=YOUR_API_KEY
PORT=YOUR_PORT
```

Open another terminal in folder, Also make sure mongodb is running in background.

npm start

Done! Now open localhost:3001 in your browser.
