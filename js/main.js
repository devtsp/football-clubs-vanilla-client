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

const handleDelete = async id => {
	const options = {
		method: 'DELETE',
		headers: { 'Content-Type': 'application/json' },
	};
	const response = await fetch(`http://localhost:8080/${id}`, options);
	const data = await response.json();
	return data;
};

const fillDetails = club => {
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

const fillEditForm = club => {
	console.log(club.colors[0]);
	console.log(club.colors[1]);
	document.querySelectorAll('.edit-input').forEach($input => {
		$input.value = club[`${$input.name}`];
	});
	console.log(document.querySelector('#color-1'));
	console.log(document.querySelector('#color-2'));
	document.querySelector('#color-1').value = club.colors[0];
	document.querySelector('#color-2').value = club.colors[1];
	document.querySelector('#color-1').style.backgroundColor = club.colors[0];
	document.querySelector('#color-2').style.backgroundColor = club.colors[1];
	console.log(document.querySelector('#color-1'));
	console.log(document.querySelector('#color-2'));
};

const renderClubItem = club => {
	const $clubItem = document
		.querySelector('#club-item-template')
		.cloneNode(true);
	$clubItem.classList.remove('visually-hidden');
	$clubItem.id = club.id;
	$clubItem.querySelector('.club-detail-link').innerText = club.name;
	$clubItem.querySelector(
		'img'
	).src = `http://localhost:8080/uploads/img/${club.crest}`;
	$clubItem.querySelector('.delete-club').onclick = () => handleDelete(club.id);
	$clubItem.querySelector('.club-detail-link').onclick = () => {
		document.querySelectorAll('nav a').forEach($tab => {
			$tab.classList.remove('text-decoration-none', 'fw-bold', 'text-black');
			$tab.classList.add('text-black-50');
		});
		// handlePanelsVisibility('club-details');
		fillDetails(club);
		fillEditForm(club);
	};
	// $clubItem.querySelector('#club-edit-link').onclick = e => {
	// 	fillEditForm(club);
	// };
	document.querySelector('#all-clubs').appendChild($clubItem);
};

document.querySelector('nav').onclick = e => {
	if (e.target.tagName == 'A') {
		handleNavActive(e);
		handlePanelsVisibility(e.target.id);
	}
};

getClubs().then(clubs => {
	if (!clubs.length) {
		document.querySelector('#no-clubs').classList.remove('visually-hidden');
	} else {
		document.querySelector('#no-clubs').classList.add('visually-hidden');
		clubs.forEach(club => renderClubItem(club));
	}
});
