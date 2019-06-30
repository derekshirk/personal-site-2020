---
title: Working with Neat 2.0
summary: A few days into redesigning my personal site, the grid framework I was using (Neat) received a major update.
date: 2017-03-12
tags:
  - Development
---

A few days into redesigning my personal site, the grid framework I was using (Neat) received a major update in Neat 2.0. What struck my interest the most was, while other frameworks and libraries tend to add features in their major releases this recent release of Neat seemed to do just the opposite.

So opposite in fact, that the entire grid system was stripped down to only seven mixins and all of the previous sass was removed. Since I just started on the project and didn’t have any client restraints I decided to play with it and give it a try.

> While other frameworks and libraries tend to add features to their major releases this recent release of Neat seemed to do just the opposite.

The new version promised to reduce the number of required style attributes on each element, eliminate the need for `nth-child()` selectors, work seamlessly with Flexbox and simplify the process of swapping the order and positions of elements within the grid. Here are some of my initial takeaways after using it for a few days.

## Initial thoughts after working with Neat 2.0

There are already some great posts from [Thoughtbot](https://thoughtbot.com) team with explanations and examples of the mixins – which you should check out. I thought I would share some additional insight on the features I found most exciting.

## Upgrading from previous versions

Be mindful when trying to introduce Neat 2.0 into a production project built on any previous Neat 1.x versions. ALL of the previous sass has been removed and was replaced by seven brand new mixins. With so much previous code being depreciated, I do recommend taking time to play with the new tools and understand how updating will affect your previous Neat layouts.

## Because autoprefixer is better

I had already abandoned using many of Neat’s sass mixins such as @inlcude display(flex); and instead found it required less key-strokes to let autoprefixer do that heavy lifting as part of my grunt or gulp automation. So, I wasn’t surprised that so much of the previous sass was abandoned.

```
// Neat 1.x display mixin
@include display(flex) ;

// Neat 2.0
// Let autoprefixer handle vendor prefixing
display: flex ;

// Neat 1.x Flex Box justify content mixin
@include justify-content(space-between)

// Neat 2.0
// Let autoprefixer handle vendor prefixing
justify-content: space-between ;
```

## The push left grid approach

Neat 2.0 makes use of a push left approach to position objects within your grids. This means, instead of a column using margin-right, these columns use margin-left to push themselves away from their children. Element widths are determined by the `calc()` property and also define the desired gutter for each object and it’s siblings. Another important distinction is that Neat 2.0 columns utilize exterior, not interior gutters.

At first I had a difficult time getting used the push left grid. However, I soon came to really appreciate and now might even prefer it. After working with it for several days I certainly felt like I was writing cleaner style definitions as promised.

## It works with Flexbox

Other grids systems that I have used such as [Foundation](http://foundation.zurb.com/sites/docs/flex-grid.html) didn’t work perfectly with Flexbox out of the box and required certain configuration for flex based layouts. This is not the case with Neat 2.0.

## grid-media() and multiple custom grids

The feature that I struggled with the most is now probably my favorite aspect of the new system. That is, the ability to create multiple unique grids which can be applied to any element or specific breakpoint. Have you ever wanted to use 12 columns for your desktop layout but maybe only six columns for your smaller mobile layouts? Well, now you can. Neat 2.0 does this by storing custom grid attributes in a sass map aptly named $neat-grid. Sass maps are great for centrally storing sets of complex information in one place.

```
// Neat 2.0 default $neat-grid map
$neat-grid: (
  columns: 12,
  gutter: 20px,
  direction: ltr,
);
```

Creating custom grids is very simple.

```
$my-desktop-grid: (
  columns: 12,
  gutter: 32px,
  media: 1200px,
);

$my-mobile-grid: (
  columns: 6,
  gutter: 24px,
  media: 768px,
);
```

The media attribute is used by the grid media mixin to define the local media query. You then pass the map directly in to the media query mixin like this.

```
// Using custom grids with grid-media()

.element {

  @include grid-media($my-mobile-grid) {
    @include grid-column(2);
  }

  @include grid-media($my-desktop-grid) {
    @include grid-column(8);
  }

}
```

When using `grid_media()`, the grid passed in to the mixin will replace the default grid within the scope of the media query. Note: Any other grid mixin that is called within the block, will assume the custom grid’s property.

What’s cool is the media property of the mixin can handle a bunch of different inputs. If you only pass in a single value such as `1200px` the value will be assigned as min-width. However, you can also write your own full media query expressions as well.

```
$max-width-grid: (
    media: (max-width: 1200px),
);

$small-only-grid: (
    media: (min-width:300px) and (max-width: 768px),
);

$print-only-grid: (
    media: print,
);
```

## grid-visual(). Wherever. Whenever

Another welcome improvement is the flexibility of the new grid-visual() mixin. I have enjoyed the ability to turn a visual grid on or off on a per layout or component basis. Taking the examples from the previous grid-media you could expand upon this by also turning on a visual grid specific to each breakpoint.

```
// Display different visual grids

.element--container {

  @include grid-media($my-mobile-grid) {
    @include grid-visual(cyan, $my-mobile-grid) ;
  }

  @include grid-media($my-desktop-grid) {
    @include grid-visual(skyblue, $my-desktop-grid) ;
  }

}
```

Should you upgrade? Well, that’s up to you. If you are just starting a new project using Neat 2.0 is a no-brainer in my opinion. However, if you’ve got a stable program that’s built upon any of the Neat 1.x versions, you will have to weigh your options yourself.
