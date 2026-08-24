# 我的漫畫書櫃

這是一個純前端 GitHub Pages 網站：
- 保存漫畫名稱與原始閱讀連結
- 收藏功能
- 搜尋
- 閱讀進度記錄（存在使用者自己的瀏覽器 localStorage）
- 深色模式
- 手機版介面
- 不下載、不保存漫畫圖片或漫畫內容

## 部署到 GitHub Pages

1. 在 GitHub 建立一個新的 repository，例如 `manga-bookshelf`。
2. 把 `index.html`、`styles.css`、`app.js` 上傳到 repository 根目錄。
3. 到 `Settings` → `Pages`。
4. Source 選 `Deploy from a branch`。
5. Branch 選 `main`、資料夾選 `/ (root)`。
6. 儲存後等待 GitHub Pages 部署完成。

## 新增漫畫

打開 `app.js`，找到 `const BOOKS = [...]`，依照現有格式新增：
`{"id": 20, "title": "漫畫名稱", "url": "https://...", "favorite": false, "progress": ""}`

注意：網站只作為書櫃與連結入口，不保存第三方網站的漫畫圖片或內容。
