document.getElementById('myButton').addEventListener('click', function() {
    document.getElementById('overlay').style.display = 'flex'; 
});

function goToPage(url) {
    window.location.href = url; 
}
document.querySelector('.burger-menu').addEventListener('click', function() {
    document.querySelector('.nav-list').classList.toggle('active');
});
