-- Create database
CREATE DATABASE IF NOT EXISTS vngo;
USE vngo;

-- Create ENUM tables first
-- account_status enum
CREATE TABLE enum_account_status (
                                     status VARCHAR(20) PRIMARY KEY
);
INSERT INTO enum_account_status VALUES ('ACTIVE'), ('INACTIVE'), ('BANNED');

-- booking_status enum
CREATE TABLE enum_booking_status (
                                     status VARCHAR(20) PRIMARY KEY
);
INSERT INTO enum_booking_status VALUES ('PENDING'), ('ACCEPTED'), ('PICKING_UP'), ('IN_PROGRESS'), ('COMPLETED'), ('CANCELLED');

-- payment_method enum
CREATE TABLE enum_payment_method (
                                     method VARCHAR(20) PRIMARY KEY
);
INSERT INTO enum_payment_method VALUES ('CASH'), ('VNPAY'), ('MOMO'), ('BANK_TRANSFER');

-- payment_status enum
CREATE TABLE enum_payment_status (
                                     status VARCHAR(20) PRIMARY KEY
);
INSERT INTO enum_payment_status VALUES ('PENDING'), ('COMPLETED'), ('FAILED');

-- report_status enum
CREATE TABLE enum_report_status (
                                    status VARCHAR(20) PRIMARY KEY
);
INSERT INTO enum_report_status VALUES ('PENDING'), ('IN_REVIEW'), ('RESOLVED'), ('REJECTED');

-- voucher_status enum
CREATE TABLE enum_voucher_status (
                                     status VARCHAR(20) PRIMARY KEY
);
INSERT INTO enum_voucher_status VALUES ('ACTIVE'), ('INACTIVE'), ('EXPIRED');

-- Create core tables
CREATE TABLE users (
                       id BIGINT PRIMARY KEY AUTO_INCREMENT,
                       email VARCHAR(255) UNIQUE NOT NULL,
                       password VARCHAR(255) NOT NULL,
                       phone_number VARCHAR(20) UNIQUE NOT NULL,
                       full_name VARCHAR(255) NOT NULL,
                       date_of_birth DATETIME,
                       status VARCHAR(20),
                       created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                       updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                       FOREIGN KEY (status) REFERENCES enum_account_status(status)
);

CREATE TABLE drivers (
                         id BIGINT PRIMARY KEY AUTO_INCREMENT,
                         email VARCHAR(255) UNIQUE NOT NULL,
                         password VARCHAR(255) NOT NULL,
                         phone_number VARCHAR(20) UNIQUE NOT NULL,
                         full_name VARCHAR(255) NOT NULL,
                         date_of_birth DATETIME,
                         avatar_url VARCHAR(255),
                         status VARCHAR(20),
                         vehicle_number VARCHAR(50),
                         vehicle_type VARCHAR(50),
                         license_number VARCHAR(50),
                         identity_card_number VARCHAR(50),
                         rating_avg DECIMAL(3,2),
                         total_trips INT DEFAULT 0,
                         total_earnings DECIMAL(10,2) DEFAULT 0.00,
                         working_status BOOLEAN DEFAULT FALSE,
                         created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                         updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                         FOREIGN KEY (status) REFERENCES enum_account_status(status)
);

CREATE TABLE admins (
                        id BIGINT PRIMARY KEY AUTO_INCREMENT,
                        email VARCHAR(255) UNIQUE NOT NULL,
                        password VARCHAR(255) NOT NULL,
                        phone_number VARCHAR(20) UNIQUE NOT NULL,
                        full_name VARCHAR(255) NOT NULL,
                        status VARCHAR(20),
                        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                        FOREIGN KEY (status) REFERENCES enum_account_status(status)
);

-- Create locations table
CREATE TABLE locations (
                           id BIGINT PRIMARY KEY AUTO_INCREMENT,
                           latitude DECIMAL(10,8) NOT NULL,
                           longitude DECIMAL(11,8) NOT NULL,
                           address VARCHAR(255) NOT NULL,
                           city VARCHAR(100),
                           district VARCHAR(100),
                           ward VARCHAR(100),
                           created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                           updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

);

CREATE TABLE users_favourite_locations (
						user_id BIGINT NOT NULL,
                        location_id BIGINT NOT NULL,
                        frequency INT,
                        FOREIGN KEY (user_id) REFERENCES users(id),
                        FOREIGN KEY (location_id) REFERENCES locations(id)
)

-- Create bookings table
CREATE TABLE bookings (
                          id BIGINT PRIMARY KEY AUTO_INCREMENT,
                          user_id BIGINT NOT NULL,
                          driver_id BIGINT NOT NULL,
                          pickup_location_id BIGINT NOT NULL,
                          destination_location_id BIGINT NOT NULL,
                          estimated_price DECIMAL(10,2),
                          final_price DECIMAL(10,2),
                          pickup_time DATETIME,
                          completion_time DATETIME,
                          status VARCHAR(20),
                          cancellation_reason TEXT,
                          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                          FOREIGN KEY (user_id) REFERENCES users(id),
                          FOREIGN KEY (driver_id) REFERENCES drivers(id),
                          FOREIGN KEY (pickup_location_id) REFERENCES locations(id),
                          FOREIGN KEY (destination_location_id) REFERENCES locations(id),
                          FOREIGN KEY (status) REFERENCES enum_booking_status(status)
);

