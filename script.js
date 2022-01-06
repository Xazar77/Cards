

const cinemaActors = () => {


    const cardsHeroes = document.querySelector('.movie-card');
    const listMovies = document.querySelector('#select-movie');

    let cartArray = [];
    let movieArr = [];


    const getData = (url) => {
        return fetch(url)
            .then(res => res.json())
            .then(data => {

                renderItems(data);

            })
            .catch(error => console.log(error));
    };
    getData('dbHeroes.json');

    const renderItems = (data) => {
        
        data.forEach(item => {
            
            const {photo, name, actors, movies, status} = item;

            const card = document.createElement('div');
             
            card.classList.add('card');
            card.style.cssText = `
                height: 600px;
                width: 300px;
                background-color: rgba(212, 177, 250, 0.4);
                border-radius: 15px;
                margin-left: 10px;
                margin-rigth: 10px;
                margin-bottom: 10px;
                `;
         
            
            card.innerHTML = `
                
                    <h3 class="name">${name}</h3>
                     <div class="poster">
                         <img src=${photo} alt="">
                     </div>
                     <h3 class="actors">${actors}</h3>
                     <div class="movie-name">
                         <div class="movies">${movies}</div>
                     </div>
                    <h4 class="status">${status}</h4>
               ` ;

           if (movies != null) {
               
            movieArr.push(movies);
           
            localStorage.setItem('movies', JSON.stringify(movieArr));
           }
           
            cartArray.push(item);
            localStorage.setItem('heroes', JSON.stringify(cartArray));
 
            cardsHeroes.append(card);
            
        });

        movieArr = JSON.parse(localStorage.getItem('movies'));
        // console.log(movieArr);
       
        listMovies.addEventListener('change', (e) => {
           
            console.log(e.target.value);
             
            const cardItem = document.querySelectorAll('.card');
            const movieItem = document.querySelectorAll('.card .movies');
            
                     
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
        
        let arr = JSON.parse(localStorage.getItem('movies'));
       console.log(arr);
        let arrUnique = arrayUnique(arr.join().split(','));
        console.log(arrUnique);
       
            arrUnique.forEach((el, index) => {
                
                const option = document.createElement('option');
                
                option.innerHTML = `
                    
                    <option value=${index}>${el}</option>
                `;
                
                listMovies.append(option);
            }); 

    };
    renderMovies();

   





};

 cinemaActors();