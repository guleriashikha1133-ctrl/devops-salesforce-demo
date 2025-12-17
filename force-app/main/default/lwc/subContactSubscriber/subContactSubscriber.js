import { LightningElement ,track,wire} from 'lwc';
import { subscribe, MessageContext } from 'lightning/messageService';
import CHANNEL from '@salesforce/messageChannel/AccountMessageChannel__c';
export default class SubContactSubscriber extends LightningElement {
      @track accountId;
    @track accountName;  
    // Subscribe Account Data --->
     @wire(MessageContext)
    messageContext;

    connectedCallback() {
        subscribe(
            this.messageContext,
            CHANNEL,
            (message) => this.handleMessage(message)
        );
    }
    handleMessage(message) {
    this.accountId = message.recordId;
    this.accountName = message.name;

    console.log('Received from LMS → Id:', this.accountId);
    console.log('Received from LMS → Name:', this.accountName);

    // Load SubContacts based on ID
    this.loadSubContacts();
}
}