import React, { useRef, useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react'; //installed all the fullcalendar dependencies
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin, { Draggable } from '@fullcalendar/interaction'
import event from './event';
import Popup from './PopUp';

function Scheduler() {

  const calendarRef = useRef(null);
  const externalEventsRef = useRef(null);
  const [events, setEvents] = useState([]);
  const [showPopup, setShowPopup] = useState(false);


  useEffect(() => {
    const calendar = calendarRef.current.getApi();

    new Draggable(externalEventsRef.current, {
      itemSelector: '.fc-event',
      eventData: function (eventEl) {
        return {
          id: Number(eventEl.getAttribute("data-id")),
          title: eventEl.innerText.trim(),
          backgroundColor: window.getComputedStyle(eventEl, null).getPropertyValue('background-color'),
          borderColor: window.getComputedStyle(eventEl, null).getPropertyValue('border-color'),
          start: eventEl.getAttribute("data-start"),
          end: eventEl.getAttribute("data-end"),
        };
      }
    });

    const drop = (info) => {
      // Check if dropped onto past dates
      const currentDate = new Date();
      const pastDate = info.date;
      const currentMonth = currentDate.getMonth() + 1;
      const pastMonth = pastDate.getMonth() + 1;

      if ((pastDate.getDate() < currentDate.getDate()) || (pastMonth < currentMonth) || (pastDate.getFullYear() < currentDate.getFullYear())) {
        if (pastDate.getDate() < currentDate.getDate() && pastMonth > currentMonth && pastDate.getFullYear() >= currentDate.getFullYear()) {
          const newEvent = {
            id: Number(info.draggedEl.getAttribute("data-id")),
            title: info.draggedEl.innerText.trim(),
            start: info.draggedEl.getAttribute("data-start"),
            end: info.draggedEl.getAttribute("data-end"),
          };
          setEvents((prevEvents) => (
            [...prevEvents, newEvent]
          ));
        } else {
          console.log("else part is running");
          setShowPopup(!showPopup);
          info.revert(); // Revert the event to its original position
        }
      } else {
        const newEvent = {
          id: Number(info.draggedEl.getAttribute("data-id")),
          title: info.draggedEl.innerText.trim(),
          start: info.draggedEl.getAttribute("data-start"),
          end: info.draggedEl.getAttribute("data-end"),
        };
        setEvents((prevEvents) => (
          [...prevEvents, newEvent]
        ));
      }
    };

    calendar.setOption('droppable', true);
    calendar.setOption('drop', drop);

    calendar.render();

    return () => {
      calendar.destroy();
    };
  }, []);

  const handleEventClick = (info) => {
    if (window.confirm("Are you sure you want to remove this event?")) {
      info.event.remove();
    }
  };


  return (
    <>
     <div className="flex flex-col justify-center items-center h-screen md:flex-row sm:flex-col mt-20">
        <div className="flex-auto h-full w-full p-4 md:w-1/2">
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin,timeGridPlugin,interactionPlugin]}
            headerToolbar={{
              start:"today prev,next",
              center:"title",
              end:"dayGridMonth,timeGridWeek,timeGridDay"
            }}
            initialView="dayGridMonth"
            editable={false}
            eventClick={handleEventClick}
          />
        </div>
        <div className="flex-auto h-full p-4 w-full overflow-auto md:w-1/2">
          <div ref={externalEventsRef} className="md:w-auto p-3 border border-gray-300 bg-gray-100 rounded-lg w-full flex flex-wrap flex-row space-x-5 space-y-4 justify-center items-center">
            <p className="mb-4 text-lg font-semibold text-center w-full">Draggable Events</p>
            {event.map((event) => (
              <div className='fc-event text-center p-1 bg-transparent border-2 border-neutral-400 rounded-lg w-28 h-28 cursor-pointer'
                key={event.id}
                data-id={event.id}
                data-start={event.start}
                data-end={event.end}
              >
                {event.title}
              </div>
            ))}
          </div>
        </div>
      </div>
      {showPopup && <Popup showPopup={showPopup} setShowPopup={setShowPopup} message={"You can't drop events onto past dates."} />}
    </>

  );
}

export default Scheduler;
