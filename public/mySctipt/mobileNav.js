
const mobileNav = document.querySelector(".crusal");
const drop = document.querySelector(".dropbox");
const m_nav = document.getElementById("mobile_nav");
mobileNav.addEventListener("click", (e) => {
	e.preventDefault();
	e.stopPropagation();
	if (m_nav.className !== "mobile_nav") {
		m_nav.className = "mobile_nav";
		drop.className = "inner_mobil_nav";
		document.body.style.overflow = 'hidden'
	} else {
		m_nav.className = "hide";
		drop.className = "dropbox";
		document.body.style.overflow = "scroll";
	}
});
drop.addEventListener("click", () => {
	m_nav.className = "hide";
	drop.className = "dropbox";
	document.body.style.overflow = "scroll";
});
setTimeout(() => {
	if (drop) {
		drop.addEventListener("click", () => {
			m_nav.className = "hide";
			drop.className = "dropbox";
			document.body.style.overflow = "scroll";
		});
	}
}, 300);


