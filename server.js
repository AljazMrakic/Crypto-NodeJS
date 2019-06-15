var http = require("http").createServer(handler); // handler za delo z aplikacijo
var io = require("socket.io").listen(http); // socket.io za trajno povezavo med strež. in klient.
var fs = require("fs"); // spremenljivka za "file system", t.j. fs

var Bitstamp = require('bitstamp');
var bittrex = require('node-bittrex-api');
var Cryptopia = require("cryptopia-node");

var bitstamp = new Bitstamp();
var publicBitstamp = new Bitstamp();

var cryptopia = new Cryptopia();

var cena = 0;

var vsebinaDatoteke;

var posljiVrednostPrekVticnika = function(){};

function handler(req, res) {
    fs.readFile(__dirname + "/webPage.html",
    function (err, data){
        if (err) {
            res.writeHead(500, {"Content-Type": "text/plain"});
            return res.end("Napaka pri nalaganju html strani");
        }
    res.writeHead(200);
    res.end(data);
    })
}

http.listen(8282); // določimo na katerih vratih bomo poslušali

console.log("Zagon sistema"); // v konzolo zapišemo sporočilo (v terminal)

io.sockets.on("connection", function(socket) {
	
	socket.on("beriIzSpremenljivke1", function(){
	    
		console.log("Posredujemo podatek iz spremenljivke na klienta: " + cena);

			//socket.emit("vrednostSpremenljivkeSstraniStrežnika1", cena);
			
			posljiVrednosti1(socket);
			
			setInterval(posljiVrednosti1, 1000, socket);
			
    });
    
    socket.on("beriIzSpremenljivke2", function(){
	    
		console.log("Posredujemo podatek iz spremenljivke na klienta: " + cena);

			//socket.emit("vrednostSpremenljivkeSstraniStrežnika1", cena);
			
			posljiVrednosti2(socket);
			
		    setInterval(posljiVrednosti2, 1000, socket);
			
    });
    
    socket.on("beriIzSpremenljivke3", function(){
	    
		console.log("Posredujemo podatek iz spremenljivke na klienta: " + cena);

			//socket.emit("vrednostSpremenljivkeSstraniStrežnika1", cena);
			
			posljiVrednosti3(socket);
			
			setInterval(posljiVrednosti3, 1000, socket);
			
    });
    
// ************************* PISANJE V TXT DATOTEKO BITSTAMP ***************************
    
    socket.on("pisiVbazo1", function(podatek) {
        
        console.log("Pišemo podatek: " + podatek);
        console.log("*********************************************");
        
        var datum = new Array();
        datum = new Date().toJSON();
        
        var data = new Array();
        data = podatek;
        
        fs.appendFile('rok_Bitstamp1.txt',"\n" + datum + " " + data,  'utf8',
        
        function (err) {
            
            if (err) throw err;
            /*
            console.log("*********************************************");
            console.log("Podatek je zapisan v datoteko.");
            console.log("*********************************************");
            */
        });
        
    });
    
// ************************* PISANJE V TXT DATOTEKO BITTREX ***************************

    socket.on("pisiVbazo2", function(podatek) {
        
        console.log("Pišemo podatek: " + podatek);
        console.log("*********************************************");
        
        var datum2 = new Array();
        datum2 = new Date().toJSON();
        
        var data2 = new Array();
        data2 = podatek;
        
        //var bit2 = {"date":datum2, "price":data2};
        //var myJSON = JSON.stringify(bit2);
        
        fs.appendFile('rok_Bittrex1.txt',"\n" + datum2 + " " + data2,  'utf8',
        
        function (err) {
            
            if (err) throw err;
            /*
            console.log("*********************************************");
            console.log("Podatek je zapisan v datoteko.");
            console.log("*********************************************");
            */
        });
        
    });
    
// ************************* PISANJE V TXT DATOTEKO CRYPTOPIA ***************************

    socket.on("pisiVbazo3", function(podatek) {
        
        console.log("Pišemo podatek: " + podatek);
        console.log("*********************************************");
        
        var datum3 = new Array();
        datum3 = new Date().toJSON();
        
        var data3 = new Array();
        data3 = podatek;
        
        fs.appendFile('rok_Cryptopia1.txt',"\n" + datum3 + " " + data3,  'utf8',
        
        function (err) {
            
            if (err) throw err;
            /*
            console.log("*********************************************");
            console.log("Podatek je zapisan v datoteko.");
            console.log("*********************************************");
            */
        });
        
    });
    
// ************************ BRANJE IZ TXT DATOTEKE BITSTAMP ****************************
    
    socket.on("beriIzBaze1", function(){

		//console.log("Beremo podatek iz baze: ");

        fs.readFile('rok_Bitstamp1.txt', 'utf-8', function(err, buf) {
        console.log(buf.toString());
        vsebinaDatoteke = buf.toString();
        
        });
    
        socket.emit("beriBazo1", vsebinaDatoteke);
        console.log("***************************");
        console.log(vsebinaDatoteke);
        
    });
    
// ************************ BRANJE IZ TXT DATOTEKE BITTREX ****************************
    
    socket.on("beriIzBaze2", function(){

		//console.log("Beremo podatek iz baze: ");

        fs.readFile('rok_Bittrex1.txt', 'utf-8', function(err, buf) {
        console.log(buf.toString());
        vsebinaDatoteke = buf.toString();
        
        
        });
    
        socket.emit("beriBazo2", vsebinaDatoteke);
        console.log("***************************");
        console.log(vsebinaDatoteke);
        
    });
    
// ************************ BRANJE IZ TXT DATOTEKE CRYPTOPIA ****************************
    
    socket.on("beriIzBaze3", function(){

		//console.log("Beremo podatek iz baze: ");

        fs.readFile('rok_Cryptopia1.txt', 'utf-8', function(err, buf) {
        console.log(buf.toString());
        vsebinaDatoteke = buf.toString();
        
        });
    
        socket.emit("beriBazo3", vsebinaDatoteke);
        console.log("***************************");
        console.log(vsebinaDatoteke);
        
    });
	
});

//  ******************************** BITSTAMP  ********************************

function posljiVrednosti1 (socket) {
    
    publicBitstamp.transactions ('btcusd', function(err, trades) {
    console.log("*********************************************");
    console.log("Cena BTC (Bitstamp): " + trades[0].price);
    console.log("*********************************************");
    cena = trades[0].price;
    
    socket.emit("vrednostSpremenljivkeSstraniStrežnika1", cena);
    
    })
    
};

//  ******************************** BITTREX  *********************************

function posljiVrednosti2 (socket) {
    
    bittrex.getticker({ market: 'USDT-BTC' }, function(ticker, err) {
    console.log("*********************************************");
    console.log("Cena BTC (Bittrex): " + ticker.result.Last);
    console.log("*********************************************");
    cena = ticker.result.Last;
    
    socket.emit("vrednostSpremenljivkeSstraniStrežnika2", cena);
    
    })
    
};

//  ******************************** CRYPTOPIA  *******************************

function posljiVrednosti3 (socket) {
    
    cryptopia.getmarket('4909', function(err, market) {
    console.log("*********************************************");
    console.log("Cena BTC (Cryptopia): " + market.Data.LastPrice);
    console.log("*********************************************");
    cena = market.Data.LastPrice;
    
    socket.emit("vrednostSpremenljivkeSstraniStrežnika3", cena);
    
    })
    
};


