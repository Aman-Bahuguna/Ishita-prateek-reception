# Wedding Invitation Website

An interactive wedding invitation built with React, Vite, TypeScript, Tailwind CSS, and GSAP.

## Requirements

Install the following tools before running the project:

- [Node.js](https://nodejs.org/) 22
- [pnpm](https://pnpm.io/) 10.34.3

The required versions are also defined in `.mise.toml`. If you use
[mise](https://mise.jdx.dev/), install them with:

```bash
mise install
```

Alternatively, enable pnpm through Node's Corepack:

```bash
corepack enable
corepack prepare pnpm@10.34.3 --activate
```

## Run the Website Locally

1. Clone or download this repository.
2. Open a terminal in the project directory.
3. Install the dependencies:

   ```bash
   pnpm install
   ```

4. Start the local development server:

   ```bash
   pnpm dev
   ```

5. Open the URL printed in the terminal. By default, the website is available at:

   ```text
   http://localhost:8443
   ```

The development server supports hot reload, so saved code changes appear in the browser
automatically.

### Use a Different Port

The default port is `8443`. To use another port, set the `PORT` environment variable before
starting the server:

macOS or Linux:

```bash
PORT=3000 pnpm dev
```

Windows PowerShell:

```powershell
$env:PORT=3000; pnpm dev
```

Then visit `http://localhost:3000`.

## Main Project Files

- `src/App.tsx` — Defines the order of the website sections.
- `src/sections/` — Contains the individual wedding invitation sections.
- `src/components/` — Contains reusable interactive components.
- `src/index.css` — Contains global styles, Tailwind CSS, animations, and responsive styling.
- `public/images/` — Contains website images.
- `public/video/` — Contains the hero background video.
- `public/audio/` — Contains the wedding music.
- `public/envelope-cutouts/` — Contains the envelope animation artwork.
- `.figma/make/site.json` — Contains the website title, metadata, and other site settings.

Static files inside `public` are referenced from the site root. For example,
`public/images/example.png` is used in the code as `/images/example.png`.

## Customize the Website

1. Edit section text and content in the corresponding file under `src/sections/`.
2. Add or replace media in the appropriate folder under `public/`.
3. Keep the same filename when replacing an existing asset, or update its path in the component.
4. Adjust global colors, typography, spacing, and animations in `src/index.css`.
5. Save the file and review the change in the local browser.

The Google Fonts used by the design are loaded from the internet. An internet connection is
therefore required for the exact typography to appear during local development.

## Create a Production Build

Run:

```bash
pnpm build
```

The optimized production files are generated in the `dist/` directory.

To preview the production build locally:

```bash
pnpm preview
```

Open `http://localhost:8443`, or the URL printed in the terminal.

## Format the Code

Run the project's formatter with:

```bash
pnpm format
```

Before sharing or deploying changes, run both:

```bash
pnpm format
pnpm build
```

## Troubleshooting

### Port 8443 is already in use

Stop the application using that port or start this project on another port:

```bash
PORT=3000 pnpm dev
```

### Dependencies fail to install

Confirm the active versions:

```bash
node --version
pnpm --version
```

Use Node.js 22 and pnpm 10.34.3, then run `pnpm install` again.

### Music does not begin immediately

Modern browsers block audio until the visitor interacts with a page. On this website, the music
starts when the visitor clicks the envelope seal. It can then be paused or resumed with the
bottom-right music control.
