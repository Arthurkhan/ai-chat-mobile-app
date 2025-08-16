# Complete iOS Development Guide for AI Chat App

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Opening Your Project in Xcode](#opening-your-project-in-xcode)
3. [Understanding the Xcode Interface](#understanding-the-xcode-interface)
4. [Setting Up Code Signing](#setting-up-code-signing)
5. [Running on iOS Simulator](#running-on-ios-simulator)
6. [Running on Physical iPhone](#running-on-physical-iphone)
7. [Common Issues & Solutions](#common-issues--solutions)
8. [Building for App Store](#building-for-app-store)

---

## Prerequisites

### Required Software
- ✅ **macOS** (Monterey 12.0 or later recommended)
- ✅ **Xcode** (14.0 or later) - Download from Mac App Store (7-8GB)
- ✅ **Node.js** and npm (already installed)
- ✅ **Your AI Chat app** with Capacitor configured

### Optional but Recommended
- **Apple Developer Account** ($99/year) - Required for:
  - Testing on physical iPhone
  - Publishing to App Store
  - Push notifications
- **iPhone** for real device testing

---

## Opening Your Project in Xcode

### Method 1: Command Line (Recommended)
```bash
# First, ensure your web app is built and synced
npm run build
npx cap sync ios

# Open in Xcode
npx cap open ios
```

### Method 2: Manual Opening
1. Open **Finder**
2. Navigate to: `your-project/ios/App/`
3. Double-click **`App.xcworkspace`** (NOT App.xcodeproj!)
   - The `.xcworkspace` file has a white icon
   - This is CRUCIAL - using the wrong file causes issues

### What You Should See
When Xcode opens correctly, you'll see:
- Left sidebar: Project navigator with folders
- Center: Main editor area (might show project settings)
- Right sidebar: Inspector panel
- Top toolbar: Build/Run buttons

---

## Understanding the Xcode Interface

### Key Areas of Xcode

```
┌─────────────────────────────────────────────────────┐
│  [▶️ Run] [■ Stop] [Device Selector ▼]  [Status]    │ <- Toolbar
├──────────┬──────────────────────────┬───────────────┤
│          │                          │               │
│ Navigator│      Editor Area         │   Inspector   │
│          │                          │               │
│ • App    │   Your code/settings     │  Properties   │
│   └─App  │   appear here            │  Attributes   │
│     └─.. │                          │               │
│          │                          │               │
└──────────┴──────────────────────────┴───────────────┘
```

### Essential Panels

1. **Navigator (Left)**
   - **Project Navigator** (folder icon): Browse your files
   - **Issue Navigator** (triangle icon): See errors/warnings
   - **Debug Navigator** (gauge icon): View running app info

2. **Editor (Center)**
   - Shows selected files, code, or settings
   - Interface Builder for UI files
   - Project settings when project is selected

3. **Inspector (Right)**
   - **File Inspector**: File properties
   - **Identity Inspector**: Class/ID settings
   - **Attributes Inspector**: UI element properties

4. **Toolbar (Top)**
   - **Run Button** (▶️): Build and run your app
   - **Stop Button** (■): Stop running app
   - **Scheme Selector**: Choose device/simulator
   - **Status Bar**: Shows build progress/errors

---

## Setting Up Code Signing

### For Simulator Only (No Apple Account Needed)
1. Click on **"App"** in the project navigator
2. Select **"App"** under TARGETS
3. Go to **"Signing & Capabilities"** tab
4. Uncheck **"Automatically manage signing"**
5. Set **Team** to "None"

### For Physical Device (Apple ID Required)

#### Step 1: Add Your Apple ID
1. Open Xcode → **Settings** (Cmd+,)
2. Click **"Accounts"** tab
3. Click **"+"** button → **"Apple ID"**
4. Sign in with your Apple ID
5. Close Settings

#### Step 2: Configure Signing
1. Click on **"App"** in the project navigator
2. Select **"App"** under TARGETS
3. Go to **"Signing & Capabilities"** tab
4. Check ✅ **"Automatically manage signing"**
5. **Team**: Select your name or "(Personal Team)"
6. **Bundle Identifier**: Keep as `com.aichat.app` or change to something unique like `com.yourname.aichat`

#### Step 3: Handle Provisioning
- Xcode will automatically create provisioning profiles
- You might see "Provisioning Profile: Xcode Managed Profile"
- If errors appear, click "Try Again" or follow the fix suggestions

---

## Running on iOS Simulator

### Step 1: Select a Simulator
1. In the toolbar, click the device selector (next to the Run button)
2. Choose a simulator:
   - **iPhone 15 Pro** (recommended for testing)
   - **iPhone SE** (test smallest screen)
   - Any iPad for tablet testing

### Step 2: Build and Run
1. Click the **Run button** (▶️) or press **Cmd+R**
2. Wait for:
   - "Building..." (1-3 minutes first time)
   - "Launching..." 
   - Simulator to open
3. Your app should appear!

### Step 3: Using the Simulator
- **Click and drag** to scroll
- **Cmd+Shift+H** = Home button
- **Cmd+D** = Shake gesture
- **Device** menu → Rotate for orientation
- **Device** → **Erase All Content** to reset

### Testing Your App Features
1. **Chat Interface**: Type messages, send
2. **Emoji Picker**: Test emoji selection
3. **Todoist Button**: Should open in Safari
4. **PWA Features**: Check if app is installable

---

## Running on Physical iPhone

### Prerequisites
1. Apple ID added to Xcode (see Code Signing section)
2. iPhone with USB cable
3. iPhone must be on same WiFi as Mac (for debugging)

### Step 1: Prepare Your iPhone
1. Connect iPhone via USB
2. **Trust this computer** alert → Tap "Trust"
3. Enter iPhone passcode
4. On iPhone: **Settings** → **Privacy & Security** → **Developer Mode** → Enable (iOS 16+)

### Step 2: Select Your Device
1. In Xcode toolbar, click device selector
2. Your iPhone should appear at the top
3. If it says "Not ready", wait a moment
4. Select your iPhone

### Step 3: First-Time Setup
1. Click **Run** (▶️)
2. You'll likely see: **"Could not launch App"**
3. On iPhone: **Settings** → **General** → **VPN & Device Management**
4. Tap your developer profile
5. Tap **"Trust [Your Name]"**
6. Tap **"Trust"** again

### Step 4: Run the App
1. Back in Xcode, click **Run** again
2. App should install and launch on your iPhone!
3. Test all features on real device

---

## Common Issues & Solutions

### Issue 1: "No account for team"
**Solution**: Add your Apple ID in Xcode Settings → Accounts

### Issue 2: "Failed to register bundle identifier"
**Solution**: Change bundle ID to something unique:
- `com.aichat.app` → `com.yourname.aichat`

### Issue 3: "Unable to launch" on device
**Solution**: Trust developer certificate on iPhone:
- Settings → General → VPN & Device Management → Trust

### Issue 4: "Command PhaseScriptExecution failed"
**Solution**: 
```bash
cd ios/App
pod install
```

### Issue 5: App crashes immediately
**Solution**: Check console logs:
1. View → Debug Area → Show Debug Area
2. Look for red error messages
3. Common fix: `npx cap sync ios`

### Issue 6: White/Blank screen
**Solution**: 
```bash
# Rebuild your web app
npm run build
# Sync to iOS
npx cap sync ios
# Clean build in Xcode
Product → Clean Build Folder (Shift+Cmd+K)
# Run again
```

### Issue 7: "No such module 'Capacitor'"
**Solution**:
```bash
cd ios/App
pod install
cd ../..
npx cap sync ios
```

---

## Building for App Store

### Prerequisites
- ✅ Apple Developer Account ($99/year)
- ✅ App works perfectly on physical device
- ✅ All app assets ready (icons, screenshots)

### Step 1: Configure for Release
1. Click **"App"** in navigator → Select **"App"** target
2. **General** tab:
   - Version: 1.0.0
   - Build: 1
3. **Signing & Capabilities**:
   - Team: Your Developer Team (not Personal)
4. Edit Scheme: **Product** → **Scheme** → **Edit Scheme**
   - Run → Build Configuration: **Release**

### Step 2: Create App Store Connect Record
1. Go to [App Store Connect](https://appstoreconnect.apple.com)
2. My Apps → **"+"** → New App
3. Fill in:
   - Platform: iOS
   - Name: AI Chat
   - Primary Language: English
   - Bundle ID: Select yours
   - SKU: aichat-001

### Step 3: Archive Your App
1. Select **"Any iOS Device"** as destination
2. **Product** → **Archive**
3. Wait for build (5-10 minutes)
4. Organizer window opens automatically

### Step 4: Upload to App Store
1. In Organizer, select your archive
2. Click **"Distribute App"**
3. Choose **"App Store Connect"**
4. Follow upload wizard
5. Wait for processing (15-30 minutes)

### Step 5: Submit for Review
1. Back in App Store Connect
2. Add screenshots, description, keywords
3. Submit for review
4. Wait 24-48 hours for review

---

## Development Workflow

### After Making Code Changes

```bash
# 1. Make your changes in the src/ folder

# 2. Rebuild the web app
npm run build

# 3. Sync changes to iOS
npx cap sync ios

# 4. Run in Xcode
# Click Run button or Cmd+R
```

### Quick Tips
- **Always sync** after web changes: `npx cap sync ios`
- **Clean build** if acting weird: Shift+Cmd+K
- **Check console** for errors: Shift+Cmd+C
- **Reset simulator**: Device → Erase All Content

---

## Debugging Tools

### Console Logs
1. **View** → **Debug Area** → **Activate Console**
2. Your `console.log()` statements appear here
3. Filter by typing in search box

### Safari Web Inspector (For Web Content)
1. On Mac: **Safari** → **Settings** → **Advanced** → ✅ Show Developer menu
2. On iPhone: **Settings** → **Safari** → **Advanced** → ✅ Web Inspector
3. Connect iPhone, run app
4. Mac Safari: **Develop** → **[Your iPhone]** → **[Your App]**
5. Now you can inspect like Chrome DevTools!

### Network Debugging
1. Check if n8n webhook is accessible
2. Look for CORS errors in console
3. Verify API calls in Network tab

---

## Capacitor-Specific Commands

```bash
# View iOS logs
npx cap run ios --target [device-id] --livereload

# List available devices
xcrun simctl list devices

# Open iOS project
npx cap open ios

# Copy web assets only (no dependency update)
npx cap copy ios

# Update iOS dependencies + copy
npx cap update ios

# Full sync (recommended)
npx cap sync ios
```

---

## Next Steps

1. ✅ Get app running on simulator
2. ✅ Test all features thoroughly
3. 🔄 Add native features (from NATIVE_APP_ROADMAP.md)
4. 🎯 Test on physical device
5. 🚀 Prepare for App Store submission

---

## Resources

- [Capacitor iOS Documentation](https://capacitorjs.com/docs/ios)
- [Apple Developer Documentation](https://developer.apple.com/documentation/)
- [Xcode Help](https://help.apple.com/xcode/mac/current/)
- [Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/ios)
- [App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)

---

## Quick Checklist

Before running your app, ensure:
- [ ] Web app is built: `npm run build`
- [ ] iOS platform added: `npx cap add ios`
- [ ] Synced to iOS: `npx cap sync ios`
- [ ] Opened `.xcworkspace` (not `.xcodeproj`)
- [ ] Selected a simulator or device
- [ ] Code signing configured (if using device)

Remember: **Always use `App.xcworkspace`, never `App.xcodeproj`!**