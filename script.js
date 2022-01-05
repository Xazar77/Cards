

const cinemaActors = () => {


    const cardsHeroes = document.querySelector('.cards-heroes');
    const listMovies = document.querySelector('.list-actors');

    let cartArray = [];
    let movieArr = [];

    const renderItems = (data) => {
        
        data.forEach(item => {
            
            const {photo, name, actors, movies, status} = item;

            const card = document.createElement('div');
             
            card.classList.add('card');
         
            
            card.innerHTML = `
            <img src=${photo} alt=${name} class="card-image" />
            <div class="card-text">
                <div class="card-heading">
                    <h1 class="card-title card-title-name">${name}</h1>
                    <h2 class="card-title card-title-actors">${actors}</h2>
                    <h3 class="card-title card-title-status">${status}</h3>
                </div>
            
                <div class="card-info">
                    <div class ="movies" > ${movies}</div>
                </div>
                      
           `;
           if (movies != null) {
               
            movieArr.push(movies);
           
            localStorage.setItem('movies', JSON.stringify(movieArr));
           }
           
            cartArray.push(item);
            localStorage.setItem('heroes', JSON.stringify(cartArray));
 
            cardsHeroes.append(card);
            
        });

        movieArr = JSON.parse(localStorage.getItem('movies'));
        
       
        listMovies.addEventListener('change', (e) => {
           
            console.log(e.target.value);
             
            const cardItem = document.querySelectorAll('.card');
            const movieItem = document.querySelectorAll('.card .movies');
            
             console.log(movieItem[0]);
                     
            cardItem.forEach((el, index) => {

                el.style.display = 'none';
               
                if (movieItem[index].textContent.includes(e.target.value)) {

                    el.style.display = 'block';
                    console.dir(movieItem[index].textContent.includes(e.target.value));

                } 
            

            });

        });



    };

    function arrayUnique(arr) {
        
        return arr.filter((e, i, a) => a.indexOf(e) == i);
    }



    const renderMovies = () => {
        
        const arr = JSON.parse(localStorage.getItem('movies'));
       
        let arrUnique = arrayUnique(arr.join().split(','));
       
            arrUnique.forEach((el, index) => {
                
                const option = document.createElement('option');
                
                option.innerHTML = `
                    
                    <option value=${index}>${el}</option>
                `;
                
                listMovies.append(option);
            }); 

    };
    renderMovies();

   



     const getData = (url) => {
         return fetch(url)
             .then(res => res.json())
             .then(data => {
               
                renderItems(data);
                 
             })
             .catch(error => console.log(error));
     };
     getData('dbHeroes.json');

};

 cinemaActors();