# Email Templates for Sarvam Maya (EmailJS)

To use these templates, log in to your [EmailJS Dashboard](https://dashboard.emailjs.com/) and create two separate templates. Switch to the **"< >" (Code View / HTML)** mode when pasting these into the body so the design applies correctly.

---

## Template 1: Welcome Email (Sent to newly registered Donors)

**Template ID:** (Copy this into your `.env.local` after creating it)
**Subject:** Welcome to Sarvam Maya Blood Donation System! 🩸

**Email Body (Raw HTML):**

```html
<div style="font-family: system-ui, sans-serif, Arial; font-size: 16px; background-color: #fff8f1">
  <div style="max-width: 600px; margin: auto; padding: 16px">
    <h2 style="color: #dc2626; margin-top: 0">Sarvam Maya</h2>
    <p>Dear {{to_name}},</p>
    <p>Welcome to the Sarvam Maya family! We're excited to have you on board as a registered blood donor.</p>
    <p>
      Your account has been successfully created, and you're now ready to help save lives in your district.
    </p>
    <p>
      <a
        style="
          display: inline-block;
          text-decoration: none;
          outline: none;
          color: #fff;
          background-color: #dc2626;
          padding: 8px 16px;
          border-radius: 4px;
        "
        href="https://sarvam-maya.vercel.app"
        target="_blank"
      >
        Open Sarvam Maya Live Feed
      </a>
    </p>
    <p>
      If you have any questions or need help, our support team is just an email away at
      <a href="mailto:support@sarvammaya.com" style="text-decoration: none; outline: none; color: #dc2626"
        >support@sarvammaya.com</a
      >. Every drop counts!
    </p>
    <p>Best regards,<br />The Sarvam Maya Team</p>
  </div>
</div>
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
<div style="font-family: system-ui, sans-serif, Arial; font-size: 16px; background-color: #fff8f1">
  <div style="max-width: 600px; margin: auto; padding: 16px">
    <h2 style="color: #dc2626; margin-top: 0">Sarvam Maya</h2>
    <p>Hello {{hospital_name}} Administration,</p>
    <p>
      Good news! A registered donor from the Sarvam Maya network has responded to your urgent request for blood.
    </p>
    <p>
      <strong>Match Details:</strong><br/>
      Blood Group Needed: <strong style="color: #dc2626">{{blood_group}}</strong><br/>
      Units Requested: <strong>{{units_required}} Unit(s)</strong><br/>
      Location: <strong>{{district_name}}</strong>
    </p>
    <p>
      <a
        style="
          display: inline-block;
          text-decoration: none;
          outline: none;
          color: #fff;
          background-color: #dc2626;
          padding: 8px 16px;
          border-radius: 4px;
        "
        href="mailto:{{donor_email}}"
        target="_blank"
      >
        Contact Donor
      </a>
    </p>
    <p>
      Please reach out to the donor directly at <a href="mailto:{{donor_email}}" style="text-decoration: none; outline: none; color: #dc2626">{{donor_email}}</a> to confirm their appointment and any immediate pre-screening documents required.
    </p>
    <p>Best regards,<br />The Sarvam Maya Automated System</p>
  </div>
</div>
```

**Required EmailJS Variables:**
- `{{hospital_name}}`
- `{{blood_group}}`
- `{{units_required}}`
- `{{district_name}}`
- `{{donor_email}}`
- `{{to_email}}`
