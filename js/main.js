const getClubs = async () => {
	const response = await fetch('http://localhost:8080/');
	const data = response.json();
	return data;
};

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

const handlePanels = e => {
	const $panels = document.querySelectorAll('.panel');
	[...$panels].forEach($panel => {
		if (e.target.id.includes($panel.id)) {
			$panel.classList.remove('visually-hidden');
		} else {
			$panel.classList.add('visually-hidden');
		}
	});
};

const renderClubItem = club => {
	const $clubItem = document
		.querySelector('#club-item-template')
		.cloneNode(true);
	$clubItem.classList.remove('visually-hidden');
	$clubItem.id = club.id;
	$clubItem.querySelector('#club-detail-link').innerText = club.name;
	$clubItem.querySelector(
		'img'
	).src = `http://localhost:8080/uploads/img/${club.crest}`;
	$clubItem.querySelector('#delete-club').onclick = () => handleDelete(club.id);
	document.querySelector('#all-clubs').appendChild($clubItem);
};

const handleDelete = async id => {
	const options = {
		method: 'DELETE',
		headers: { 'Content-Type': 'application/json' },
	};
	const response = await fetch(`http://localhost:8080/${id}`, options);
	const data = await response.json();
	return data;
};

// const handlePost = async () => {
//   const options = {
//     method: 'POST',
//     headers: { 'Content-Type': 'multipart/form-data' },
//   };
//   const response = fetch('')
// }

document.querySelector('nav').onclick = e => {
	if (e.target.tagName == 'A') {
		handleNavActive(e);
		handlePanels(e);
		if (e.target.id.includes('club-list')) {
			getClubs().then(clubs => {
				if (!clubs.length) {
					document
						.querySelector('#no-clubs')
						.classList.remove('visually-hidden');
				} else {
					document.querySelector('#no-clubs').classList.add('visually-hidden');
					clubs.forEach(club => renderClubItem(club));
				}
			});
		}
	}
};
