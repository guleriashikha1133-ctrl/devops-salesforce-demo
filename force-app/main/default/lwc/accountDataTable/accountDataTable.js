import { LightningElement,api ,wire} from 'lwc';
import getAccountList from '@salesforce/apex/getAccountData.getAccountWrapperList';

export default class AccountDataTable extends LightningElement {
selectedAccountId = null;
accounts = [];


@wire(getAccountList)
wiredaccounts({data,error}){
if(data){
this.accounts = data;
console.log('WrapperData-->',data);

} else if(error){
    console.error(error);
}
}

onAccountClick(event) {
    const accId = event.currentTarget.dataset.id;

    this.selectedAccountId = accId;

    // Loop through all accounts and set isShow = true only for selected account
    this.accounts = this.accounts.map(acc => {
  if (acc.accId === accId) {
            // toggle clicked account
            const newValue = !acc.isShow;
            this.selectedAccountId = newValue ? accId : null;
            return { ...acc, isShow: newValue };
        } else {
            // close all others
            return { ...acc, isShow: false };
        }

       
    });
 
}
childCheckboxHandler(event){
 const isChecked = event.detail.isChecked;
 console.log('isChecked-->',isChecked);
 const wholeData = event.detail.wholeData;
 const accId = this.selectedAccountId;
 this.accounts = this.accounts.map(acc => {
  if (acc.accId === accId) {
    if(isChecked === true){
        acc.accSubContactName = wholeData[0].Name;
    }
  }
  return acc;
}
 )
}

// Publish Messgae to Sub Contact Child
 
}