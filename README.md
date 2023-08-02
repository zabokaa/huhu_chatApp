# :purple_circle: *HUHU _chatApp* :purple_circle:

![app](./assets/IMG_app_merged.png?raw=true "pics of start and chat screens")

## table of contents
* [objective](#objective)
* [key features](#key-features)
* [user stories](#user-stories)
* [technologies](#technologies)
* [project status](#project-status)
* [chat app setup guide](#chat-app-setup-guide)
* [acknowledgements](#acknowledgements)

## objective
- to build a chat app for mobile devices using React Native, Expo, and Google Firestore Database
- app will provide users with a chat interface and options to share images and their location
  
## key features
- one page where users can enter their name and choose a background color for the chat screen
before joining the chat
- another page displaying the conversation, as well as an input field and submit button
- chat will provide users with two additional communication features: sending images
and location data
- data gets stored online and offline

## user stories 
- As a new user, I want to be able to easily enter a chat room so I can quickly start talking to my
friends.
- As a user, I want to be able to send messages to my friends to exchange
the latest news.
- As a user, I want to send images to my friends to show them what I’m currently doing.
- As a user, I want to share my location with my friends to show them where I am.
- As a user, I want to be able to read my messages offline so I can reread conversations at any time.
- As a user with a visual impairment, I want to use a chat app that is compatible with a screen
reader so that I can engage with a chat interface.

## technologies
HTML | CSS | JavaScript | React Native | Expo | Google Firestore DB + Firebase Cloud

## project status
project is: finished

## chat app setup guide
HUHU 🙃 this guide will walk you through the steps required to set up the development environment, configure the database, and install the necessary libraries to run the app.
- clone the repository
- install dependencies: all used libraries for that chat app (e.g. react-native-gifted-chat, expo-image-picker, .. ) are already included in the package.json file and will be installed automatically when you run `npm install`
- create database https://firebase.google.com/ (ensure in the “Rules” tab the function is set to `allow read, write: if true;`).
- don't forget to update App.js with your personal firebaseConfig !
- run the app `npx expo start`
- that's it !
- you should now have the Chat App up and running on your development machine. if you encounter any issues or have questions, please feel free to reach out for support
- Happy chatting ! 🚀




## acknowledgements
this project was based on full-stack immersion course @ CareerFoundry
