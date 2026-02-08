import React from 'react';
// import { useNavigate } from 'react-router-dom';
import { SEO } from '@/components/common/SEO/SEO';
import './JourneyDetail.css';

// Mock Data matching the reference
const JOURNEY_DATA = {
    title: "Mùa Hè Phiêu Lưu Của Tụi Mình",
    startDate: "15 Tháng 6, 2023",
    endDate: "20 Tháng 6, 2023",
    events: [
        {
            id: 1,
            title: "Đặt chân đến Tokyo",
            day: "Ngày 1",
            time: "10:00 Sáng",
            type: "text",
            content: "Hạ cánh xuống Narita. Độ ẩm làm tụi mình hơi ngợp, nhưng mà phấn khích lắm luôn! Bắt tàu Skyliner về thành phố nè.",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBTafzqKroLgex_bFA-sC0BuIJe_iW3G3_Qp5g42iGdGcmTRVtyuA8pfSngpcbaHziFsO4gDEc-Y_O9I2Qc0J4iZMvJ8Z9ZRAi_ZkPCg3O-kElIF-62Uh06AXhqWlXKOOlda3c0eBu1uS33wj_4sTWDvGI_KiPSiULT6pL6Iq2EB_F1vFPzZ7yzOZM8Bs-d6xZr0P7mkfEyZoSuVB6QpLEWr1NW0NFYH-Eb74LV5KP4cUkBWXFgbegApjm1hljMnV0QtrqZ7aqPlyc"
        },
        {
            id: 2,
            title: "Thăm đền Senso-ji",
            day: "Ngày 1",
            time: "2:00 Chiều",
            type: "image",
            content: "https://lh3.googleusercontent.com/aida-public/AB6AXuBaNuK-8dVKJ7xHMP1RzOwFHwV2K0JodUNbjXwgGPmHt65Wm2B82Un8L_bHJ4OrxbBdoFBmPYKhvdeQ5fKNpTQ3DEao_LPq0ST3Aq2rZ9Ol9KQbwx7lF7CsDD93LA12YVj19IAdU4PXPn3J9mdyApoIdcT1Kw49_xD8ABo-tAyyhgtxV_cA-ujSs6Q3EugUvldYvYqvVLmhnAO-6D2lFzGeIwPFcEjRZqlYfxGvAorlSu4KgmfOCmqi8P9lbD6aXdIAAtbwyWKZ84o",
            timelineImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuCQyWRxUGyaMbbVT6d9UObfxZC4Ay3yUGqR6HWlcGHJNuqGoLBjGSU384Tb_6o0csdkL7pCkI5JOx-d345hlC4UUkoRpFaQ_TddhRmkJ-TnXEwgzhcGqy8lvXkf_ZmVGW1Ex6OZUIsFpYIKR4vkdpgUAVudqwN9FG5exuaJUrkl2MFqNm-AKIwvSsq_DkZTokvOaCCyp_owbgqesRAEQYGPW2CZwdw3dI1-y8x-aEHmbH-6vctXkpKNQkzIA5g2JbiD9eAaUi4Tif0"
        },
        {
            id: 3,
            title: "Ăn trưa Sushi ở Tsukiji",
            day: "Ngày 2",
            time: "12:30 Trưa",
            type: "text",
            timelineImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuACSCZQZCfe_boWnst9xoY35Y3W7QRpQ8MfCotDjtQvOm6o0ArWWVgCKyFAvU794ZpyyBoDZxvJpDveRt4ZobtDZSnHsKn2Z02iRtrWCgn8qL-m_SX6VbDtXbeif5oTdPRwMP36dq_fdAbkODfzpUwZVEsKQUYSr0P15aTz5dHn1wHo0LE8PEyG7dfveFDZ00JVz-bHqaj7mh1Sp6pFK1PJCl-NDwjWynIcBEyAC_b-PLulIz0xLmq2C8Za-8VGNIljitSf1l3WaDI"
        },
        {
            id: 4,
            title: "Giao lộ Shibuya",
            day: "Ngày 2",
            time: "5:00 Chiều",
            type: "video",
            content: "Video_004.mp4",
            fileSize: "0:45 • 24MB",
            timelineImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuDcDwnqOte_hHMQVy0IIEilYCPzWUnWy1PPxONVphYja0wLsJJ7pTk0soQ7Ke9QxXXsosqcE5kgj90HypDezUibZWSI3bFS4rQZek0ZjEzzIMwBGrsQTiJ8UUsGFpOtt1l0w6g35jVHna7pxK5uEBFYopLvq8f-owE3Z_XiSWwRVGZNnB4TREAryTEZaLO9rMAzgV-HLUnZtFiQcKUme-MK7tj69C1HJMR5dtHwizfF4HXK7wLLb03_UC5sYCaPWzJbJ0Fhjk6L58w"
        },
        {
            id: 5,
            title: "Tạm biệt Narita",
            day: "Ngày 5",
            time: "11:00 Sáng",
            type: "end"
        }
    ],
    highlights: [
        {
            title: "Những nụ cười",
            location: "Công viên Yoyogi",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCtawcDwZekUZqaUdpxHv9cQAMBQgPyVCy720wXkYDX-YiD9dL3hR4tCWorDJleVaWQA3ZCq2NqAs8i3r4EugO1OSIfhRNwkjPPvVPMxTUAG8RMuNQyy7kJQmlJZbykFV5H4Y_2JWDrCwO4SHT3Jjs_bvKEhfqH2k6p1O5iW3nNFnyTj61fwngLr1yxEATBq5d_Zy0Q3E8hrjovmn2yAKdq-t-cOekLXT4LrFEL47VW2nT4SkNBGVnXOIeN11AKlkr_Id2P0MEWGKg"
        },
        {
            title: "Ánh đèn thành phố",
            location: "Shinjuku",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCLaSosYp18JJOxiuQvAzzXGM03SRh4CKN3V8H47VutL09TUYSoR6CUQRp_htrcaRCiLabnZUcJL7sGmzkLvjsF2Tn-151C59Y7bJ8ipBTyGMgLLEt59tntLeRMd9JjW0wn24K-VCDBboaJ06Qiq0kMRnERRP-pwDQJmn89J2EdJXlFiXrgFqjU-ysr2s7JAcJtxVXKQ7A6akqWzdqkvFYI5AImVWURHauH8OW8Z1SR8yBJExe7S3wljI9zSQPfPHFQgWxOgE-0Klk"
        },
        {
            title: "Món ngon khó cưỡng",
            location: "Phố Ramen",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC8W7NygV7LJkgufgSF5b_j_unXy5JYEudjfybtmZM8CnTeIX953xwe0Coj6x3M0wlsZI4s_foWHQ0q2BghQIl-sM6Sul-VXzYvBXCPQ4YoWIe4sACb33rixFoYafhB4gS_GPV6v4kCFVjs6jH-noHcTG6_4zWuKahWuAlTLcge3dJ4gWW5Q6csa3EbY4_Ih_LaghE0vkow4IC4RNb5nfSO60QOfFYs6Q6G-ALA5Os5iYY1gLm9hcPXTW1YQOPds6cLiJBwaU3kYS4"
        },
        {
            title: "Dạo đêm",
            location: "Quận Gion",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDFWW7X52_sMKlcJxCKYRyHVPiHX8phbtKT3qpSXHRyfCmkrHD8gn6WeDbBRHtQ_ST61wf4F2FwMQB2cQIuT0JgcAinNIUVfIi982YBZnqSgRnKYkVImq9MPJmwigH9QXihq0Sky5I7wjJTiGMiYxqJI6-NLnzPvZvKNJTqAjK8i2e0f_Xd6t80eQMXKiOHg2981uexMwVJ52Y9RCRt4xRg-ogQmMqaiQkxx5oY58GF-fphH4rXjOlxd2P2y1ahSJI3P-bM2evu5IM"
        }
    ]
};

