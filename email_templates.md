# Email Templates for Sarvam Maya (EmailJS)

To use these templates, log in to your [EmailJS Dashboard](https://dashboard.emailjs.com/) and create two separate templates.

---

## Template 1: Welcome Email (Sent to newly registered Donors)

**Template ID:** (Copy this into your `.env.local` after creating it)
**Subject:** Welcome to Sarvam Maya Blood Donation System! 🩸

**Email Body (HTML/Rich Text):**

```html
<div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; line-height: 1.6;">
  <h2 style="color: #dc2626; border-bottom: 2px solid #dc2626; padding-bottom: 10px;">Sarvam Maya</h2>
  
  <p>Dear <strong>{{to_name}}</strong>,</p>
  
  <p>Welcome to the <strong>Sarvam Maya Blood Donation System</strong>!</p>
  
  <p>Thank you for taking the noble step to register as a blood donor. Your willingness to help can literally save a life during someone's most critical moment.</p>
  
  <p><strong>What happens next?</strong></p>
  <ul>
    <li>Your profile is now active in our database.</li>
    <li>We will actively monitor urgent blood requests in your district.</li>
    <li>When a hospital or patient matches your blood group, you’ll be able to see their urgent request on our Live Feed.</li>
  </ul>
  
  <p>Please keep an eye on our Live Requests board. Every drop counts.</p>
  
  <br/>
  <p>With gratitude,<br/>
  <strong>The Sarvam Maya Team</strong></p>
</div>
```

**Required EmailJS Variables:**
- `{{to_name}}` (The donor's full name)
- `{{to_email}}` (The donor's email address)

*(Note: In EmailJS settings, make sure the "To Email" field is dynamically set to `{{to_email}}`)*

---

## Template 2: Hospital Donation Alert (Sent when a Donor clicks "Donate Here")

**Template ID:** (Copy this into your `.env.local` after creating it)
**Subject:** URGENT: Donor Available for {{blood_group}} Blood Request

**Email Body (HTML/Rich Text):**

```html
<div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; line-height: 1.6;">
  <h2 style="color: #dc2626; border-bottom: 2px solid #dc2626; padding-bottom: 10px;">Sarvam Maya - Donor Alert</h2>
  
  <p>Hello <strong>{{hospital_name}}</strong> Administration,</p>
  
  <p>Good news! A registered donor from the Sarvam Maya network has responded to your urgent request for blood.</p>
  
  <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 15px; margin: 20px 0;">
    <h3 style="margin-top: 0; color: #111827;">Donation Match Details</h3>
    <ul style="list-style-type: none; padding-left: 0;">
      <li style="margin-bottom: 8px;">🩸 <strong>Blood Group Needed:</strong> {{blood_group}}</li>
      <li style="margin-bottom: 8px;">📦 <strong>Units Requested:</strong> {{units_required}} Unit(s)</li>
      <li style="margin-bottom: 8px;">📍 <strong>Hospital Location:</strong> {{hospital_name}}, {{district_name}}</li>
    </ul>
  </div>
  
  <p><strong>Donor Contact Information:</strong><br/>
  The donor has provided the following email address to coordinate their arrival:<br/>
  <a href="mailto:{{donor_email}}" style="color: #dc2626; font-weight: bold;">{{donor_email}}</a></p>
  
  <p>Please reach out to the donor directly to confirm their appointment and any immediate pre-screening documents required.</p>
  
  <br/>
  <p>Thank you,<br/>
  <strong>Sarvam Maya Automated System</strong></p>
</div>
```

**Required EmailJS Variables:**
- `{{hospital_name}}`
- `{{blood_group}}`
- `{{units_required}}`
- `{{district_name}}`
- `{{donor_email}}`
- `{{to_email}}` (The destination email of the hospital)
