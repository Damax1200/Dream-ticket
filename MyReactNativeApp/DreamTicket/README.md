# Dream Ticket 🎫

Dream Ticket is a React Native mobile application that serves as your gateway to amazing experiences. Discover, book, and enjoy the best events, concerts, shows, and experiences in your city.

## Features

- **Easy Booking**: Book tickets in just a few taps
- **Mobile Tickets**: Digital tickets on your phone
- **Top Events**: Curated best events for you
- **Notifications**: Never miss an event update
- **User Profile**: Manage your personal information and preferences
- **Ticket Management**: View and manage all your tickets in one place

## Screens

1. **Home Screen**: Welcome screen with quick actions and feature highlights
2. **Ticket Screen**: View and manage your booked tickets
3. **Profile Screen**: Manage your personal information and app preferences

## Getting Started

### Prerequisites

- Node.js (>= 16)
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development)

### Installation

1. Navigate to the project directory:
   ```bash
   cd DreamTicket
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. For iOS, install pods:
   ```bash
   cd ios && pod install && cd ..
   ```

### Running the App

#### Android
```bash
npm run android
```

#### iOS
```bash
npm run ios
```

#### Start Metro Bundler
```bash
npm start
```

## Project Structure

```
DreamTicket/
├── App.js                 # Main app component with navigation
├── src/
│   └── screens/
│       ├── HomeScreen.js     # Home screen with features and quick actions
│       ├── TicketScreen.js   # Ticket management screen
│       └── ProfileScreen.js  # User profile and settings screen
├── package.json
└── README.md
```

## Dependencies

- **React Navigation**: For screen navigation
- **React Native Safe Area Context**: For safe area handling
- **React Native Screens**: For native screen optimization

## Development

### Available Scripts

- `npm start`: Start the Metro bundler
- `npm run android`: Run on Android device/emulator
- `npm run ios`: Run on iOS device/simulator
- `npm test`: Run tests
- `npm run lint`: Run ESLint

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Your Name - [@yourusername](https://twitter.com/yourusername)

Project Link: [https://github.com/yourusername/dream-ticket](https://github.com/yourusername/dream-ticket)
