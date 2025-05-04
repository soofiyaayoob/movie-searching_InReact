import React from 'react';
import './Footer.css';

function Footer() {
    return (
        <div className="footer">
            <div className="footer-column">
                <div className="footer-title">Company</div>
                <a href="#" className="footer-link">About Us</a>
                <a href="#" className="footer-link">Careers</a>
                
                <div className="copyright">© 2025 STAR. All Rights Reserved.</div>
                <div className="footer-bottom">
                    <a href="#" className="footer-link">Terms Of Use</a>
                    <a href="#" className="footer-link">Privacy Policy</a>
                    <a href="#" className="footer-link">FAQ</a>
                </div>
            </div>

            <div className="footer-column">
                <div className="footer-title">View Website in</div>
                <div className="language-option">
                    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#ffffff' }}>
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span className="footer-link selected">English</span>
                </div>
            </div>

            <div className="footer-column">
                <div className="footer-title">Need Help?</div>
                <a href="#" className="footer-link">Visit Help Center</a>
                <a href="#" className="footer-link">Share Feedback</a>
            </div>

            <div className="footer-column">
                <div className="footer-title">Connect with Us</div>
                <div className="social-icons">
                    <a href="#" className="social-icon">
                        <svg viewBox="0 0 24 24" width="24" height="24" fill="white">
                            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                        </svg>
                    </a>
                    <a href="#" className="social-icon">
                        <svg viewBox="0 0 24 24" width="24" height="24" fill="white">
                            <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                        </svg>
                    </a>
                </div>
                <div className="app-stores">
                    <img src="/api/placeholder/120/40" alt="Google Play Store" className="app-store-badge" />
                    <img src="/api/placeholder/120/40" alt="Apple App Store" className="app-store-badge" />
                </div>
            </div>
        </div>
    );
}

export default Footer;
