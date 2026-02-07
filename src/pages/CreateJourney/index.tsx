import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { SEO } from '@/components/common/SEO/SEO';
import './CreateJourney.css';

interface TimelineItem {
    id: string;
    memoryId: string;
    title: string;
    time: string;
    description: string;
    image: string;
    caption: string;
}

interface Memory {
    id: string;
    title: string;
    image: string;
    date: string;
}

// Mock memories data
const MOCK_MEMORIES: Memory[] = [
    {
        id: '1',
        title: 'Eiffel Picnic',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZ6sPgfTK8L5uPobdwfhHD27uU_AyzGRYYh6HJPbZ9US_qBw6vzsOWMPO2DZ14kf-WLAIa4YMu6B3748GA7yCwSRbv_p9E5L-aSRP-s1hbpetjNHhvlr15nc0EGTNy2VA4xsr0BoF6bS1WR0RU6Pv1gPNopP6sjXWHgc0kifsVqYnQPPhlpHixKqdaTMZrTVMk-T0gmhsPh4-iIO7f2zlZVsz_D9B2_YEmzyntFd-FHD-OWl8_8TJh3uAmJrPk3ucxdxF-RAMoKC8',
        date: '2024-01-15'
    },
    {
        id: '2',
        title: 'Morning Brew',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBEh5C4NfYX08fyB0-7c68PKj-rKRttE1xfP8nhvL1M8qBxjWe9G6X7zU7bP_2TMSifuA4JVJXdYSMhJmqIaPgeJubZ2BvbACGrGyRSi2vUwgRzEe2y6GQ943EcpMBRSHrsTkOZJ5Xgz64EtkgEIcDf6-itD9rZs9DwSTDnaSyggfHq3Z_h--S_ll38ZYfF0GznUJ48pnIIdeEsAAPB4uyJOQzWqZkJdYojBzklggiliN69GJQJzNIaczDRTTiuPzXkxnN_4yjht4M',
        date: '2024-01-16'
    },
    {
        id: '3',
        title: 'Alps Train',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCtTUhDLYKAyx_X3nnjgMg1_igcEbkNaZym5ebBs0Q_8b0MvkSytJPv5J5VMdqfUEU4aI7S0y3djbhVPgUfZiVyKwG9YmH3nz5_OdMsm_I7CsJt_DK7s2BXxTSVfL9p6_BOTRf7I0LJCy7VI0yc-p49PXdIYbUicywUN4uMSSNkeZr-Yyi_OCOqW8ybzqQ-8GB6bGZWEhl39FyEAGhhhWukBvk_kEzFdwG7MPIP2ac51b6s9OEx0OdA80-uFequmbblLCZ-HfWXjPA',
        date: '2024-01-17'
    },
    {
        id: '4',
        title: 'Market Day',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCQrcgLRSPaND8xsmlGcMLJIHxdivySXx76jAFk14QL1qAno9uFku_Kfe3O8Q7mKCf6zm7fZn-1v_JZbeONdQvG2rU9Z3_3IxSUJ-m2TYMgSbSd18TMubTQ_uuz3vaYiecyLwRnCbg69Wg6RSPfseabbS-SMSCgA94L_BmxBW8lgIm-DG1RsvMZ_7iy6uOoM-VwGlY7c2NdjM3DMXrHIHWSnoKhHf1R2XED1R589ik9h0rHSsHdpqw_UMggOJicttjsSDFUMAL76nM',
        date: '2024-01-18'
    },
    {
        id: '5',
        title: 'Last Sunset',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCHkwsqDwGI3xrwolC1RF3UTY8WUipvF07HqmhyPjOP6yEVGKDIeU8c2y7y16WtkBgwpp9LXvjXmifqaYfpO9pCdqzNU6ZZk5pcDfIwT8n62eBGRvI4LJ-jfOQLB0Akh8kJmbKZAjEpWqPK94URlU41f3AbW8FZHrZolzkj39a6ht8k3B7dJZDI7kBNRarj-ZVAIpaQDrqGtDD4PI8FCC8Ys5-p5JZGV69SK3rfHx9In0Sn2JtXB4a8ePRESzNiB6ULm2SVCddw1Rw',
        date: '2024-01-19'
    }
];

