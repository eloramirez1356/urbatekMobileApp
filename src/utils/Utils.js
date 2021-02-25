import React from 'react';
import {getTickets} from '../api/ApiRequests';


const getInfo = async () => {
    const jsonTickets =  await getTickets();
    const sites = new Map();
    const sitesIds = new Set();

    const machines = new Map();
    const machinesIds = new Set();

    const material = new Set();

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

        if(item.material != null){
            material.add(item.material);
        }

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
