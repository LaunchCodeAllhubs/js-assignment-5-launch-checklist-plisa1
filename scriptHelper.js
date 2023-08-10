// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    // grab div id called missionTarget
    let missionTarget = document.getElementById('missionTarget');
    // change elements with new h2 and list values from JSON
    missionTarget.innerHTML = `
                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: ${name}</li>
                    <li>Diameter: ${diameter} </li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: ${distance}</li>
                    <li>Number of Moons: ${moons}</li>
                </ol>
                <img src='${imageUrl}'>
                `
}

function validateInput(testInput) {
    // if values are not valid, return empty
    if (testInput === "" || testInput === null || testInput === 0) {
        return `Empty`
    } else if ((!isNaN(Number(testInput)))) {
        return `Is a Number`
    } else {
        return 'Not a Number'
    }
}

function formSubmission (document, list, pilot, copilot, fuelLevel, cargoLevel) {
    // assign params to id
    let pilotStatus = document.getElementById('pilotStatus');
    let copilotStatus = document.getElementById('copilotStatus');
    let fuelStatus = document.getElementById('fuelStatus');
    let launchStatus = document.getElementById('launchStatus');
    let cargoStatus = document.getElementById('cargoStatus');

    //if all fields are invalid
    if (validateInput(pilot) == `Empty`|| validateInput(copilot) == `Empty`|| 
    validateInput(fuelLevel) == `Empty`||validateInput(cargoLevel) == `Empty`) {
        alert(`All fields are required`);
    } else if (validateInput(fuelLevel) == 'Not a Number' || validateInput(cargoLevel) == 'Not a Number') {
        alert(`Fuel Level and Cargo Mass need to be numbers`);
    } else if (validateInput(pilot) == `Is a Number`|| validateInput(copilot) ==`Is a Number`) {
        alert('Pilot or co-pilot names need to have letters');
    } else {
    // valid fields for pilots
    pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
    copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;
    list.style.visibility = 'hidden';
    }
    // status update based on fuel & cargo
    const parsedFuelLevel = parseInt(fuelLevel, 10);
    if (Number(fuelLevel) < 10000) {
        fuelStatus.innerHTML = `Fuel level too low for launch`;
        list.style.visibility = 'visible';
        launchStatus.innerHTML = `Shuttle Not Ready For Launch`;
        launchStatus.style.color = `#C7254E`;
    } else if (Number(cargoLevel) > 10000) {
        cargoStatus.innerHTML = `Cargo too heavy for takeoff`;
        list.style.visibility = `visible`;
        launchStatus.innerHTML = `Shuttle not ready for launch`;
        launchStatus.style.color = `#C7254E`;
    } else if (Number(cargoLevel) < 10000 && Number(fuelLevel) > 10000) {
        list.style.visibility = `visible`;
        fuelStatus.innerHTML = `Fuel level enough for launch`;
        cargoStatus.innerHTML = `Cargo mass low enough for launch`;
        launchStatus.innerHTML = `Shuttle ready for launch`;
        launchStatus.style.color = `green`;
    }

}

async function myFetch() {

    let planets = await fetch("https://handlers.education.launchcode.org/static/planets.json")
    .then(function(response) {
        return response.json()
        });
    return planets;
}

function anyPlanet(planets) {
    let index = Math.floor(Math.random() * planets.length);
    return planets[index];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.anyPlanet = anyPlanet; 
module.exports.myFetch = myFetch;