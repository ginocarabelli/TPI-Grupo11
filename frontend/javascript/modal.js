const myModal = document.getElementById('myModal')
const myInput = document.getElementById('teamName')

myModal.addEventListener('shown.bs.modal', () => {
  myInput.focus()
})