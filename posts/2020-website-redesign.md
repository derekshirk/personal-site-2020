---
title: Hooray! I redesigned my website.
summary: A few notes on my goals, the process, tools, and techniques I used along the way. 
date: 2020-08-27
tags:
  - post
  - latest
  - "2020"
---

I've lost count of the number of iterations of my website that I've launched over the years. However, my previous redesign was long overdue for an update — I hadn't updated it since 2017!

I'm very excited to share this redesign with you and an overview of my goals, the process, tools, and various techniques I incorporated.

## Design objectives

- My primary design goals were:
- Keep it (seemingly) simple
- Less serious, more fun and whimsical
- Increase whitespace
- Improve legibility
- Achieve WCAG 2 [color](https://www.w3.org/TR/WCAG21/#use-of-color) and [contrast](https://www.w3.org/TR/WCAG21/#contrast-minimum) criterion
- Implement support for dark mode

Overall I'm pleased with the results, and I was able to address each of my objectives. There are still plenty of opportunities for improvements, both visual and technical, that I'd like to address. However, I felt good enough to ship what I had so far. There's something about this site that excites me and inspires me to keep improving it, more so than previous launches.

## Design Process
My initial concepts started in [Sketch](https://www.sketch.com/), but as soon as I began to identify a direction that I felt met my objectives, I shifted to designing in-browser. From there, I continued to experiment and iterate.

I'm attracted to portfolio sites that incorporate illustration and thought adding my own would make my website feel more fun and approachable. I found two drawings in my sketchbook that I thought would be good candidates and set about redrawing them in Illustrator.

My previous site was predominantly purple (which I liked), and I wanted to carry over that primary "brand color" to some extent, yet in a more subtle "tip-of-the-hat" fashion. From there, I continued to refine my color selections and devise pallets for a light and dark theme.

Once I had established a solid design framework, I moved on to addressing more technical aspects of the site, which allowed me to more efficiently iterate on smaller design details once I had buttoned up some of the site's functional aspects.

## Front-end Features
Browser capabilities and the front-end landscape have significantly matured since 2017, and I had grand ambitions for how I wanted to do things differently from my previous WordPress site. A few key aspects I was focused on where:

- Static site generator
- Modern CSS grid layout
- Make use of CSS custom properties
- `prefers-color-scheme` media queries
- `prefers-reduced-motion` media queries
- SVG Favicons

## Eleventy and Netlify for the win
After researching and experimenting with the available static site generators, I chose Eleventy for its flexibility and simplicity. Yes, it's built times are fast too (which I appreciate), but that wasn't a huge concern for me with my small portfolio site. The site is hosted on [Netlify](https://www.netlify.com/), and the two are a perfect marriage.

## Theming with CSS custom properties
CSS custom properties or CSS variables are powerful and a delight to use. They are the secrete sauce behind my light and dark mode themes and a key ingredient in my themeable SVG favicon.

## Dark mode support
While I'm not completely satisfied with the current theme switcher UI, this feature and dark mode support are easily the aspects of my site that I am most proud of and indeed forced me to flex my front-end design muscles. This trickiest aspect of this was incorporating dark mode support via the `prefers-color-scheme` media queries and a theme switcher interface. 

I opted to write the user's theme (switcher) selections to `localStorage`, and getting the two methods of theme switching to work seamlessly together required a significant amount of consideration. I hope to write a more comprehensive article on the specifics of how I went about achieving this soon.

## Designing for reduced motion
My prior site incorporated some animations which I found increasingly overdone and distracting over time. Looking back, I hate to think about how users with motion sensitivity were affected by this. This time around, I still wanted to incorporate some motion but instead opted for a more subtle and inclusive approach.

I significantly reduced the speed and distance covered by any animated elements. Additionally, since the animated content is near text, and that can be triggering for users with vestibular disorders, I placed the CSS animation behind a `supports-reduced-motion` media query. Finally, I added a subtle cursor tracking script that enables the whale's pupil to follow the cursor around the screen just for fun.

Thanks for checking out my new site. I am excited to continue to improve upon this initial release and continue sharing articles about the various tools and techniques I've found useful.