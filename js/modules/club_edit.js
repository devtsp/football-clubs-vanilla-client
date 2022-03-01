import { API_URL } from './fetch.js';
import { submitEdit } from './fetch.js';

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

export const fillEditForm = club => {
	document.querySelector('#edit-form').dataset.clubId = club.id;
	handleColorInput(club);
	const $inputs = document.querySelectorAll('.edit-input');
	$inputs.forEach($input => {
		$input.value = club[`${$input.name}`];
	});

	document.querySelector(
		'#edit-form .crest-main-preview'
	).style.backgroundImage = `url('${API_URL}/uploads/img/${club.crest}')`;

	document.querySelector('#crest-edit').onchange = e => {
		const [image] = e.target.files;
		if (image) {
			const reader = new FileReader();
			reader.onload = () => {
				document.querySelector(
					'#edit-form .crest-main-preview'
				).style.backgroundImage = `url('${reader.result}')`;
			};
			reader.readAsDataURL(image);
		} else {
			document.querySelector(
				'#edit-form .crest-main-preview'
			).style.backgroundImage = 'url("../images/crest-empty.png")';
		}
	};

	document.querySelector('#edit-form').onsubmit = e => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const options = {
			method: 'POST',
			body: formData,
		};
		submitEdit(options, e.target.dataset.clubId);
		document.querySelector('#club-list-tab').click();
	};

	return [...$inputs];
};
