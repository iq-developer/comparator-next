# Copmarator Widget

## My assumptions

I prefer techologies that are already used in you project.
So I selected:

- TypeScript/JavaScript
- HTML/CSS (Tailwind)
- React (you also have Next, so I move code to Next.js)
- Git (with Github)

Your App's widgets doesn't have responsive design, and so didn't developed it now
Fixed layout:

- width: 700px
- height: 600px

## Features

All features, described in Example Widget Spec
Also tested on mobile devices with touch screen

Additionally:

- there is a butons to start/finish lines (on my UX test we need some visual hint, not just bottom and top of the stack)
- there is additional area displayed on the top of screen to remove block

## Further features

- Unit tests
- Responsive design
- Sounds
- More animations (block diasppearance and others)
- Dark theme (or more robust futuristic neon theme)
- May be try drag-n-drop library to have a better UX on touch screens

### Notes

Bottom and top blocks are switched to to display each higher block higher

Project was migrated to Next in the middle part of development.
If you wish to see first commits - go to https://github.com/iq-developer/comparator

## To run the project

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
