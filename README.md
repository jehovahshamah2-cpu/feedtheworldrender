# Feed the World (Lisha Dunia) — Toleo la Render (huduma moja)

Toleo hili linaendesha **frontend na backend pamoja kwenye huduma moja** ya Render — tofauti na
toleo la Netlify+Railway (huduma mbili tofauti).

## Jinsi inavyofanya kazi
- `server/server.js` inatumikia:
  - `/api/*` -> Express API (posts, comments, translate, analyze, payments)
  - njia nyingine zote -> faili za React zilizojengwa (`client/dist`)
- `npm run build` (root) inasakinisha dependencies za client na server, kisha inajenga (`vite build`) client
- `npm start` (root) inaanzisha server ambayo pia inatumikia frontend iliyojengwa

## Kudeploy Render
1. Pakia repo hii GitHub
2. Render.com -> "New" -> "Web Service" -> unganisha repo
3. Render itasoma `render.yaml` moja kwa moja (Build Command: `npm run build`, Start: `npm start`)
4. Ongeza Environment Variables (angalia `server/.env.example`) kwenye dashibodi ya Render
5. Deploy -> utapata URL moja tu inayotumikia app nzima (frontend + backend)

## Faili zilizoongezwa upya (toleo la msingi)
Faili hizi ziliundwa upya kwa sababu hazikuwepo kwenye zip ya awali:
- client/src/main.jsx, client/src/App.jsx
- client/src/context/AuthContext.jsx (Pi Network auth)
- client/src/data/constants.js, client/src/data/helpers.js
- client/package.json

Angalia faili hizi na uzibadilishe kadri mantiki halisi ya app yako ilivyokuwa awali
(mfano orodha kamili ya lugha 180+, TABS zako halisi).
