export const API_URL = 'https://crud-clubs-api.herokuapp.com';

export const fetchIndex = async () => {
	toggleLoading();
	const response = await fetch(`${API_URL}/index`);
	const data = response.json();
	toggleLoading();
	return data;
};

export const submitForm = async options => {
	toggleLoading();
	const response = await fetch(`${API_URL}/`, options);
	const data = await response.json();
	toggleLoading();
	return data;
};

export const submitEdit = async (options, id) => {
	toggleLoading();
	const response = await fetch(`${API_URL}/edit/${id}`, options);
	const data = await response.json();
	toggleLoading();
	return data;
};

export const fetchClub = async id => {
	toggleLoading();
	const response = await fetch(`${API_URL}/${id}`);
	const data = response.json();
	toggleLoading();
	return data;
};

export const fetchDelete = async id => {
	toggleLoading();
	const options = {
		method: 'DELETE',
		headers: { 'Content-Type': 'application/json' },
	};
	const response = await fetch(`${API_URL}/${id}`, options);
	const data = await response.json();
	toggleLoading();
	return data;
};

const toggleLoading = () => {
	document.querySelector('#loading').classList.toggle('visually-hidden');
};
