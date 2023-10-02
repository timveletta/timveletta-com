---
title: WA Dash Plumbing & Gas
description: WA Dash is a plumbing and gas company here in Perth. When they were starting up they asked me to create a simple website that will allow potential clients to find them online. I originally built the site using Gatsby but have more recently rewritten it with Astro which included a visual refresh.
heroImage: /assets/wadash.jpg
featured: true
websiteLink: https://wadash.com.au
tags:
  - website
---

For this project, I worked with a local plumbing and gas company here in Perth to create a website that showcased their services and expertise. The website needed to include a contact form for potential clients as well as details about the business on a clean and responsive design.

## Initial website

When I designed the original website, I lacked a some UI design skill and experience so it was difficult to come up with something I was happy with. I originally settled on the design below.

![Old WA Dash Website](/assets/wadash-old.jpg)

Some things that I hoped I could improve on with a new design:

- The hero section text wasn't particularly readable or impactful, it was too small given its importance and was hard to see on the background image.
- The call to action which alerts the user to contact in case of emergency was likewise, not readable or impactful. Also the text contrast of green on grey was a poor choice in terms of accessibility given how small the text was.
- The "Our Services" section was decent but could do with some dressing up and the icons need to be more supplemental to the content as opposed to the other way around.
- The contact form is way too long, I wouldn't bother after seeing how many fields there are on it and as a result, not many people used it.

The project was originally developed using Gatsby and Tailwind CSS, hosted on AWS S3 with Cloudfront for CDN. The contact form also utilised AWS Lambda, SES and DynamoDB for saving client details and notifying the team when someone used the contact form on the site.

## 2023 Redesign

After going away and getting further UI design experience and coaching; I felt like it would be a good opportunity to revisit this project and see what I could do to improve on the points listed above. The resulting project is shown below.

![New WA Dash Website](/assets/wadash-new.jpg)

The new version of the website was built with Astro and still uses Tailwind for styling. Other things I improved on along with the design was better optimisation for search engines including keywords, descriptions and Open Graph tags, hosting on Vercel for simplification and the contact form now utilises Twilio SendGrid for emails.

If you're interested in discussing a website project for your business, please don't hesitate to contact me; I'd be happy to discuss your needs.
