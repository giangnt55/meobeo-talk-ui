import React, { useEffect, useRef, useState } from 'react';
import { NodeViewProps, NodeViewWrapper } from '@tiptap/react';
import {
    AlignLeft,
    AlignCenter,
    AlignRight,
    Maximize,
    WrapText,
    Settings,
} from 'lucide-react';

export default function ResizableImageNodeView({
    node,
    updateAttributes,
    selected,
}: NodeViewProps) {
    const { src, alt, title, width, align, display, borderRadius } = node.attrs;
    const [isResizing, setIsResizing] = useState(false);
    const [aspectRatio, setAspectRatio] = useState(1);

    const [showToolbar, setShowToolbar] = useState(false);
    const [showSettings, setShowSettings] = useState(false);

    const imgRef = useRef<HTMLImageElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    // Initial width parsing
    const currentWidth = width && width.toString().endsWith('%')
        ? width
        : parseInt(width || '0') || '100%';

    useEffect(() => {
        if (!selected) {
            setShowToolbar(false);
            setShowSettings(false);
        } else {
            setShowToolbar(true);
        }
    }, [selected]);

    const handleLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
        const target = e.target as HTMLImageElement;
        if (target.naturalHeight && target.naturalWidth) {
            setAspectRatio(target.naturalWidth / target.naturalHeight);
        }
    };

    const handleResizeStart = (e: React.MouseEvent<HTMLDivElement>, direction: string) => {
        e.preventDefault();
        e.stopPropagation();

        setIsResizing(true);
        const startX = e.clientX;
        const startY = e.clientY;
        const startWidth = imgRef.current?.clientWidth || 0;
        const startHeight = imgRef.current?.clientHeight || 0;

        const handleMouseMove = (mouseMoveEvent: MouseEvent) => {
            const shiftPressed = mouseMoveEvent.shiftKey;
            const deltaX = mouseMoveEvent.clientX - startX;
            const deltaY = mouseMoveEvent.clientY - startY;

            let newWidth = startWidth;
            let newHeight = startHeight;

            if (direction === 'se') {
                newWidth = startWidth + deltaX;
                newHeight = shiftPressed ? startHeight + deltaY : newWidth / aspectRatio;
            } else if (direction === 'sw') {
                newWidth = startWidth - deltaX;
                newHeight = shiftPressed ? startHeight + deltaY : newWidth / aspectRatio;
            } else if (direction === 'ne') {
                newWidth = startWidth + deltaX;
                newHeight = shiftPressed ? startHeight - deltaY : newWidth / aspectRatio;
            } else if (direction === 'nw') {
                newWidth = startWidth - deltaX;
                newHeight = shiftPressed ? startHeight - deltaY : newWidth / aspectRatio;
            }

            if (newWidth >= 50 && newHeight >= 50) {
                updateAttributes({
                    width: Math.round(newWidth),
                    height: Math.round(newHeight),
                });
            }
        };

        const handleMouseUp = () => {
            setIsResizing(false);
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    // Derived classes/styles for rendering wrapper and image correctly inside editor
    const wrapperStyle: React.CSSProperties = {
        position: 'relative',
        display: display === 'inline' ? 'inline-block' : 'flex',
        justifyContent:
            align === 'left' ? 'flex-start' : align === 'right' ? 'flex-end' : 'center',
        float: display === 'wrap-left' ? 'left' : display === 'wrap-right' ? 'right' : 'none',
        margin: display === 'wrap-left' ? '0 1rem 1rem 0' : display === 'wrap-right' ? '0 0 1rem 1rem' : 'auto',
        width: display === 'full-width' ? '100%' : 'max-content',
        maxWidth: '100%',
        clear: display === 'wrap-left' || display === 'wrap-right' || display === 'inline' ? 'none' : 'both',
        transition: 'all 0.2s ease',
    };

    const imgStyle: React.CSSProperties = {
        width: display === 'full-width' ? '100%' : currentWidth,
        height: node.attrs.height || 'auto',
        maxWidth: '100%',
        borderRadius: `${borderRadius || 8}px`,
        cursor: 'pointer',
        border: selected ? '2px solid var(--primary)' : '2px solid transparent',
        display: 'block',
    };

    return (
        <NodeViewWrapper ref={wrapperRef} as="div" style={wrapperStyle} className="resizable-image-wrapper">
            <div style={{ position: 'relative', display: 'inline-block', maxWidth: '100%' }}>
                <img
                    ref={imgRef}
                    src={src}
                    alt={alt || ''}
                    title={title || ''}
                    style={imgStyle}
                    onLoad={handleLoad}
                    draggable="false"
                    // Add attributes so HTML export preserves them
                    data-display={display}
                    data-align={align}
                    data-border-radius={borderRadius}
                />

                {/* Resize Handles */}
                {selected && !display.includes('full') && (
                    <>
                        <div
                            className="resize-handle nw"
                            onMouseDown={(e) => handleResizeStart(e, 'nw')}
                        />
                        <div
                            className="resize-handle ne"
                            onMouseDown={(e) => handleResizeStart(e, 'ne')}
                        />
                        <div
                            className="resize-handle sw"
                            onMouseDown={(e) => handleResizeStart(e, 'sw')}
                        />
                        <div
                            className="resize-handle se"
                            onMouseDown={(e) => handleResizeStart(e, 'se')}
                        />
                    </>
                )}

                {/* Floating Toolbar */}
                {showToolbar && !isResizing && (
                    <div className="image-floating-toolbar" contentEditable={false}>
                        <div className="toolbar-btn-group">
                            <button
                                type="button"
                                className={`toolbar-btn ${align === 'left' && display !== 'wrap-left' ? 'active' : ''}`}
                                onClick={() => updateAttributes({ align: 'left', display: 'block' })}
                                title="Căn trái"
                            >
                                <AlignLeft size={16} />
                            </button>
                            <button
                                type="button"
                                className={`toolbar-btn ${align === 'center' ? 'active' : ''}`}
                                onClick={() => updateAttributes({ align: 'center', display: 'block' })}
                                title="Căn giữa"
                            >
                                <AlignCenter size={16} />
                            </button>
                            <button
                                type="button"
                                className={`toolbar-btn ${align === 'right' && display !== 'wrap-right' ? 'active' : ''}`}
                                onClick={() => updateAttributes({ align: 'right', display: 'block' })}
                                title="Căn phải"
                            >
                                <AlignRight size={16} />
                            </button>
                        </div>

                        <div className="toolbar-divider" />

                        <div className="toolbar-btn-group">
                            <button
                                type="button"
                                className={`toolbar-btn ${display === 'inline' ? 'active' : ''}`}
                                onClick={() => updateAttributes({ display: 'inline' })}
                                title="Inline"
                            >
                                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>short_text</span>
                            </button>
                            <button
                                type="button"
                                className={`toolbar-btn ${display === 'wrap-left' ? 'active' : ''}`}
                                onClick={() => updateAttributes({ display: 'wrap-left', align: 'left' })}
                                title="Wrap Trái"
                            >
                                <WrapText size={16} />
                            </button>
                            <button
                                type="button"
                                className={`toolbar-btn ${display === 'wrap-right' ? 'active' : ''}`}
                                onClick={() => updateAttributes({ display: 'wrap-right', align: 'right' })}
                                title="Wrap Phải"
                                style={{ transform: 'scaleX(-1)' }}
                            >
                                <WrapText size={16} />
                            </button>
                            <button
                                type="button"
                                className={`toolbar-btn ${display === 'full-width' ? 'active' : ''}`}
                                onClick={() => updateAttributes({ display: 'full-width', width: '100%', height: 'auto' })}
                                title="Full width"
                            >
                                <Maximize size={16} />
                            </button>
                        </div>

                        <div className="toolbar-divider" />

                        <div className="toolbar-btn-group">
                            <button
                                type="button"
                                className={`toolbar-btn ${showSettings ? 'active' : ''}`}
                                onClick={() => setShowSettings(!showSettings)}
                                title="Cài đặt khác"
                            >
                                <Settings size={16} />
                            </button>
                        </div>
                    </div>
                )}

                {/* Settings Panel */}
                {selected && showSettings && (
                    <div className="image-settings-panel" contentEditable={false}>
                        <div className="settings-row">
                            <label>Bo góc (px)</label>
                            <input
                                type="number"
                                min="0"
                                max="100"
                                value={borderRadius || 0}
                                onChange={(e) => updateAttributes({ borderRadius: parseInt(e.target.value) || 0 })}
                            />
                        </div>
                        <div className="settings-row">
                            <label>Alt Text</label>
                            <input
                                type="text"
                                placeholder="Mô tả ảnh..."
                                value={alt || ''}
                                onChange={(e) => updateAttributes({ alt: e.target.value })}
                            />
                        </div>
                    </div>
                )}
            </div>
        </NodeViewWrapper>
    );
}
