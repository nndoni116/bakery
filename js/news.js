"use strict";

$(document).ready(function () {

  $.ajax({url: './json/news.json', dataType: 'json'})
  .done(function(data) {
    const recentNews = data.slice(0, 3);
    const $listContainer = $('#news-list');

    recentNews.forEach(function (item) {
      $listContainer.append(`<li>
        <span class="date">${item.date}</span>
        <span class="category">${item.category}</span>
        <a href="${item.url}">${item.title}</a>
        </li>`
      );
    });
  })

  .fail(function() {
    console.error("データの読み込みに失敗しました")
  });
    
})