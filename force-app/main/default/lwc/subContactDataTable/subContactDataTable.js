import { LightningElement,api,wire,track } from 'lwc';
import getSubContactList from '@salesforce/apex/getAccountData.getSubContactList';

export default class SubContactDataTable extends LightningElement {
    @api contactId;
    subContacts=[];
    isChecked;
     
   

    @wire(getSubContactList,{contactId : '$contactId'})
    wiredSubContacts({data,error}){
    if(data){
        this.subContacts = data.map(sc =>({
            ...sc,isCheked :sc.Is_Active__c
        }))
        console.log('SubContactData-->',data);
    }
      else{
        console.error(error);
      } 
    }
   get isSubContacts(){
    return this.subContacts.length >0
   } 
   handleCheckboxChange(event){
    this.isChecked = event.target.checked;
  console.log('this.isChecked-->',this.isChecked);
    
  this.dispatchEvent(new CustomEvent('checkboxchange',{
    detail :{ isChecked:this.isChecked,
        wholeData:this.subContacts,
    },
    bubbles:true,
    composed:true
    
    
})
)
   }




   
}