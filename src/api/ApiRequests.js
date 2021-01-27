import React from 'react';
import * as Keychain from "react-native-keychain";
const apiAuthenticate = 'http://symfony.localhost:82/es/authenticate';
const apiGetTickets = 'http://symfony.localhost:82/es/api/employee/tickets';
const apiAddTicket = 'http://symfony.localhost:82/es/api/add_ticket';


const getResponseLogin = async (bodyCreds) => {
    let response = await fetch(apiAuthenticate, {
        method: 'POST',
        headers: {'Content-Type': 'multipart/form-data'},
        body: bodyCreds,
    });
    return response;
};

const getTickets = async () => {
    let token = await Keychain.getGenericPassword();
    let tickets = await fetch(apiGetTickets, {
        headers: {'X-AUTH-TOKEN': token.password}
    });
    let ticketsJson = await tickets.json();
    console.log("what I get from tickets: " + JSON.stringify(ticketsJson[0]));
    return ticketsJson;
};

//I need to add in the header the token, BRO
const addTicket = async(ticketData) => {
    let token = await Keychain.getGenericPassword();
    let headers = new Headers();
    headers.append('X-AUTH-TOKEN', token.password);
    headers.append('Content-Type', 'multipart/form-data');
    let requestOptions = {
        method: 'POST',
        headers: headers,
        body: ticketData,
        redirect: 'follow'
    };

    //.then(response => response.text()).then(result => console.log(result)).catch(error => console.log('error', error))
    let response = await fetch(apiAddTicket, requestOptions);
    return response;
};

export {getResponseLogin, getTickets, addTicket};
