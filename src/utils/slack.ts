import { WebClient } from '@slack/web-api';

// Initialize Slack WebClient with bot token from environment variables
const slack = new WebClient(process.env.GATSBY_SLACK_BOT_TOKEN);

/**
 * Post a message to a Slack channel
 * @param message - The message text to post
 * @param channel - The channel to post to (default: '#general')
 * @returns Promise with the response from Slack API
 */
export async function postToSlack(
  message: string,
  channel: string = '#general'
): Promise<void> {
  try {
    if (!process.env.GATSBY_SLACK_BOT_TOKEN) {
      console.warn('Slack bot token not configured. Message not sent.');
      return;
    }

    const result = await slack.chat.postMessage({
      channel,
      text: message,
    });

    console.log('Message sent to Slack:', result.ts);
  } catch (error) {
    console.error('Error sending message to Slack:', error);
    throw error;
  }
}

/**
 * Post a formatted message with blocks to Slack
 * @param blocks - Slack Block Kit blocks for rich formatting
 * @param channel - The channel to post to (default: '#general')
 * @param fallbackText - Plain text fallback for notifications
 */
export async function postFormattedMessage(
  blocks: any[],
  channel: string = '#general',
  fallbackText?: string
): Promise<void> {
  try {
    if (!process.env.GATSBY_SLACK_BOT_TOKEN) {
      console.warn('Slack bot token not configured. Message not sent.');
      return;
    }

    const result = await slack.chat.postMessage({
      channel,
      text: fallbackText || 'New notification',
      blocks,
    });

    console.log('Formatted message sent to Slack:', result.ts);
  } catch (error) {
    console.error('Error sending formatted message to Slack:', error);
    throw error;
  }
}

/**
 * Send contact form submission to Slack
 * @param formData - Contact form data
 * @param channel - The channel to post to (default: '#general')
 */
export async function sendContactFormToSlack(
  formData: { name: string; email: string; message: string },
  channel: string = '#general'
): Promise<void> {
  const blocks = [
    {
      type: 'header',
      text: {
        type: 'plain_text',
        text: '📬 New Contact Form Submission',
        emoji: true,
      },
    },
    {
      type: 'section',
      fields: [
        {
          type: 'mrkdwn',
          text: `*Name:*\n${formData.name}`,
        },
        {
          type: 'mrkdwn',
          text: `*Email:*\n${formData.email}`,
        },
      ],
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*Message:*\n${formData.message}`,
      },
    },
    {
      type: 'divider',
    },
    {
      type: 'context',
      elements: [
        {
          type: 'mrkdwn',
          text: `Submitted at ${new Date().toLocaleString()}`,
        },
      ],
    },
  ];

  await postFormattedMessage(
    blocks,
    channel,
    `New contact form submission from ${formData.name} (${formData.email})`
  );
}


