
//window.onload = function() {


    const urlGetCategories = 'https://clienteweb1.azurewebsites.net/Category'
    const urlGetPeliculas = "https://clienteweb1.azurewebsites.net/Pelicula/" 
  
    //cambiar luego a las de AZURE
    
    //console.log(urlGetPasswords)



function renderCat(){
    fetch(urlGetCategories)
    .then(response => response.json())
    .then(data => {
        showCategories(data)

    })
 
    .catch(err => console.log('Error'))

}

renderCat()

function renderPeliculas(e){

    let tbody=  document.getElementsByTagName('tbody')[1]
     tbody.innerHTML = "";

    let siteCat = e.id
    // Mostrar Passwords
     fetch(`${urlGetPeliculas}${siteCat}`)
     .then(response => response.json())
     .then(data => {
         showPeliculas(data)

     })

    .catch(err => console.log('Error'))
    


}

function showCategories(data){

    let tbody=  document.getElementsByTagName('tbody')[0]
    
    data.forEach(category => {
        console.log(category.category)

        let tr = document.createElement('tr')
        let categoryTd = document.createElement('td')
        categoryTd.innerHTML = `<button id = ${category.category} onclick="renderPeliculas(this)" type="button" class="categoryBtn btn btn-light">${category.category.replace("++"," ")}</button>`
        
        //Se podria add una clase para que salga un pointer y se cambie de color cuando pasamos el raton
        categoryTd.setAttribute('id',category.category)
        categoryTd.classList.add('tdclass')

        tr.appendChild(categoryTd)
        tbody.appendChild(tr)

    })

}

function showPeliculas(data){

    let tbody=  document.getElementsByTagName('tbody')[1]
    
    console.log(data)
    dataDescend = data.sort((a, b) => parseFloat(a.year) - parseFloat(b.year)); //Ordenando array
    console.log(dataDescend)
    data.forEach(pelicula => {

        //console.log(`${password.id} + ${password.category} + ${password.user} ` )

        let tr = document.createElement('tr')
        tr.setAttribute('id', pelicula.category)
        let tituloTd = document.createElement('td')
        tituloTd.innerText = pelicula.titulo
        let categoriaTd = document.createElement('td')
        categoriaTd.innerText = pelicula.category
        let likesTd = document.createElement('td')
        likesTd.innerText = pelicula.likes
        let actionsPassword = document.createElement('td')
        actionsPassword.setAttribute('id', pelicula.category)
        actionsPassword.innerHTML = `<button onclick="ver(this); location.href='';" class= accessBtnSite id=${pelicula.id}><i class="far fa-eye"></i></button>
        <button type="button" onclick="saveIdUpdate(this); location.href='addSite.html';"  class= updateBtnSite id=${pelicula.id}><i class="fas fa-heart"></i></button>`
        

        tr.appendChild(tituloTd)
        tr.appendChild(categoriaTd)
        tr.appendChild(likesTd)
        tr.appendChild(actionsPassword)
        tbody.appendChild(tr)

    })

}


function ver(e){
//todo crear modal y llamar a la api para ver una pelicula

}




// Displaying Add category form

function toggleForm(){
  
  var x = document.getElementById("myForm");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

// Create a new category Post

function getInputCategory(event){
    
    const addCategoriesForm = document.querySelector('.categoryForm')
    const categoryValue = document.getElementById('valueCategory')
    
    //Check if input contains only spaces

    if (!categoryValue.value.replace(/\s/g, '').length) {
        event.preventDefault()
        alert('Input only contains whitespaces!')
        return false
        
    } else{ addCategoriesForm.addEventListener('submit', (e) => {
        e.preventDefault()

    
        fetch(urlGetCategories,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
    
            },
            body: JSON.stringify({
                category: categoryValue.value.replace(" ","++")
    
            })
        })
        .then(res => res.json())
        .then(data => 
             {
             const dataArr = []
             dataArr.push(data)
            showCategories(dataArr)
        })
        // Reset fields from form
        //inputs.forEach(input =>  input.value = '12') ///////////////////////////////SIGUE CREANDO UN ESPACIO
     })
    }
}

 
// Delete a category DELETE

function deleteCategory(e){

    //Primero borramos todos los elementos de la tabla categoria y despues cargamos la lista actualizada
    let tbody=  document.getElementsByTagName('tbody')[0]
     tbody.innerHTML = "";

    let deletedCatName = e.id
    
    fetch(`${urlGetCategories}/${deletedCatName}`,{
        method:'DELETE',
        
    })
    .then(data => 
        {
        const dataArr = []
        dataArr.push(data)
        renderCat()
   })
    
}


// Delete site DELETE

function deleteSite(e){
 
    //Primero borramos todos los elementos de la tabla categoria y despues cargamos la lista actualizada
    let tbody=  document.getElementsByTagName('tbody')[1]
    tbody.innerHTML = "";

    //Accedemos a los valos de categoria y al Id de lo que queremos borrar
    let deletedSiteId = e.id
    let deletesiteCat = e.parentElement

    //console.log(deletesiteCat)
    
    fetch(`${urlGetPeliculas}${deletedSiteId}`,{
         method:'DELETE',
        
    })
    .then(data => 
        {
        const dataArr = []
        dataArr.push(data)
        renderPeliculas(deletesiteCat)
        
   })
       
}


// Using localStorage to save id and use in other website

function saveIdCheck(e){

    let seeSiteId = e.id

    localStorage.setItem("idSiteCheck", seeSiteId)
    console.log(localStorage.getItem("idSiteCheck"))

}

function saveIdUpdate(e){

    let seeSiteId = e.id

    localStorage.setItem("idSiteUpdate", seeSiteId)
    console.log(localStorage.getItem("idSiteUpdate"))

}
