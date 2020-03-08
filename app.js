
const cafeList = document.querySelector('#cafe-list')
const form = document.querySelector('#add-cafe-form');

// Create element to render a cafe:
function renderCafe(doc) {
    let li = document.createElement('li');
    let name = document.createElement('span');
    let city = document.createElement('span');

    // We don't need to put 'doc.data.id' because the id is stored at the top of the document, no inside the data!
    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().name; // remember to call the method data() WITH PARENTHESIS!!!
    city.textContent = doc.data().city;

    li.appendChild(name);
    li.appendChild(city);

    cafeList.appendChild(li); // Add this custom li to the ul #cafe-list
}


// Remember that db.collection is an async method! It returns a promise!!!
// We can put it in a variable like: var cafes = db.collection('cafes')
db.collection('cafes').get().then( (snapshot) => {
    // Snapshot refers to the snapshot of the data we'll receive when we receive the data
    console.log(snapshot.docs);
    // We see an array but not the data from the documents! We need to use a different method

    snapshot.docs.forEach(doc => {
        console.log(doc.data());  // doc.data() is a method! use parenthesis!
        renderCafe(doc);
    })
})

// Saving data:
form.addEventListener('submit',(e) => {
    // Clicking the button will reload the page by default.
    e.preventDefault();
    // By using attribute name="blah" in the input form, we can access it by using form.blah
    db.collection('cafes').add({
        name: form.name.value,
        city: form.city.value
    });
    form.reset();

    // Net Ninja's alternative:
    // form.name.value = '';
    // form.city.value = '';
})