import { fetchIndex, fetchDelete } from './fetch.js';
import { handlePanelsVisibility } from './nav.js';
import { fillDetails } from './club_details.js';

const renderClubItem = club => {
	const $clubItem = document
		.querySelector('#club-item-template')
		.cloneNode(true);

	$clubItem.id = club.id;

	$clubItem.querySelector('.club-delete-link').dataset.clubId = club.id;

	$clubItem.querySelector('.club-detail-link').dataset.clubId = club.id;
	$clubItem.querySelector('.club-detail-link').innerText = club.name;

	$clubItem.querySelector(
		'.flag-mini'
	).style.backgroundImage = `linear-gradient(to bottom right, ${club.colors[0]} 50%, ${club.colors[1]} 50%)`;

	$clubItem.classList.remove('visually-hidden');

	document.querySelector('#all-clubs').appendChild($clubItem);

	setIndexEvents($clubItem);

	return $clubItem;
};

const handleDelete = id => {
	document.querySelector('#all-clubs').classList.add('visually-hidden');

	document
		.querySelector('#delete-confirmation')
		.classList.remove('visually-hidden');

	document.querySelector('#delete-yes').onclick = e => {
		document.querySelector('#all-clubs').classList.remove('visually-hidden');
		document.querySelector('#' + id).remove();
		fetchDelete(id);

		document
			.querySelector('#delete-confirmation')
			.classList.add('visually-hidden');
	};

	document.querySelector('#delete-no').onclick = e => {
		document.querySelector('#all-clubs').classList.remove('visually-hidden');

		document
			.querySelector('#delete-confirmation')
			.classList.add('visually-hidden');
	};
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

document.querySelector('#create-one').onclick = e => {
	document.querySelector('#club-create-tab').click();
};

document.querySelector('#club-list-tab').onclick = e => {
	displayIndexOfClubs();
};

document.onclick = e => {
	const storedClubs = document.querySelector('#all-clubs').children.length;
	const handlingDelete = !document
		.querySelector('#delete-confirmation')
		.classList.contains('visually-hidden');

	if (!storedClubs && !handlingDelete) {
		document.querySelector('#no-clubs').classList.remove('visually-hidden');
	} else {
		document.querySelector('#no-clubs').classList.add('visually-hidden');
	}
};
