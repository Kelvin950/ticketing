import {Publisher , Subject , TicketCreatedEvent} from '@katickets212/common'

export class TicketCreatedPublisher extends Publisher <TicketCreatedEvent>{

    subject:Subject.TicketCreated = Subject.TicketCreated;
}