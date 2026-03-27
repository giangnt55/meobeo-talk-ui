import React from 'react';
import type { Collection } from '@/api/services/feedApi';

export const CollectionCard: React.FC<{ collection: Collection }> = ({ collection }) => (
    <div className="stream-collection-card">
        <div className="stream-collection-previews">
            {collection.preview_posts.slice(0, 3).map((p) => (
                <div
                    key={p.id}
                    className="stream-collection-thumb"
                    style={p.banner_url ? { backgroundImage: `url(${p.banner_url})` } : undefined}
                />
            ))}
            {collection.preview_posts.length === 0 && (
                <div className="stream-collection-thumb stream-collection-thumb--empty" />
            )}
        </div>
        <div className="stream-collection-meta">
            <h3 className="stream-collection-name">{collection.name}</h3>
            {collection.description && (
                <p className="stream-collection-desc">{collection.description}</p>
            )}
            <span className="stream-collection-count">
                {collection.post_count} bài viết
            </span>
        </div>
    </div>
);
