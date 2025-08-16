#!/bin/bash

# Build script for AI Chat Android app
# Usage: ./scripts/build-android.sh [options]
# Options:
#   --install    Install on connected device
#   --launch     Launch app after install (requires --install)
#   --release    Build release version instead of debug
#   --help       Show this help message

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Use Android Studio's bundled JDK to avoid version conflicts
export JAVA_HOME="/Applications/Android Studio.app/Contents/jbr/Contents/Home"
export PATH="$JAVA_HOME/bin:$PATH"

# Default options
INSTALL=false
LAUNCH=false
BUILD_TYPE="debug"
GRADLE_TASK="assembleDebug"

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --install)
            INSTALL=true
            shift
            ;;
        --launch)
            LAUNCH=true
            shift
            ;;
        --release)
            BUILD_TYPE="release"
            GRADLE_TASK="assembleRelease"
            shift
            ;;
        --help)
            echo "Build script for AI Chat Android app"
            echo ""
            echo "Usage: $0 [options]"
            echo ""
            echo "Options:"
            echo "  --install    Install APK on connected device"
            echo "  --launch     Launch app after install (requires --install)"
            echo "  --release    Build release version instead of debug"
            echo "  --help       Show this help message"
            echo ""
            echo "Examples:"
            echo "  $0                    # Build debug APK only"
            echo "  $0 --install          # Build and install on device"
            echo "  $0 --install --launch # Build, install, and launch"
            echo "  $0 --release          # Build optimized release APK"
            exit 0
            ;;
        *)
            echo -e "${RED}Unknown option: $1${NC}"
            echo "Use --help for usage information"
            exit 1
            ;;
    esac
done

# Check if we're in the right directory
if [ ! -f "package.json" ] || [ ! -d "android" ]; then
    echo -e "${RED}Error: This script must be run from the project root directory${NC}"
    exit 1
fi

echo -e "${GREEN}🚀 Starting Android build process...${NC}"
echo ""

# Step 1: Build the web app
echo -e "${YELLOW}📦 Building web app...${NC}"
npm run build
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Web build failed${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Web build complete${NC}"
echo ""

# Step 2: Sync with Capacitor
echo -e "${YELLOW}🔄 Syncing to Android...${NC}"
npx cap sync android
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Capacitor sync failed${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Android sync complete${NC}"
echo ""

# Step 3: Build Android APK
echo -e "${YELLOW}🔨 Building Android APK (${BUILD_TYPE})...${NC}"
cd android

if [ "$INSTALL" = true ]; then
    # If installing, use installDebug/installRelease instead
    if [ "$BUILD_TYPE" = "debug" ]; then
        ./gradlew installDebug
    else
        ./gradlew installRelease
    fi
    
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ Build and install failed${NC}"
        echo -e "${YELLOW}💡 Tip: Make sure your device is connected and USB debugging is enabled${NC}"
        exit 1
    fi
    echo -e "${GREEN}✅ App installed successfully!${NC}"
    
    # Launch app if requested
    if [ "$LAUNCH" = true ]; then
        echo -e "${YELLOW}🚀 Launching app...${NC}"
        adb shell monkey -p com.aichat.app -c android.intent.category.LAUNCHER 1 > /dev/null 2>&1
        if [ $? -eq 0 ]; then
            echo -e "${GREEN}✅ App launched!${NC}"
        else
            echo -e "${YELLOW}⚠️  Could not auto-launch app. Please open it manually on your device.${NC}"
        fi
    fi
else
    # Just build without installing
    ./gradlew $GRADLE_TASK
    
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ Build failed${NC}"
        exit 1
    fi
    echo -e "${GREEN}✅ Build complete!${NC}"
    
    # Show APK location
    if [ "$BUILD_TYPE" = "debug" ]; then
        APK_PATH="app/build/outputs/apk/debug/app-debug.apk"
    else
        APK_PATH="app/build/outputs/apk/release/app-release-unsigned.apk"
    fi
    
    if [ -f "$APK_PATH" ]; then
        APK_SIZE=$(du -h "$APK_PATH" | cut -f1)
        echo ""
        echo -e "${GREEN}📱 APK Details:${NC}"
        echo -e "   Location: android/$APK_PATH"
        echo -e "   Size: $APK_SIZE"
        echo ""
        echo -e "${YELLOW}To install on your device:${NC}"
        echo -e "   1. Connect your Android device via USB"
        echo -e "   2. Run: ${GREEN}adb install android/$APK_PATH${NC}"
        echo -e "   Or run this script with --install flag"
    fi
fi

cd ..

echo ""
echo -e "${GREEN}✨ Done!${NC}"

# Check if device is connected (helpful hint)
if [ "$INSTALL" = false ]; then
    DEVICES=$(adb devices 2>/dev/null | grep -v "List" | grep "device$" | wc -l)
    if [ "$DEVICES" -gt 0 ]; then
        echo ""
        echo -e "${YELLOW}💡 Tip: Device detected! Run with --install to install directly:${NC}"
        echo -e "   $0 --install"
    fi
fi