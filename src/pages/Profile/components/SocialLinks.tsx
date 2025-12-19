import React from 'react';
import '@/pages/Profile/Profile.css';

interface SocialLink {
    name: string;
    icon: string;
    url: string;
}

interface SocialLinksProps {
    links: SocialLink[];
}

export const SocialLinks: React.FC<SocialLinksProps> = ({ links }) => {
    return (
        <div className="social-links-section">
            <h3 className="section-title">Connect</h3>
            <div className="social-links">
                {links.map((link) => (
                    <a key={link.name} href={link.url} className="social-link">
                        <div className="social-icon">
                            <span className="material-symbols-outlined">{link.icon}</span>
                        </div>
                        <p className="social-name">{link.name}</p>
                    </a>
                ))}
            </div>
        </div>
    );
};