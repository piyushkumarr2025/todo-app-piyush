# Deploy to GitHub Pages (Step-by-Step)

> Works from **mobile** or **laptop**. Total time: ~5 minutes.

## Option A: Laptop (fastest)
1. Go to https://github.com and sign in.
2. Click **New** → Repository name: `todo-app-piyush` → **Create repository**.
3. Click **Add file** → **Upload files** → Drag & drop all files from this folder:
   - `index.html`, `style.css`, `app.js`, `README.md`
4. Click **Commit changes**.
5. Open **Settings** → **Pages** (left sidebar).
6. Under **Build and deployment**:
   - **Source**: `Deploy from a branch`
   - **Branch**: `main` / folder: `/root` → **Save**.
7. Wait 30–60 seconds. A green link like:
   - `https://<your-username>.github.io/todo-app-piyush/`
   will appear. Open it—your app is live! 🎉

## Option B: Mobile (Android) using Browser
1. Chrome me https://github.com open karo → **Sign in**.
2. **New repository** banao: `todo-app-piyush`.
3. **Add file** → **Upload files** →
   - **Choose your files** → `index.html`, `style.css`, `app.js`, `README.md` select karo (multiple select allowed).
4. **Commit changes**.
5. **Settings** → **Pages** →
   - **Source**: `Deploy from a branch`
   - **Branch**: `main` / folder: `/root` → **Save**.
6. Page refresh ke baad link show hoga. Us link ko mam ke laptop me open kara sakte ho.

## Optional: Customization
- **Project name change**: Repository ka naam change karoge to URL bhi change hoga.
- **Icon/Title**: `index.html` me `<title>` badal sakte ho, aur favicon add karna ho to `favicon.ico` file add karke `<link rel="icon"...>` use karo.
- **Privacy**: Pages needs a **public** repo to be visible to others.

## Troubleshooting
- 404 dikh raha hai? 1–2 minutes wait karo, phir **Pages** me branch/folder settings check karo.
- White page? Browser console me error check karo; file names case-sensitive hote hain.
