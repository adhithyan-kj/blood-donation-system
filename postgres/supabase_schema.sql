-- Drop existing tables if they exist to prevent "relation already exists" errors
DROP TABLE IF EXISTS audit_logs CASCADE;
DROP TABLE IF EXISTS donations CASCADE;
DROP TABLE IF EXISTS blood_requests CASCADE;
DROP TABLE IF EXISTS blood_inventory CASCADE;
DROP TABLE IF EXISTS recipients CASCADE;
DROP TABLE IF EXISTS donors CASCADE;
DROP TABLE IF EXISTS hospitals CASCADE;
DROP TABLE IF EXISTS districts CASCADE;
DROP TABLE IF EXISTS blood_groups CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS roles CASCADE;

-- Create Roles Table
CREATE TABLE roles (
    role_id SERIAL PRIMARY KEY,
    role_name VARCHAR(50) UNIQUE NOT NULL
);

-- Note: In Postgres we can use TRUE/FALSE for booleans mapping rather than tinyint(1).
CREATE TABLE users (
    user_id BIGSERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(15) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role_id INT NOT NULL REFERENCES roles(role_id),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE blood_groups (
    blood_group_id SERIAL PRIMARY KEY,
    group_name VARCHAR(5) UNIQUE NOT NULL
);

CREATE TABLE districts (
    district_id SERIAL PRIMARY KEY,
    district_name VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE hospitals (
    hospital_id BIGSERIAL PRIMARY KEY,
    hospital_name VARCHAR(150) NOT NULL,
    email VARCHAR(100),
    district_id INT NOT NULL REFERENCES districts(district_id),
    contact_phone VARCHAR(15)
);

CREATE TABLE donors (
    donor_id BIGSERIAL PRIMARY KEY,
    user_id BIGINT UNIQUE NOT NULL REFERENCES users(user_id),
    blood_group_id INT NOT NULL REFERENCES blood_groups(blood_group_id),
    district_id INT NOT NULL REFERENCES districts(district_id),
    last_donation_date DATE DEFAULT NULL,
    is_eligible BOOLEAN DEFAULT TRUE,
    emergency_ready BOOLEAN DEFAULT FALSE
);

CREATE TABLE recipients (
    recipient_id BIGSERIAL PRIMARY KEY,
    user_id BIGINT UNIQUE NOT NULL REFERENCES users(user_id),
    blood_group_id INT NOT NULL REFERENCES blood_groups(blood_group_id),
    district_id INT NOT NULL REFERENCES districts(district_id)
);

CREATE TABLE blood_inventory (
    inventory_id BIGSERIAL PRIMARY KEY,
    hospital_id BIGINT NOT NULL REFERENCES hospitals(hospital_id),
    blood_group_id INT NOT NULL REFERENCES blood_groups(blood_group_id),
    units_available INT DEFAULT 0,
    UNIQUE(hospital_id, blood_group_id)
);

CREATE TABLE blood_requests (
    request_id BIGSERIAL PRIMARY KEY,
    recipient_id BIGINT NOT NULL REFERENCES recipients(recipient_id),
    hospital_id BIGINT NOT NULL REFERENCES hospitals(hospital_id),
    blood_group_id INT NOT NULL REFERENCES blood_groups(blood_group_id),
    units_required INT CHECK (units_required > 0),
    priority VARCHAR(50) DEFAULT 'NORMAL',
    status VARCHAR(50) DEFAULT 'PENDING',
    request_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE donations (
    donation_id BIGSERIAL PRIMARY KEY,
    donor_id BIGINT NOT NULL REFERENCES donors(donor_id),
    hospital_id BIGINT NOT NULL REFERENCES hospitals(hospital_id),
    donation_date DATE NOT NULL,
    quantity_ml INT CHECK (quantity_ml BETWEEN 350 AND 500)
);

CREATE TABLE audit_logs (
    log_id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(user_id),
    action VARCHAR(255),
    action_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert Minimal Master Data
INSERT INTO roles (role_id, role_name) VALUES 
(1, 'ADMIN'), (2, 'DONOR'), (3, 'RECIPIENT'), (4, 'HOSPITAL_STAFF') ON CONFLICT DO NOTHING;

INSERT INTO blood_groups (blood_group_id, group_name) VALUES 
(1, 'A+'), (2, 'A-'), (3, 'B+'), (4, 'B-'), (5, 'AB+'), (6, 'AB-'), (7, 'O+'), (8, 'O-') ON CONFLICT DO NOTHING;

INSERT INTO districts (district_id, district_name) VALUES 
(1, 'Thiruvananthapuram'), (2, 'Ernakulam'), (3, 'Kozhikode'), (4, 'Thrissur'), (5, 'Kollam') ON CONFLICT DO NOTHING;

-- Insert Mock Data
INSERT INTO users (user_id, full_name, email, phone, password_hash, role_id, is_active) VALUES 
(1, 'Amal Raj', 'amal@kerala.in', '9000000001', 'hashed_pwd', 2, TRUE),
(2, 'Nithya Menon', 'nithya@kerala.in', '9000000002', 'hashed_pwd', 2, TRUE),
(3, 'Arun S', 'arun@kerala.in', '9000000003', 'hashed_pwd', 2, TRUE),
(4, 'Meera Nair', 'meera@kerala.in', '9000000004', 'hashed_pwd', 2, TRUE),
(5, 'Rahul Varghese', 'rahul@kerala.in', '9000000005', 'hashed_pwd', 3, TRUE) ON CONFLICT DO NOTHING;

-- Fix sequence sync after explicit IDs
SELECT setval('users_user_id_seq', (SELECT MAX(user_id) FROM users));

INSERT INTO donors (donor_id, user_id, blood_group_id, district_id, is_eligible, emergency_ready) VALUES 
(1, 1, 7, 1, TRUE, TRUE),
(2, 2, 1, 2, TRUE, FALSE),
(3, 3, 3, 3, TRUE, TRUE),
(4, 4, 5, 4, TRUE, FALSE) ON CONFLICT DO NOTHING;

SELECT setval('donors_donor_id_seq', (SELECT MAX(donor_id) FROM donors));

INSERT INTO recipients (recipient_id, user_id, blood_group_id, district_id) VALUES 
(1, 5, 7, 1) ON CONFLICT DO NOTHING;

SELECT setval('recipients_recipient_id_seq', (SELECT MAX(recipient_id) FROM recipients));

INSERT INTO hospitals (hospital_id, hospital_name, email, district_id, contact_phone) VALUES 
(1, 'Govt Medical College Thrissur', 'contact@gmcthrissur.mock', 4, '0487XXXXXX'),
(2, 'Aster Medcity', 'urgent@astermedcity.mock', 2, '0484XXXXXX') ON CONFLICT DO NOTHING;

SELECT setval('hospitals_hospital_id_seq', (SELECT MAX(hospital_id) FROM hospitals));

INSERT INTO blood_inventory (inventory_id, hospital_id, blood_group_id, units_available) VALUES 
(1, 1, 7, 10),
(2, 1, 1, 6),
(3, 1, 3, 4) ON CONFLICT DO NOTHING;

SELECT setval('blood_inventory_inventory_id_seq', (SELECT MAX(inventory_id) FROM blood_inventory));

INSERT INTO blood_requests (request_id, recipient_id, hospital_id, blood_group_id, units_required, priority, status, request_date) VALUES 
(1, 1, 1, 7, 2, 'URGENT', 'PENDING', NOW() - INTERVAL '2 hours'),
(2, 1, 2, 1, 1, 'CRITICAL', 'PENDING', NOW() - INTERVAL '10 minutes') ON CONFLICT DO NOTHING;

SELECT setval('blood_requests_request_id_seq', (SELECT MAX(request_id) FROM blood_requests));
