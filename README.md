# ADDFRND — clickable prototype

**No one should eat alone.** A mobile-first, clickable prototype of ADDFRND, a friends-only app for making plans to meet in public places (lunch, coffee, walks and more) around Rhos-on-Sea and Colwyn Bay.

**Live:** https://cryptohobbits.github.io/addfrnd-prototype/

> Prototype with example data. Every person is fictional, the venues are real local places, and nothing is sent anywhere. Everything is simulated in the browser (localStorage). There's no backend.

## Flows
1. Welcome → Get started → Verify (simulated ID) and pick an age band → Profile setup (interests, "I'm up for", my area) → Discover
2. Discover list/map with filters (activity, age band, radius) → Plan detail → Request to join → "Priya approved you" → group chat
3. Person profile → Add friend (simulated mutual accept) → 1-to-1 chat unlocks (locked before)
4. **+** Create plan: activity, title, suggested public venues, date/time, spots, approval and Safety Card toggles → Post
5. Group chat: send messages (simulated replies), blurred photo tap-to-reveal, "I'm here" check-in, report/block
6. Safety Card: share via WhatsApp/Text/Copy link, "Preview what Mum sees", demo controls for I'm here / All good / Missed check-in
7. After the meet-up: "Would you meet again?" → add as friend

**Demo menu:** tap the *PROTOTYPE · DEMO* pill (or long-press the logo) to reset or jump to any flow. On desktop the jump list is shown next to the phone. Add `#demo` to the URL to open the menu, or `#card` to open the trusted-contact Safety Card view.
