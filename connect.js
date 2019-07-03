window.connect = function connect(host, id) {
	return fetch('https://unpkg.com/enigma.js/schemas/3.2.json').
	then(response => response.json()).
	then(schema => window.enigma.create({
		schema,
		url: `ws://${host}/app/${id}`,
	}).open().then(qix => qix.openDoc(id)));
};