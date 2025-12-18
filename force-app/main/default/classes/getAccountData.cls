public class getAccountData {
    //Wrapper class for Account
    public class AccountWrapper {
        @AuraEnabled public Id accId { get; set; }
        @AuraEnabled public String accName { get; set; }
        @AuraEnabled public String accPhone { get; set; }
        @AuraEnabled public String accWebsite { get; set; }
        @AuraEnabled public String accType { get; set; }
        @AuraEnabled public String accIndustry { get; set; }
        @AuraEnabled public String accSubContactName { get; set; }

         @AuraEnabled public boolean isShow { get; set; }
 }
   
    @AuraEnabled(cacheable=true)
    public Static List<AccountWrapper> getAccountWrapperList(){
         List<Account> accList = [Select id ,Name,Phone,Website,Type,Industry,Sub_Contact_Name__c from Account];
        List<AccountWrapper> wrapperList = new List<AccountWrapper>();
        for(Account acc : accList){
            AccountWrapper accWrapper = new AccountWrapper();
            accWrapper.accId = acc.Id;
            accWrapper.accName = acc.Name;
            accWrapper.accPhone = acc.phone;
            accWrapper.accWebsite = acc.website;
           accWrapper.accType = acc.Type;
          accWrapper.accIndustry = acc.Industry;
          accWrapper.accSubContactName = acc.Sub_Contact_Name__c;
          accWrapper.isShow = false;
        wrapperList.add(accWrapper);


        }
        return wrapperList;
    }
     //Contact Wrapper
    public class ContactWrapper{
        @AuraEnabled public Id conId {get;set;}
         @AuraEnabled public Id accId {get;set;}
        @AuraEnabled public String conName {get;set;}
        @AuraEnabled public String conPhone {get;set;}
         @AuraEnabled public String conSubContact {get;set;}
        @AuraEnabled PUBLIC boolean isShowSubContact {get;set;}
        
    }
    @AuraEnabled(cacheable=true)
    public Static List<ContactWrapper> getContactList(Id accountId){
   List<Contact> conList =  [Select id,AccountId ,Name,Phone,Sub_Contact__c from Contact where accountId =:accountId];
        List<ContactWrapper> conWrapperList = new List<ContactWrapper>();
        for(Contact con:conList){
           ContactWrapper conWrapper = new ContactWrapper(); 
            conWrapper.conId = con.Id;
            conWrapper.accId = con.AccountId;
             conWrapper.conName = con.Name;
             conWrapper.conPhone = con.Phone;
             conWrapper.conSubContact = con.Sub_Contact__c;
            conWrapper.isShowSubContact = false;


            conWrapperList.add(conWrapper);
        }
        return conWrapperList;
    }
    
@AuraEnabled(cacheable=true)    
    public Static List<Sub_Contact__c> getSubContactList(Id contactId){
        return[Select id,Name ,Email__c,Designation__c,Department__c,Contact__c,Is_Active__c from Sub_Contact__c where Contact__c =:contactId ];
    }
}
