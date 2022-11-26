const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const app = express();
app.use(cors());
app.use(bodyParser.json());


apiKey = process.env.KEY;

output = 'a'
const VoiceRSS = {
    speech: function(req, res, e) {
       this._request(res, e);
    },
    _request: function(res, e) {
        var a = this._buildRequest(e),
            t = this._getXHR();
        t.onreadystatechange = function() {
            if (4 == t.readyState && 200 == t.status) {
                if (0 == t.responseText.indexOf("ERROR")) throw t.responseText;
                output = t.responseText;
                res.send(output);
                
              	
            }
        }, t.open("POST", "https://api.voicerss.org/", !0), t.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8"), t.send(a);
    },
    _buildRequest: function(e) {
        var a = e.c;
        return "key=" + (e.key || "") + "&src=" + (e.src || "") + "&hl=" + (e.hl || "") + "&r=" + (e.r || "") + "&f=" + (e.f || "") + "&ssml=" + (e.ssml || "") + "&b64=true"
    },
    _detectCodec: function() {
        var e = new Audio;
        return e.canPlayType("audio/mpeg").replace("no", "") ? "mp3" : e.canPlayType("audio/wav").replace("no", "") ? "wav" : e.canPlayType("audio/aac").replace("no", "") ? "aac" : e.canPlayType("audio/ogg").replace("no", "") ? "ogg" : e.canPlayType("audio/x-caf").replace("no", "") ? "caf" : ""
    },
    _getXHR: function() {
        try {
            return new XMLHttpRequest();
        } catch (e) {}
        try {
            return new ActiveXObject("Msxml3.XMLHTTP")
        } catch (e) {}
        try {
            return new ActiveXObject("Msxml2.XMLHTTP.6.0")
        } catch (e) {}
        try {
            return new ActiveXObject("Msxml2.XMLHTTP.3.0")
        } catch (e) {}
        try {
            return new ActiveXObject("Msxml2.XMLHTTP")
        } catch (e) {}
        try {
            return new ActiveXObject("Microsoft.XMLHTTP")
        } catch (e) {}
        throw "The browser does not support HTTP request"
    }
};

app.post('/',(req, res) => {VoiceRSS.speech(req, res, {
        key: apiKey,
        src: req.body.text,
        hl: 'en-us',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    })});

// app.listen(4000, ()=>{
// 	console.log(`app is running on port ${4000}`);
// });
app.listen(process.env.PORT, ()=>{
	console.log(`app is running on port ${process.env.PORT}`);
});