import React from 'react';
import Container from '~/components/container';
import EventForm from '~/components/events/event-form';

const CreateEvent = () => {
    return (
        <Container>
            <h2 className="mb-5 text-xl font-semibold">Create event</h2>
            <EventForm />
        </Container>
    );
};

export default CreateEvent;
