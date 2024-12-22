//Group React
//Bus Seat Reservation

//Array of bus objects each with a name and an array of passengers and a null into it to indicate available seats
let buses = [
    { name: "Cubao", passengers: Array(30).fill(null) }, // Bus to Cubao with 30 available seats
    { name: "Baguio", passengers: Array(30).fill(null) }, // Bus to Baguio with 30 available seats
    { name: "Pasay", passengers: Array(30).fill(null) }    // Bus to Pasay with 30 available seats
];

//Ticket person's username and password
const users = {
    "partasbus": "traveler" // Example user credentials for ticket personnel
};

// Main function to run the program
function main() {
    while (true) { //Infinite loop to continuously prompt the user
        //Prompt the user to specify their role (TICKET PERSON or CUSTOMER)
        const userType = window.prompt("Are you a TICKET PERSON or CUSTOMER? ").toUpperCase();
        
        switch (userType) {
            case "TICKET PERSON": //If the user is a ticket person
                if (authenticateUser()) { //Ask the ticket person for username and password
                    ticketPersonMenu(); //Direct to the next function if the username and password is correct
                } else {
                    console.log("Invalid. Try again."); // Notify if authentication fails
                }
                break;

            case "CUSTOMER": //If the user is a customer
                customerMenu();// Show customer menu
                break;

            default:
                console.log("Invalid user type. Please try again."); //Notify if input is invalid
                break;
        }
    }
}

//Function to authenticate the ticket personnel user
function authenticateUser() {
    const username = window.prompt("Enter username: ");
    const password = window.prompt("Enter password: ");
    return users[username] === password; //Check credentials against stored users
}

//Menu for ticket personnel with options to log out, view buses, or manage reservations
function ticketPersonMenu() {
    while (true) { //Infinite loop for menu options
        const choice = window.prompt("Choose: LOGOUT, VIEW, MANAGE: ").toUpperCase(); //Prompt for choice
        
        switch (choice) {
            case "LOGOUT": //Option to log out
                return; //Return to main

            case "VIEW": //Option to view bus reservations
                viewBuses(); //Call function to display bus information
                break;

            case "MANAGE": //Option to manage bus reservations
                manageBuses(); //Call function to handle reservation management
                break;

            default:
                console.log("Invalid choice. Please try again."); //Notify if input is invalid
        }
    }
}

//Function to display all buses and their passenger reservations
function viewBuses() {
    for (const bus of buses) { //Iterate over each bus in the buses array
        console.log(`\nBus Name: ${bus.name}`); //Display the name of the bus
        for (let i = 0; i < bus.passengers.length; i++) { //Iterate over each seat in the bus
            const passenger = bus.passengers[i]; //Get passenger information for the seat
            console.log(`Seat ${i + 1}: ${passenger ? passenger : 'AVAILABLE'}`); //Display seat status (occupied or available)
        }
    }
}

//Function to manage reservations on a selected bus
function manageBuses() {
    const busIndex = parseInt(window.prompt("Choose bus to manage (1: Cubao, 2: Baguio, 3: Pasay): ")) - 1; 
    const selectedBus = buses[busIndex]; //Select the bus based on user input

    while (true) { //Infinite loop for management options
        const action = window.prompt("Choose: ADD or REMOVE a Reservation, or CANCEL: ").toUpperCase(); 
        
        switch (action) {
            case "CANCEL": 
                return; //Exit management menu

            case "ADD": 
                addReservation(selectedBus); //Call function to add a reservation on the selected bus
                break;

            case "REMOVE": 
                removeReservation(selectedBus); //Call function to remove a reservation from the selected bus
                break;

            default:
                console.log("Invalid choice. Please try again."); //Notify if input is invalid
        }
    }
}

