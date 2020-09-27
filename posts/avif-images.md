---
title: Improving performance with AVIF image compression
summary: AVIF is a next-gen image compression format with insane compression and performance benefits.
date: 2020-09-25
tags:
  - post
  - latest
  - "2020"
---

I am always looking for ways to build faster web experiences. Speed was one of my primary goals with my most recent [website redesign](/posts/hooray!-i-redesigned-my-website). I've done a decent job so far, however I still have plenty of opportunities to improve my page speeds and overall [performance](https://lighthouse-dot-webdotdevsite.appspot.com//lh/html?url=https%3A%2F%2Fderekshirk.com). 

Shortly after launching my new website, I discovered AVIF image compression thanks to this [article](https://jakearchibald.com/2020/avif-has-landed/) by Jake Archibald. Jake goes deep (really deep) in that article, and I highly recommend checking it out - you might want to prepare some snacks 😉. 

I'm going to keep things much simpler. This post should give you a basic overview of what AVIF is, where it's currently supported, and how I used it to improve my site's page speed by reducing my image payload by `68%`. 

In Jake's article, he says: 

> The time to care about AVIF is now. 
> <span class="u-textShrink2">— Jake Archibald</span>

Based on my limited experience so far, I totally agree!

## What is AVIF exactly?

[AVIF](https://aomediacodec.github.io/av1-avif/) is a next-gen image compression format with insane compression and performance benefits. Here is a chart to help illustrate its effectiveness. 

<div class="u-padEnds06 u-md-padEnds3">  
  <div class="u-md-hidden">
    <svg width="770px" height="426px" viewBox="0 0 770 426" xmlns="http://www.w3.org/2000/svg">
      <path d="M38,199 L496,199 C516.98682,199 534,216.01318 534,237 C534,257.98682 516.98682,275 496,275 L38,275 C17.0131795,275 2.57014425e-15,257.98682 0,237 C-2.57014425e-15,216.01318 17.0131795,199 38,199 Z" id="Rectangle-Copy" fill="var(--theme-color-accent-primary)"></path>
      <text id=".webp" font-family="Inter-ExtraBold, Inter" font-size="36" font-weight="600" letter-spacing="-0.62" fill="var(--theme-color-max-contrast)">
          <tspan x="31.7065341" y="187">.webp</tspan>
      </text>
      <text id="30%-smaller-than-.jp" font-family="Inter-Bold, Inter" font-size="27" font-weight="bold" letter-spacing="-0.09" fill="var(--theme-color-background)">
          <tspan x="31" y="246">30% smaller than .jpeg</tspan>
      </text>
      <path d="M38,351 L732,351 C752.98682,351 770,368.01318 770,389 C770,409.98682 752.98682,427 732,427 L38,427 C17.0131795,427 2.57014425e-15,409.98682 0,389 C-2.57014425e-15,368.01318 17.0131795,351 38,351 Z" id="Rectangle-Copy-2" fill="var(--theme-color-accent-primary)"></path>
      <text id=".jpeg" font-family="Inter-ExtraBold, Inter" font-size="36" font-weight="600" letter-spacing="-0.62" fill="var(--theme-color-max-contrast)">
          <tspan x="31.0715909" y="339">.jpeg</tspan>
      </text>
      <text id="larger-than-necessar" font-family="Inter-Bold, Inter" font-size="27" font-weight="bold" letter-spacing="-0.09" fill="var(--theme-color-background)">
          <tspan x="31" y="398">larger than necessary</tspan>
      </text>
      <path d="M38,47 L347,47 C367.98682,47 385,64.0131795 385,85 C385,105.98682 367.98682,123 347,123 L38,123 C17.0131795,123 2.57014425e-15,105.98682 0,85 C-2.57014425e-15,64.0131795 17.0131795,47 38,47 Z" id="Rectangle" fill="var(--theme-color-accent-primary)"></path>
      <text id="50%-smaller-than-.jp" font-family="Inter-Bold, Inter" font-size="27" font-weight="bold" letter-spacing="-0.09" fill="var(--theme-color-background)">
          <tspan x="31" y="94">50% smaller than .jpeg</tspan>
      </text>
      <text id=".avif" font-family="Inter-ExtraBold, Inter" font-size="36" font-weight="600" letter-spacing="-0.62" fill="var(--theme-color-max-contrast)">
          <tspan x="31.9224432" y="35">.avif</tspan>
      </text>
    </svg>
  </div>

  <div class="u-hidden u-md-block">
    <svg width="770px" height="176px" viewBox="0 0 770 176" xmlns="http://www.w3.org/2000/svg">
      <path d="M22,-2.84217094e-14 L363,-2.84217094e-14 C375.150264,-3.06536768e-14 385,9.8497355 385,22 C385,34.1502645 375.150264,44 363,44 L22,44 C9.8497355,44 1.48797825e-15,34.1502645 0,22 C-1.48797825e-15,9.8497355 9.8497355,-2.61897421e-14 22,-2.84217094e-14 Z" id="Rectangle" fill="var(--theme-color-accent-primary)"></path>
      <path d="M22,66 L512,66 C524.150264,66 534,75.8497355 534,88 C534,100.150264 524.150264,110 512,110 L22,110 C9.8497355,110 1.48797825e-15,100.150264 0,88 C-5.04069193e-15,75.8497355 9.8497355,66 22,66 Z" id="Rectangle-Copy" fill="var(--theme-color-accent-primary)"></path>
      <path d="M22,132 L748,132 C760.150264,132 770,141.849736 770,154 C770,166.150264 760.150264,176 748,176 L22,176 C9.8497355,176 1.48797825e-15,166.150264 0,154 C-1.48797825e-15,141.849736 9.8497355,132 22,132 Z" id="Rectangle-Copy-2" fill="var(--theme-color-accent-primary)"></path>
      <text id=".avif" font-family="Inter-ExtraBold, Inter" font-size="15" font-weight="600" letter-spacing="0.45" fill="var(--theme-color-background)">
          <tspan x="25.5926847" y="27">.avif</tspan>
      </text>
      <text id=".webp" font-family="Inter-ExtraBold, Inter" font-size="15" font-weight="600" letter-spacing="0.45" fill="var(--theme-color-background)">
          <tspan x="25.1693892" y="94">.webp</tspan>
      </text>
      <text id="30%-smaller-than-.jp" font-family="Inter-Bold, Inter" font-size="15" font-weight="bold" letter-spacing="0.45" fill="var(--theme-color-background)">
          <tspan x="335" y="94">30% smaller than .jpeg</tspan>
      </text>
      <text id=".jpeg" font-family="Inter-ExtraBold, Inter" font-size="15" font-weight="600" letter-spacing="0.45" fill="var(--theme-color-background)">
          <tspan x="25.6548295" y="160">.jpeg</tspan>
      </text>
      <text id="larger-than-necessar" font-family="Inter-Bold, Inter" font-size="15" font-weight="bold" letter-spacing="0.45" fill="var(--theme-color-background)">
          <tspan x="581" y="160">larger than necessary</tspan>
      </text>
      <text id="50%-smaller-than-.jp" font-family="Inter-Bold, Inter" font-size="15" font-weight="bold" letter-spacing="0.45" fill="var(--theme-color-background)">
          <tspan x="186" y="27">50% smaller than .jpeg</tspan>
      </text>
    </svg>
  </div>
</div>

AVIF is generated from the keyframes of [AV1 video](https://en.wikipedia.org/wiki/AV1). If you like options, AVIF has lots of them. It supports any image codec, can be lossy or lossless, is capable of including a transparent alpha channel, and can even be used to generate high-quality animated GIFs.

## Browser Support

AVIF currently works in Chrome 85 (which includes the Brave browser). It sounds like Android support is coming soon. Firefox 80 can display AVIF images with an enabled flag. I expect full Firefox support to be released soon, as they have a proven track record of moving fast on these types of enhancements. I'm unsure of what to expect from Safari, but apparently, they are involved with the [team](https://aomedia.org/) that helped create AV1 — so that's promising. 

Are you interested in enabling AVIF support in Firefox 80 now? Enter `about:config` in the URL bar, search for `image.avif.enabled`, and set the parameter's value to `true`.

<picture>
  <source srcset="/static/img/posts/firefox-about-config.avif" type="image/avif">
  <source srcset="/static/img/posts/firefox-about-config.webp" type="image/webp"> 
  <img src="/static/img/posts/firefox-about-config.jpg">
</picture>

The following image should tell you everything you need to know if the browser you are using currently supports AVIF. 

<picture>
  <source srcset="/static/img/posts/yes-kid.avif" type="image/avif">
  <source srcset="/static/img/posts/no-kid.webp" type="image/webp"> 
  <img src="/static/img/posts/no-kid.jpg">
</picture>

## How I reduced my image payload by 68%

Since AVIF is not yet supported everywhere, I embraced the `<picture>` element for its ability to use `<source>` images as progressive enhancements.

```html
<picture> 
  <source srcset="extra_fancy_browser.avif" type="image/avif"> 
  <source srcset="fancy_browser.webp" type="image/webp"> 
  <img src="all_other_browsers.jpg">
</picture>
```

The images are listed in the order that they should be loaded. The browser will display the first image format it supports. If the browser doesn't support `<picture>`, it will fall back to using the default `<img>` source.

I try to keep images on my site to a minimum; however, I have two pages where numerous images are inescapable. My [Projects](/designs) and [Bookshelf](/reads) pages rely heavily on displaying lots of pictures, so naturally, I worked on optimizing them first. 

I used [Squoosh](https://squoosh.app/) to generate my AVIF, WEBP, and MozJpeg assets. In my opinion, Squoosh was the best option I found for optimizing my images into the formats I wanted. If you are comfortable in the command line, there are tools you can use, such as [libavif](https://github.com/AOMediaCodec/libavif). However, I preferred visually adjusting the options for each image in Squoosh, so I could manually optimize for the best ratio of quality and compression with each asset. 

I was also able to squeeze out some additional compression gains for my fallback images because in the hast of launching my site, I neglected to compress my jpegs with MozJpeg. I have also added [native image lazy loading](https://web.dev/browser-level-image-lazy-loading/) in a few select areas on this site. This, paired with AVIF compression, has resulted in better than expected performance gains in supported browsers. 

Here are some before and after data comparisons I captured from the network panel while working on this update. 

#### Projects page

Before optimizing my images, my projects page contained `21` images totaling `4.1 MB` in size. With AVIF, I was able to reduce this to `1.3 MB`. That's a `68.29%` reduction in bytes.


#### Bookshelf page

My Bookshelf page contained `61` images totaling `4.7 MB`. After AVIF compression, I was able to reduce that to `1.5 MB` for a `68.1%` reduction. Not bad!


## Some trouble with Firefox and Netlify

Thanks to a [post](https://reachlightspeed.com/blog/using-the-new-high-performance-avif-image-format-on-the-web-today/) by Dan Klammer, I was able to remedy this before it caused an issue for me. Netlify servers will return a `Content-Type: application/octet-stream header` in firefox when AVIF images are being served. This means that the [AVIF] images will not load. Dan suggests adding the following custom header info to your `netlify.toml` configuration file. I've tested this, and it works as described.  

```toml
[[headers]]
  for = "*.avif"
  [headers.values]
    Content-Type = "image/avif"
    Content-Disposition = "inline"
```

## WordPress

If you're looking for suggestions on how to insert AVIF images into a WordPress site, it looks like there are some decent suggestions listed [here](https://libre-software.net/avif-test/#avif_wordpress) to get you started.

## Summary

To conclude this article, I will repeat Jake's sentiment. The time to care about AVIF is now. With that being said, I understand that there are many more important things going on in the world that require our focus and attention. But if you're looking to spend some time improving the performance of your site by reducing the file size of images, AVIF is an excellent place to start.
