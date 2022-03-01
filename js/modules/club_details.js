import { fillEditForm } from './club_edit.js';
import { handlePanelsVisibility } from './nav.js';
import { fetchClub } from './fetch.js';
import { API_URL } from './fetch.js';

const setMapUrl = club => {
	const formattedArea = club.area.replaceAll(' ', '+');
	const formattedLocation = club.adress.replaceAll(' ', '+');
	const mapsDomain = 'https://www.google.com/maps';
	const API_KEY = 'AIzaSyA18JP-S5euBMHAqDoiBu_mhLjYrLAI5mM';
	return `${mapsDomain}/embed/v1/place?key=${API_KEY}&q=${formattedLocation},${formattedArea}`;
};

export const fillDetails = async id => {
	const club = await fetchClub(id);

	document.querySelector('#club-edit-link').dataset.clubId = club.id;
	document.querySelector('#club-edit-link').onclick = e => {
		document.querySelector('#club-edit-link').click();
		handlePanelsVisibility('club-edit');
		fillEditForm(club);
	};

	document.querySelector(
		'#crest-main'
	).style.backgroundImage = `url('${API_URL}/uploads/img/${club.crest}`;

	document.querySelectorAll('.field').forEach($field => {
		$field.innerText = club[`${$field.dataset.property}`];
	});

	document.querySelector('#last-updated-detail').innerText =
		club['last-updated'].match(/\d+-\d+-\d+(?=T)/);

	document.querySelector(
		'#colors-banner'
	).style.backgroundImage = `linear-gradient(to right, transparent, ${club.colors[0]} 20%, ${club.colors[0]} 50%, ${club.colors[1]} 50%, ${club.colors[1]} 80%, transparent)`;

	document.querySelector('#map').src = setMapUrl(club);
};
