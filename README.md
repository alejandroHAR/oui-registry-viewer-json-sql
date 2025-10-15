# IEEE IAB Registry Data Viewer

![IEEE IAB Registry Data Viewer](https://alejandrohar.github.io/oui-registry-viewer-json-sql)  
*A modern web application to explore, search, filter, and download IEEE IAB registry data (OUI vendors).*

[![Visit the App](https://img.shields.io/badge/Visit%20the%20App-Live-blue?style=for-the-badge&logo=github)](https://alejandrohar.github.io/oui-registry-viewer-json-sql)

## 📖 Description

This is a responsive, single-page web application built with HTML, CSS (Bootstrap), and vanilla JavaScript. It allows users to browse the IEEE IAB (Individual Assignment Block) registry data, which includes Organizationally Unique Identifiers (OUIs) and their associated vendors. The app loads data from a local JSON file (`oui-vendors.json`) and provides intuitive search, filtering, and export capabilities.

Key highlights:
- **Performance-optimized**: Handles large datasets (e.g., thousands of entries) with pagination (50 items per page) to minimize memory usage.
- **User-friendly**: Dark-themed, modern UI with animations, loading spinners, and multilingual support (English/Spanish).
- **SEO-ready**: Includes meta tags for Google Search Console, Open Graph, and Twitter Cards to ensure proper indexing.
- **Export options**: Download full or filtered results in JSON or SQL formats (with CREATE TABLE and INSERT statements).

The app is deployed on GitHub Pages for free hosting.

## ✨ Features

- **Search & Filters**: Real-time search by OUI, vendor, or type; dropdown for types; text input for vendors.
- **Pagination**: Efficient rendering to avoid high RAM usage (e.g., <100MB even with 4K+ entries).
- **Downloads**: 
  - Full dataset: JSON/SQL.
  - Filtered results: JSON/SQL.
- **Statistics Cards**: Quick overview of total records, unique vendors, types, and OUIs.
- **URL State Sharing**: Filters and pagination persist in the URL (e.g., `?search=tech&type=IEEE&page=2`), perfect for sharing specific views.
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile.
- **Multilingual**: Switch between English and Spanish via a dropdown.
- **SEO & Accessibility**: Canonical URLs, structured meta tags, ARIA labels, and alt text for icons.

## 🛠 Tech Stack

- **Frontend**: HTML5, CSS3 (with Bootstrap 5.3), vanilla JavaScript (ES6+).
- **Data**: JSON file for OUI registry data.
- **Libraries**: Font Awesome for icons; no heavy frameworks for lightweight performance.
- **Deployment**: GitHub Pages.
- **Optimizations**: Debounced inputs, efficient filtering (O(n) time), and slice-based rendering.

## 🚀 Quick Start (Local Development)

1. **Clone the Repo**:
git clone https://github.com/alejandrohar/oui-registry-viewer-json-sql.git
cd oui-registry-viewer-json-sql

2. **Serve Locally**:
- Open `index.html` directly in your browser (no server needed, as it's static).
- Or use a local server: `npx http-server` (install via npm if needed).

3. **Data File**:
- Ensure `oui-vendors.json` is in the root (sample data included; replace with full IEEE registry for production).

4. **Customize**:
- Edit `oui-vendors.json` for your data.
- Update meta tags in `<head>` for your domain.

## 🌐 Deployment

- **GitHub Pages**: Already live! Fork this repo, enable Pages in Settings > Pages > Source: Deploy from branch (main, /root).
- **Custom Domain**: Add your domain in Settings > Pages > Custom domain.
- **Other Hosts**: Works on Netlify, Vercel, or any static host—upload the files to the root.

## 📊 SEO & Indexing

- **Google Search Console**: Submit `sitemap.xml` after verification.
- **Robots.txt**: Allows full crawling.
- **Meta Tags**: Optimized for descriptions, keywords, and social sharing.
- **Future Enhancements**: Schema.org structured data and Google Analytics can be added easily.

## 🤝 Contributing

Feel free to fork, submit issues, or PRs! Ideas for improvements:
- Add more filters (e.g., date ranges).
- Integrate real-time IEEE API.
- Dark/Light mode toggle.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ by Alejandro Har. Questions? Open an issue!**

[Visit the Live App](https://alejandrohar.github.io/oui-registry-viewer-json-sql)

## 🚀 Quick Start (Local Development)

1. **Clone the Repo**:
