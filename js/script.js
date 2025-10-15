// js/script.js
const translations = {
    en: {
        pageTitle: "IEEE IAB Registry Data Viewer",
        pageSubtitle: "Explore and download OUI registry data",
        initialLoadingText: "Loading data...",
        totalRecords: "Total Records",
        uniqueVendors: "Unique Vendors",
        uniqueTypes: "Unique Types",
        totalOUIs: "Total OUIs",
        searchLabel: "Search",
        searchPlaceholder: "Search by OUI, vendor...",
        typeLabel: "Type",
        vendorLabel: "Vendor",
        searchBtn: "Search",
        loadingText: "Filtering data...",
        resultsLabelText: "Results",
        noResultsText: "No results found. Try adjusting your filters.",
        thType: "Type",
        thOUI: "OUI",
        thVendor: "Vendor",
        paginationInfo: "Showing {start} to {end} of {total} entries"
    },
    es: {
        pageTitle: "Visor de Datos IEEE IAB Registry",
        pageSubtitle: "Explora y descarga datos de registros OUI",
        initialLoadingText: "Cargando datos...",
        totalRecords: "Total Registros",
        uniqueVendors: "Vendors Únicos",
        uniqueTypes: "Tipos Únicos",
        totalOUIs: "OUI Totales",
        searchLabel: "Búsqueda",
        searchPlaceholder: "Buscar por OUI, vendor...",
        typeLabel: "Tipo",
        vendorLabel: "Vendor",
        searchBtn: "Buscar",
        loadingText: "Filtrando datos...",
        resultsLabelText: "Resultados",
        noResultsText: "No se encontraron resultados. Intenta ajustar tus filtros.",
        thType: "Tipo",
        thOUI: "OUI",
        thVendor: "Vendor",
        paginationInfo: "Mostrando {start} a {end} de {total} entradas"
    }
};

let currentLang = 'en';
let data = [];
let filteredData = [];
let currentPage = 1;
const itemsPerPage = 50; // Reducido para optimizar renderizado

function t(key) {
    return translations[currentLang][key];
}

function setLanguage(lang) {
    currentLang = lang;
    document.getElementById('languageSelect').value = lang;
    document.getElementById('pageTitle').textContent = t('pageTitle');
    document.getElementById('pageSubtitle').textContent = t('pageSubtitle');
    document.getElementById('initialLoadingText').textContent = t('initialLoadingText');
    document.getElementById('searchLabel').textContent = t('searchLabel');
    document.getElementById('searchInput').placeholder = t('searchPlaceholder');
    document.getElementById('typeLabel').textContent = t('typeLabel');
    document.getElementById('vendorLabel').textContent = t('vendorLabel');
    document.getElementById('searchBtn').innerHTML = '<i class="fas fa-search me-1"></i>' + t('searchBtn');
    document.getElementById('loadingText').textContent = t('loadingText');
    document.getElementById('resultsLabelText').textContent = t('resultsLabelText');
    document.getElementById('noResultsText').textContent = t('noResultsText');
    document.getElementById('thType').textContent = t('thType');
    document.getElementById('thOUI').textContent = t('thOUI');
    document.getElementById('thVendor').textContent = t('thVendor');
    if (data.length > 0) {
        loadStats();
        populateFilters();
        applyFilters(); // Reaplicar filtros para actualizar paginación
    }
}

// Función para mostrar loading de filtros
function showLoading() {
    document.getElementById('loadingSpinner').style.display = 'block';
}

function hideLoading() {
    document.getElementById('loadingSpinner').style.display = 'none';
}

// Inicializar la página
document.addEventListener('DOMContentLoaded', function() {
    setLanguage('en');
    document.getElementById('globalLoading').style.display = 'block';
    loadData();
    setupEventListeners();
});

function setupEventListeners() {
    document.getElementById('languageSelect').addEventListener('change', function(e) {
        setLanguage(e.target.value);
    });
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', debounce(applyFilters, 300)); // Debounce para optimizar búsquedas
    const filterVendor = document.getElementById('filterVendor');
    filterVendor.addEventListener('input', debounce(applyFilters, 300));
    document.getElementById('filterType').addEventListener('change', applyFilters);
}

