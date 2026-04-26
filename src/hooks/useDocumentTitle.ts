import { useEffect } from 'react';

const SITE_NAME = 'MeowMuc';

/**
 * Custom hook to set the document title for each page.
 * Automatically appends the site name as a suffix.
 * 
 * @param title - The page-specific title. Pass empty string to use only the site name.
 * @param deps - Optional dependency array to trigger title updates.
 * 
 * @example
 * useDocumentTitle('Đăng nhập'); // -> "Đăng nhập | MeowMuc"
 * useDocumentTitle(''); // -> "MeowMuc – Viết blog, lưu kỷ niệm, tạo hành trình ký ức"
 */
export function useDocumentTitle(title: string, deps: unknown[] = []) {
  useEffect(() => {
    const defaultTitle = `${SITE_NAME} – Viết blog, lưu kỷ niệm, tạo hành trình ký ức`;
    document.title = title ? `${title} | ${SITE_NAME}` : defaultTitle;

    return () => {
      document.title = defaultTitle;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, ...deps]);
}
