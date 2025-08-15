# Troubleshooting Guide

## Issue 1: "Sorry, I didn't get a valid response"

This error means your n8n Chat Trigger is returning a response format that the app doesn't recognize.

### How to Debug:

1. **Open browser console** (F12 in Chrome/Firefox)
2. **Send a test message** in the chat
3. **Look for these console logs**:
   - `Raw response from n8n:` - Shows exactly what n8n returns
   - `Parsed response:` - Shows the parsed JSON (if valid)

### Common n8n Response Formats:

The app now handles these formats automatically:
- Plain text: `Hello world`
- JSON with text: `{"text": "Hello world"}`
- JSON with output: `{"output": "Hello world"}`
- JSON with message: `{"message": "Hello world"}`
- JSON with response: `{"response": "Hello world"}`

### Fix in n8n:

In your n8n workflow, make sure the Chat Trigger's response is one of:

**Option 1 - Simple Text Response:**
In the Chat Trigger node, set the response to:
```
{{ $json.output }}
```

**Option 2 - JSON Response:**
In the Chat Trigger node, use an expression like:
```json
{
  "text": "{{ $json.output }}"
}
```

## Issue 2: Missing Icons (404 errors)

### Quick Fix:

1. Go to: `http://localhost:5173/generate-icons.html`
2. Download both icons
3. Move them to the `public` folder as:
   - `icon-192.png`
   - `icon-512.png`

### Alternative: Use Online Tools

1. Go to https://realfavicongenerator.net/
2. Upload any image
3. Download the generated icons
4. Rename and place in `public` folder

## Issue 3: CORS Errors

If you see CORS errors in the console:

### Fix in n8n:

1. In your n8n workflow
2. Edit the Chat Trigger node
3. Under "Options" → "Response Headers"
4. Add these headers:
   ```
   Access-Control-Allow-Origin: *
   Access-Control-Allow-Methods: POST, OPTIONS
   Access-Control-Allow-Headers: Content-Type
   ```

### Alternative: Use a proxy

Add to `vite.config.js`:
```javascript
server: {
  proxy: {
    '/webhook': {
      target: 'https://n8n.srv795148.hstgr.cloud',
      changeOrigin: true,
    }
  }
}
```

Then update the webhook URL in App.jsx to just:
```javascript
const N8N_WEBHOOK_URL = '/webhook/eefc0026-c2e2-445c-9fef-0cab5b262745/chat';
```

## Issue 4: No Response from n8n

### Check:

1. **Is your n8n workflow active?** 
   - Go to your n8n dashboard
   - Make sure the workflow is "Active" (green toggle)

2. **Is the webhook URL correct?**
   - Copy the webhook URL from n8n Chat Trigger
   - Make sure it matches in `src/App.jsx`

3. **Test the webhook directly:**
   ```bash
   curl -X POST https://n8n.srv795148.hstgr.cloud/webhook/eefc0026-c2e2-445c-9fef-0cab5b262745/chat \
     -H "Content-Type: application/json" \
     -d '{"text": "Hello"}'
   ```

## Need More Help?

1. **Check n8n logs** for errors
2. **Share the console output** from the browser
3. **Test with a simple n8n workflow** that just returns static text