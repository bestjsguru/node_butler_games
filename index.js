let candidate_number = 0;
let candidate_time = 0;
let candidate_arraylist = [];

const working_hours = 8;
const exampleRequests = [
    {
        clientId: 1,
        requestId: 'abc',
        hours: 6
    },
    {
        clientId: 2,
        requestId: 'ghi',
        hours: 1
    },
    {
        clientId: 1,
        requestId: 'def',
        hours: 4
    },
    {
        clientId: 1,
        requestId: 'zzz',
        hours: 2
    }
]

function duplicate(arraylist) {
    let newArray = arraylist.map(function(arr) {
        return arr.slice();
    });

    return newArray;
}

function check_include(arraylist, item) {
    let value = false
    arraylist.forEach(array => {
        value = value || array.includes(item);
    });
    return value;
}

function hours_butler(array, requests) {
    let hours = 0;
    array.forEach(item => {
        hours += requests[item].hours;
    })

    return hours;
}

function indexArray(arraylist, length, requests, working_hours) {
    if (length == requests.length) {

        if (candidate_number == 0 || candidate_number > arraylist.length) {
            let minHour = 0;
            arraylist.forEach(array => {
                if(minHour == 0 || hours_butler(array, requests) < minHour) minHour = hours_butler(array, requests);
            })

            if (minHour < candidate_time || candidate_time == 0) {
                candidate_time = minHour;
                candidate_arraylist = arraylist;
                candidate_number = arraylist.length;
            }
        }
        return;
    }

    for (let i = 0; i < requests.length; i ++) {
        if (check_include(arraylist, i) == false) {
            new_arraylist = duplicate(arraylist);   

            if (arraylist[arraylist.length - 1].length != 0 && hours_butler(arraylist[arraylist.length - 1], requests) + requests[i].hours >= working_hours) {
                indexArray([...new_arraylist, [i]], length + 1, requests, working_hours);
            } else {
                new_arraylist[arraylist.length - 1].push(i);
                indexArray(new_arraylist, length + 1, requests, working_hours);
            }
        }
    }
}

function getAllClients(requests) {
    const results = [];
    requests.forEach(item => {
        if(results.includes(item.clientId) == false) {
            results.push(item.clientId);
        }
    });

    return results;
}

function allocateAndReport(requests, working_hours) {
    const result = {'butlers': [], 'sreadClientIds': []};
    indexArray([[]], 0, requests, working_hours);

    candidate_arraylist.forEach(array => {
        const requests_array = array.map(item => requests[item].requestId);
        result.butlers.push({'requests': requests_array});
    })

    result.sreadClientIds = getAllClients(requests);

    return result;
}

const results = allocateAndReport(exampleRequests, working_hours);
console.log(JSON.stringify(results));
