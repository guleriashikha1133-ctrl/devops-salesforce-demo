public class getAccountData {
    @AuraEnabled(cacheable=true)
    public Static List<Account> getaccList(){
         return [Select id ,Name,Phone,Website,Type,Industry from Account];
        
    }
    
    @AuraEnabled(cacheable=true)
    public Static List<Contact> getContactList(Id accountId){
       
         return [Select id ,Name,Phone from Contact where accountId =:accountId];
        
    }

}