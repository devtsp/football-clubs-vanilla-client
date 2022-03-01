const handleNavActive = e => {
	const $tabs = document.querySelectorAll('.tab');
	[...$tabs].forEach($tab => {
		if ($tab.id == e.target.id) {
			$tab.classList.add('text-decoration-none', 'fw-bold', 'text-black');
			$tab.classList.remove('text-black-50');
		} else {
			$tab.classList.remove('text-decoration-none', 'fw-bold');
			$tab.classList.add('text-black-50');
		}
	});
};

export const handlePanelsVisibility = id => {
	const $panels = document.querySelectorAll('.panel');
	[...$panels].forEach($panel => {
		if (id.includes($panel.id)) {
			$panel.classList.remove('visually-hidden');
		} else {
			$panel.classList.add('visually-hidden');
		}
	});
};

document.querySelector('nav').onclick = e => {
	if (e.target.tagName == 'A') {
		handleNavActive(e);
		handlePanelsVisibility(e.target.id);
		return e.target.id;
	}
};
