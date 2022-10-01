import mongoose from 'mongoose'
import axios from 'axios'
import dotenv from "dotenv";
dotenv.config()
const API_KEY = process.env['API_KEY']
const Customer = mongoose.model("Customer")

const resolvers = {

    Query: {
        customers: async () => await Customer.find({}),
    },

    Mutation: {

        addAccountDetails: async (_, { data }) => {

            const ifsc_codes = data.bank_accounts
            var accounts = []
            for (let i = 0; i < ifsc_codes.length; i++) {
                var res = await axios.get('https://ifsc.razorpay.com/' + ifsc_codes[i]);
                const x = res.data

                var city = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${x.CITY}&limit=5&appid=${API_KEY}`)

                const y = city.data[0]

                var cityTemp = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${y?.lat}&lon=${y?.lon}&appid=${API_KEY}&units=metric`)

                const z = cityTemp.data?.main

                accounts.push({
                    bank: x.BANK,
                    branch: x.BRANCH,
                    address: x.ADDRESS,
                    city: x.CITY,
                    district: x.DISTRICT,
                    state: x.STATE,
                    bank_code: x.BANKCODE,
                    weather: {
                        temp: z.temp,
                        humidity: z.humidity
                    }
                })
            }


            const customer = await Customer.findOne({ id: data.user_id })
            if (customer) {
                const oldCustomer = await Customer.findOneAndUpdate({id: data.user_id}, {
                    name: data.user_name,
                    $push: {
                        accounts: {
                            $each: accounts
                        }
                    }

                }, {
                    new: true
                })

                return oldCustomer
            }


            const newCustomer = new Customer({
                id: data.user_id,
                name: data.user_name,
                accounts: accounts
            })

            return await newCustomer.save()
        },


    }

}

export default resolvers