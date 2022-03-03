import { ExpirationCompleteEvent, Publisher, Subject } from '@katickets212/common';


export  class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent>{

    subject:Subject.ExpirationComplete =  Subject.ExpirationComplete;
}