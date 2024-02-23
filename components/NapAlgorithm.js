import * as Calendar from 'expo-calendar';

// Make it so it returns the first biggest nap slot
function NapAlgorithm({events}) {

    const startTime = new Date()
    startTime.setHours(12)
    startTime.setMinutes(0)
    startTime.setSeconds(0)
    startTime.setMilliseconds(0)

    const endTime = new Date()
    endTime.setHours(17)
    endTime.setMinutes(0)
    endTime.setSeconds(0)
    endTime.setMilliseconds(0)

    let availableTimeSlots = []
    let currentTime = new Date(startTime)

    while (currentTime < endTime) {
        const slotEndTime = new Date(currentTime.getTime() + 30 * 60000)
        availableTimeSlots.push({ startTime: new Date(currentTime), endTime: slotEndTime})
        currentTime = slotEndTime
    }

    events.forEach(event => {
        const eventStartTime = new Date(event.startDate)
        const eventEndTime = new Date(event.endDate)

        availableTimeSlots = availableTimeSlots.filter(slot => {
            return (slot.startTime < eventStartTime && slot.endTime <= eventStartTime) || // Slot ends before event starts
                    (slot.startTime >= eventEndTime && slot.endTime > eventEndTime);       // Slot starts after event ends
        });
    });

    // let bestSlot = {}

    // availableTimeSlots.forEach(event => {
    //     const eventStartTime = new Date(event.startTime)
    //     const eventEndTime = new Date(event.endTime)

    //     // if 
    // })

    return availableTimeSlots[0]
}


const getEventsForCurrentDay = async () => {
    const currentDate = new Date();
    const startOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0, 0, 0);
    const endOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 23, 59, 59);

    const defaultCalendar = getDefaultCalendarSource()

    const events = await Calendar.getEventsAsync([defaultCalendar.id], startOfDay, endOfDay);

    return events;
}

async function getDefaultCalendarSource() {
    const defaultCalendar = await Calendar.getDefaultCalendarAsync();
    return defaultCalendar.source;
}

export { getEventsForCurrentDay , NapAlgorithm }