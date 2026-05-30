# Anniversary

A little anniversary keepsake site. It opens with a sealed envelope — click it and
the flap unseals, the folded letter rises out, the envelope sinks away, and the
letter unfolds into a set of pages you can flip through with **Back** / **Next**.

## Tech

- [Vite](https://vitejs.dev/) + [React 18](https://react.dev/)
- [Framer Motion](https://www.framer.com/motion/) for the opening sequence

## Run it

```bash
npm install
npm run dev      # starts the dev server (http://localhost:5173)
```

```bash
npm run build    # production build into dist/
npm run preview  # preview the production build
```

## Where to add content

The pages shown after the letter opens live in `src/components/Sections.jsx` —
edit the `sections` array to fill in each chapter (text, photos, etc.). The first
page is the greeting; the rest are placeholders marked "Section coming soon".

## Structure

```
index.html
src/
  main.jsx                  app entry
  App.jsx                   mounts the background + scene
  index.css                 global styles, palette, floating hearts
  components/
    HeartField.jsx          drifting hearts background
    EnvelopeScene.jsx       the envelope + opening animation orchestrator
    Sections.jsx            the opened letter pages with Back / Next
    scene.css               envelope + letter + page styles
```
