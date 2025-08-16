# Native Mobile App Roadmap

## Overview
Convert the PWA into native iOS and Android apps using Capacitor, maintaining all current functionality while adding native capabilities.

## Prerequisites
- ✅ Working PWA (done)
- 🔧 Xcode (for iOS) - Mac only
- 🔧 Android Studio (for Android)
- 🔧 Generated app icons (192x192 and 512x512)

## Phase 1: Capacitor Setup (Current)

### Step-by-step Commands (RUN EACH SEPARATELY):

```bash
# 1. Install Capacitor
npm install @capacitor/core @capacitor/ios @capacitor/android

# 2. Initialize Capacitor (interactive - answer the prompts)
npx cap init

# When prompted, enter:
# - App name: AI Chat
# - App Package ID: com.yourname.aichat (use your own reverse domain)
# - Web Directory: dist (this is where Vite builds to)

# 3. Build your web app first
npm run build

# 4. Add iOS platform
npx cap add ios

# 5. Add Android platform  
npx cap add android

# 6. Copy web assets to native projects
npx cap sync

# 7. Open in IDE (choose one)
npx cap open ios      # Opens Xcode (Mac only)
# OR
npx cap open android  # Opens Android Studio
```

## Phase 2: Native Configuration

### iOS Setup (Mac only):
1. **In Xcode:**
   - Set bundle identifier
   - Configure signing & capabilities
   - Add app icons to Assets.xcassets
   - Set deployment target (iOS 13+)
   - Configure Info.plist permissions

2. **Required icons for iOS:**
   - AppIcon set (multiple sizes)
   - Launch screen

### Android Setup:
1. **In Android Studio:**
   - Update `applicationId` in build.gradle
   - Add app icons to res/mipmap folders
   - Configure AndroidManifest.xml
   - Set minimum SDK (21+)

## Phase 3: Native Features Integration

### 3.1 Status Bar (Week 1)
```javascript
import { StatusBar } from '@capacitor/status-bar';

// Hide status bar for full screen
StatusBar.hide();

// Or style it
StatusBar.setBackgroundColor({ color: '#1f2937' });
```

### 3.2 Keyboard Handling (Week 1)
```javascript
import { Keyboard } from '@capacitor/keyboard';

// Adjust app when keyboard shows
Keyboard.addListener('keyboardWillShow', info => {
  // Adjust UI
});
```

### 3.3 Native Storage (Week 2)
```javascript
import { Preferences } from '@capacitor/preferences';

// Save conversation history
await Preferences.set({
  key: 'chatHistory',
  value: JSON.stringify(messages)
});
```

### 3.4 Push Notifications (Week 3)
- Set up Firebase Cloud Messaging
- Add push notification capability
- Handle notification permissions

### 3.5 Haptic Feedback (Week 3)
```javascript
import { Haptics } from '@capacitor/haptics';

// On send message
await Haptics.impact({ style: ImpactStyle.Light });
```

## Phase 4: Platform-Specific Enhancements

### iOS Specific:
- [ ] Face ID/Touch ID for app lock
- [ ] iOS widgets for quick chat access
- [ ] Siri shortcuts integration
- [ ] iMessage app extension

### Android Specific:
- [ ] Material You theming
- [ ] Android widgets
- [ ] Quick tiles
- [ ] Fingerprint authentication

## Phase 5: App Store Preparation

### iOS App Store:
1. Create Apple Developer account ($99/year)
2. Create App Store Connect listing
3. Prepare screenshots (6.5", 5.5")
4. Write app description
5. Submit for review

### Google Play Store:
1. Create Google Play Developer account ($25 one-time)
2. Create Play Console listing
3. Prepare screenshots and graphics
4. Write store listing
5. Upload APK/AAB

## Development Workflow

### After making changes:
```bash
# 1. Rebuild web app
npm run build

# 2. Copy to native projects
npx cap sync

# 3. Run on device/simulator
npx cap run ios
# or
npx cap run android
```

### Live Reload Setup:
```json
// capacitor.config.json
{
  "server": {
    "url": "http://YOUR-IP:5173",
    "cleartext": true
  }
}
```

## Common Issues & Solutions

### Issue: "could not determine executable to run"
**Solution**: Run each command separately, not as one line

### Issue: iOS build fails
**Solution**: 
- Open in Xcode and fix signing
- Update pods: `cd ios/App && pod install`

### Issue: Android build fails
**Solution**:
- Check Gradle version compatibility
- Update Android Studio

## Testing Checklist

### Functionality:
- [ ] Chat messages send/receive
- [ ] Emoji picker works
- [ ] Todoist link opens in browser
- [ ] Session persistence
- [ ] Offline UI (no crash)

### Native Features:
- [ ] App installs correctly
- [ ] Icons display properly
- [ ] Splash screen shows
- [ ] Keyboard behavior correct
- [ ] Status bar styled

### Performance:
- [ ] App launches quickly
- [ ] Smooth scrolling
- [ ] No memory leaks
- [ ] Battery usage reasonable

## Timeline

**Week 1**: Basic native app running on both platforms
**Week 2**: Native features integration
**Week 3**: Polish and platform-specific features
**Week 4**: App store preparation and submission

## Next Steps

1. Fix the Capacitor installation (run commands separately)
2. Generate proper app icons
3. Test on real devices
4. Add native features incrementally
5. Prepare for app store submission

## Resources

- [Capacitor Documentation](https://capacitorjs.com/docs)
- [iOS Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [Material Design Guidelines](https://material.io/design)
- [App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)
- [Google Play Console Help](https://support.google.com/googleplay/android-developer/)