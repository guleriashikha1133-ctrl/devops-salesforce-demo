import { LightningElement ,wire,api} from 'lwc';
import getContactList from '@salesforce/apex/getAccountData.getContactList';

export default class ContactDataTable extends LightningElement {
    @api accountId
   contacts =[];
   selectedContactId = null;
   childData;

   @wire(getContactList,{accountId :'$accountId'})
   wiredContacts({ data, error }) {
        if (data) {
            this.contacts = data;
            console.log('Contact Data-->',data);
           
        } else if (error) {
            console.error(error);
        }
    }

onContactClick(event){
    const conId = event.currentTarget.dataset.id;
    this.selectedContactId = conId;
    console.log('this.selectedContactId -->',this.selectedContactId );
this.contacts  = this.contacts.map(con =>{
    if(con.conId === conId){
        console.log('con.conId',con.conId);
        console.log('conId',conId);
        const newConValue = !con.isShowSubContact;
         this.selectedContactId  = newConValue ? conId :null
         console.log('Contact Id value-->',this.selectedContactId);
 return { ...con, isShowSubContact: newConValue };
        } else {
            // close all others
            return { ...con, isShowSubContact: false };
        }
});


}
get isContact(){
    return this.contacts.length>0

}
checkboxHandlerChange(event){
    const isChecked = event.detail.isChecked;
    const wholeData = event.detail.wholeData;
    const selectedId = this.selectedContactId;
 console.log('isChecked in Parent-->',isChecked);
  console.log('wholeData in Parent-->',JSON.stringify(wholeData));

 console.log('this.contacts -->',JSON.stringify(this.contacts));
 this.contacts  = this.contacts.map(con =>{
    console.log('before.conId',con.conId);
    if(con.conId === selectedId){
        console.log('aftercon.conId',con.conId);
        console.log('selectedId',selectedId);
        if(isChecked === true){
            console.log('wholeData.Name-->',wholeData[0].Name);
           
           con.conSubContact = wholeData[0].Name;
            console.log('con.conSubContact-->',con.conSubContact);
    } 
        }
        return con;
    })

}

}