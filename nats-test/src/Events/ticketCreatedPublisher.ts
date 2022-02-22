import {Publisher} from './BasePublisher';
import {TicketCreatedEvent} from './ticket-created-events';
import {Subject} from './subjects';


export class TickedCreatedPublisher extends Publisher<TicketCreatedEvent>{

    subject :Subject.TicketCreated= Subject.TicketCreated;
      




}