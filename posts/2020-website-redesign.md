---
title: Hooray! I redesigned my website
summary: A few notes on my goals, the process, and techniques I used along the way. 
date: 2020-09-09
tags:
  - post
  - latest
  - "2020"
---

I've lost count of the number of iterations my website has undergone over the years. I had a good run of keeping things fresh. Yet, my previous redesign was long overdue for an update — I hadn't updated it since 2017!

I'm very excited to share this redesign with you along with an overview of my goals, a few notes on my process, and various techniques I incorporated along the way.

## Goals

My primary design goals were:

- Keep it simple
- Make it really fast
- Less serious - more fun and whimsical
- Increase whitespace
- Improve legibility
- Achieve WCAG 2 [color](https://www.w3.org/TR/WCAG21/#use-of-color) and [contrast](https://www.w3.org/TR/WCAG21/#contrast-minimum) criterion
- Implement support for dark mode

Overall I'm pleased with the results. There are still plenty of opportunities for improvements that I'd like to address, both visual and technical. However, I felt good enough to ship what I had so far. There's something about this site that excites and inspires me to keep improving it, more so than previous launches.

## Design process
My initial concepts started in [Sketch](https://www.sketch.com/), but as soon as I began to identify a direction that I was happy with, I shifted to designing in-browser. From there, I continued to experiment and iterate.

I'm attracted to portfolio sites that incorporate illustration and thought adding my own would make my website feel more approachable. I found two drawings in my sketchbook that I thought would be good candidates and set about redrawing them in Illustrator.

<figure class="u-releaseWide u-padEnds03">
  <img src="/static/img/posts/whale-sketch.jpg">
</figure>

My previous site was predominantly purple (which I liked), and I wanted to carry over that primary "brand color", yet in a more subtle "tip-of-the-hat" fashion. From there, I continued to refine my color selections and devise pallets for a light and dark theme.

Once I had established a solid design framework, I moved on to addressing more technical aspects of the site, which allowed me to more efficiently iterate on smaller design details once I had buttoned up some of the site's functional aspects.

## Front-end features
Browser capabilities and the front-end landscape have significantly matured since 2017, and I had grand ambitions for how I wanted to do things differently from my previous WordPress site. A few key aspects I was focused on were:

- Choosing a static site generator
- Modern CSS grid layout
- CSS custom properties
- `prefers-color-scheme` media queries
- `prefers-reduced-motion` media queries
- SVG Favicon

## Eleventy and Netlify for the win
After researching and experimenting with the available static site generators, I chose [Eleventy](https://www.11ty.dev/) for its flexibility and simplicity. Yes, it's build times are fast too (which I appreciate), but that wasn't a huge concern for me with my small portfolio site. The site is hosted on [Netlify](https://www.netlify.com/), and together the two are a pleasure to work with.

## Theming with CSS custom properties
[CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*) or CSS variables are powerful and really fun to use. They are the secret sauce behind my light and dark mode themes and a key ingredient in my themeable SVG favicon.

## Dark mode support
While I'm not completely satisfied with the current theme switcher UI, I'm quite proud of how well this feature and dark mode support are working together.

<figure class="u-releaseWide u-padEnds03">
  <img src="/static/img/posts/2020-website-darkmode.jpg">
</figure>

I opted to write the user's theme selections to `localStorage`, and getting the two methods of theme switching to work seamlessly together without tripping over each other required some consideration. I hope to write a more comprehensive article on the specifics of how I went about achieving this soon.

## Designing for reduced motion
My prior site incorporated some animations which over time, I found increasingly overdone and distracting. Looking back, I hate to think about how users with motion sensitivity were affected by this. This time around, I still wanted to incorporate some motion but instead opted for a more subtle and inclusive approach.

I significantly reduced the speed and distance covered by any animated elements. Additionally, since the animated content is near text, and that can be triggering for users with vestibular disorders, I placed the CSS animation behind a `supports-reduced-motion` media query. Finally, just for fun I added a subtle cursor-tracking script that enables the whale's pupil to follow the cursor around the screen.

That's it for now. Thanks for checking out my new site! Feedback is welcome via [GitHub issues](https://github.com/derekshirk/personal-site-2020/issues). I am excited to continually improve upon this initial release and keep sharing articles about the various techniques I've found useful.