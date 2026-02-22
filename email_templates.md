# Premium Email Templates for Sarvam Maya (EmailJS)

To use these templates, log in to your [EmailJS Dashboard](https://dashboard.emailjs.com/) and create two separate templates. Switch to the **"< >" (Code View / HTML)** mode when pasting these into the body so the design applies correctly.

---

## Template 1: Welcome Email (Sent to newly registered Donors)

**Template ID:** (Copy this into your `.env.local` after creating it)
**Subject:** Welcome to Sarvam Maya Blood Donation System! 🩸

**Email Body (Raw HTML):**

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Welcome to Sarvam Maya</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f4f5;">

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f4f4f5; padding: 40px 0;">
    <tr>
      <td align="center">
        <!-- Main Email Container -->
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
          
          <!-- Header Banner -->
          <tr>
            <td align="center" style="background-color: #dc2626; padding: 30px 20px;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; letter-spacing: 1px;">Sarvam Maya</h1>
              <p style="color: #fecaca; margin: 5px 0 0 0; font-size: 16px;">Blood Donation System</p>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding: 40px 40px 30px 40px;">
              <h2 style="color: #111827; margin-top: 0; font-size: 24px;">Welcome, {{to_name}}!</h2>
              
              <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin-bottom: 25px;">
                Thank you for taking the noble step to register as a blood donor. Your willingness to help can literally be the difference between life and death during someone's most critical moment.
              </p>

              <!-- Highlighted callout box -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #fef2f2; border-left: 4px solid #dc2626; border-radius: 4px; margin-bottom: 25px;">
                <tr>
                  <td style="padding: 20px;">
                    <h3 style="color: #991b1b; margin-top: 0; margin-bottom: 10px; font-size: 18px;">What happens next?</h3>
                    <ul style="color: #7f1d1d; margin: 0; padding-left: 20px; font-size: 15px; line-height: 1.5;">
                      <li style="margin-bottom: 8px;">Your profile is securely active in our system.</li>
                      <li style="margin-bottom: 8px;">We monitor all urgent blood requests in your district.</li>
                      <li>When a match is found, you will see it instantly on our Live Feed.</li>
                    </ul>
                  </td>
                </tr>
              </table>

              <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin-bottom: 0;">
                Please keep an eye on our Live Requests board. Every drop counts.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="background-color: #f9fafb; padding: 25px 40px; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; font-size: 14px; margin: 0 0 10px 0;">
                With deep gratitude,<br>
                <strong style="color: #374151;">The Sarvam Maya Team</strong>
              </p>
              <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                © 2026 Sarvam Maya. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
```

**Required EmailJS Variables:**
- `{{to_name}}`
- `{{to_email}}`

---

## Template 2: Hospital Donation Alert (Sent when a Donor clicks "Donate Here")

**Template ID:** (Copy this into your `.env.local` after creating it)
**Subject:** 🚨 URGENT: Donor Match for {{blood_group}} Request!

**Email Body (Raw HTML):**

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Sarvam Maya Donor Match</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f4f5;">

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f4f4f5; padding: 40px 0;">
    <tr>
      <td align="center">
        <!-- Main Email Container -->
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
          
          <!-- Urgent Header Banner -->
          <tr>
            <td align="center" style="background-color: #111827; padding: 25px 20px;">
              <h2 style="color: #ffffff; margin: 0; font-size: 14px; text-transform: uppercase; letter-spacing: 2px; color: #f87171;">Sarvam Maya Automated Alert</h2>
              <h1 style="color: #ffffff; margin: 10px 0 0 0; font-size: 24px;">Donor Match Found</h1>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding: 40px 40px 30px 40px;">
              <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin-top: 0; margin-bottom: 25px;">
                Hello <strong>{{hospital_name}}</strong> Administration,
              </p>
              
              <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin-top: 0; margin-bottom: 30px;">
                Great news. A registered donor from the Sarvam Maya network has responded to your urgent request and indicated they are willing to donate.
              </p>

              <!-- Data Grid -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; margin-bottom: 30px;">
                <tr>
                  <td style="background-color: #f9fafb; padding: 15px 20px; border-bottom: 1px solid #e5e7eb;">
                    <h3 style="margin: 0; color: #111827; font-size: 16px;">Donation Match Details</h3>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 20px;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td width="40%" style="padding-bottom: 12px; color: #6b7280; font-size: 14px; font-weight: bold;">Blood Group Needed</td>
                        <td width="60%" style="padding-bottom: 12px; color: #dc2626; font-size: 16px; font-weight: bold;">{{blood_group}}</td>
                      </tr>
                      <tr>
                        <td width="40%" style="padding-bottom: 12px; color: #6b7280; font-size: 14px; font-weight: bold;">Units Requested</td>
                        <td width="60%" style="padding-bottom: 12px; color: #111827; font-size: 15px;">{{units_required}} Unit(s)</td>
                      </tr>
                      <tr>
                        <td width="40%" style="color: #6b7280; font-size: 14px; font-weight: bold;">Hospital Location</td>
                        <td width="60%" style="color: #111827; font-size: 15px;">{{hospital_name}}, {{district_name}}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Action Section -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #eff6ff; border-radius: 8px;">
                <tr>
                  <td align="center" style="padding: 30px 20px;">
                    <p style="color: #1e3a8a; font-size: 15px; margin: 0 0 15px 0; font-weight: bold;">
                      Donor Contact Email
                    </p>
                    <a href="mailto:{{donor_email}}" style="display: inline-block; background-color: #2563eb; color: #ffffff; font-size: 16px; font-weight: bold; text-decoration: none; padding: 12px 24px; border-radius: 6px;">
                      {{donor_email}}
                    </a>
                    <p style="color: #3b82f6; font-size: 13px; margin: 15px 0 0 0;">
                      Click above to contact the donor directly.
                    </p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="background-color: #f9fafb; padding: 25px 40px; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; font-size: 12px; line-height: 1.5; margin: 0;">
                This is an automated message from the Sarvam Maya network.<br>
                Please coordinate with the donor regarding pre-screening requirements.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
```

**Required EmailJS Variables:**
- `{{hospital_name}}`
- `{{blood_group}}`
- `{{units_required}}`
- `{{district_name}}`
- `{{donor_email}}`
- `{{to_email}}` 
