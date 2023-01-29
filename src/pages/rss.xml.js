import rss from '@astrojs/rss';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';
const parser = new MarkdownIt();

import { SITE_TITLE, SITE_DESCRIPTION } from '../config';

export const get = async () => {
	const postImportResult = import.meta.glob('./blog/**/*.md', {
		eager: true,
	});
	const posts = Object.values(postImportResult);

	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: import.meta.env.SITE,
		items: posts
			.sort(
				(a, b) =>
					new Date(b.frontmatter.pubDate).valueOf() -
					new Date(a.frontmatter.pubDate).valueOf()
			)
			.map((post) => ({
				link: post.url,
				content: sanitizeHtml(parser.render(post.compiledContent())),
				...post.frontmatter,
			})),
	});
};
