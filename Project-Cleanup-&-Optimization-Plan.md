# 🧹 Project Cleanup & Optimization Plan

This plan outlines a **safe and non-disruptive** cleanup strategy for the project, ensuring **100% UI and functionality** remains intact while removing all unused, redundant, and unorganized assets.

---

## ✅ Objective

- 🔧 Improve codebase structure
- 🧼 Remove unused imports, components, and folders
- 📁 Reorganize files for clarity
- 🛡️ Ensure **zero disruption to UI and UX**

---

## 📋 Cleanup Checklist

### 1. Code Audit & Indexing
- [ ] Scan all files for unused imports
- [ ] Identify unused components, pages, utilities, and styles
- [ ] Detect dead code blocks or commented-out sections

---

### 2. Folder-by-Folder Cleanup

#### 📁 `app/`
- [ ] Ensure `green/`, `client-layout.tsx`, `layout.tsx`, `page.tsx` are properly structured and referenced
- [ ] Remove unused routes or pages
- [ ] Check for nested route redundancies

#### 📁 `components/`
- [ ] Review `animations/` – remove unused animation files
- [ ] Audit `premium/`, `static-nodes/`, and `ui/` for redundant or duplicate components
- [ ] Ensure component naming is consistent and clear
- [ ] Separate large components into sub-components if needed

#### 📁 `hooks/`
- [ ] Validate all hooks are used in the project
- [ ] Remove unused or deprecated custom hooks

#### 📁 `lib/`
- [ ] Check if all utilities or helpers are being called
- [ ] Remove or merge redundant logic

#### 📁 `public/`
- [ ] Remove unused images, icons, or assets
- [ ] Optimize large files for performance

#### 📁 `store/`
- [ ] Check if all stores are active and connected to the app
- [ ] Clean out legacy or test states

#### 📁 `styles/`
- [ ] Remove unused CSS/Tailwind classes
- [ ] Consolidate redundant styles
- [ ] Separate global and component-specific styles

#### 📁 `utils/`
- [ ] Identify dead utility functions
- [ ] Merge duplicate logic or move to `lib/` if shared

---

### 3. Dependency Review
- [ ] Run `npm run lint` to catch unused variables/imports
- [ ] Run `npm run build` to ensure no build-time issues
- [ ] Run `npm audit fix` to check for outdated/insecure packages
- [ ] Remove unused packages from `package.json`

---

### 4. Final Verification
- [ ] Full local test of all routes/pages
- [ ] Manual UI test on key breakpoints (mobile/tablet/desktop)
- [ ] Git diff review before final commit
- [ ] Push changes to a separate branch for safe testing

---

## 📁 Optional Enhancements
- [ ] Create a `README.md` for future devs
- [ ] Add `.vscode/settings.json` for team consistency
- [ ] Configure ESLint + Prettier (if not set)
- [ ] Add file structure documentation (`docs/` folder)

---

## 🛑 Important Notes

> - **Do not delete or refactor any component unless 100% confirmed unused**
> - **Do not rename folders/components unless all references are updated**
> - Always test before and after cleanup on **multiple screen sizes**

---

## 🔁 Suggested Cleanup Flow

1. `hooks/`, `lib/`, `utils/` – start small
2. `components/` – clean and organize
3. `app/` – route structure check
4. `styles/` and `public/` – optimize and remove unused
5. `store/` – confirm active usage
6. Final test & push

---

✅ **Status: Ready for Implementation**