// Debounce function para optimizar eventos de input
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Cargar datos desde JSON
async function loadData() {
    try {
        const response = await fetch('oui-vendors.json');
        if (!response.ok) {
            throw new Error('Failed to load JSON file');
        }
        const jsonData = await response.json();
        data = jsonData; // No copiar, usar referencia directa
        filteredData = [...data]; // Solo una copia inicial
        loadStats();
        populateFilters();
        applyFilters(); // Inicial con paginación
    } catch (e) {
        console.error(e);
        document.getElementById('statsRow').innerHTML = `
            <div class="col-12">
                <div class="alert alert-danger" role="alert" style="color: white; background: rgba(220, 53, 69, 0.2); border-color: rgba(220, 53, 69, 0.5);">
                    <i class="fas fa-exclamation-triangle me-2"></i>Error loading data: ${e.message}
                </div>
            </div>
        `;
    } finally {
        document.getElementById('globalLoading').style.display = 'none';
    }
}

// Cargar estadísticas (eficiente, O(n))
function loadStats() {
    const total = data.length;
    const uniqueVendors = new Set(data.map(item => item.vendor)).size;
    const uniqueTypes = new Set(data.map(item => item.type)).size;

    const statsRow = document.getElementById('statsRow');
    statsRow.innerHTML = `
        <div class="col-lg-3 col-md-6 mb-4">
            <div class="card stat-card">
                <div class="card-body">
                    <i class="fas fa-list stat-icon"></i>
                    <h3>${total.toLocaleString()}</h3>
                    <p>${t('totalRecords')}</p>
                </div>
            </div>
        </div>
        <div class="col-lg-3 col-md-6 mb-4">
            <div class="card stat-card">
                <div class="card-body">
                    <i class="fas fa-building stat-icon"></i>
                    <h3>${uniqueVendors.toLocaleString()}</h3>
                    <p>${t('uniqueVendors')}</p>
                </div>
            </div>
        </div>
        <div class="col-lg-3 col-md-6 mb-4">
            <div class="card stat-card">
                <div class="card-body">
                    <i class="fas fa-tag stat-icon"></i>
                    <h3>${uniqueTypes.toLocaleString()}</h3>
                    <p>${t('uniqueTypes')}</p>
                </div>
            </div>
        </div>
        <div class="col-lg-3 col-md-6 mb-4">
            <div class="card stat-card">
                <div class="card-body">
                    <i class="fas fa-database stat-icon"></i>
                    <h3>${total.toLocaleString()}</h3>
                    <p>${t('totalOUIs')}</p>
                </div>
            </div>
        </div>
    `;
}

// Poblar filtros (solo types, ya que vendors son muchos; vendor es input)
function populateFilters() {
    const types = [...new Set(data.map(item => item.type))].sort();

    const typeSelect = document.getElementById('filterType');
    typeSelect.innerHTML = '<option value="">All</option>';
    types.forEach(type => {
        const option = document.createElement('option');
        option.value = type;
        option.textContent = type;
        typeSelect.appendChild(option);
    });
}

// Aplicar filtros (optimizado: filtra una sola vez, usa includes para eficiencia)
function applyFilters() {
    showLoading();
    currentPage = 1; // Reset a página 1
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const selectedType = document.getElementById('filterType').value;
    const vendorTerm = document.getElementById('filterVendor').value.toLowerCase();

    // Filtro eficiente sin copias innecesarias
    filteredData = data.filter(item => {
        const matchesSearch = !searchTerm || 
            item.oui.toLowerCase().includes(searchTerm) || 
            item.vendor.toLowerCase().includes(searchTerm) ||
            item.type.toLowerCase().includes(searchTerm);
        const matchesType = !selectedType || item.type === selectedType;
        const matchesVendor = !vendorTerm || item.vendor.toLowerCase().includes(vendorTerm);
        return matchesSearch && matchesType && matchesVendor;
    });

    setTimeout(() => {
        renderResults();
        renderPagination();
        hideLoading();
    }, 100); // Delay mínimo para spinner
}

