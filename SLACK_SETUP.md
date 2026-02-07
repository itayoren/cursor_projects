# Slack Integration Setup Guide

This guide will help you set up Slack integration for your Gatsby site to receive contact form submissions directly in Slack.

## Prerequisites

- A Slack workspace where you have permission to add apps
- Access to the [Slack API Dashboard](https://api.slack.com/apps)

## Step 1: Create a Slack App

1. Go to [https://api.slack.com/apps](https://api.slack.com/apps)
2. Click **"Create New App"**
3. Choose **"From scratch"**
4. Enter an app name (e.g., "Contact Form Bot")
5. Select your Slack workspace
6. Click **"Create App"**

## Step 2: Configure Bot Permissions

1. In your app's dashboard, go to **"OAuth & Permissions"** in the left sidebar
2. Scroll down to **"Scopes"** section
3. Under **"Bot Token Scopes"**, add the following scopes:
   - `chat:write` - Send messages as the bot
   - `chat:write.public` - Send messages to channels the bot isn't a member of (optional but recommended)

## Step 3: Install App to Workspace

1. Still on the **"OAuth & Permissions"** page, scroll to the top
2. Click **"Install to Workspace"**
3. Review the permissions and click **"Allow"**
4. You'll see a **"Bot User OAuth Token"** that starts with `xoxb-`
5. **Copy this token** - you'll need it in the next step

## Step 4: Configure Environment Variables

1. Create a file named `.env.development` in your project root if it doesn't exist
2. Add your Slack bot token:

```bash
GATSBY_SLACK_BOT_TOKEN=xoxb-your-actual-token-here
GATSBY_SLACK_CHANNEL=#general
```

3. For production, create `.env.production` with the same variables

**Important:** Never commit `.env` files to version control! They're already in `.gitignore`.

## Step 5: Invite Bot to Channel (Optional)

If you didn't add the `chat:write.public` scope, you need to invite the bot to the channel:

1. Open Slack and go to the channel where you want to receive notifications
2. Type `/invite @YourBotName` (use the name you gave your app)
3. The bot will join the channel

## Step 6: Test the Integration

1. Start your development server:
```bash
npm run dev
```

2. Open your site at `http://localhost:8000`
3. Navigate to the contact page (`/contact`)
4. Fill out and submit the form
5. Check your Slack channel for the notification!

## Customization

### Change the Target Channel

You can specify which channel receives notifications by setting the `GATSBY_SLACK_CHANNEL` environment variable:

```bash
GATSBY_SLACK_CHANNEL=#customer-inquiries
```

Or modify it in your code in `src/pages/contact.tsx`:

```typescript
const channel = '#customer-inquiries';
await sendContactFormToSlack(formData, channel);
```

### Send Messages from Other Parts of Your App

The Slack utility provides flexible functions you can use anywhere in your app:

```typescript
import { postToSlack, postFormattedMessage } from '@/utils/slack';

// Simple text message
await postToSlack('Hello from my Gatsby site!', '#general');

// Rich formatted message with Slack Block Kit
await postFormattedMessage(
  [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: '*Important Update:* Something happened!'
      }
    }
  ],
  '#notifications'
);
```

## Available Functions

### `postToSlack(message, channel)`
Sends a simple text message to Slack.

**Parameters:**
- `message` (string): The message to send
- `channel` (string, optional): Channel to post to (default: '#general')

### `postFormattedMessage(blocks, channel, fallbackText)`
Sends a richly formatted message using Slack's Block Kit.

**Parameters:**
- `blocks` (array): Slack Block Kit blocks
- `channel` (string, optional): Channel to post to (default: '#general')
- `fallbackText` (string, optional): Plain text for notifications

### `sendContactFormToSlack(formData, channel)`
Specialized function for sending contact form submissions.

**Parameters:**
- `formData` (object): Object with `name`, `email`, and `message` fields
- `channel` (string, optional): Channel to post to (default: '#general')

## Troubleshooting

### "Slack bot token not configured" Warning

This means the `GATSBY_SLACK_BOT_TOKEN` environment variable isn't set. Make sure:
1. You created the `.env.development` file
2. The token starts with `xoxb-`
3. You restarted your development server after adding the token

### "Not in Channel" Error

If you get a "not_in_channel" error:
1. Add the `chat:write.public` scope to your bot
2. OR invite the bot to the channel: `/invite @YourBotName`
3. Reinstall the app to workspace after adding new scopes

### Messages Not Appearing in Slack

1. Check the browser console for errors
2. Verify your bot token is correct
3. Ensure the channel name includes the `#` prefix
4. Try using a channel ID instead of name (e.g., `C01234ABCDE`)

### Development vs Production

Remember to set up environment variables for both environments:
- `.env.development` - for local development
- `.env.production` - for production builds

You can use the same bot and token, or create separate bots for each environment.

## Security Best Practices

1. **Never commit tokens to Git** - They're already in `.gitignore`
2. **Use environment-specific tokens** - Different tokens for dev/prod
3. **Rotate tokens regularly** - Revoke and create new tokens periodically
4. **Limit bot permissions** - Only add the scopes you actually need
5. **Monitor bot activity** - Check your Slack app's audit logs regularly

## Learn More

- [Slack API Documentation](https://api.slack.com/)
- [Slack Block Kit Builder](https://app.slack.com/block-kit-builder) - Design rich messages
- [@slack/web-api Package](https://www.npmjs.com/package/@slack/web-api)
- [Slack Bot Best Practices](https://api.slack.com/best-practices)

## Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review the [Slack API docs](https://api.slack.com/docs)
3. Check browser console for error messages
4. Verify environment variables are loaded correctly


