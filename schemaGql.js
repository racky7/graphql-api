import {gql} from "apollo-server"

const typeDefs = gql`

type Query{
    customers:[Customer]
    accounts:[Account]
    weather:Weather
}

type Weather{
    temp:Float
    humidity:Int
}


type Customer{
    _id:ID
    id:Int!
    name:String!
    accounts:[Account]  
}

type Account{
    bank:String
    branch:String
    address:String
    city:String
    district:String
    state:String
    bank_code:String
    weather:Weather
}

type Mutation{
    addAccountDetails(data:dataInput):Customer
}

input dataInput{
    user_id:Int!
    user_name:String!
    bank_accounts:[String]
}

`

export default typeDefs