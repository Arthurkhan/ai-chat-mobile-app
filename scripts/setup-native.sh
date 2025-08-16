#!/bin/bash

echo "🚀 Setting up Native Mobile App with Capacitor"
echo "============================================="

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Install Capacitor
echo "📱 Installing Capacitor..."
npm install @capacitor/core @capacitor/ios @capacitor/android

# Build the web app
echo "🔨 Building web app..."
npm run build

# Initialize Capacitor
echo "⚙️  Initializing Capacitor..."
echo "Please enter the following when prompted:"
echo "- App name: AI Chat"
echo "- App Package ID: com.yourname.aichat (use your own)"
echo "- Web Directory: dist"
echo ""
npx cap init

# Add platforms
echo "📱 Adding iOS platform..."
npx cap add ios

echo "🤖 Adding Android platform..."
npx cap add android

# Sync
echo "🔄 Syncing native projects..."
npx cap sync

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. To open iOS project: npx cap open ios"
echo "2. To open Android project: npx cap open android"
echo "3. Don't forget to generate and add app icons!"
echo ""
echo "For development workflow:"
echo "- Make changes to your web app"
echo "- Run: npm run build"
echo "- Run: npx cap sync"
echo "- Test in Xcode or Android Studio"