"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import emailjs from '@emailjs/browser';

export default function Home() {
  const [requests, setRequests] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modal states
  const [showDonorModal, setShowDonorModal] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);

  // Data for Select Dropdowns
  const [bloodGroups, setBloodGroups] = useState<any[]>([]);
  const [districts, setDistricts] = useState<any[]>([]);
  const [hospitals, setHospitals] = useState<any[]>([]);

  // Form states
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch initial data
  useEffect(() => {
    fetchInitialData();
  }, []);

  async function fetchInitialData() {
    try {
      // Fetch live requests
      const { data: reqData } = await supabase
        .from('blood_requests')
        .select(`
          request_id,
          units_required,
          priority,
          request_date,
          hospitals ( hospital_name, districts(district_name) ),
          blood_groups ( group_name )
        `)
        .eq('status', 'PENDING')
        .order('request_date', { ascending: false });

      if (reqData) {
        setRequests(reqData.map((req: any) => ({
          id: req.request_id,
          bloodGroup: req.blood_groups.group_name,
          hospitalName: req.hospitals.hospital_name,
          district: req.hospitals.districts.district_name,
          units: req.units_required,
          priority: req.priority,
          date: new Date(req.request_date).toLocaleString('en-US', {
            month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit'
          })
        })));
      }

      // Fetch Dropdown reference data
      const { data: bgData } = await supabase.from('blood_groups').select('*');
      if (bgData) setBloodGroups(bgData);

      const { data: distData } = await supabase.from('districts').select('*');
      if (distData) setDistricts(distData);

      const { data: hospData } = await supabase.from('hospitals').select('*');
      if (hospData) setHospitals(hospData);

    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  // --- FORM SUBMISSION HANDLERS ---

  async function handleRegisterDonor(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const fullName = formData.get('fullName') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const bloodGroupId = formData.get('bloodGroupId');
    const districtId = formData.get('districtId');

    try {
      // 1. Insert User (Role ID 2 is Donor)
      const { data: user, error: userErr } = await supabase
        .from('users')
        .insert([{
          full_name: fullName,
          email: email,
          phone: phone,
          password_hash: 'secure_hashed_password', // Mocked for this demo
          role_id: 2
        }])
        .select()
        .single();

      if (userErr) throw userErr;

      // 2. Link as Donor
      const { error: donorErr } = await supabase
        .from('donors')
        .insert([{
          user_id: user.user_id,
          blood_group_id: bloodGroupId,
          district_id: districtId,
          is_eligible: true,
          emergency_ready: true
        }]);

      if (donorErr) throw donorErr;

      // Send a Welcome Email via EmailJS
      try {
        await emailjs.send(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'dummy_service',
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'dummy_template',
          {
            to_name: fullName,
            to_email: email,
            message: "Thank you for registering as a donor with Sarvam Maya. Your blood can save a life! We will notify you when someone in your district needs blood."
          },
          process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'dummy_public_key'
        );
        alert('Successfully registered! A Welcome Email has been sent to ' + email);
      } catch (emailErr) {
        console.error('Email sending failed:', emailErr);
        // We still alert success since the DB entry worked
        alert('Successfully registered as a donor. (EmailJS configuration pending for live emails)');
      }

      setShowDonorModal(false);
    } catch (error: any) {
      alert('Error registering donor: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleRequestBlood(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const priority = formData.get('priority');
    const units = formData.get('units');
    const hospitalId = formData.get('hospitalId');
    const bloodGroupId = formData.get('bloodGroupId');

    try {
      // Insert new request. (Hardcoding recipient_id to 1 for this demo, as you'd normally need auth)
      const { error } = await supabase
        .from('blood_requests')
        .insert([{
          recipient_id: 1,
          hospital_id: hospitalId,
          blood_group_id: bloodGroupId,
          units_required: units,
          priority: priority,
          status: 'PENDING'
        }]);

      if (error) throw error;

      alert('Blood request submitted successfully!');
      setShowRequestModal(false);
      // Refresh the live feed
      fetchInitialData();
    } catch (error: any) {
      alert('Error requesting blood: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDonateClick(request: any) {
    const donorEmail = prompt(`Thank you for choosing to donate to ${request.hospitalName}! Please enter your registered email address to contact them:`);
    if (!donorEmail) return;

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'dummy_service',
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_DONATION_ID || 'dummy_template',
        {
          hospital_name: request.hospitalName,
          to_email: `contact@${request.hospitalName.toLowerCase().replace(/\s+/g, '')}.com`,
          blood_group: request.bloodGroup,
          units_required: request.units,
          district_name: request.district,
          donor_email: donorEmail
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'dummy_public_key'
      );
      alert('Thank you! An email has been successfully sent to the hospital notifying them of your arrival.');
    } catch (err) {
      console.error('EmailJS error:', err);
      alert('There was an error sending the email via EmailJS Setup. Please check your Dashboard settings.');
    }
  }

  return (
    <main>
      <section className="hero">
        <div className="hero-glow"></div>
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Your Blood Can Save A <span className="highlight">Life</span>
            </h1>
            <p className="hero-subtitle">
              Join the Sarvam Maya network. Connect directly with hospitals and patients in your district. Every drop counts.
            </p>
            <div className="hero-actions">
              <button className="btn btn-primary" onClick={() => setShowDonorModal(true)}>
                Register as Donor
              </button>
              <button className="btn btn-outline" onClick={() => setShowRequestModal(true)}>
                Request Blood
              </button>
            </div>

            <div className="grid-3">
              <div className="glass-panel stat-card">
                <div className="stat-number">{isLoading ? '-' : requests.length}</div>
                <p>Live Requests</p>
              </div>
              <div className="glass-panel stat-card">
                <div className="stat-number">1,200+</div>
                <p>Registered Donors</p>
              </div>
              <div className="glass-panel stat-card">
                <div className="stat-number">{hospitals.length || '-'}</div>
                <p>Partner Hospitals</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="requests" className="section container">
        <h2 style={{ fontSize: '2rem', marginBottom: '2rem', textAlign: 'center' }}>
          Urgent Live Requests
        </h2>

        <div className="request-feed">
          {isLoading && <p style={{ textAlign: 'center', color: '#a3a3a3' }}>Fetching from Supabase...</p>}
          {!isLoading && requests.length === 0 && <p style={{ textAlign: 'center', color: '#10b981' }}>Good news! No urgent blood requests at the moment.</p>}

          {requests.map((request) => (
            <div key={request.id} className="glass-panel request-card">

              <div className="request-info">
                <div className="blood-group-badge">
                  {request.bloodGroup}
                </div>
                <div className="request-details">
                  <h3>{request.hospitalName}</h3>
                  <p>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    {request.district} &bull; {request.units} Unit(s) needed
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.75rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <span className={`priority-badge ${request.priority === 'NORMAL' ? 'priority-normal' : 'priority-urgent'}`}>
                    {request.priority}
                  </span>
                  <span style={{ fontSize: '0.875rem', color: '#a3a3a3' }}>
                    {request.date}
                  </span>
                </div>
                <button
                  className="btn btn-primary"
                  style={{ padding: '0.5rem 1.5rem', alignSelf: 'stretch' }}
                  onClick={() => handleDonateClick(request)}
                >
                  Donate Here
                </button>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* Database Integration Info */}
      <section className="section container" style={{ marginTop: '3rem' }}>
        <div className="glass-panel" style={{ background: 'rgba(239, 68, 68, 0.05)', borderColor: 'rgba(239, 68, 68, 0.2)' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>
            System Infrastructure Notice
          </h3>
          <p style={{ color: '#d4d4d8' }}>
            This frontend is a strictly typed React application linked to the Sarvam Maya relational model in Supabase. Forms are fully interactive and inject rows directly into PostgreSQL tables (`users`, `donors`, `blood_requests`).
          </p>
        </div>
      </section>

      {/* --- MODALS --- */}

      {/* Donor Registration Modal */}
      {showDonorModal && (
        <div className="modal-overlay" onClick={() => !isSubmitting && setShowDonorModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowDonorModal(false)}>&times;</button>
            <h2 style={{ marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>Register as Donor</h2>

            <form onSubmit={handleRegisterDonor}>
              <div className="form-group">
                <label>Full Name</label>
                <input required type="text" name="fullName" className="form-control" placeholder="E.g., Adheeb" />
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input required type="email" name="email" className="form-control" placeholder="adheeb@kerala.com" />
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input required type="tel" name="phone" className="form-control" placeholder="9000000000" />
              </div>

              <div className="form-group">
                <label>Blood Group</label>
                <select required name="bloodGroupId" className="form-control">
                  <option value="">-- Select --</option>
                  {bloodGroups.map(bg => <option key={bg.blood_group_id} value={bg.blood_group_id}>{bg.group_name}</option>)}
                </select>
              </div>

              <div className="form-group">
                <label>District</label>
                <select required name="districtId" className="form-control">
                  <option value="">-- Select --</option>
                  {districts.map(d => <option key={d.district_id} value={d.district_id}>{d.district_name}</option>)}
                </select>
              </div>

              <button type="submit" disabled={isSubmitting} className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                {isSubmitting ? 'Registering...' : 'Complete Registration'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Blood Request Modal */}
      {showRequestModal && (
        <div className="modal-overlay" onClick={() => !isSubmitting && setShowRequestModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowRequestModal(false)}>&times;</button>
            <h2 style={{ marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>Create Blood Request</h2>

            <form onSubmit={handleRequestBlood}>

              <div className="form-group">
                <label>Blood Group Needed</label>
                <select required name="bloodGroupId" className="form-control">
                  <option value="">-- Select --</option>
                  {bloodGroups.map(bg => <option key={bg.blood_group_id} value={bg.blood_group_id}>{bg.group_name}</option>)}
                </select>
              </div>

              <div className="form-group">
                <label>Select Hospital</label>
                <select required name="hospitalId" className="form-control">
                  <option value="">-- Select --</option>
                  {hospitals.map(h => <option key={h.hospital_id} value={h.hospital_id}>{h.hospital_name}</option>)}
                </select>
              </div>

              <div className="form-group">
                <label>Units Required</label>
                <input required type="number" min="1" max="10" name="units" className="form-control" placeholder="1" defaultValue={1} />
              </div>

              <div className="form-group">
                <label>Priority Level</label>
                <select required name="priority" className="form-control">
                  <option value="NORMAL">Normal</option>
                  <option value="URGENT">Urgent</option>
                  <option value="CRITICAL">Critical</option>
                </select>
              </div>

              <button type="submit" disabled={isSubmitting} className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                {isSubmitting ? 'Broadcasting...' : 'Broadcast Request to Donors'}
              </button>
            </form>
          </div>
        </div>
      )}

    </main>
  );
}
