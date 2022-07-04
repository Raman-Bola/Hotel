const mongoose= require('mongoose');
const cities= require('./cities');
const {places,descriptors}= require('./seedHelpers');
const Campground= require('../models/campground')

mongoose.connect('mongodb://localhost:27017/yelp-camp',{
   
    // useNewUrlParser:true,
    // useCreateIndex:true,
    // useUnifiedTopology:true
});


const db=mongoose.connection;
db.on("error",console.error.bind(console,"connection error:"));
db.once("open",()=>{
    console.log("Database Connected");
})

const sample = (array)=> array[Math.floor(Math.random()*array.length)]
const seedDB= async()=>{
    await Campground.deleteMany({});
    for(let i=0;i<300;i++){
        const random1000 =Math.floor(Math.random()*1000);
        const price= Math.floor(Math.random()*20)+10;
        const camp= new Campground({
            author:'62c0736ec7194357553bcc0e',
            location:`${cities[random1000].city},${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description:'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Praesentium beatae quo iste vero aperiam neque amet saepe itaque sint, perspiciatis, nulla, pariatur ipsam minima doloribus nam? Nam corporis consectetur omnis.',
            price,
            geometry:{
                type:"Point",
                coordinates:[
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images:[
                {
                  url: 'https://res.cloudinary.com/dsqtjroyx/image/upload/v1656849449/YelpCamp/dslhqxo5yfr6sykex6m8.png',
                  filename: 'YelpCamp/dslhqxo5yfr6sykex6m8',
                  
                },
                {
                  url: 'https://res.cloudinary.com/dsqtjroyx/image/upload/v1656849450/YelpCamp/uulf7p7yvqrawzc1rmc4.jpg',
                  filename: 'YelpCamp/uulf7p7yvqrawzc1rmc4',
                  
                }
              ]
        }) 
        await camp.save();
    }
}

seedDB().then(()=>{
    mongoose.connection.close();
})