import { LightningElement ,api ,wire } from 'lwc';
import getAccountList from '@salesforce/apex/getAccountData.getAccountWrapperList';

import { publish, MessageContext } from 'lightning/messageService';
import CHANNEL from '@salesforce/messageChannel/AccountMessageChannel__c';
export default class AccountPublisher extends LightningElement {


accounts = [];
@wire(MessageContext)
messageContext;

@wire(getAccountList)
wiredaccounts({data,error}){
if(data){
this.accounts = data;
console.log('WrapperData-->',data);

} else if(error){
    console.error(error);
}
}

onAccountClick(event){
 const accId = event.currentTarget.dataset.id;
    const accountName = event.target.dataset.name;
    this.publishMessage(accId, accountName);
}
publishMessage(accId, accountName) {
        const payload = {
            recordId: accId,
            name: accountName
        };

        publish(this.messageContext, CHANNEL, payload);
    } 

}