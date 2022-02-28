const fetchIndex = async () => {
	const response = await fetch('http://localhost:8080/index');
	const data = response.json();
	return data;
};

const fetchClub = async id => {
	const response = await fetch(`http://localhost:8080/${id}`);
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

const handlePanelsVisibility = id => {
	const $panels = document.querySelectorAll('.panel');
	[...$panels].forEach($panel => {
		if (id.includes($panel.id)) {
			$panel.classList.remove('visually-hidden');
		} else {
			$panel.classList.add('visually-hidden');
		}
	});
};

const fetchDelete = async id => {
	const options = {
		method: 'DELETE',
		headers: { 'Content-Type': 'application/json' },
	};
	const response = await fetch(`http://localhost:8080/${id}`, options);
	const data = await response.json();
	return data;
};

const handleDelete = async id => {
	fetchDelete(id);
	document.querySelector(`#${id}`).remove();
};

const fillEditForm = club => {
	document.querySelector('#edit-form').dataset.clubId = club.id;
	handleColorInput(club);
	const $inputs = document.querySelectorAll('.edit-input');
	$inputs.forEach($input => {
		$input.value = club[`${$input.name}`];
	});
	return [...$inputs];
};

const fillDetails = async id => {
	const club = await fetchClub(id);
	document.querySelector('#club-edit-link').dataset.clubId = club.id;
	document.querySelector('#club-edit-link').onclick = e => {
		document.querySelector('#club-edit-link').click();
		handlePanelsVisibility('club-edit');
		fillEditForm(club);
	};
	document.querySelector(
		'#crest-main img'
	).src = `http://localhost:8080/uploads/img/${club.crest}`;

	document.querySelectorAll('.field').forEach($field => {
		$field.innerText = club[`${$field.id}`];
	});
	document.querySelector(
		'#colors-banner'
	).style.backgroundImage = `linear-gradient(to right, transparent, ${club.colors[0]} 20%, ${club.colors[0]} 50%, ${club.colors[1]} 50%, ${club.colors[1]} 80%, transparent)`;
};

const handleColorInput = club => {
	const $color1Prev = document.querySelector('#color-1');
	const $color2Prev = document.querySelector('#color-2');
	const $color1 = $color1Prev.cloneNode(true);
	const $color2 = $color2Prev.cloneNode(true);
	document.querySelector('#color1-field-container').children[0].remove();
	document.querySelector('#color2-field-container').children[0].remove();
	document.querySelector('#color1-field-container').appendChild($color1);
	document.querySelector('#color2-field-container').appendChild($color2);
	$color1.value = club.colors[0];
	$color2.value = club.colors[1];
	document
		.querySelector('#color-1')
		.classList.add('form-control', 'edit-color');
	document
		.querySelector('#color-2')
		.classList.add('form-control', 'edit-color');
	return [$color1, $color2];
};

const resetNavLinksStyle = () => {
	document.querySelectorAll('nav a').forEach($tab => {
		$tab.classList.remove('text-decoration-none', 'fw-bold', 'text-black');
		$tab.classList.add('text-black-50');
	});
};

const setIndexEvents = $clubItem => {
	$clubItem.querySelector('.delete-club').onclick = e =>
		handleDelete(e.target.dataset.clubId);
	$clubItem.querySelector('.club-detail-link').onclick = e => {
		resetNavLinksStyle();
		fillDetails(e.target.dataset.clubId);
		handlePanelsVisibility('club-details');
	};
};

const renderClubItem = club => {
	const $clubItem = document
		.querySelector('#club-item-template')
		.cloneNode(true);
	$clubItem.id = club.id;
	$clubItem.querySelector('.club-delete-link').dataset.clubId = club.id;
	$clubItem.querySelector('.club-detail-link').dataset.clubId = club.id;
	$clubItem.querySelector('.club-detail-link').innerText = club.name;
	$clubItem.querySelector(
		'img'
	).src = `http://localhost:8080/uploads/img/${club.crest}`;
	$clubItem.classList.remove('visually-hidden');
	document.querySelector('#all-clubs').appendChild($clubItem);
	setIndexEvents($clubItem);
	return $clubItem;
};

const displayIndexOfClubs = async () => {
	const index = await fetchIndex();
	if (!index.length) {
		document.querySelector('#no-clubs').classList.remove('visually-hidden');
	} else {
		document.querySelector('#no-clubs').classList.add('visually-hidden');
		[...document.querySelector('#all-clubs').children].forEach(club => {
			club.remove();
		});
		index.forEach(club => renderClubItem(club));
	}
	return document.querySelector('#all-clubs');
};

document.querySelector('nav').onclick = e => {
	if (e.target.tagName == 'A') {
		handleNavActive(e);
		handlePanelsVisibility(e.target.id);
		return e.target.id;
	}
};

document.querySelector('#club-list-tab').onclick = e => {
	displayIndexOfClubs();
};

document.querySelector('#edit-form').onsubmit = async e => {
	e.preventDefault();
	const options = {
		method: 'POST',
		headers: { 'Content-Type': 'form-data' },
	};
	const response = await fetch(
		`http://localhost:8080/edit/${e.target.dataset.clubId}`,
		options
	);
	const data = await response.json();
	console.log(data);
	// document.querySelector('#club-list-tab').click();
};