export const JourneyDetailPage: React.FC = () => {
    // const navigate = useNavigate();

    return (
        <div className="journey-detail-page">
            <SEO
                title="Câu Chuyện Hành Trình - MeoBeo Talk"
                description="Hành trình Mùa Hè Phiêu Lưu Của Tụi Mình"
            />

            {/* Main Content */}
            <main className="journey-main">
                <div className="journey-content-wrapper">

                    {/* Hero Section */}
                    <div className="journey-hero">
                        <h1 className="journey-title">{JOURNEY_DATA.title}</h1>
                        <div className="journey-date">
                            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>calendar_month</span>
                            <p>{JOURNEY_DATA.startDate} - {JOURNEY_DATA.endDate}</p>
                        </div>
                    </div>

                    {/* Timeline */}
                    <div className="journey-timeline">
                        {JOURNEY_DATA.events.map((event, index) => (
                            <React.Fragment key={event.id}>
                                {/* Timeline Marker Column */}
                                <div className="timeline-marker-col">
                                    {index === 0 ? null : (
                                        <div className="timeline-connector"></div>
                                    )}
                                    {event.type === 'end' ? (
                                        <div className="timeline-node icon-node">
                                            <span className="material-symbols-outlined">flag</span>
                                        </div>
                                    ) : (
                                        <div className={`timeline-node ${event.image || event.timelineImage ? '' : 'secondary'}`}>
                                            <div
                                                className="timeline-image"
                                                style={{ backgroundImage: `url("${event.timelineImage || event.image}")` }}
                                            ></div>
                                        </div>
                                    )}
                                    <div className="timeline-line"></div>
                                </div>

                                {/* Content Column */}
                                <div className="timeline-content-col">
                                    <div className="timeline-header">
                                        <p className="timeline-event-title">{event.title}</p>
                                        <span className={`timeline-day-badge ${event.day === 'Ngày 1' ? 'badge-primary' : 'badge-secondary'}`}>
                                            {event.day}
                                        </span>
                                    </div>
                                    <p className="timeline-time">
                                        <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>schedule</span>
                                        {event.time}
                                    </p>

                                    {/* Event Specific Content */}
                                    {event.type === 'text' && event.content && (
                                        <div className="timeline-card">
                                            <p className="timeline-description">{event.content}</p>
                                        </div>
                                    )}

                                    {event.type === 'image' && event.content && (
                                        <div className="timeline-media group">
                                            <div
                                                className="timeline-image"
                                                style={{ backgroundImage: `url("${event.content}")` }}
                                            ></div>
                                            <div className="timeline-media-overlay"></div>
                                        </div>
                                    )}

                                    {event.type === 'video' && event.content && (
                                        <div className="timeline-card timeline-file">
                                            <div className="file-icon">
                                                <span className="material-symbols-outlined">videocam</span>
                                            </div>
                                            <div className="file-info">
                                                <p className="file-name">{event.content}</p>
                                                <p className="file-meta">{event.fileSize}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </React.Fragment>
                        ))}
                    </div>

                    {/* Horizontal Gallery */}
                    <div className="journey-gallery-section">
                        <div className="gallery-header">
                            <h3>Những Khoảnh Khắc Đáng Nhớ</h3>
                            <button className="view-all-btn">Xem Tất Cả</button>
                        </div>
                        <div className="gallery-scroll-container">
                            {JOURNEY_DATA.highlights.map((highlight, idx) => (
                                <div key={idx} className="gallery-card group">
                                    <div className="gallery-image-wrapper">
                                        <div
                                            className="gallery-image"
                                            style={{ backgroundImage: `url("${highlight.image}")` }}
                                        ></div>
                                    </div>
                                    <div className="gallery-info">
                                        <p className="gallery-title">{highlight.title}</p>
                                        <p className="gallery-location">{highlight.location}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
};
