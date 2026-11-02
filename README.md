# Delivery Desk — website front-end starter

This package contains the first front-end build for Delivery Desk.

## Pages
- `index.html` — public landing page.
- `delivery.html` — customer delivery request form.
- `login.html` — team sign-in screen (demo only).
- `dashboard.html` — owner/employee dashboard preview.

## Preview
Unzip the package, then open `index.html` in a modern browser. For best results, serve the folder using a local static web server.

Demo sign-in:
- Owner: `owner@demo.test` with any password.
- Employee: `employee@demo.test` with any password.

Customer form submissions are saved to browser `localStorage` and appear in the dashboard only in the same browser. This is deliberately a front-end prototype, not a production backend.

## Next integration stage
After the new Supabase project is created, we will:
1. Create the database tables and relationships.
2. Configure Supabase Auth for owner and employee accounts.
3. Add Row Level Security (RLS) so employees cannot access each other's private records.
4. Connect the customer form to the database.
5. Connect the dashboards to live data.
6. Add hosted checkout and verified payment webhooks, followed by controlled employee payouts.

## Security notes
- Do not collect card numbers, CVV, PINs, passwords or OTPs in the customer form.
- Do not place a Supabase `service_role` key in browser code.
- Do not accept a payment as successful based only on a browser redirect. Verify it server-side using signed provider webhooks.
- Do not use demo sign-in or browser storage for real customer information or real money.
- Employee payout permissions must be limited by owner-configured limits and protected by server-side checks and audit logs.
