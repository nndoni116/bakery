document.addEventListener('DOMContentLoaded', function () {
    const listElement = document.getElementById('news-list');
    const paginationElement = document.getElementById('pagination');
    const itemsPerPage = 10;
    let currentPage = 1;
    let allNewsData = [];

    fetch('./json/news.json')
        .then(response => response.json())
        .then(data => {
            allNewsData = data;
            displayPage(1);
        })
        .catch(error => console.error('Error loading news:', error));

    function displayPage(page) {
        currentPage = page;
        listElement.innerHTML = '';

        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const pageItems = allNewsData.slice(start, end);

        pageItems.forEach(item => {
            const li = document.createElement('li');
            li.className = 'news-archive-item';

            let categoryClass = '';
            if (item.category === '重要' || item.category === '店休日') categoryClass = 'label-important';
            if (item.category === '新作') categoryClass = 'label-new';

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
       
    }

    function renderPagination() {
        paginationElement.innerHTML = '';
        const totalPages = Math.ceil(allNewsData.length / itemsPerPage);

        if (totalPages <= 1) return;

        for(let i = 1; i <= totalPages; i++) {
            const btn = document.createElement('span');
            btn.textContent = i;
            btn.className = 'page-btn';
            if(i === currentPage) btn.classList.add('current');

            btn.addEventListener('click', () => displayPage(i));
            paginationElement.appendChild(btn);
        }
    }
});

