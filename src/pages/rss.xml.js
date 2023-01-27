import rss from '@astrojs/rss';
import sanitizeHtml from 'sanitize-html';
import { SITE_TITLE, SITE_DESCRIPTION } from '../config';

export const get = () => {
	const postImportResult = import.meta.glob('./blog/**/*.{md,mdx}', {
		eager: true,
	});
	const posts = Object.values(postImportResult);

	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: import.meta.env.SITE,
		items: posts.map((post) => ({
			link: post.url,
			content: sanitizeHtml(post.compiledContent()),
			...post.frontmatter,
		})),
	});
};
