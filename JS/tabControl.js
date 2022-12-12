var urlAPI;

const tabsBtn   = document.querySelectorAll(".tabs__nav-btn");
const tabsItems = document.querySelectorAll(".tabs__item");

/**
 * Асинхронная функция загрузки данных из API
 */
async function fetchHandler(urlAPI) {
  try {
      const response = await fetch(urlAPI);
      if (response.ok) {
        const data = await response.json();
        return data
      }
      else {
        alert("Ошибка HTTP: " + response.status);
      }
  } catch (error) {
      console.log(error);
  }
}

tabsBtn.forEach(onTabClick);

function onTabClick(item) {
    item.addEventListener("click", function() {
        let currentBtn = item;
        let tabId = currentBtn.getAttribute("data-tab");
        let currentTab = document.querySelector(tabId);

        if( ! currentBtn.classList.contains('active') ) {
            tabsBtn.forEach(function(item) {
                item.classList.remove('active');
            });
    
            tabsItems.forEach(function(item) {
                item.classList.remove('active');
            });
    
            currentBtn.classList.add('active');
            currentTab.classList.add('active');
        }

        /**
        * Загрузка информации в таб 2
        */
        if (tabId === "#tab_2") {
            urlAPI = 'http://jservice.io/api/random?count=1';
            const divTab2 = document.getElementById("tab_2");
            divTab2.innerHTML = "";
            var tab_2_res = fetchHandler(urlAPI);

            tab_2_res.then(value => {
              for (let i = 0; i < value.length; i++) {
                divTab2.innerHTML += `<h1>${value[i].answer}</h1>`
                divTab2.innerHTML += `
                <p>
                  id: ${value[i].id}</br>
                  question: ${value[i].question}</br>
                  value: ${value[i].value}</br>
                  airdate: ${value[i].airdate}</br>
                  created_at: ${value[i].created_at}</br>
                  updated_at: ${value[i].updated_at}</br>
                  category_id: ${value[i].category_id}</br>
                  game_id: ${value[i].game_id}</br>
                  invalid_count: ${value[i].invalid_count}
                </p>`
                divTab2.innerHTML += '<h3>Категория</h3>'
                divTab2.innerHTML += `
                <p>
                  clues_count: ${value[i].category.clues_count}</br>
                  created_at: ${value[i].category.created_at}</br>
                  id: ${value[i].category.id}</br>
                  title: ${value[i].category.title}</br>
                  updated_at: ${value[i].category.updated_at}</br>
                </p>`
              }
           });
         };

        /**
        *  Загрузка случайных картинок в таб 3
        */
        if (tabId === "#tab_3") {
            const button = document.querySelector(".btnNextPic");
            const image = document.querySelector(".imgRandom");
            urlAPI = "http://aws.random.cat/meow";
            
            button.addEventListener("click", () => {
                let isLoaded = image.complete;
                
                if (isLoaded) {
                    fetchHandler(urlAPI).then(value => {
                        image.src = value.file;
                    })
                }
            });
        };
    });
}

document.querySelector('.tabs__nav-btn').click();


