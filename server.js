import {ApolloServer} from "apollo-server"
import {ApolloServerPluginLandingPageGraphQLPlayground} from "apollo-server-core"
import typeDefs from './schemaGql.js'
import mongoose from "mongoose"
import dotenv from "dotenv";
dotenv.config()
const PORT = process.env.PORT || 8080
const MONGO_URI = process.env['MONGO_URI']
mongoose.connect(MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

mongoose.connection.on("connected",()=>{
    console.log("connected to mongodb")
})

mongoose.connection.on("error",(err)=>{
    console.log("error connecting",err)
})

import "./models/Customer.js"

import resolvers from './resolvers.js'

const server = new ApolloServer ({
    typeDefs,
    resolvers,
    plugins:[
        ApolloServerPluginLandingPageGraphQLPlayground()
    ]
})

server.listen(PORT).then(({url})=>{
    console.log(`Server ready at ${url}`)
})