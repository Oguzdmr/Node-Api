let express = require('express')
let app = express();
let allCustomers = [];
var mongoose = require('mongoose');
var Customer = require('./customer')
var port = process.env.PORT || 8080;




//------------------------ DATABASE BAĞLANTISI ----------------------------------------------------------------
mongoose.connect('mongodb+srv://fy17:fy17@cluster0.gbqw2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', (error) => {
    if (!error) {
        console.log("Hata Yok")
        console.log("DATA --> ")
    } else {
        console.log('Hata Var --> ', error)
    }
}) 
//---------------------------------------------------------------------------------------------------------------

//------------------------ BURADA KAYIT İÇİN ÖRNEK OLUŞTURDUK ---------------------------------------------------
/* var customer1 = new Customer({    
    username: 'oguz0125',
    name: 'Oguz',
    class: 'JS Developer',
    age: 24,
    city: 'Ankara'
}) */
//---------------------------------------------------------------------------------------------------------------


//----------------------- OLUŞTURDUĞUMUZ ÖRNEĞİ DATABASE E EKLEDİK ----------------------------------------------
//customer1.save();

//---------------------------------- SORGULAR -------------------------------------------------------------------

// DATABASE E BİR SORGU YOLLADIK - "Tüm kayıtları getir"

Customer.find({}, (error, data) => {
    console.log(data);
    allCustomers.push(data)
})
 
console.log(allCustomers);

app.get('/users', (req, res) => res.send(allCustomers));

app.listen(port, function() {
    console.log("Running FirstRest on Port "+ port)
})

app.post("/", function(req, res, next){

    new Customer({
      username: req.body.username,
      name: req.body.name,
      class: req.body.class,
      age:req.body.age,
      city:req.body.city
    }).save().then(() => {
        console.log("Kaydetme İşlemi Başarılı.");
    }).catch((err) => {
        console.log("Kaydetme İşleminde Hata Oluştu.");
    });

}); 
// DATABASE E BİR SORGU YOLLADIK - "Şehri 'İstanbul' olan tüm kayıtları getir" DEDİK
/*Customer.find({city: 'İstanbul'}, (error, data) => {
    console.log(data);
})*/



// DATABASE E BİR SORGU YOLLADIK - "Id'si '5eb6c70b504b4c199758a9a9' olan kaydı getir" DEDİK
/*Customer.findById('5eb6c70b504b4c199758a9a9', (error, data) => {
    console.log(data);
})*/



// DATABASE E BİR SORGU YOLLADIK - "Şehri 'Ankara' olanları getir"
/*Customer.find({}, (error, data) => {
    console.log(data);
}).where('city').equals('Ankara')
*/



// DATABASE E BİR SORGU YOLLADIK - "Şehri 'Ankara' olanları al ve ilk '1' sırayı getir"
/*Customer.find({}, (error, data) => {
    console.log(data);
}).where('name').equals('Furkan Yıldız').limit(1)*/
