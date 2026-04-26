import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    type?: 'website' | 'article';
    author?: string;
    publishedTime?: string;
    modifiedTime?: string;
}

const SITE_NAME = 'MeowMuc';
const SITE_URL = 'https://meowmuc.com';

const DEFAULT_SEO = {
    title: `${SITE_NAME} – Viết blog, lưu kỷ niệm, tạo hành trình ký ức`,
    description: 'Không phải chuyện gì cũng nhớ, nên phải viết ra. MeowMuc giúp bạn viết blog, lưu kỷ niệm và tạo hành trình ký ức để mai này đọc lại còn cười.',
    image: `${SITE_URL}/logo/img-totuong.jpg`,
    url: SITE_URL,
    type: 'website' as const,
};

export const SEO: React.FC<SEOProps> = ({
    title,
    description,
    image,
    url,
    type = 'website',
    author,
    publishedTime,
    modifiedTime,
}) => {
    const seo = {
        title: title ? `${title} | ${SITE_NAME}` : DEFAULT_SEO.title,
        description: description || DEFAULT_SEO.description,
        image: image || DEFAULT_SEO.image,
        url: url || DEFAULT_SEO.url,
        type,
    };

    return (
        <Helmet>
            {/* Basic Meta Tags */}
            <title>{seo.title}</title>
            <meta name="description" content={seo.description} />
            <link rel="canonical" href={seo.url} />

            {/* Open Graph Meta Tags */}
            <meta property="og:site_name" content={SITE_NAME} />
            <meta property="og:locale" content="vi_VN" />
            <meta property="og:url" content={seo.url} />
            <meta property="og:type" content={seo.type} />
            <meta property="og:title" content={seo.title} />
            <meta property="og:description" content={seo.description} />
            <meta property="og:image" content={seo.image} />
            <meta property="og:image:secure_url" content={seo.image} />
            <meta property="og:image:type" content="image/jpeg" />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:image:alt" content={seo.title} />

            {/* Article specific tags */}
            {type === 'article' && author && (
                <meta property="article:author" content={author} />
            )}
            {type === 'article' && publishedTime && (
                <meta property="article:published_time" content={publishedTime} />
            )}
            {type === 'article' && modifiedTime && (
                <meta property="article:modified_time" content={modifiedTime} />
            )}

            {/* Twitter Meta Tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta property="twitter:domain" content="meowmuc.com" />
            <meta property="twitter:url" content={seo.url} />
            <meta name="twitter:title" content={seo.title} />
            <meta name="twitter:description" content={seo.description} />
            <meta name="twitter:image" content={seo.image} />
        </Helmet>
    );
};
