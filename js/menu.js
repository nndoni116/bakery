"use strict";

$(document).ready(function () {

  $.ajax({ url: '../json/menu.json', dataType: 'json' })
    .done(function (data) {
      const recentMenu = data.slice(0, 3);
      const $menuContainer = $('#recent-menu-contents');

      recentMenu.forEach(function (item) {
        $menuContainer.append(`
          <article class="menu-item">
            <img src="${item.image}" alt="${item.title}">
            <h3>${item.title}</h3>
            <p class="description">${item.description}</p>
           </article>`
        );
      });
    })

    .fail(function () {
      console.error("データの読み込みに失敗しました")
    });
  });
