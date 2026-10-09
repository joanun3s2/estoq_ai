# EstoqAI

A personal selling app for small vendors. Create and manage your product
inventory, register sales on the go, and review your sales history — all in
one multiplatform app (browser, Android and iOS).

Built with **Angular + Ionic (standalone components)** and **Capacitor** for
native mobile builds.

## Requirements

- Node.js `22.x` (`nvm use` picks the version from `.nvmrc`)

## Run in the browser (development)

```bash
nvm use
npm install
npm start
```

Open http://localhost:4200. The app runs with mocked data by default
(`useMocks: true` in `src/environments/environment.ts`); switch it to `false`
to use the real HTTP service.

## Build

```bash
npm run build       # outputs to www/
npm run lint
```

## Mobile (Capacitor)

```bash
npm run cap:sync    # build + sync web assets into native projects
npm run android     # open the Android project (requires Android SDK/JDK)
npm run ios         # open the iOS project (requires macOS/Xcode)
```