// Renderizar resultados con paginación (solo renderiza itemsPerPage)
function renderResults() {
    const tableBody = document.getElementById('tableBody');
    const resultsCount = document.getElementById('resultsCount');
    const noResults = document.getElementById('noResults');
    const paginationInfo = document.getElementById('paginationInfo');

    const totalResults = filteredData.length;
    resultsCount.textContent = totalResults.toLocaleString();

    if (totalResults === 0) {
        tableBody.innerHTML = '';
        noResults.style.display = 'block';
        paginationInfo.textContent = '';
        return;
    }

    noResults.style.display = 'none';
    const start = (currentPage - 1) * itemsPerPage;
    const end = Math.min(start + itemsPerPage, totalResults);
    const pageData = filteredData.slice(start, end); // Solo slice para página actual

    paginationInfo.textContent = t('paginationInfo')
        .replace('{start}', (start + 1).toLocaleString())
        .replace('{end}', end.toLocaleString())
        .replace('{total}', totalResults.toLocaleString());

    tableBody.innerHTML = pageData.map(item => `
        <tr>
            <td>${item.type}</td>
            <td><code>${item.oui}</code></td>
            <td>${item.vendor}</td>
        </tr>
    `).join('');
}

// Renderizar paginación
function renderPagination() {
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const pagination = document.getElementById('pagination');
    if (totalPages <= 1) {
        pagination.innerHTML = '';
        return;
    }

    let paginationHTML = `
        <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
            <a class="page-link" href="#" onclick="changePage(${currentPage - 1}); return false;">Previous</a>
        </li>
    `;

    // Mostrar páginas: actual +/- 2, max 5 páginas visibles
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);
    for (let i = startPage; i <= endPage; i++) {
        paginationHTML += `
            <li class="page-item ${i === currentPage ? 'active' : ''}">
                <a class="page-link" href="#" onclick="changePage(${i}); return false;">${i}</a>
            </li>
        `;
    }

    paginationHTML += `
        <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
            <a class="page-link" href="#" onclick="changePage(${currentPage + 1}); return false;">Next</a>
        </li>
    `;

    pagination.innerHTML = paginationHTML;
}

function changePage(page) {
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    if (page < 1 || page > totalPages) return;
    currentPage = page;
    renderResults();
    renderPagination();
}

// Descargar JSON completo (usa data original)
function downloadFullJSON() {
    const jsonStr = JSON.stringify(data, null, 2);
    downloadBlob(jsonStr, 'application/json', 'oui-vendors-full.json');
}

// Descargar SQL completo
function downloadFullSQL() {
    const sql = generateSQL(data);
    downloadBlob(sql, 'application/sql', 'oui-vendors-full.sql');
}

// Descargar JSON filtrado
function downloadJSON() {
    const jsonStr = JSON.stringify(filteredData, null, 2);
    downloadBlob(jsonStr, 'application/json', 'filtered-data.json');
}

// Descargar SQL filtrado
function downloadSQL() {
    const sql = generateSQL(filteredData);
    downloadBlob(sql, 'application/sql', 'filtered-data.sql');
}

// Función helper para generar SQL (eficiente)
function generateSQL(items) {
    let sql = `-- Table for IEEE IAB data
CREATE TABLE ieee_iab_data (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type VARCHAR(255),
    oui VARCHAR(50),
    vendor VARCHAR(255)
);

-- Data insertion
`;
    items.forEach(item => {
        sql += `INSERT INTO ieee_iab_data (type, oui, vendor) VALUES ('${item.type.replace(/'/g, "\\'")}', '${item.oui}', '${item.vendor.replace(/'/g, "\\'")}');\n`;
    });
    return sql;
}

// Función helper para download
function downloadBlob(content, type, filename) {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}