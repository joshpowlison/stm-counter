const moduleFunctions = {
	"setCounter": setCounter,
	"addToCounter": addToCounter,
	"subtractFromCounter": subtractFromCounter,
	"deleteCounter": deleteCounter,
};

Module.LoadModule(moduleFunctions);

const name = 'Counter';
const container = document.getElementById("container");

var counters = [];

async function setCounter(name, event)
{
	var value = event.value;

	if (isNaN(event.value))
		value = 0;

	setCounter(event.name, value);
}

async function addToCounter(name, event)
{
	if (isNaN(event.value))
		return;

	var counter = getCounter(event.name)
	var value = counter.value + event.value;
	setCounter(counter, value);
}

async function subtractFromCounter(name, event)
{
	if (isNaN(event.value))
		return;

	var counter = getCounter(event.name)
	var value = counter.value + event.value;
	setCounter(counter, value);
}

async function deleteCounter(name, event)
{
	for (var i = 0, l = counters.length; i < l; i++) {
		// Remove the element and remove the counter
		// from the list
		if (counters[i].name == event.name)
		{
			counters[i].el.remove();
			counters.splice(i, 1);
			break;
		}
	}
}

// Either gets the existing counter or creates it if it
// doesn't exist
function getCounter(counterName)
{
	// Get the matching counter, if it exists
	var counter = null;
	for (var i = 0, l = counters.length; i < l; i++)
	{
		if (counters[i].name === counterName) {
			counter = counters[i];
			break;
		}
	}

	// If the counter didn't exist,
	// create it
	if (counter == null)
	{
		var el = document.createElement('p');
		el.className = 'counter';

		container.appendChild(el);
		counter = {
			el: el,
			value: 0,
			name: counterName
		};

		counters.push(counter);
	}
	
	return counter;
}

function setCounter(counterName, value)
{
	const counter = getCounter(counterName);
	counter.value = value;
	
	counter.el.innerText = counter.name + ": " + counter.value;
}