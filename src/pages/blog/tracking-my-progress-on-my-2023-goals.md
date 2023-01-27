---
layout: '../../layouts/BlogPost.astro'
title: Tracking progress on my 2023 goals
pubDate: 2023-01-27
description: I built a dashboard that tracks my goals for 2023, find out the goals I set for myself and how I'm going about tracking them.
heroImage: /assets/tracking-2023-goals.jpg
tags:
  - personal
  - board games
  - fitness
  - books
---

> **tl;dr** I built a dashboard that tracks my goals for 2023 which you can [view here](/2023-goals)

Each year I tend to set myself some goals; usually not very specific ones such as listen to more music, play more games or get fitter. Each year, the vague definition of the goal leads it to becoming something that fades in and out of my consciousness during the year and it becomes something that is measured by gut feel. If I've learnt anything from the company I work for, [Mechanical Rock](https://www.youtube.com/watch?v=tTpCfwyQt5c), its that you should measure what matters which means setting specific, measurable goals.

In setting some goals for this year, I thought it might also be a good experience to build a dashboard that tracks the progress on my goals throughout the year, more for my own use but also for some sense of public accountability. My goals for 2023 are as follows:

- **Write 24 blog posts** - I enjoy writing however I tend to push it down the list of priorities even though I have a long list of things to write about. I chose 24 because it feels manageable to break it down to 2 blog posts per month and I can track it easily within my own site.
- **Read 24 books** - again, something I enjoy but gets pushed down the list of priorities and again, 2 books per month feels manageable. Its something I assumed I could easily track using [my Goodreads account](https://www.goodreads.com/user/show/151018120-timothy-veletta) but since they [deprecated their API](https://help.goodreads.com/s/article/Does-Goodreads-support-the-use-of-APIs) it was not so easy as I'll explain below.
- **Play all the board games in my collection** - I have a collection of 100 board games at time of writing (as shown below) and there are a number of games that I haven't got to the table in quite some time. I would like to play all 100 games plus any new ones I acquire over the course of the year and I can track this through a site called [Board Game Geek](https://boardgamegeek.com/user/timmahh).
- **Cycle over 1,200km** - as much as I enjoy it, I haven't found as much time for cycling in the past year because of other sporting commitments but now that those have finished, I would like to get back into it. 1,200km sounds like a lot but breaking it down, its 100km a month or cycling to work and home 3 days a month which I can track using [Strava](https://www.strava.com/athletes/64997285).

![The board game collection including bonus Christmas tree.](/assets/board-game-collection.jpg 'The board game collection including bonus Christmas tree.')

By integrating each of the services I mentioned above, I was able to build a dashboard that tracks my progress on each of my goals which is [available here](/2023-goals). I'm going to dive a bit further into how I integrated each of the services in the rest of this post.

![The goals dashboard as of the 19th of January.](/assets/goals-dashboard.jpg 'The goals dashboard as of the 19th of January.')

## Fetching number of blog posts written

Because my website uses [Astro](https://astro.build/), this was fairly straightforward. The snippet below gets all the Markdown files in my `/blog` directory and filters them based on whether they were released in 2023.

```javascript
const postsThisYear = (await Astro.glob('./blog/*.{md,mdx}')).filter(
	(post) => new Date(post.frontmatter.pubDate).getFullYear() === 2023
).length;
```

## Finding out how many books I've read from Goodreads

As I mentioned before, Goodreads deprecated their API and as far as I found, there was nothing to replace it so the next best solution was scraping some data from my Goodreads profile.

First, I made my profile public and started a reading challenge which generates a new page to track your progress against your reading challenge.

![The Goodreads Reading Challenge page.](/assets/goodreads-reading-challenge.jpg 'The Goodreads Reading Challenge page.')

I then created a Vercel function which opens that page, parses the HTML result using `node-html-parser`, searches the page for the challenge progress text and gets the first number in there which will be the number of books I've read so far in 2023.

```javascript
const result = await fetch(
	'https://www.goodreads.com/user_challenges/41139180'
);
const html = await result.text();
const root = parse(html);

const progressText = root.querySelector('.progressText').text;

const numBooksRead = parseInt(progressText.match(/\d+/)[0]);
```

## Tracking the games I've played with Board Game Geek

Fortunately for me, Board Game Geek has [an API](https://boardgamegeek.com/wiki/page/BGG_XML_API2) where the request parameters are reasonably well documented so I knew I had to make 2 requests, one to get all the games in my collection and another to get all the games I've played this year.

Again, I created a Vercel function to manage this and started by fetching all the games that I "Own". Unfortunately, the API response is entirely in XML so I imported the `DOMParser` from `jsdom` to do most of the heavy lifting around navigating the XML and settled on the function below.

```javascript
async function fetchCollection() {
	const result = await fetch(
		'https://boardgamegeek.com/xmlapi2/collection?username=timmahh&own=1&brief&subtype=boardgame&excludesubtype=boardgameexpansion'
	);
	if (result.status === 202) {
		await new Promise((resolve) => setTimeout(resolve, 2000));
		return fetchCollection();
	}
	const xml = await result.text();
	const parser = new DOMParser();
	const doc = parser.parseFromString(xml, 'text/xml');
	const items = doc.querySelectorAll('item');
	return Array.from(items).map(
		(item) => item.querySelector('name').textContent
	);
}
```

One thing to note, sometimes the BGG API returns with a status code of `202` which means it has queued your request and that you should make another request after a short delay.

Fetching the games I've played this year is largely similar, just with a different API endpoint so I won't show it here. Once I had both my collection and plays, it was just a case of iterating through the games in my collection and checking if my list of plays includes that game.

```javascript
const gamesPlayed = collection.filter((game) => plays.includes(game)).length;
```

## Working out how far I've cycled with Strava

For my final goal, I was able to use the [Strava API](https://developers.strava.com/) to get my cycling stats however, the way they manage authorisation made this more difficult than I would have liked.

Following the instructions on their [Getting Started page](https://developers.strava.com/docs/getting-started/) I created an application and authorised my Strava data to be accessed by my application. From there I was able to get my access and refresh tokens to authenticate with the API however I needed somewhere to store these.

I really didn't want to go down the path of setting up a whole database just to store 3 values so I used [Vercel Edge Config](https://vercel.com/docs/concepts/edge-network/edge-config) to manage my tokens. Edge Config is a key-value data store that allows you to read data at the edge with negligible latency and is easily accessed from your Vercel functions. I would like to do another blog post in the future specifically on Edge Config because the documentation around it wasn't great and I feel like having a working example would have helped me greatly.

Once I had solved the issue of authentication and authorisation; the `/athletes/{id}/stats` endpoint returns a value for `ytd_ride_totals` which is exactly what I need.

## Getting the page to update

Because my site is built with Astro and set up as a static site on Vercel; having the page update was my final consideration. I really don't need "to-the-second" updates each time someone accesses the page because there normally isn't much of a change from one day to the next.

In this case, it made sense to have the page update once per day so I set up a Github Action to run on a schedule that pings my Vercel deploy hook which triggers a build as shown below.

```yaml
name: ⏰ Scheduled Build

on:
  schedule:
    - cron: '0 0 * * *'

jobs:
  build:
    name: 🔫 Trigger site build
    runs-on: ubuntu-latest
    steps:
      - name: ♻️ Request to Vercel Deploy Hook
        run: curl -X POST -d {} ${{ secrets.VERCEL_DEPLOY_HOOK }}
```

So there you have it, a bit of an insight into how I'm tracking my goals for 2023. I can't wait to see whether the visualisation of my goals has any effect on how I progress against them. Thanks for reading!

Header photo by <a href="https://unsplash.com/@davidpisnoy?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">David Pisnoy</a> on <a href="https://unsplash.com/photos/r1V-OtZR7XY?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
