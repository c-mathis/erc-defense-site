# ERC Defense Site - Setup Guide

## Quick Start

1. Deploy the site to Cloudflare Pages or any static host
2. Set up lead capture (Google Sheet + Email)
3. Configure analytics tracking
4. Point your domain

---

## Lead Capture Setup

### Option 1: Google Apps Script (Recommended)

This handles both Google Sheets storage AND email notifications.

#### Step 1: Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com) and create a new spreadsheet
2. Name it "ERC Defense Leads"
3. Add these headers in row 1:
   - A1: Timestamp
   - B1: First Name
   - C1: Last Name
   - D1: Email
   - E1: Phone
   - F1: Situation
   - G1: Page
   - H1: UTM Source
   - I1: UTM Medium
   - J1: UTM Campaign

#### Step 2: Create Apps Script

1. In your Google Sheet, go to **Extensions > Apps Script**
2. Delete any existing code and paste this:

```javascript
// Configuration
const EMAIL_RECIPIENT = 'your-email@example.com'; // Change this
const EMAIL_SUBJECT = 'New ERC Defense Lead';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    // Add to spreadsheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.firstName || data['first-name'] || '',
      data.lastName || data['last-name'] || '',
      data.email || '',
      data.phone || '',
      data.situation || '',
      data.page || '',
      data.source?.utm_source || '',
      data.source?.utm_medium || '',
      data.source?.utm_campaign || '',
    ]);

    // Send email notification
    sendEmailNotification(data);

    return ContentService.createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function sendEmailNotification(data) {
  const situationLabels = {
    'audit': 'Received IRS Audit Notice',
    'letter': 'Received IRS Letter/Request',
    'denial': 'ERC Claim Denied',
    'pending': 'Claim Still Pending',
    'proactive': 'Proactive Protection',
  };

  const body = `
New ERC Defense Lead Received

Name: ${data.firstName || ''} ${data.lastName || ''}
Email: ${data.email || 'Not provided'}
Phone: ${data.phone || 'Not provided'}
Situation: ${situationLabels[data.situation] || data.situation || 'Not specified'}

Source: ${data.source?.utm_source || 'Direct'}
Campaign: ${data.source?.utm_campaign || 'None'}
Page: ${data.page || 'Unknown'}

Submitted: ${data.timestamp || new Date().toISOString()}
  `.trim();

  GmailApp.sendEmail(EMAIL_RECIPIENT, EMAIL_SUBJECT, body);
}

// Test function
function testDoPost() {
  const mockEvent = {
    postData: {
      contents: JSON.stringify({
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        phone: '555-1234',
        situation: 'audit',
        timestamp: new Date().toISOString(),
        page: '/test',
        source: { utm_source: 'test' }
      })
    }
  };
  doPost(mockEvent);
}
```

3. **Update the EMAIL_RECIPIENT** at the top to your email address

#### Step 3: Deploy as Web App

1. Click **Deploy > New deployment**
2. Select type: **Web app**
3. Configure:
   - Description: "ERC Lead Handler"
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Click **Deploy**
5. **Copy the Web app URL** - this is your `googleScriptUrl`

#### Step 4: Update Form Handler

Open `js/form-handler.js` and update the config:

```javascript
config: {
    googleScriptUrl: 'YOUR_APPS_SCRIPT_URL_HERE',
    webhookUrl: '', // Add later if needed
    enableGoogleSheet: true,
    enableWebhook: false,
    enableFormspree: false,
},
```

---

### Option 2: Add Custom Webhook (CRM/Database)

If you want to also send leads to a CRM or database:

1. Set up your webhook endpoint (n8n, Make, Zapier, or custom API)
2. Update `js/form-handler.js`:

```javascript
config: {
    googleScriptUrl: 'YOUR_APPS_SCRIPT_URL',
    webhookUrl: 'YOUR_WEBHOOK_URL',
    enableGoogleSheet: true,
    enableWebhook: true,
},
```

The form will send to both simultaneously.

---

## Analytics Setup

### Google Analytics 4

1. Create a GA4 property at [analytics.google.com](https://analytics.google.com)
2. Get your Measurement ID (G-XXXXXXX)
3. The tracking code is already in the HTML - just update the ID:

```html
<!-- In <head> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXX');
</script>
```

### Conversion Tracking

The form handler automatically fires these events on submission:
- GA4: `generate_lead` event
- Facebook Pixel: `Lead` event (if pixel installed)
- Custom: `leadSubmitted` window event

### Google Ads Conversion

To track Google Ads conversions, add to the HTML head:

```html
<script>
  window.googleAdsConversionId = 'AW-XXXXXXX/YYYYYYY';
</script>
```

---

## Deployment

### Cloudflare Pages (Recommended)

1. Push site to GitHub repository
2. Go to [Cloudflare Pages](https://pages.cloudflare.com)
3. Connect your GitHub account
4. Select the repository
5. Configure build:
   - Build command: (leave empty - static site)
   - Build output directory: `/` (or `.`)
6. Deploy

### Custom Domain

1. In Cloudflare Pages, go to Custom domains
2. Add your domain
3. Update DNS records as instructed
4. SSL is automatic

---

## File Structure

```
erc-defense-site/
├── index.html          # Main landing page
├── about.html          # About page (service focus)
├── services.html       # Services overview
├── contact.html        # Contact page with form
├── privacy.html        # Privacy Policy
├── terms.html          # Terms of Service
├── disclaimer.html     # Legal disclaimer
├── css/
│   └── style.css       # Global styles
├── js/
│   └── form-handler.js # Lead form handling
├── assets/
│   ├── favicon.ico
│   ├── og-image.jpg    # Social share image
│   └── ...
└── SETUP.md            # This file
```

---

## Checklist

### Before Launch

- [ ] Update Google Apps Script URL in form-handler.js
- [ ] Update email recipient in Apps Script
- [ ] Test form submission (check Sheet + Email)
- [ ] Update phone number throughout site
- [ ] Update email address in footer
- [ ] Update company address
- [ ] Add GA4 tracking code
- [ ] Create and add favicon
- [ ] Create OG image for social sharing
- [ ] Test on mobile devices
- [ ] Test all links

### After Launch

- [ ] Submit sitemap to Google Search Console
- [ ] Set up Google Business Profile (if applicable)
- [ ] Monitor form submissions
- [ ] Check Core Web Vitals in PageSpeed Insights

---

## Support

For technical issues, check:
1. Browser console for JavaScript errors
2. Network tab for failed requests
3. Google Apps Script execution logs

Common issues:
- **Form not submitting**: Check that URLs are correct in form-handler.js
- **Email not received**: Check Apps Script execution logs
- **Sheet not updating**: Verify Apps Script has spreadsheet permissions
