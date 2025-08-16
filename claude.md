# AI Chat Mobile App - Claude Code Context

## Project Overview
This is a mobile-optimized Progressive Web App (PWA) that connects to an n8n workflow to provide an AI chat assistant with Todoist integration.

## Tech Stack
- **Frontend**: React 18 with Vite
- **Styling**: Tailwind CSS
- **UI Components**: Lucide React icons, emoji-picker-react
- **PWA**: vite-plugin-pwa for offline capability
- **Backend**: n8n workflow with Chat Trigger → AI Agent (GPT) → Memory → Todoist tools

## Key Features
1. **Real-time chat** with AI assistant via n8n webhook
2. **Session-based memory** management (sessionId)
3. **Full emoji picker** with search functionality
4. **PWA installable** on mobile devices
5. **Quick access to Todoist** via header button
6. **Dark theme** optimized for mobile

## n8n Integration
- **Webhook URL**: `https://n8n.srv795148.hstgr.cloud/webhook/eefc0026-c2e2-445c-9fef-0cab5b262745/chat`
- **Expected Request Format**:
  ```json
  {
    "text": "user message",
    "userId": "user-123",
    "sessionId": "session-[timestamp]"
  }
  ```
- **Expected Response Format**: The app handles multiple formats:
  - Direct text: `"AI response"`
  - JSON with output: `{"output": "AI response"}`
  - JSON with text: `{"text": "AI response"}`
  - JSON with message: `{"message": "AI response"}`

## Project Structure
```
├── src/
│   ├── App.jsx          # Main component with chat logic
│   ├── main.jsx         # React entry point
│   └── index.css        # Tailwind styles
├── public/
│   ├── manifest.json    # PWA manifest
│   ├── icon-192.png     # PWA icon (needs creation)
│   ├── icon-512.png     # PWA icon (needs creation)
│   └── generate-icons.html  # Icon generator tool
├── index.html           # HTML entry
└── vite.config.js       # Vite + PWA config
```

## Important Implementation Details

### Response Handling
The app includes robust error handling for various n8n response formats. Check console logs for debugging.

### Session Management
Each chat session gets a unique ID for conversation continuity: `session-${Date.now()}`

### Emoji Integration
Uses emoji-picker-react with dark theme and native emoji rendering.

### PWA Features
- Installable on mobile devices
- Works offline (for UI, not API calls)
- Responsive design capped at max-width: 32rem

## Development Commands
```bash
npm install          # Install dependencies
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
```

## Known Issues
1. Icons need to be generated using `/generate-icons.html`
2. CORS must be enabled on n8n webhook
3. n8n workflow must be active for chat to work

## Future Enhancements
- Add conversation history persistence
- Implement file upload capability
- Add voice input/output
- Multi-language support
- Theme customization

## Testing Notes
- Test on mobile device using local network: `http://[computer-ip]:5173`
- Check PWA installation on Chrome/Safari mobile
- Verify n8n webhook response format in browser console