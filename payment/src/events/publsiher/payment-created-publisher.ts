import {Subject ,  Publisher , PaymentCreatedEvent} from '@katickets212/common'

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent>{
subject:Subject.PaymentCreated =  Subject.PaymentCreated;

}

 