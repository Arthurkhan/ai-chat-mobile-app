# Personal Android APK Installation Guide

A streamlined guide for building and installing your AI Chat app directly on your Android phone for personal use. No Play Store needed!

## Quick Start (TL;DR)

```bash
# One-time setup on your Android phone
# Settings → About → Tap "Build Number" 7 times → Enable Developer Options → Enable USB Debugging

# Connect phone via USB, then run:
./scripts/build-android.sh --install

# That's it! App installs on your phone.
```

---

## Prerequisites

### On Your Mac
- ✅ Android Studio installed (or just Android SDK tools)
- ✅ Your AI Chat app with Android platform added

### On Your Android Phone
1. **Enable Developer Mode**:
   - Settings → About Phone
   - Tap "Build Number" 7 times
   - You'll see "You are now a developer!"

2. **Enable USB Debugging**:
   - Settings → System → Developer Options
   - Turn ON "Developer Options"
   - Turn ON "USB Debugging"
   - Turn ON "Install via USB" (if available)

---

## Method 1: Direct USB Installation (Fastest)

### Step 1: Connect Your Phone
1. Connect Android phone to Mac via USB
2. On phone: "Allow USB Debugging?" → OK
3. Check "Always allow from this computer"

### Step 2: Build and Install in One Command
```bash
# From your project directory
npm run build && npx cap sync android && cd android && ./gradlew installDebug
```

The app will automatically install and launch on your phone!

### Alternative: Using ADB
```bash
# Build the APK first
npm run build
npx cap sync android
cd android
./gradlew assembleDebug

# Install using ADB
adb install app/build/outputs/apk/debug/app-debug.apk

# Or replace existing installation
adb install -r app/build/outputs/apk/debug/app-debug.apk
```

---

## Method 2: Wireless Installation (No Cable)

### Option A: ADB over WiFi (Android 11+)
1. **On Phone**: Settings → Developer Options → Wireless Debugging → ON
2. Tap "Pair device with QR code" or "Pair with pairing code"
3. **On Mac**:
```bash
# If using pairing code
adb pair [IP:PORT]  # Enter pairing code when prompted

# Connect
adb connect [IP:PORT]

# Now install as usual
cd android && ./gradlew installDebug
```

### Option B: Transfer APK File
1. **Build APK**:
```bash
npm run build
npx cap sync android
cd android
./gradlew assembleDebug
```

2. **Find APK**: `android/app/build/outputs/apk/debug/app-debug.apk`

3. **Transfer to Phone**:
   - **AirDrop**: Not available for Android
   - **Email**: Email APK to yourself
   - **Cloud**: Upload to Google Drive/Dropbox
   - **LocalSend**: Use [LocalSend app](https://localsend.org) (recommended)
   - **USB**: Copy to phone storage, then install from Files app

4. **Install on Phone**:
   - Open file manager
   - Navigate to APK
   - Tap to install
   - If prompted, enable "Install from unknown sources"

---

## Method 3: One-Click Script

I've created a convenience script for you. Use it like this:

```bash
# Make it executable (first time only)
chmod +x scripts/build-android.sh

# Build APK only
./scripts/build-android.sh

# Build and install on connected device
./scripts/build-android.sh --install

# Build, install, and launch app
./scripts/build-android.sh --install --launch

# Build release version (smaller, faster)
./scripts/build-android.sh --release
```

---

## Building Different APK Types

### Debug APK (Default - Easiest)
```bash
cd android
./gradlew assembleDebug
# Output: app/build/outputs/apk/debug/app-debug.apk
```
- ✅ No signing needed
- ✅ Can install immediately
- ❌ Larger file size
- ❌ Slower performance

### Release APK (Optimized)
```bash
cd android
./gradlew assembleRelease
# Output: app/build/outputs/apk/release/app-release-unsigned.apk
```
- ✅ Smaller size (50% smaller)
- ✅ Better performance
- ❌ Needs signing (see below)

### Signed Release APK (Best for Personal Use)

1. **Create keystore** (one time only):
```bash
cd android/app
keytool -genkey -v -keystore my-release-key.keystore \
  -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
# Use simple password like "password123" for personal use
```

2. **Sign the APK**:
```bash
cd android
./gradlew assembleRelease
```

3. **Install signed APK**:
```bash
adb install app/build/outputs/apk/release/app-release.apk
```

---

## Useful ADB Commands

```bash
# Check if device is connected
adb devices

# Install APK
adb install path/to/app.apk

# Replace existing app
adb install -r path/to/app.apk

# Uninstall app
adb uninstall com.aichat.app

# Launch app
adb shell monkey -p com.aichat.app -c android.intent.category.LAUNCHER 1

# View logs
adb logcat | grep "com.aichat.app"

# Take screenshot
adb exec-out screencap -p > screenshot.png

# Record screen
adb shell screenrecord /sdcard/demo.mp4
# Press Ctrl+C to stop, then:
adb pull /sdcard/demo.mp4
```

---

## Quick Development Workflow

### For Quick Testing
```bash
# 1. Make your code changes

# 2. Build and install in one line:
npm run build && npx cap sync android && cd android && ./gradlew installDebug

# 3. App auto-launches on your phone!
```

### For Live Development
```bash
# Terminal 1: Start dev server
npm run dev

# Terminal 2: Run with live reload
npx cap run android --livereload --external
# Make changes and they appear instantly!
```

---

## Troubleshooting

### "App not installed"
- Uninstall any existing version first
- Settings → Apps → AI Chat → Uninstall

### "Install blocked"
- Settings → Security → Unknown sources → Allow
- Or Settings → Apps → Special access → Install unknown apps

### Device not detected
```bash
# Check connection
adb devices

# If empty, try:
adb kill-server
adb start-server
adb devices

# Still nothing? Check USB cable (use data cable, not charge-only)
```

### "INSTALL_FAILED_UPDATE_INCOMPATIBLE"
```bash
# Uninstall first
adb uninstall com.aichat.app
# Then install
adb install app-debug.apk
```

---

## Tips for Personal Use

### 1. Skip Code Signing
Use debug APKs for personal use - they work perfectly and don't need signing certificates.

### 2. Direct Installation
Always use `./gradlew installDebug` instead of building APK and installing separately.

### 3. Keep USB Debugging On
If it's your personal phone, keep USB debugging enabled for convenience.

### 4. Create Shortcuts
Add to your `~/.zshrc` or `~/.bash_profile`:
```bash
alias build-chat="cd ~/Documents/Webapps/ai-chat-mobile-app && npm run build && npx cap sync android && cd android && ./gradlew installDebug"
```

### 5. Version Management
Edit `android/app/build.gradle` to change version:
```gradle
versionCode 2  // Increment for each build
versionName "1.0.1"  // Your version string
```

---

## File Locations

- **Built APK**: `android/app/build/outputs/apk/debug/app-debug.apk`
- **App on phone**: `/data/app/com.aichat.app/`
- **App data**: `/storage/emulated/0/Android/data/com.aichat.app/`

---

## No Android Studio? No Problem!

You can build without opening Android Studio:

```bash
# Install Android command line tools only
brew install --cask android-commandlinetools

# Set up environment
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/platform-tools

# Accept licenses
yes | sdkmanager --licenses

# Build your app
cd android && ./gradlew assembleDebug
```

---

## Summary

For personal use, the simplest approach is:

1. **One-time phone setup**: Enable Developer Options and USB Debugging
2. **Connect phone** to Mac via USB
3. **Run**: `cd android && ./gradlew installDebug`
4. **Done!** App installs and launches

No certificates, no Play Store, no complications. Just your app on your phone!