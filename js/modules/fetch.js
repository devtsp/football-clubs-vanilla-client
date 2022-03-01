export const API_URL = 'https://crud-clubs-api.herokuapp.com';

export const fetchIndex = async () => {
	const response = await fetch(`${API_URL}/index`);
	const data = response.json();
	return data;
};

export const submitForm = async options => {
	const response = await fetch(`${API_URL}/`, options);
	const data = await response.json();
	return data;
};

export const fetchClub = async id => {
	const response = await fetch(`${API_URL}/${id}`);
	const data = response.json();
	return data;
};

export const fetchDelete = async id => {
	const options = {
		method: 'DELETE',
		headers: { 'Content-Type': 'application/json' },
	};
	const response = await fetch(`${API_URL}/${id}`, options);
	const data = await response.json();
	return data;
};
