@echo off
echo 🚀 Setting up Native Mobile App with Capacitor
echo =============================================

REM Check if node_modules exists
if not exist "node_modules" (
    echo 📦 Installing dependencies...
    call npm install
)

REM Install Capacitor
echo 📱 Installing Capacitor...
call npm install @capacitor/core @capacitor/ios @capacitor/android

REM Build the web app
echo 🔨 Building web app...
call npm run build

REM Initialize Capacitor
echo ⚙️  Initializing Capacitor...
echo Please enter the following when prompted:
echo - App name: AI Chat
echo - App Package ID: com.yourname.aichat (use your own)
echo - Web Directory: dist
echo.
call npx cap init

REM Add platforms
echo 📱 Adding iOS platform...
call npx cap add ios

echo 🤖 Adding Android platform...
call npx cap add android

REM Sync
echo 🔄 Syncing native projects...
call npx cap sync

echo.
echo ✅ Setup complete!
echo.
echo Next steps:
echo 1. To open iOS project: npx cap open ios
echo 2. To open Android project: npx cap open android
echo 3. Don't forget to generate and add app icons!
echo.
echo For development workflow:
echo - Make changes to your web app
echo - Run: npm run build
echo - Run: npx cap sync
echo - Test in Xcode or Android Studio
pause