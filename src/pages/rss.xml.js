import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';
const parser = new MarkdownIt();

import { SITE_TITLE, SITE_DESCRIPTION } from '../config';

export const get = async () => {
	const posts = await getCollection('blog');

	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: import.meta.env.SITE,
		items: posts
			.sort(
				(a, b) =>
					new Date(b.data.pubDate).valueOf() -
					new Date(a.data.pubDate).valueOf()
			)
			.map((post) => ({
				link: `/blog/${post.slug}/`,
				content: sanitizeHtml(parser.render(post.body)),
				...post.data,
			})),
	});
};
