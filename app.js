// alert('hello');
const modalWrapper = document.querySelector('.modal-wrapper');
//addModal
const addModal = document.querySelector('.add-modal');
const tableUser = document.querySelector('.user-table');
const addModalForm = document.querySelector('.add-modal .form');
//addUser 
const btnAdd = document.querySelector('.btn-addUser');

//create element and render the user 
const renderUser = doc => {
    const tr = `
    <tr data-id = '${doc.id}'>
    <td>${doc.data().firstName}</td>
    <td>${doc.data().lastName}</td>
    <td>${doc.data().email}</td>
    <td>${doc.data().phone}</td>
    <td>
        <button class="btn btn-edit">Edit</button>
        <button class="btn btn-delete">Delete</button>
    </td>
    </tr>
    `;
    tableUser.insertAdjacentHTML('beforeend', tr);

    //click delete user 
    const btnDelete = document.querySelector(`[data-id='${doc.id}'] .btn-delete`);
    btnDelete.addEventListener('click', () => {
        db.collection('users').doc(`${doc.id}`).delete().then(() => {
            console.log('document successfully deleted');
        }).catch(err => {
            console.log('error in the document');
        })
    });
}

btnAdd.addEventListener("click", display);

function display() {
    addModal.classList.add('modal-show');

}

//user click outsde the model 
window.addEventListener('click', e => {
    if (e.target === addModal) {
        addModal.classList.remove('modal-show');
    }
});

//get all users
db.collection('users').get().then(querySnapshot => {
    querySnapshot.forEach(doc => {
        console.log(doc.data());
        renderUser(doc);
    });
})

//click submit in add modal
addModalForm.addEventListener('submit', e => {
    e.preventDefault();

    db.collection('users').add({
        firstName: addModalForm.firstname.value,
        lastName: addModalForm.lastname.value,
        phone: addModalForm.phone.value,
        email: addModalForm.email.value,
    });
    modalWrapper.classList.remove('modal-show');
});