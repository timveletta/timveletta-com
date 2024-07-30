import type { ComponentType } from "react";
import {
  defineArrayMember,
  defineField,
  defineType,
  type BlockDecoratorProps,
} from "sanity";

const CodeDecorator: ComponentType<BlockDecoratorProps> = (props) => (
  <code>{props.children}</code>
);

export const blogPostType = defineType({
  name: "blog-post",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      validation: (Rule) => Rule.required(),
      options: {
        source: "title",
        maxLength: 96,
      },
    }),
    defineField({
      name: "pubDate",
      title: "Publish Date",
      type: "date",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "heroImage",
      title: "Hero image",
      type: "image",
      fields: [
        {
          type: "string",
          name: "name",
          title: "Name",
        },
        {
          type: "string",
          name: "link",
          title: "Link",
        },
      ],
      options: {
        hotspot: true,
      },
    }),
    {
      title: "Tags",
      name: "tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    },
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [
        defineArrayMember({
          title: "Block",
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H1", value: "h1" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "H4", value: "h4" },
            { title: "Quote", value: "blockquote" },
            { title: "Caption", value: "figcaption" },
          ],
          lists: [{ title: "Bullet", value: "bullet" }],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
              {
                title: "Caption",
                value: "caption",
                icon: () => "CAP",
              },
              {
                title: "Inline Code",
                value: "code",
                icon: () => "</>",
                component: CodeDecorator,
              },
            ],
            annotations: [
              {
                title: "URL",
                name: "link",
                type: "object",
                fields: [
                  {
                    title: "URL",
                    name: "href",
                    type: "url",
                  },
                ],
              },
            ],
          },
        }),
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              type: "text",
              name: "alt",
              title: "Alternative text",
              options: {
                isHighlighted: true,
              },
            },
            {
              name: "height",
              type: "number",
              title: "Height",
            },
            {
              name: "width",
              type: "number",
              title: "Width",
            },
          ],
        }),
        defineArrayMember({
          type: "code",
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      pubDate: "pubDate",
      media: "heroImage",
    },
    prepare(selection) {
      const { pubDate } = selection;
      return {
        ...selection,
        subtitle: pubDate ? pubDate.toString() : "Draft",
      };
    },
  },
});
