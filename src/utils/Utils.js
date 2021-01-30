import React from 'react';
import {getTickets} from '../api/ApiRequests';


const getInfo = async () => {
    const jsonTickets =  await getTickets();
    const sites = new Map();
    const sitesIds = new Set();

    const machines = new Map();
    const machinesIds = new Set();

    const material = new Map();
    const materialIds = new Set();

    const placeFrom = new Map();
    const placeFromIds = new Set();

    const placeTo = new Map();
    const placeToIds = new Set();

    const portages = new Set();

    const infoMap = new Map();

    const getSiteFromTicketTest = (item, index) => {
        console.log("Site: " + JSON.stringify(item.site));
        console.log("Site index: " + index);
        if(item.site != null && !sitesIds.has(item.site.id)){
            sitesIds.add(item.site.id);
            sites.set(item.site.id, item.site.name);
        }
        if(item.machine != null && !machinesIds.has(item.machine.id)){
            machinesIds.add(item.machine.id);
            machines.set(item.machine.id,item.machine.name)
        }

        if(item.material != null && !materialIds.has(item.material.id)){
            materialIds.add(item.material.id);
            material.set(item.material.id, item.material.name);
        }

        //This placeFrom is wrong. I need values in JSON

        if(item.placeFrom != null && !placeFromIds.has(item.placeFrom.id)){
            placeFromIds.add(item.placeFrom.id);
            placeFrom.set(item.placeFrom.id, item.placeFrom.name);
        }

        if(item.placeTo != null && !placeToIds.has(item.placeTo.id)){
            placeToIds.add(item.placeTo.id);
            placeTo.set(item.placeTo.id, item.placeTo.name);
        }

        if(item.portages != null){
            portages.add(item.portages);
        }

        //Tengo que meter todo lo que recibo de los tickets dentro del mapa, y ademas cotejar que si se repite no meta de nuevo el valor.
        //Importante esta vaina.
        //Pensar como hacer que esta funcion devuelva todo facilmente por arrays.
        // Una vez devuelto por arrays, meter un picker por cada valor de cada formulario.
        //Probar que funciona, y posteriormente crear el onsubmit para meter tickets desde el movil.

        //Hacer lo mismo que he hecho con materiales pero con el resto de movidas de los formularios. Ver si se puede hacer mas eficiente
        //el meter datos o cargar datos en funcion del tipo de formulario. No se si es mejor, o es mejor tener algo que devuelva todo.

        //Hablar con aguado para ver como viene en tickets los valores de origen y destino, que no estan y no los puedo obtener.
        //Tratar de enviar una peticion, aunque sea desde la primera pestania y adaptar todo para poder enviar el post y aniadir
        //desde el movil
    };
    jsonTickets.forEach(await getSiteFromTicketTest);
    infoMap.set("sites",sites);
    infoMap.set("machines",machines);
    infoMap.set("materials", material);
    infoMap.set("placesFrom", placeFrom);
    infoMap.set("placesTo", placeTo);
    infoMap.set("portages", portages);
    return infoMap;
}

const formatDate = (date) => {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

const typeFromNumberToWord = (typeNumber) => {
    let typeWord;
    switch(typeNumber){
        case 0:
            typeWord = 'machine';
            break;
        case 1:
            typeWord = 'truck_port';
            break;
        case 2:
            typeWord = 'truck_supply';
            break;
        case 3:
            typeWord = 'truck_withdrawal';
            break;
        default:
            typeWord = 'machine';
    }
    return typeWord;
}


export {getInfo, formatDate, typeFromNumberToWord};
