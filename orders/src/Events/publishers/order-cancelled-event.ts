import {Publisher ,Subject , OrderCancelledEvent} from '@katickets212/common'


export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent>{


    subject:Subject.OrderCancelled =  Subject.OrderCancelled;
}

