import {Publisher , Subject , TicketUpdatedEvent} from '@katickets212/common'

export class TicketUpdatedPublisher extends Publisher <TicketUpdatedEvent>{

    subject:Subject.TicketUpdated = Subject.TicketUpdated;
}