declare module 'astro:content' {
	export { z } from 'astro/zod';
	export type CollectionEntry<C extends keyof typeof entryMap> =
		(typeof entryMap)[C][keyof (typeof entryMap)[C]] & Render;

	type BaseSchemaWithoutEffects =
		| import('astro/zod').AnyZodObject
		| import('astro/zod').ZodUnion<import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodDiscriminatedUnion<string, import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodIntersection<
				import('astro/zod').AnyZodObject,
				import('astro/zod').AnyZodObject
		  >;

	type BaseSchema =
		| BaseSchemaWithoutEffects
		| import('astro/zod').ZodEffects<BaseSchemaWithoutEffects>;

	type BaseCollectionConfig<S extends BaseSchema> = {
		schema?: S;
		slug?: (entry: {
			id: CollectionEntry<keyof typeof entryMap>['id'];
			defaultSlug: string;
			collection: string;
			body: string;
			data: import('astro/zod').infer<S>;
		}) => string | Promise<string>;
	};
	export function defineCollection<S extends BaseSchema>(
		input: BaseCollectionConfig<S>
	): BaseCollectionConfig<S>;

	type EntryMapKeys = keyof typeof entryMap;
	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidEntrySlug<C extends EntryMapKeys> = AllValuesOf<(typeof entryMap)[C]>['slug'];

	export function getEntryBySlug<
		C extends keyof typeof entryMap,
		E extends ValidEntrySlug<C> | (string & {})
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getCollection<C extends keyof typeof entryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;

	type InferEntrySchema<C extends keyof typeof entryMap> = import('astro/zod').infer<
		Required<ContentConfig['collections'][C]>['schema']
	>;

	type Render = {
		render(): Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	};

	const entryMap: {
		"blog": {
"accessing-react-state-in-your-component-cleanup-with-hooks.md": {
  id: "accessing-react-state-in-your-component-cleanup-with-hooks.md",
  slug: "accessing-react-state-in-your-component-cleanup-with-hooks",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"azure-ad-authentication-in-cypress-tests-with-msal.md": {
  id: "azure-ad-authentication-in-cypress-tests-with-msal.md",
  slug: "azure-ad-authentication-in-cypress-tests-with-msal",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"azure-ad-authentication-in-cypress-tests.md": {
  id: "azure-ad-authentication-in-cypress-tests.md",
  slug: "azure-ad-authentication-in-cypress-tests",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"deploying-a-static-site-to-aws-using-github-actions.md": {
  id: "deploying-a-static-site-to-aws-using-github-actions.md",
  slug: "deploying-a-static-site-to-aws-using-github-actions",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"direct-lambda-resolvers-with-aws-amplify.md": {
  id: "direct-lambda-resolvers-with-aws-amplify.md",
  slug: "direct-lambda-resolvers-with-aws-amplify",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"just-enough-css-grid-to-be-dangerous.md": {
  id: "just-enough-css-grid-to-be-dangerous.md",
  slug: "just-enough-css-grid-to-be-dangerous",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"managing-react-application-state-with-context.md": {
  id: "managing-react-application-state-with-context.md",
  slug: "managing-react-application-state-with-context",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"next-js-13-layouts-by-example.md": {
  id: "next-js-13-layouts-by-example.md",
  slug: "next-js-13-layouts-by-example",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"private-npm-modules-with-github-packages.md": {
  id: "private-npm-modules-with-github-packages.md",
  slug: "private-npm-modules-with-github-packages",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"publishing-typescript-npm-modules.md": {
  id: "publishing-typescript-npm-modules.md",
  slug: "publishing-typescript-npm-modules",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"refreshing-my-blog-with-netlify-cms-and-tailwind-css.md": {
  id: "refreshing-my-blog-with-netlify-cms-and-tailwind-css.md",
  slug: "refreshing-my-blog-with-netlify-cms-and-tailwind-css",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"scaffolding-your-aws-single-page-application-infrastructure-with-cdk.md": {
  id: "scaffolding-your-aws-single-page-application-infrastructure-with-cdk.md",
  slug: "scaffolding-your-aws-single-page-application-infrastructure-with-cdk",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"tracking-my-progress-on-my-2023-goals.md": {
  id: "tracking-my-progress-on-my-2023-goals.md",
  slug: "tracking-my-progress-on-my-2023-goals",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"updated-deploying-a-static-site-to-aws-using-github-actions.md": {
  id: "updated-deploying-a-static-site-to-aws-using-github-actions.md",
  slug: "updated-deploying-a-static-site-to-aws-using-github-actions",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
},

	};

	type ContentConfig = typeof import("../src/content/config");
}
