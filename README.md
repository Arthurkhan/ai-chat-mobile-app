# AI Chat Mobile App

A simple, fast mobile chat application that connects to your n8n AI workflow.

## Features

- 🤖 Real-time chat with AI powered by GPT via n8n
- 💾 Conversation memory
- 📱 Progressive Web App (PWA) - installable on any device
- 🎨 Dark theme UI optimized for mobile
- ⚡ Fast and responsive
- 🔄 Session management for conversation continuity

## Quick Start

### 1. Clone and Install

```bash
git clone https://github.com/Arthurkhan/ai-chat-mobile-app.git
cd ai-chat-mobile-app
npm install
```

### 2. Configure n8n Webhook

The app is pre-configured with your n8n webhook URL. If you need to change it, edit the `N8N_WEBHOOK_URL` in `src/App.jsx`.

### 3. Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### 4. Test on Your Phone

1. Make sure your phone is on the same network as your computer
2. Find your computer's IP address:
   - Windows: `ipconfig`
   - Mac/Linux: `ifconfig` or `ip addr`
3. On your phone, visit: `http://[YOUR-IP]:5173`
4. You can install it as an app from your browser menu

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` folder.

## Deployment Options

### Option 1: Netlify (Recommended)

1. Push to GitHub
2. Connect your GitHub repo to Netlify
3. It will auto-deploy on every push

### Option 2: Vercel

```bash
npm i -g vercel
vercel
```

### Option 3: GitHub Pages

1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json scripts:
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d dist"
   ```
3. Run: `npm run deploy`

### Option 4: Local Network Only

For truly offline use:

```bash
npm run build
npm run preview -- --host
```

This will serve the built app on your local network.

## Making a Native App

If you later want to convert this to a native app:

```bash
npm install @capacitor/core @capacitor/ios @capacitor/android
npx cap init
npx cap add ios
npx cap add android
npm run build
npx cap sync
npx cap open ios  # Opens Xcode
npx cap open android  # Opens Android Studio
```

## n8n Workflow Setup

Your n8n workflow should:

1. Use a Chat Trigger node
2. Connect to an AI Agent node with GPT
3. Return responses in this format:
   ```json
   {
     "text": "AI response here"
   }
   ```

## Customization

- **Colors**: Edit the Tailwind classes in `src/App.jsx`
- **App Name**: Update `public/manifest.json` and `index.html`
- **Icons**: Replace `public/icon-192.png` and `public/icon-512.png`

## Troubleshooting

- **CORS errors**: Make sure your n8n webhook allows requests from your app's domain
- **Can't install as PWA**: The app must be served over HTTPS (except on localhost)
- **Messages not sending**: Check the browser console for errors and verify your n8n workflow is active

## License

MIT