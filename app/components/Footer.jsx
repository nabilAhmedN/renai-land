'use client';

import { useState } from 'react';

// Arrow icon component for social links
const ArrowIcon = () => (
    <svg
        className="footer-socials-line-svg"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
    >
        <path
            fill="#000"
            fillRule="evenodd"
            d="M6.948 18.113a.75.75 0 0 1-1.06-1.06l9.885-9.886H8.65a.75.75 0 1 1 0-1.5h9.682v9.682a.75.75 0 0 1-1.5 0v-7.12l-9.884 9.884Z"
            clipRule="evenodd"
        />
    </svg>
);

// Social link data
const socialLinks = [
    { name: 'Twitter / X', href: 'https://twitter.com/lusionltd/' },
    { name: 'Instagram', href: 'https://www.instagram.com/lusionltd/' },
    { name: 'Linkedin', href: 'https://www.linkedin.com/company/lusionltd/' },
];

export default function Footer() {
    const [email, setEmail] = useState('');
    const [feedbackMessage, setFeedbackMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email) {
            setFeedbackMessage('Thank you for subscribing!');
            setEmail('');
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer
            id="footer-section"
            className="section relative"
            style={{
                padding: 'var(--base-padding-y) var(--base-padding-x)'
            }}
        >
            {/* Background */}
            <div id="footer-bg"></div>

            {/* Top spacer */}
            <div id="footer-top"></div>

            {/* Middle section - Contact & Newsletter */}
            <div id="footer-middle">
                {/* Contact section */}
                <div id="footer-middle-contact">
                    {/* Address */}
                    <a
                        id="footer-contact-address"
                        href="https://goo.gl/maps/x9evc1NxZocjrM947"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <div className="footer-address-line">Suite 2</div>
                        <div className="footer-address-line">9 Marsh Street</div>
                        <div className="footer-address-line">Bristol, BS1 4AA</div>
                        <div className="footer-address-line">United Kingdom</div>
                    </a>

                    {/* Social links */}
                    <div id="footer-contact-socials">
                        {socialLinks.map((social) => (
                            <div key={social.name} className="footer-socials-line-wrapper">
                                <a
                                    className="footer-socials-line"
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <ArrowIcon />
                                    <span className="footer-socials-text">{social.name}</span>
                                </a>
                            </div>
                        ))}
                    </div>

                    {/* General enquiries */}
                    <div id="footer-contact-enquires">
                        <div id="footer-enquires-header">General enquires</div>
                        <a id="footer-enquires-link" href="mailto:hello@lusion.co">
                            hello@lusion.co
                        </a>
                    </div>

                    {/* New business */}
                    <div id="footer-contact-business">
                        <div id="footer-business-header">New business</div>
                        <a id="footer-business-link" href="mailto:business@lusion.co">
                            business@lusion.co
                        </a>
                    </div>
                </div>

                {/* Newsletter section */}
                <div id="footer-middle-newsletter">
                    <div id="footer-newsletter-header">
                        <span className="footer-newsletter-line">Subscribe to</span>
                        <span className="footer-newsletter-line">our newsletter</span>
                    </div>

                    <div id="footer-newsletter-input" className="--active">
                        <div id="footer-newsletter-bg"></div>
                        <form id="footer-newsletter-form" onSubmit={handleSubmit}>
                            <input
                                id="footer-newsletter-input-field"
                                type="email"
                                name="EMAIL"
                                autoComplete="email"
                                placeholder="Your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <button
                                type="submit"
                                id="footer-newsletter-input-arrow"
                                aria-label="Send newsletter form button"
                            >
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M1.9999 11.9998C1.9999 12.552 2.44762 12.9997 2.9999 12.9997H18.9757C18.8901 13.148 18.7838 13.2876 18.657 13.4144L12.2931 19.7784C11.9025 20.1689 11.9025 20.8021 12.2931 21.1926C12.6836 21.5831 13.3168 21.5831 13.7073 21.1926L22.1926 12.7073C22.5831 12.3168 22.5831 11.6836 22.1926 11.2931L22.1924 11.293L13.7071 2.80767C13.3166 2.41715 12.6834 2.41715 12.2929 2.80767C11.9024 3.1982 11.9024 3.83136 12.2929 4.22189L18.657 10.586C18.7836 10.7126 18.8896 10.8518 18.9752 10.9998H2.9999C2.44762 10.9997 1.9999 11.4475 1.9999 11.9998Z"
                                        fill="black"
                                    />
                                </svg>
                            </button>
                        </form>
                        <div id="footer-newsletter-feedback-message">{feedbackMessage}</div>
                    </div>
                </div>
            </div>

            {/* Bottom section */}
            <div id="footer-bottom">
                <div id="footer-bottom-copyright">©2025 LUSION Creative Studio</div>

                <a
                    id="footer-bottom-labs"
                    href="https://labs.lusion.co"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    R&D: labs.lusion.co
                </a>

                <div id="footer-bottom-tagline">Built by Lusion with ❤️</div>

                <div id="footer-bottom-up" onClick={scrollToTop}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            fill="#fff"
                            fillRule="evenodd"
                            d="M12 22a1 1 0 0 1-1-1V5.857l-6.223 6.224a1 1 0 0 1-1.415-1.415l7.9-7.9a1 1 0 0 1 1.414 0v.001l7.9 7.9a1 1 0 0 1-1.414 1.414L13 5.919V21a1 1 0 0 1-1 1Z"
                            clipRule="evenodd"
                        />
                    </svg>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            fill="#fff"
                            fillRule="evenodd"
                            d="M12 22a1 1 0 0 1-1-1V5.857l-6.223 6.224a1 1 0 0 1-1.415-1.415l7.9-7.9a1 1 0 0 1 1.414 0v.001l7.9 7.9a1 1 0 0 1-1.414 1.414L13 5.919V21a1 1 0 0 1-1 1Z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
            </div>
        </footer>
    );
}