export const CreateJourney: React.FC = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);

    // State
    const [journeyTitle, setJourneyTitle] = useState('');
    const [journeyDescription, setJourneyDescription] = useState('');
    const [coverImage, setCoverImage] = useState<string | null>(null);
    const [timelineItems, setTimelineItems] = useState<TimelineItem[]>([
        {
            id: '1',
            memoryId: '1',
            title: 'Arrival in Paris',
            time: 'Day 1 - Morning • 08:30 AM',
            description: 'Just landed! The air smells like fresh croissants and diesel. Couldn\'t be happier to start this adventure.',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDKwbQDfXIIW8Cxen_IGNm3U_sDh0ZvuYzlqykX7zacAC5Uld7SjYh3AYNXIKsEMiYcRxSbTapyqGvXJJudEuI3AoLSvcfbQF3puLQOku3apKm7nqSAiBogAxPLnrWu7jMG_E7FS0wskOWED9HeUOPd9Nn7ab7omwN4gzX0eGSVtqeAu8ZBozxtlmp6UM0tW7wkRFgkLmKs80BNn1KQCFFdxSIheZYu0sqPDMFXqQ8lAs5jdvvr7XbQ2SzlEcgqNQQ3GHi0h7ANpRY',
            caption: 'Paris \'23'
        },
        {
            id: '2',
            memoryId: '2',
            title: 'The Louvre Visit',
            time: 'Day 1 - Afternoon • 02:00 PM',
            description: 'The Mona Lisa was smaller than I expected, but the sheer scale of the museum is overwhelming.',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBS3Xh-dhdrQMThO_MFTLnLnE3lUEVuc6nEWZRBoskOFbRqyLnm9zbCP0izUKaJDgzUsNunVF7AEXlWPMBELtOSOh_svCaye7ivDE8floyPbpkeaSE72pKOgVLU0wagqnQIAQlph2CrjLabRan88T3ADVFpaf-nGjU9IVugsaI7bHzAXfyCunxPHy4TJvbK2D53nJXppvR8-jZXNFBx2sJOKA6qMREog5uLBb4SLMU8Lx-O78xf6ntXzPFV1o6Y2TzZWVgnR9N3Yoo',
            caption: 'Louvre Museum'
        }
    ]);
    const [memories] = useState<Memory[]>(MOCK_MEMORIES);
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState<'timeline' | 'grid'>('timeline');
    const [draggedMemory, setDraggedMemory] = useState<Memory | null>(null);

    const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setCoverImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleDragStart = (memory: Memory) => {
        setDraggedMemory(memory);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        if (draggedMemory) {
            const newItem: TimelineItem = {
                id: Date.now().toString(),
                memoryId: draggedMemory.id,
                title: draggedMemory.title,
                time: 'New Entry',
                description: 'Add your description here...',
                image: draggedMemory.image,
                caption: draggedMemory.title
            };
            setTimelineItems([...timelineItems, newItem]);
            setDraggedMemory(null);
        }
    };

    const handleDeleteItem = (id: string) => {
        setTimelineItems(timelineItems.filter(item => item.id !== id));
    };

    const handlePublish = () => {
        if (!journeyTitle) {
            alert('Please add a journey title');
            return;
        }
        console.log('Publishing journey:', {
            title: journeyTitle,
            description: journeyDescription,
            coverImage,
            timelineItems
        });
        navigate('/memories');
    };

    const filteredMemories = memories.filter(memory =>
        memory.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <SEO
                title="Create New Journey - MeoBeo Talk"
                description="Create a new memory journey"
            />
            <main className="create-journey-container">
                {/* Header Section */}
                <div className="journey-header">
                    <div className="journey-header-content">
                        <button
                            onClick={() => navigate('/memories')}
                            className="back-button"
                        >
                            <span className="material-symbols-outlined">arrow_back</span>
                            <span>Back to Dashboard</span>
                        </button>
                        <h1 className="journey-title">Create New Journey</h1>
                        <p className="journey-subtitle">
                            Weave your memories into a story. Drag and drop your favorite moments to build a timeline narrative.
                        </p>
                    </div>
                    <div className="journey-actions">
                        <button className="preview-button">
                            Preview
                        </button>
                        <button className="publish-button" onClick={handlePublish}>
                            Publish Journey
                        </button>
                    </div>
                </div>

                {/* Journey Meta Data Form */}
                <div className="journey-metadata">
                    <div className="metadata-grid">
                        {/* Cover Image Upload */}
                        <div className="cover-upload-wrapper">
                            <input
                                type="file"
                                ref={fileInputRef}
                                accept="image/*"
                                onChange={handleCoverImageChange}
                                style={{ display: 'none' }}
                            />
                            <div
                                className="cover-upload-area"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                {coverImage ? (
                                    <img src={coverImage} alt="Cover" className="cover-preview-image" />
                                ) : (
                                    <>
                                        <span className="material-symbols-outlined">add_photo_alternate</span>
                                        <p>Add Cover Photo</p>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Title and Description */}
                        <div className="metadata-inputs">
                            <label className="metadata-label">
                                <span>Journey Title</span>
                                <input
                                    type="text"
                                    className="metadata-input"
                                    placeholder="e.g., Summer Roadtrip 2024"
                                    value={journeyTitle}
                                    onChange={(e) => setJourneyTitle(e.target.value)}
                                />
                            </label>
                            <label className="metadata-label">
                                <span>Description</span>
                                <textarea
                                    className="metadata-textarea"
                                    placeholder="What is this journey about?"
                                    value={journeyDescription}
                                    onChange={(e) => setJourneyDescription(e.target.value)}
                                />
                            </label>
                        </div>
                    </div>
                </div>

                {/* Editor Interface */}
                <div className="editor-layout">
                    {/* Timeline Track (Left - Main) */}
                    <div className="timeline-section">
                        <div className="timeline-header">
                            <h3>Timeline</h3>
                            <div className="view-toggle">
                                <span>View:</span>
                                <button
                                    className={viewMode === 'timeline' ? 'active' : ''}
                                    onClick={() => setViewMode('timeline')}
                                >
                                    <span className="material-symbols-outlined">view_timeline</span>
                                </button>
                                <button
                                    className={viewMode === 'grid' ? 'active' : ''}
                                    onClick={() => setViewMode('grid')}
                                >
                                    <span className="material-symbols-outlined">calendar_view_month</span>
                                </button>
                            </div>
                        </div>

                        {/* Vertical Timeline Container */}
                        <div className="timeline-track">
                            {timelineItems.map((item, index) => (
                                <div key={item.id} className="timeline-item">
                                    {/* Connector Dot */}
                                    <div className="timeline-dot" />

                                    {/* Card */}
                                    <div className="timeline-card">
                                        <div className="drag-handle">
                                            <span className="material-symbols-outlined">drag_indicator</span>
                                        </div>

                                        {/* Polaroid Preview */}
                                        <div className={`polaroid ${index % 2 === 0 ? 'rotate-left' : 'rotate-right'}`}>
                                            <div className="polaroid-image">
                                                <img src={item.image} alt={item.caption} />
                                            </div>
                                            <div className="polaroid-caption">
                                                <span>{item.caption}</span>
                                            </div>
                                        </div>

                                        <div className="timeline-content">
                                            <div className="timeline-content-header">
                                                <h4>{item.title}</h4>
                                                <button
                                                    className="delete-button"
                                                    onClick={() => handleDeleteItem(item.id)}
                                                >
                                                    <span className="material-symbols-outlined">delete</span>
                                                </button>
                                            </div>
                                            <p className="timeline-time">{item.time}</p>
                                            <p className="timeline-description">{item.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Add New Slot (Drop Zone) */}
                            <div className="timeline-item">
                                <div className="timeline-dot empty" />
                                <div
                                    className="drop-zone"
                                    onDragOver={handleDragOver}
                                    onDrop={handleDrop}
                                >
                                    <span className="material-symbols-outlined">add_circle</span>
                                    <span>Drop memory here or click to add</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Memory Picker (Right - Sidebar) */}
                    <div className="memory-picker">
                        <div className="memory-picker-header">
                            <h3>My Memories</h3>
                            <div className="search-wrapper">
                                <span className="material-symbols-outlined">search</span>
                                <input
                                    type="text"
                                    placeholder="Search memories..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="memory-grid">
                            {filteredMemories.map((memory) => (
                                <div
                                    key={memory.id}
                                    className="memory-card"
                                    draggable
                                    onDragStart={() => handleDragStart(memory)}
                                >
                                    <div className="memory-image">
                                        <img src={memory.image} alt={memory.title} />
                                    </div>
                                    <p className="memory-title">{memory.title}</p>
                                    <span className="drag-icon">
                                        <span className="material-symbols-outlined">drag_pan</span>
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="memory-picker-footer">
                            <button className="create-memory-button">
                                <span className="material-symbols-outlined">add</span>
                                Create New Memory
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};
