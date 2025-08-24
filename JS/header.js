// HEADER
function showSidebar() {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) sidebar.classList.add('active');
}
function hideSidebar() {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) sidebar.classList.remove('active');
}

// Optional: Close sidebar when clicking outside
document.addEventListener('click', function (event) {
    const sidebar = document.querySelector('.sidebar');
    const menuButton = event.target.closest('[onclick="showSidebar()"]');

    if (!sidebar.contains(event.target) && !menuButton && sidebar.classList.contains('active')) {
        hideSidebar();
    }
});
