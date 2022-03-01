import { submitForm } from './fetch.js';

document.querySelector('#crest').onchange = e => {
	const [image] = e.target.files;
	if (image) {
		const reader = new FileReader();

		reader.onload = () => {
			document.querySelector(
				'#new-club-form .crest-main-preview'
			).style.backgroundImage = `url('${reader.result}')`;
		};

		reader.readAsDataURL(image);
	} else {
		document.querySelector(
			'#new-club-form .crest-main-preview'
		).style.backgroundImage = 'url("../images/crest-empty.png")';
	}
};

document.querySelector('#new-club-form').onsubmit = async e => {
	e.preventDefault();
	const formData = new FormData(e.target);
	const options = {
		method: 'POST',
		body: formData,
	};
	const posted = submitForm(options);
	document.querySelector('#club-list-tab').click();
};
