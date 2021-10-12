const events = {};

const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

const respondJSONMeta = (request, response, status) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.end();
};

const getAvailability = (request, response, method, desiredTime) => {
  if (method === 'get') {
    // goes thru times and finds names for desired day and time
    const event = events[desiredTime.event];
    let freePpl;

    switch (desiredTime.day) {
      case 'mon':
        freePpl = event.mon.slots[desiredTime.hour];
        break;
      case 'tue':
        freePpl = event.tue.slots[desiredTime.hour];
        break;
      case 'wed':
        freePpl = event.wed.slots[desiredTime.hour];
        break;
      case 'thur':
        freePpl = event.thur.slots[desiredTime.hour];
        break;
      case 'fri':
        freePpl = event.fri.slots[desiredTime.hour];
        break;
      case 'sat':
        freePpl = event.sat.slots[desiredTime.hour];
        break;
      case 'sun':
        freePpl = event.sun.slots[desiredTime.hour];
        break;
      default:
        break;
    }

    const responseJSON = {
      freePpl,
    };

    return respondJSON(request, response, 200, responseJSON);
  }

  return respondJSONMeta(request, response, 200);
};

// gets time slot and adds person to list
const addAvailability = (request, response, person) => {
  const responseJSON = {};
  const responseCode = 201;

  const event = events[person.event];
  const { name } = person.name;
  const { day } = person.day;
  const timeSlot = person.time;

  // adds person to array
  switch (day) {
    case 'mon':
      event.mon.slots[timeSlot].push(name);
      break;
    case 'tue':
      event.tue.slots[timeSlot].push(name);
      break;
    case 'wed':
      event.wed.slots[timeSlot].push(name);
      break;
    case 'thur':
      event.thur.slots[timeSlot].push(name);
      break;
    case 'fri':
      event.fri.slots[timeSlot].push(name);
      break;
    case 'sat':
      event.sat.slots[timeSlot].push(name);
      break;
    case 'sun':
      event.sun.slots[timeSlot].push(name);
      break;
    default:
      break;
  }

  if (responseCode === 201) {
    responseJSON.message = 'Added Successfully!';
    return respondJSON(request, response, responseCode, responseJSON);
  }

  return respondJSONMeta(request, response, responseCode);
};

// gets time slot and removes person to list
const removeAvailability = (request, response, person) => {
  const responseJSON = {};
  const responseCode = 201;

  const event = events[person.event];
  const { name } = person.name;
  const { day } = person.day;
  const timeSlot = person.time;

  // looks thru day and filters out that person's name out of array
  switch (day) {
    case 'mon':
      event.mon.slots[timeSlot].filter((element) => {
        if (element !== name) {
          return true;
        }
        return false;
      });
      break;
    case 'tue':
      event.tue.slots[timeSlot].filter((element) => {
        if (element !== name) {
          return true;
        }
        return false;
      });
      break;
    case 'wed':
      event.wed.slots[timeSlot].filter((element) => {
        if (element !== name) {
          return true;
        }
        return false;
      });
      break;
    case 'thur':
      event.thur.slots[timeSlot].filter((element) => {
        if (element !== name) {
          return true;
        }
        return false;
      });
      break;
    case 'fri':
      event.fri.slots[timeSlot].filter((element) => {
        if (element !== name) {
          return true;
        }
        return false;
      });
      break;
    case 'sat':
      event.sat.slots[timeSlot].filter((element) => {
        if (element !== name) {
          return true;
        }
        return false;
      });
      break;
    case 'sun':
      event.sun.slots[timeSlot].filter((element) => {
        if (element !== name) {
          return true;
        }
        return false;
      });
      break;
    default:
      break;
  }

  if (responseCode === 201) {
    responseJSON.message = 'Removed Successfully!';
    return respondJSON(request, response, responseCode, responseJSON);
  }

  return respondJSONMeta(request, response, responseCode);
};

const addEvent = (request, response, newEvent) => {
  const responseJSON = {};
  const responseCode = 201;

  events[newEvent] = {
    mon: {},
    tue: {},
    wed: {},
    thur: {},
    fri: {},
    sat: {},
    sun: {},
  };

  if (responseCode === 201) {
    responseJSON.message = 'Event Created Successfully!';
    return respondJSON(request, response, responseCode, responseJSON);
  }

  return respondJSONMeta(request, response, responseCode);
};

const success = (request, response) => {
  const responseJSON = {
    message: 'This is a successful response',
  };

  respondJSON(request, response, 200, responseJSON);
};

const badRequest = (request, response, params) => {
  const responseJSON = {
    message: 'Missing valid query parameter set to true',
    id: 'missingParams',
  };

  if (!params.valid || params.valid !== 'true') {
    responseJSON.message = 'Missing valid query parameter parameter set equal to true';
    responseJSON.id = 'badRequest';
    return respondJSON(request, response, 400, respondJSON);
  }

  return respondJSON(request, response, 400, respondJSON);
};

const unauthorized = (request, response) => {
  const responseJSON = {
    message: 'Missing loggedIn query parameter set to yes',
    id: 'unauthorized',
  };

  respondJSON(request, response, 401, responseJSON);
};

const notFound = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found',
    id: 'notFound',
  };

  return respondJSON(request, response, 404, responseJSON);
};

module.exports = {
  success,
  badRequest,
  unauthorized,
  notFound,
  getAvailability,
  addAvailability,
  removeAvailability,
  addEvent,
};
