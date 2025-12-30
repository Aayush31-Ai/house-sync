
import mongoose  from "mongoose";

type Connection ={
    isConnected?:number
}
const Connection:Connection={}

const connectToDb=async()=>{

    if(Connection?.isConnected){
      return console.log("Already connected to database");
    }
    try {
          const  db = await mongoose.connect(process.env.MONGODB_URI || "");
    Connection.isConnected=db.connections[0].readyState;
    console.log("user is connected to DB");
    
    } catch (error:any) {
        console.log("there is an error while connecting to DB",error.message);
        process.exit(1);
    }
  
}

export default connectToDb;