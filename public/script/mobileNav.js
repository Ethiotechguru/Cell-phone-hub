const mobileNav = document.querySelector(".crusal");

const drop = document.querySelector(".dropbox");
const m_nav = document.getElementById("mobile_nav");
mobileNav.addEventListener('click', ()=>{
    
    if (m_nav.className !== "mobile_nav") {
		m_nav.className = "mobile_nav";
		drop.className = "inner_mobil_nav";
	} else {
		m_nav.className = "hide";
		drop.className = "dropbox";
	}
    console.log(m_nav.className);
});
if (drop) {
	drop.addEventListener("click", () => {
		m_nav.className = "hide";
		drop.className = "dropbox";
	});
}
