import  {Publisher , OrderCreatedEvents , Subject} from '@katickets212/common'

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvents>{
  
    subject:Subject.OrderCreated =  Subject.OrderCreated;



}