-- Create payments table
CREATE TABLE payments (
                          id BIGINT PRIMARY KEY AUTO_INCREMENT,
                          user_id BIGINT NOT NULL,
                          booking_id BIGINT NOT NULL,
                          amount DECIMAL(10,2) NOT NULL,
                          payment_method VARCHAR(20),
                          status VARCHAR(20),
                          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                          FOREIGN KEY (user_id) REFERENCES users(id),
                          FOREIGN KEY (booking_id) REFERENCES bookings(id),
                          FOREIGN KEY (payment_method) REFERENCES enum_payment_method(method),
                          FOREIGN KEY (status) REFERENCES enum_payment_status(status)
);

-- Create driver_wallets table
CREATE TABLE driver_wallets (
                                driver_id BIGINT PRIMARY KEY,
                                balance DECIMAL(10,2) DEFAULT 0.00,
                                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                                FOREIGN KEY (driver_id) REFERENCES drivers(id)
);

-- Create ratings table
CREATE TABLE ratings (
                         id BIGINT PRIMARY KEY AUTO_INCREMENT,
                         booking_id BIGINT NOT NULL,
                         user_id BIGINT NOT NULL,
                         driver_id BIGINT NOT NULL,
                         rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
                         comment TEXT,
                         created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                         updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                         FOREIGN KEY (booking_id) REFERENCES bookings(id),
                         FOREIGN KEY (user_id) REFERENCES users(id),
                         FOREIGN KEY (driver_id) REFERENCES drivers(id)
);

-- Create reports table
CREATE TABLE reports (
                         id BIGINT PRIMARY KEY AUTO_INCREMENT,
                         reporter_id BIGINT NOT NULL,
                         reported_id BIGINT NOT NULL,
                         booking_id BIGINT NOT NULL,
                         reason TEXT NOT NULL,
                         status VARCHAR(20),
                         handled_by BIGINT,
                         created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                         updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                         resolved_at DATETIME,
                         FOREIGN KEY (reporter_id) REFERENCES users(id),
                         FOREIGN KEY (reported_id) REFERENCES drivers(id),
                         FOREIGN KEY (booking_id) REFERENCES bookings(id),
                         FOREIGN KEY (handled_by) REFERENCES admins(id),
                         FOREIGN KEY (status) REFERENCES enum_report_status(status)
);

-- Create notifications table
CREATE TABLE notifications (
                               id BIGINT PRIMARY KEY AUTO_INCREMENT,
                               recipient_id BIGINT NOT NULL,
                               title VARCHAR(255) NOT NULL,
                               content TEXT NOT NULL,
                               type VARCHAR(50),
                               is_read BOOLEAN DEFAULT FALSE,
                               created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                               updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
);

-- Create vouchers table
CREATE TABLE vouchers (
                          id BIGINT PRIMARY KEY AUTO_INCREMENT,
                          code VARCHAR(50) UNIQUE NOT NULL,
                          title VARCHAR(255) NOT NULL,
                          description TEXT,
                          discount_type VARCHAR(20) NOT NULL,
                          discount_amount DECIMAL(10,2) NOT NULL,
                          min_booking_amount DECIMAL(10,2),
                          max_discount_amount DECIMAL(10,2),
                          valid_from DATETIME NOT NULL,
                          valid_to DATETIME NOT NULL,
                          usage_limit INT,
                          usage_count INT DEFAULT 0,
                          status VARCHAR(20),
                          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                          FOREIGN KEY (status) REFERENCES enum_voucher_status(status)
);

-- Create user_vouchers table
CREATE TABLE user_vouchers (
                               id BIGINT PRIMARY KEY AUTO_INCREMENT,
                               user_id BIGINT NOT NULL,
                               voucher_id BIGINT NOT NULL,
                               is_used BOOLEAN DEFAULT FALSE,
                               used_at DATETIME,
                               created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                               updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                               FOREIGN KEY (user_id) REFERENCES users(id),
                               FOREIGN KEY (voucher_id) REFERENCES vouchers(id)
);

-- Create indexes for better performance
CREATE INDEX idx_user_email ON users(email);
CREATE INDEX idx_user_phone ON users(phone_number);
CREATE INDEX idx_driver_email ON drivers(email);
CREATE INDEX idx_driver_phone ON drivers(phone_number);
CREATE INDEX idx_booking_status ON bookings(status);
CREATE INDEX idx_payment_status ON payments(status);
CREATE INDEX idx_voucher_code ON vouchers(code);
CREATE INDEX idx_notification_recipient ON notifications(recipient_id);