//Function to add a reservation for a passenger on a specified bus
function addReservation(bus) {
    const seatNo = parseInt(window.prompt("Enter seat number to reserve (1-30): ")) - 1; 
    
    if (bus.passengers[seatNo] === null) { //Check if the specified seat is available 
        const customerName = window.prompt("Enter customer name: "); 
        bus.passengers[seatNo] = customerName; //Assign customer name to the reserved seat 
        console.log(`Reservation successful for ${customerName} on seat ${seatNo + 1}.`); 
    } else {
        console.log("Seat is already taken."); //Notify if the seat is already reserved 
    }
}

//Function to remove a reservation from a specified bus based on seat number and customer name 
function removeReservation(bus) {
    const seatNo = parseInt(window.prompt("Enter seat number to remove reservation (1-30): ")) - 1; 
    
    if (bus.passengers[seatNo] !== null) { //Check if there is a reservation on the specified seat 
        const customerName = window.prompt("Enter customer name: "); 
        
        if (bus.passengers[seatNo] === customerName) { 
            bus.passengers[seatNo] = null; //Remove reservation by setting seat value back to null 
            console.log(`Reservation for ${customerName} on seat ${seatNo + 1} has been removed.`); 
        } else {
            console.log("No reservation found for this customer on this seat."); 
        }
    } else {
        console.log("This seat is not reserved."); 
    }
}

//Customer menu allowing reservations or cancellations of reservations 
function customerMenu() {
    while (true) { 
        const choice = window.prompt("Choose: RESERVE, CANCEL RESERVATION, or CANCEL: ").toUpperCase(); 
        
        switch (choice) {
            case "CANCEL":
                return; 

            case "RESERVE":
                reserveSeat(); //Call function to reserve a seat 
                break;

            case "CANCEL RESERVATION":
                cancelReservation(); //Call function to cancel a reservation 
                break;

            default:
                console.log("Invalid choice. Please try again."); 
        }
    }
}

//Function for customers to reserve a seat on a selected bus 
function reserveSeat() {
    const busIndex = parseInt(window.prompt("Choose bus to reserve (1: Cubao, 2: Baguio, 3: Pasay): ")) - 1;
    const selectedBus = buses[busIndex]; 

    if (!selectedBus.passengers.includes(null)) { //Check if fully booked 
        console.log("Bus is fully booked."); 
        return; 
    }

    viewBusSeats(selectedBus); 

    const seatNo = parseInt(window.prompt("Enter seat number to reserve (1-30): ")) - 1; 
    
    if (selectedBus.passengers[seatNo] === null) { 
        const customerName = window.prompt("Enter your name: "); 
        selectedBus.passengers[seatNo] = customerName; 
        console.log(`Reservation successful for ${customerName} on seat ${seatNo + 1}.`); 
    } else {
        console.log("Seat is already taken."); 
    }
}

//Function for customers to cancel their reservation based on their name and selected bus 
function cancelReservation() {
    const busIndex = parseInt(window.prompt("Which bus did you reserve on? (1: Cubao, 2: Baguio, 3: Pasay): ")) - 1;
    const selectedBus = buses[busIndex]; 
    
    const customerName = window.prompt("Enter your name: "); 
    
    for (let i = 0; i < selectedBus.passengers.length; i++) { 
        if (selectedBus.passengers[i] === customerName) { 
            const confirm = window.prompt(`Are you sure you want to cancel your reservation on seat ${i + 1}? (yes/no): `).toLowerCase();
            
            if (confirm === 'yes') { 
                selectedBus.passengers[i] = null;  
                console.log(`Reservation for ${customerName} on seat ${i + 1} has been canceled.`); 
            }  
            return;  
        }  
    }

    console.log("No reservation found under your name.");  
}

//Function to display seats of a specified bus along with their availability status  
function viewBusSeats(bus) {  
    console.log(`\nBus Name: ${bus.name}`);
    
    for (let i = 0; i < bus.passengers.length; i++) {  
        const passenger = bus.passengers[i];  
        console.log(`Seat ${i + 1}: ${passenger ? passenger : 'AVAILABLE'}`);  
    }  
}

//Start the program by calling the main function  
main();
