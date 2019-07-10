connect('localhost:4848', 'Consumer Sales.qvf').then((app) => {
	const novas = {
		'nova-table': window['nova-table']()
	};
	const sn = {
		component: {
			mounted(element) {
				element.textContent = 'Hello';
			},
		},
	};

	const nebbie = window.nucleus(app, {
		load: (type, config) => config.Promise.resolve(novas[type.name] || sn),
	});

	nebbie.selections().mount(document.querySelector('.toolbar'));

	nebbie.create({
		type: 'nova-table',
	}, {
		element: document.getElementById('nova01'),
		properties: {
			qHyperCubeDef: {
				qDimensions: [{
					qDef: {
						qFieldDefs: ['Customer']
					}
				}],
				qMeasures: [{
					qDef: {
						qDef: 'Sum([Sales Amount])'
					}
				}],
				qInitialDataFetch: [{
					qWidth: 5,
					qHeight: 1000
				}]
			}
		}
	});
});