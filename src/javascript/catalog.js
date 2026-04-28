const API_BASE = 'https://api.escuelajs.co/api/v1';
const LIMIT = 15;

const state = {
    currentPage: 1,
    totalProducts: 0,
    filters: {
        title: '',
        categoryId: '',
        price_min: '',
        price_max: '',
    },
};

const productsGrid   = document.getElementById("products-grid");
const pagination     = document.getElementById("pagination");
const searchForm     = document.getElementById("search-form");
const searchInput    = document.getElementById("search-input");
const filterCategory = document.getElementById("filter-category");
const filterPriceMin = document.getElementById("filter-price-min");
const filterPriceMax = document.getElementById("filter-price-max");
const btnApply       = document.getElementById("btn-aplly-filter");
const btnClear       = document.getElementById("btn-clear-filter");
const filterPanel    = document.getElementById("filter-panel");
const filterOverlay  = document.getElementById("filter-overlay");
const filterClose    = document.getElementById("filter-close");
const btnFilterMobile= document.getElementById("btn-filter-mobile");

