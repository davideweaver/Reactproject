import createParseReducer from "./createParseReducer";

function fromParseSessions(session) {
  return {
    id: session.id,
    day: session.get('day'),
    allDay: session.get('allDay'),
    title: session.get('sessionTitle'),
    description: session.get('sessionDescription'),
    hasDetails: session.get('hasDetails'),
    slug: session.get('sessionSlug'),
    onMySchedule: session.get('onMySchedule'),
    tags: session.get('tags') || [],
    startTime: session.get('startTime') && session.get('startTime').getTime(),
    endTime: session.get('endTime') && session.get('endTime').getTime(),
    map: session.get('sessionMap') && session.get('sessionMap').url(),
    location: session.get('sessionLocation'),
  };
}

export default createParseReducer("LOADED_SESSIONS", fromParseSessions);

