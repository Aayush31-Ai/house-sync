import React from 'react'
import membersModel from '../_models/members.model';

const performTransactionCalculation = async (houseId:string) => {
try {
     const members = await membersModel.find({ houseId }).lean();
    
    let debtors = members
      .filter((m) => m.balance < 0)
      .map(m => ({ id: m._id.toString(), name: m.name, avatar: m.avatarUrl, balance: Math.abs(m.balance) }));
    
    let creditors = members
      .filter((m) => m.balance > 0)
      .map(m => ({ id: m._id.toString(), name: m.name, avatar: m.avatarUrl, balance: m.balance }));


debtors.sort((a, b) => b.balance - a.balance);
    creditors.sort((a, b) => b.balance - a.balance);

    let allTransactions = [];
    let i = 0; 
    let j = 0; 

    while (i < debtors.length && j < creditors.length) {
      let debtor = debtors[i];
      let creditor = creditors[j];
      
    
  let amount = Math.min(debtor.balance, creditor.balance);
      amount = Math.round(amount * 100) / 100;
if(amount > 0){
      allTransactions.push({
        from: debtor.id,
        fromName: debtor.name,
        fromAvatar: debtor.avatar,
        to:creditor.id,
        toName: creditor.name,
        toAvatar: creditor.avatar,
        amount: Math.round(amount * 100) / 100
      });
    }

  debtor.balance = Math.round((debtor.balance - amount) * 100) / 100;
      creditor.balance = Math.round((creditor.balance - amount) * 100) / 100;

      if (debtor.balance <= 0) i++;
      if (creditor.balance <= 0) j++;
    }
    return allTransactions ;    
} catch (error: any) {
    console.log("there is an error while calculating the transactions",error.message);
    
}
}

export default performTransactionCalculation