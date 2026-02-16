document.addEventListener('DOMContentLoaded', function () {
    const listElement = document.getElementById('news-list');
    const paginationElement = document.getElementById('pagination');
    const itemsPerPage = 10;
    let currentPage = 1;
    let allNewsData = [];

    // 1. JSONデータを取得
    fetch('./data/news.json')
        .then(response => response.json())
        .then(data => {
            allNewsData = data;
            displayPage(1);
        })
        .catch(error => console.error('Error loading news:', error));

    // 2. 指定したページのお知らせを表示
    function displayPage(page) {
        currentPage = page;
        listElement.innerHTML = ''; // 一旦クリア

        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const pageItems = allNewsData.slice(start, end);

        pageItems.forEach(item => {
            const li = document.createElement('li');
            li.className = 'news-archive-item';
            
            // カテゴリによってクラスを出し分け（"重要"や"新作"など）
            let categoryClass = '';
            if(item.category === '重要' || item.category === '店休日') categoryClass = 'label-important';
            if(item.category === '新作') categoryClass = 'label-new';

            li.innerHTML = `
                <a href="${item.url}">
                    <span class="date">${item.date}</span>
                    <span class="category ${categoryClass}">${item.category}</span>
                    <span class="title">${item.title}</span>
                </a>
            `;
            listElement.appendChild(li);
        });

        renderPagination();
        window.scrollTo({ top: 400, behavior: 'smooth' }); // メインビジュアルの下あたりへ移動
    }

    // 3. ページネーションボタンを生成
    function renderPagination() {
        paginationElement.innerHTML = '';
        const totalPages = Math.ceil(allNewsData.length / itemsPerPage);

        if (totalPages <= 1) return; // 10件以下ならボタンを出さない

        for (let i = 1; i <= totalPages; i++) {
            const btn = document.createElement('span');
            btn.textContent = i;
            btn.className = 'page-btn';
            if (i === currentPage) btn.classList.add('current');
            
            btn.addEventListener('click', () => displayPage(i));
            paginationElement.appendChild(btn);
        }
    }
});