import 'paginationjs/dist/pagination.js'
import 'paginationjs/dist/pagination.css'

$('.js-pagination').pagination({
  dataSource: [1, 2, 3, 4, 5],
  pageSize: 0.35,
  pageRange: 1,
  showNavigator: true,
  formatNavigator: '<span><%= currentPage %></span> – 12 из 100+ вариантов аренды',
  showPrevious: false,
  showNext: true,
  nextText: '<span class="material-icons js-pagination__next-button">arrow_forward</span>',
  autoHideNext: true,
})