(function () {
	const mobileNav = document.querySelector(".crusal");
	const drop = document.querySelector(".dropbox");
	const m_nav = document.getElementById("mobile_nav");
	mobileNav.addEventListener("click", (e) => {
		e.preventDefault();
		e.stopPropagation();
		if (m_nav.className !== "mobile_nav") {
			m_nav.className = "mobile_nav";
			drop.className = "inner_mobil_nav";
			document.body.style.overflow = "hidden";
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
})();



(function () {
	let nightMode = false;
	const modeGutter = document.querySelector(".mode-gutter");
	let scroller = modeGutter.querySelector(".mode_btn");
	let lS = localStorage.getItem("nightMode");
	modeGutter.style.border = "1px solid white";
	if (lS === "true") {
		scroller.style.left = "28px";
		document.body.style.backgroundColor = "black";
		modeGutter.style.backgroundColor = "#000";
		nightMode = true;
	}
	function changeMode() {
		if (!nightMode) {
			scroller.style.left = "28px";
			document.body.style.backgroundColor = "black";
			modeGutter.style.backgroundColor = "#000";
			localStorage.setItem("nightMode", true);
			nightMode = true;
		} else {
			scroller.style.left = "1px";
			document.body.style.backgroundColor = "white";
			modeGutter.style.backgroundColor = "#fff";
			localStorage.setItem("nightMode", false);
			nightMode = false;
		}
	}
	modeGutter.addEventListener("click", changeMode);
})()

// window.addEventListener("load", ()=>{
// 	console.log(window.innerWidth)
// });
