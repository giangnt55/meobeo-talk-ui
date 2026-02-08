import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { mockMemories } from '@/mock/memoryData';
import { formatMemoryDate } from '@/utils/memoryHelpers';
import { SEO } from '@/components/common/SEO/SEO';
import './MemoryDetail.css';

// Reference mock data for fallback
const REFERENCE_MEMORY = {
  id: 'ref-1',
  title: 'Chuyến Dã Ngoại Chủ Nhật Ở Công Viên',
  content: "Một ngày thật đẹp trời. Nắng xuyên qua kẽ lá, nhảy múa trên tấm thảm trải của tụi mình. Tụi mình tìm được một chỗ tuyệt vời dưới gốc sồi già gần hồ nước. Cùng ăn bánh mì dưa leo, dâu tây tươi, và ngắm mây trôi lững lờ suốt cả buổi. Không vội vã, không tiếng ồn phố thị, chỉ có tiếng gió và tiếng cười xa xa. Cảm giác thật bình yên, một khoảnh khắc ngưng đọng mà mình muốn nhớ mãi.",
  date: '2023-10-15',
  mood: 'Hạnh phúc',
  images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuA1a0OLECUOnOOAsMuO8dye1laJ0rzKPRnkLtMyLoBhn6M6svCovRnnNhVKKksaMtygBzOoD4eRvdLJFcm7si-uuMChlfYHrKn6MZ4a7wIc0wZsiEJ1Oa9byrYpwdGifDbbTNg6XCvLAIz4EnRQ8c-lz3O9FcX6_sI2hgfCdm65KMt7HiMMyk1bTkPU85u19a2hvKheTcl1YXrxlCZRUKfyEs36-mUKHp-TklMHs0TfbYcymUolAf9s9bdH0UhN9hpPMKUA75gH04o'],
  location: 'Công viên Golden Gate',
  likes_count: 12,
  views_count: 45
};

export const MemoryDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [memory, setMemory] = useState<any | null>(null);

  useEffect(() => {
    // Try to find in mock data, otherwise use reference data for demo if ID matches 'ref' or fall back to it
    const found = mockMemories.find((m) => m.id === id);
    if (found) {
      setMemory({
        ...found,
        location: 'Paris, France', // Default if missing
        likes_count: 12, // Default
        views_count: 45 // Default
      });
    } else {
      // Fallback to reference memory for demo purposes if ID not found (or for this specific test case)
      setMemory(REFERENCE_MEMORY);
    }
  }, [id]);

  if (!memory) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Đang tải ký ức...</p>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={memory.title}
        description={memory.content.substring(0, 160)}
        image={memory.images?.[0]}
        url={`https://meobeo-talk-ui.pages.dev/memories/${memory.id}`}
        type="article"
      />

      <div className="memory-detail-wrapper">
        {/* Breadcrumb */}
        <div className="memory-back-nav">
          <a href="#" onClick={(e) => { e.preventDefault(); navigate(-1); }} className="back-link">
            <span className="material-symbols-outlined">arrow_back</span>
            <span>Quay Lại Nhật Ký</span>
          </a>
        </div>

        {/* Split Layout */}
        <div className="memory-split-layout">

          {/* Left Column: Visual Anchor */}
          <div className="memory-visual-col">
            <div className="memory-main-image-container group">
              <img
                src={memory.images?.[0] || 'https://via.placeholder.com/800x1000'}
                alt={memory.title}
                className="memory-main-image"
              />
              <div className="memory-image-overlay"></div>

              {memory.location && (
                <div className="location-tag">
                  <span className="material-symbols-outlined">location_on</span>
                  <span>{memory.location}</span>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Content */}
          <div className="memory-content-col">
            {/* Meta Header */}
            <div className="memory-meta-header">
              <div className="memory-date-group">
                <span className="material-symbols-outlined">calendar_today</span>
                <span className="font-medium text-base">{formatMemoryDate(memory.date)}</span>
              </div>
              {memory.mood && (
                <div className="memory-mood-pill">
                  <span className="material-symbols-outlined filled">sentiment_satisfied</span>
                  <span className="mood-text">{memory.mood}</span>
                </div>
              )}
            </div>

            {/* Title */}
            <h1 className="memory-title">
              {memory.title}
            </h1>

            {/* Body Text */}
            <div className="memory-body">
              {memory.content.split('\n').map((paragraph: string, idx: number) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* Interaction Stats */}
            <div className="memory-stats">
              <div className="stat-item">
                <span className="material-symbols-outlined filled" style={{ color: '#ef4444' }}>favorite</span>
                <span className="stat-value">{memory.likes_count || 0} Lượt thích</span>
              </div>
              <div className="stat-item">
                <span className="material-symbols-outlined">visibility</span>
                <span className="stat-value">{memory.views_count || 0} Lượt xem</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="memory-actions-footer">
              <button className="action-btn primary">
                <span className="material-symbols-outlined">edit</span>
                <span>Chỉnh Sửa Ký Ức</span>
              </button>
              <button className="action-btn secondary">
                <span className="material-symbols-outlined">ios_share</span>
                <span>Chia Sẻ</span>
              </button>
              <button className="action-btn icon-only">
                <span className="material-symbols-outlined">more_horiz</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};
