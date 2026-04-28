/**
 * Cloudflare Pages Function — Dynamic OG meta tags for blog posts.
 *
 * When a social-media crawler (Zalo, Facebook, Telegram, Twitter …) requests
 * /blog/:id, this function fetches the blog data from the backend API and
 * returns a minimal HTML page with the correct og:title, og:description,
 * og:image, etc.
 *
 * Normal browser requests are passed through to the SPA via context.next().
 */

const API_BASE_URL = 'https://meobeo-talk-api-660036583086.asia-southeast1.run.app/api/v1';
const SITE_URL = 'https://meowmuc.com';
const DEFAULT_IMAGE = `${SITE_URL}/logo/img-totuong.jpg`;

// ─── Bot User-Agent detection ───────────────────────────────────────────────
const BOT_UA_REGEX =
  /facebookexternalhit|Facebot|Twitterbot|TelegramBot|WhatsApp|LinkedInBot|Slackbot|Discordbot|Zalobot|ZaloShare|zalo|Googlebot|bingbot|Baiduspider|yandex|rogerbot|embedly|showyoubot|outbrain|pinterest|vkShare|W3C_Validator|redditbot|Applebot|Pinterestbot|SkypeUriPreview/i;

/** Strip HTML tags → plain text */
function stripHtml(html) {
  if (!html) return '';
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

/** Escape HTML special chars */
function esc(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/** Build a minimal HTML page with OG meta tags + auto-redirect for real users */
function buildOgHtml({ title, description, image, url, author, publishedTime }) {
  return `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}" />
  <link rel="canonical" href="${esc(url)}" />

  <!-- Open Graph -->
  <meta property="og:site_name" content="MeowMuc" />
  <meta property="og:locale" content="vi_VN" />
  <meta property="og:url" content="${esc(url)}" />
  <meta property="og:type" content="article" />
  <meta property="og:title" content="${esc(title)}" />
  <meta property="og:description" content="${esc(description)}" />
  <meta property="og:image" content="${esc(image)}" />
  <meta property="og:image:secure_url" content="${esc(image)}" />
  <meta property="og:image:type" content="image/jpeg" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="${esc(title)}" />
  ${author ? `<meta property="article:author" content="${esc(author)}" />` : ''}
  ${publishedTime ? `<meta property="article:published_time" content="${esc(publishedTime)}" />` : ''}

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta property="twitter:domain" content="meowmuc.com" />
  <meta property="twitter:url" content="${esc(url)}" />
  <meta name="twitter:title" content="${esc(title)}" />
  <meta name="twitter:description" content="${esc(description)}" />
  <meta name="twitter:image" content="${esc(image)}" />

  <!-- Redirect real users to the SPA (bots won't follow this) -->
  <meta http-equiv="refresh" content="0;url=${esc(url)}" />
</head>
<body>
  <p>Đang chuyển hướng đến <a href="${esc(url)}">${esc(title)}</a>...</p>
</body>
</html>`;
}

// ─── Main handler ───────────────────────────────────────────────────────────
export async function onRequest(context) {
  const { request, params } = context;
  const ua = request.headers.get('user-agent') || '';

  // Normal user → pass through to the SPA
  if (!BOT_UA_REGEX.test(ua)) {
    return context.next();
  }

  // Bot detected → fetch blog data and return OG HTML
  const blogId = params.id;

  try {
    const apiRes = await fetch(`${API_BASE_URL}/blogs/${blogId}`, {
      headers: { 'Accept': 'application/json' },
      cf: { cacheTtl: 300 }, // Cache at Cloudflare edge for 5 minutes
    });

    if (!apiRes.ok) {
      // API error → fall back to SPA (default OG)
      return context.next();
    }

    const json = await apiRes.json();

    if (!json.success || !json.data) {
      return context.next();
    }

    const blog = json.data;
    const description =
      blog.content_preview ||
      stripHtml(blog.content_html).slice(0, 200) + '…';

    const html = buildOgHtml({
      title: `${blog.title} | MeowMuc`,
      description,
      image: blog.banner_url || blog.thumbnail_url || DEFAULT_IMAGE,
      url: `${SITE_URL}/blog/${blog.id}`,
      author: blog.author?.display_name || blog.author?.username,
      publishedTime: blog.created_at,
    });

    return new Response(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html;charset=UTF-8',
        'Cache-Control': 'public, max-age=300', // 5 min cache
      },
    });
  } catch (err) {
    // Network error → fall back to SPA
    console.error('OG fetch error:', err);
    return context.next();
  }
}
