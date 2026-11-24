# Pre-migration recovery point

- Date: 2026-11-24
- EmDash: 1.6.0
- D1: timveletta-com-emdash-site (d955363c-8758-4af3-94ff-38a790f2db8d)
- Target fingerprint: 9300c047c26aebbc25f3e4be9b5031c7328fd326ec1895f95dfbd2300b291871
- Time Travel bookmark: 00000024-00000004-0000512d-dab4d68cdba5e59e6d93b9acd8fb21b6
- Restore: `pnpm exec wrangler d1 time-travel restore timveletta-com-emdash-site --bookmark=00000024-00000004-0000512d-dab4d68cdba5e59e6d93b9acd8fb21b6`
- Pending at backup: 092_plugin_kv_options … 098_user_last_login
- Build artifact: dist/ from 2026-11-24 13:51 (do not rebuild for this deploy)
- Encryption keys: keep EMDASH_ENCRYPTION_KEY rotation list from secret store (.env / Cloudflare secrets)
- Media: R2 bucket timveletta-com-emdash-media (Time Travel does not cover media)
