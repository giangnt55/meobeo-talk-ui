import { mergeAttributes, Node } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import ResizableImageNodeView from './ResizableImageNodeView.tsx';

export interface ResizableImageOptions {
    inline: boolean;
    allowBase64: boolean;
    HTMLAttributes: Record<string, unknown>;
}

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        resizableImage: {
            setImage: (options: { src: string; alt?: string; title?: string; width?: string | number; height?: string | number; align?: string; display?: string; borderRadius?: number }) => ReturnType;
        };
    }
}

export const ResizableImage = Node.create<ResizableImageOptions>({
    name: 'resizableImage',

    addOptions() {
        return {
            inline: false,
            allowBase64: false,
            HTMLAttributes: {},
        };
    },

    inline() {
        return this.options.inline;
    },

    group() {
        return this.options.inline ? 'inline' : 'block';
    },

    draggable: true,

    addAttributes() {
        return {
            src: {
                default: null,
            },
            alt: {
                default: null,
            },
            title: {
                default: null,
            },
            width: {
                default: '100%',
                renderHTML: (attributes) => {
                    return {
                        width: attributes.width,
                    };
                },
            },
            height: {
                default: 'auto',
                renderHTML: (attributes) => {
                    return {
                        height: attributes.height,
                    };
                },
            },
            align: {
                default: 'center',
                renderHTML: (attributes) => {
                    return {
                        'data-align': attributes.align,
                    };
                },
            },
            display: {
                default: 'block',
                renderHTML: (attributes) => {
                    return {
                        'data-display': attributes.display,
                    };
                },
            },
            borderRadius: {
                default: 0,
                renderHTML: (attributes) => {
                    return {
                        'data-border-radius': attributes.borderRadius,
                    };
                },
            },
        };
    },

    parseHTML() {
        return [
            {
                tag: 'img[src]',
            },
        ];
    },

    renderHTML({ HTMLAttributes }) {
        return ['img', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)];
    },

    addCommands() {
        return {
            setImage:
                (options: { src: string; alt?: string; title?: string; width?: string | number; height?: string | number; align?: string; display?: string; borderRadius?: number }) =>
                ({ commands }: any) => {
                    return commands.insertContent({
                        type: this.name,
                        attrs: options,
                    });
                },
        };
    },

    addNodeView() {
        return ReactNodeViewRenderer(ResizableImageNodeView);
    },
});
