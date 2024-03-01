import React, { useRef, useEffect, useState, Component } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin, { Draggable } from '@fullcalendar/interaction'
import event from './event';
import Popup from './Popup';
// import { co } from '@fullcalendar/core/internal-common';

function Calender() {

  const calendarRef = useRef(null);
  const externalEventsRef = useRef(null);
  const [events, setEvents] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [hoveredEvent, setHoveredEvent] = useState(null);

  console.log("Event Stored :", events);

  // it is used to drag & drop content inside the fullcalendar component
  useEffect(() => {

    const calendar = calendarRef.current.getApi();

    new Draggable(externalEventsRef.current, {
      itemSelector: '.fc-event',
      eventData: function (eventEl) {
        // console.log("event dragged :", eventEl);
        return {
          id: eventEl.getAttribute("data-id"),
          title: eventEl.innerText.trim(),
          backgroundColor: window.getComputedStyle(eventEl, null).getPropertyValue('background-color'),
          borderColor: window.getComputedStyle(eventEl, null).getPropertyValue('border-color'),
          start: eventEl.getAttribute("data-start"),
          end: eventEl.getAttribute("data-end"),
          content: eventEl.getAttribute("data-content")
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
            // id: Number(info.draggedEl.getAttribute("data-id")),
            // title: info.draggedEl.innerText.trim(),
            // start: info.draggedEl.getAttribute("data-start"),
            // end: info.draggedEl.getAttribute("data-end"),
            // img_URL: info.draggedEl.getAttribute("data-imgurl")
            id: info.draggedEl.getAttribute("data-id"),
            title: info.draggedEl.getAttribute("data-title"),
            content: info.draggedEl.getAttribute("data-content"),
            start: info.date.toISOString(),
            allDay: true,
            imageUrl: info.draggedEl.getAttribute("data-imgurl"),
          };

          setEvents((prevEvents) => (
            [...prevEvents, newEvent]
          ));

          console.log("Event Fetched : ", newEvent);

        } else {
          setShowPopup(!showPopup);
          info.revert(); // Revert the event to its original position
        }
      } else {
        const newEvent = {
          // id: Number(info.draggedEl.getAttribute("data-id")),
          // title: info.draggedEl.innerText.trim(),
          // start: info.draggedEl.getAttribute("data-start"),
          // end: info.draggedEl.getAttribute("data-end"),
          // img_URL: info.draggedEl.getAttribute("data-imgurl")
          id: info.draggedEl.getAttribute("data-id"),
          title: info.draggedEl.getAttribute("data-title"),
          content: info.draggedEl.getAttribute("data-content"),
          start: info.date.toISOString(),
          allDay: true,
          imageUrl: info.draggedEl.getAttribute("data-imgurl"),
        };

        setEvents((prevEvents) => (
          [...prevEvents, newEvent]
        ));

        console.log("Event Fetched : ", newEvent);
      }
    };

    calendar.setOption('droppable', true);
    calendar.setOption('drop', drop);

    calendar.render();

    return () => {
      calendar.destroy();
    };
  }, []);

  // it is used for displaying the content over the fullcalendar component
  useEffect(() => {

    const calendarApi = calendarRef.current.getApi();
    calendarApi.removeAllEvents();
    calendarApi.addEventSource(events);

  }, [events]);

  //it eliminates the event from events array on deleting it.
  const handleEventClick = (info) => {
    if (window.confirm("Are you sure you want to remove this event?")) {
      const filteredEvents = events.filter(event => event.id !== info.event.id);
      setEvents(filteredEvents);
      info.event.remove();
    }
  };

  const handleEventMouseEnter = (info) => {
    setHoveredEvent(info.event);
    // console.log("hoveredEvent :", hoveredEvent);
    // console.log("event description fetched :", info.event);
  };

  const handleEventMouseLeave = () => {
    setHoveredEvent(null);
  };

  const customEventContent = (info) => {

    // console.log("custom event ", info);

    return (
      <div className='relative cursor-auto'>
        <div>{info.event._def.title}</div>
        {hoveredEvent && hoveredEvent._def.publicId === info.event._def.publicId && (
          <div className='absolute top-6 left-0 text-center w-full text-slate-900 bg-amber-400 text-wrap font-sans rounded-md font-semibold text-lg'>{info.event._def.extendedProps.content}</div>
        )}
      </div>
    );
  };


  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen md:flex-row sm:flex-col mt-20">
        <div className="flex-auto h-full w-full p-4 md:w-[65%]">
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              start: "today prev,next",
              center: "title",
              end: "dayGridMonth,timeGridWeek,timeGridDay"
            }}
            initialView="dayGridMonth"
            editable={false}
            eventClick={handleEventClick}
            eventMouseEnter={handleEventMouseEnter} // Add event mouse enter handler
            eventMouseLeave={handleEventMouseLeave}
            eventContent={customEventContent} // Add custom event content
            className="h-full flex-none"
          />
        </div>
        <div className="flex-auto h-full p-4 w-full overflow-auto md:w-[35%]">
          <div ref={externalEventsRef} className="md:w-auto h-[96%] p-3 border border-gray-300 bg-gray-100 rounded-lg w-full flex flex-wrap flex-row space-x-5 space-y-4 justify-center items-center overflow-auto">
            <p className="mb-4 text-lg font-semibold text-center w-full">Draggable Events</p>
            {event.map((event) => (
              <div className='fc-event relative border-2 border-neutral-400 rounded-lg w-36 h-36 cursor-pointer'
                key={event.id}
                data-id={event.id}
                data-start={event.start}
                data-title={event.title}
                data-imgurl={event.img_URL}
                data-content={event.desc}
              >
                <img src={event.img_URL} alt="img" className='absolute object-cover h-full w-full' />

                <div className='absolute flex flex-col justify-between p-1 h-full w-full'>
                  <p className='bg-white text-black text-center rounded-full p-1'>{event.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {showPopup && <Popup showPopup={showPopup} setShowPopup={setShowPopup} message={"You can't drop events onto past dates."} />}
    </>

  );
}

export default Calender;
