[![Netlify Status](https://api.netlify.com/api/v1/badges/bbf28a84-4bdb-407b-a2fa-32628d27fa3d/deploy-status)](https://app.netlify.com/sites/eleventy-netlify-boilerplate/deploys)

# My Personal Site 
Redesign in-progress

## What is it?

A personal website built with [Eleventy](https://www.11ty.io/), an awesome 
static site generator. Includes [Netlify CMS](https://www.netlifycms.org/), and 
proudly hosted and deployed with [Netlify](https://www.netlify.com).

## Local development

### 1. Clone this repository:

```
git clone https://github.com/derekshirk/personal-site-2020.git
```

### 2. Navigate to the directory

```
cd personal-site-2020
```

Specifically have a look at `.eleventy.js` to see if you want to configure any 
Eleventy options differently.

### 3. Install dependencies

```
npm install
```

### 4. Edit _data/metadata.json

This file contains your site title and author details.

### 5. Run Eleventy (builds the site)

```
npx eleventy
```

Or build automatically when a template changes:
```
npx eleventy --watch
```

Or in debug mode:
```
DEBUG=* npx eleventy
```

## Bug reports, feature requests, etc

This is an ongoing project and I welcome contributions. 
Feel free to submit a PR for feature requests or create an Issue to report bugs.

## Deploy to Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/derekshirk/personal-site-2020&stack=cms)