export default (events) => {

var _ = require('underscore');
var moment = require('moment');

    // TODO: fill me with logic
//var la_events=_.flatten(events.sort());
var parties = _.sortBy(_.flatten(_.map(_.sortBy(events, 'sequence'), function(x) { 

var lo_omit=_.omit(x,'parties','origin','sessionId','from','to');
//let merged =Object.assign({},_.flatten(x.parties)[0],lo_omit);

//console.log('x=',JSON.stringify(x,null,4));


//var ls_from='',ls_to=''
//if (typeof x.from.phoneNumber !== 'undefined') {ls_from=x.from.phoneNumber;}
//if (typeof x.to.phoneNumber !== 'undefined') {ls_to=x.to.phoneNumber;}

var lb_voicemail=false;
//if (typeof x.parties[0].status.code !== undefined &&  x.parties[0].status.code === 'Voicemail') {lb_voicemail=true;}

var lo_voicemail={};
var ls_voicemailId='';
var li_voicemailDuration=0;
 if (typeof x.parties[0].message !== 'undefined' && typeof x.parties[0].message.messageType !== 'undefined' && x.parties[0].message.messageType === "VoiceMail") {
            ls_voicemailId=x.parties[0].message.messageId,li_voicemailDuration=x.parties[0].message.vmDuration;
            lb_voicemail=true;
           }



lo_voicemail={voicemailId:ls_voicemailId,voicemailDuration:li_voicemailDuration};
//lo_voicemail=lo_voicemail;
//console.log('ooooooooooulo_voicemail '+JSON.stringify(lo_voicemail));
const regex = RegExp(/\+*/);
var ls_type='Internal';
//if (regex.test(x.parties[0].to.phoneNumber)) {ls_type='External';}

if (typeof x.parties[0].status.mobilePickupData !== 'undefined') {ls_type='External';}

//if (regex.test(x.parties[0].mobilePickupData)) {ls_type='External';}



moment.locale('en'); // 'en'
/*var lb_missedCall=false;
 if(x.parties[0].missedCall === true) {
     lb_missedCall=true
 }*/ 
//console.log(lb_missedCall);
var lo_map_id={};
if (typeof x.parties[0].message !== 'undefined' && typeof x.parties[0].message.messageType !== 'undefined' && x.parties[0].message.messageType === "VoiceMail" ) {
console.log('outtttttttttth '+x.parties[0].message.messageId+'  '+x.parties[0].message.vmDuration);
lo_map_id= Object.assign({},_.flatten(x.parties)[0],lo_omit,{origin:x.origin.type},
            {partyId:x.parties[0].id,sessionId:x.telephonySessionId,
             from: x.parties[0].from.phoneNumber,to:x.parties[0].to.phoneNumber,
             startAt:moment(x.eventTime).toDate(),endAt:moment(x.eventTime).toDate(),
            setupAt:new Date(x.eventTime),disconnectAt:new Date(x.eventTime),
            //voicemailId:ls_voicemailId,voicemailDuration:li_voicemailDuration,
            voicemailId:x.parties[0].message.messageId,
            voicemailDuration:x.parties[0].message.vmDuration,
            voicemail: true,
           //type:ls_type,voicemail:lb_voicemail,
              missedCall:(x.parties[0].direction === 'Inbound' ? !x.parties[0].missedCall:x.parties[0].missedCall)
             }); 
} else {

lo_map_id= Object.assign({},_.flatten(x.parties)[0],lo_omit,{origin:x.origin.type},
            {partyId:x.parties[0].id,sessionId:x.telephonySessionId,
             from: x.parties[0].from.phoneNumber,to:x.parties[0].to.phoneNumber,
             startAt:moment(x.eventTime).toDate(),endAt:moment(x.eventTime).toDate(),
            setupAt:new Date(x.eventTime),disconnectAt:new Date(x.eventTime),
            //voicemailId:ls_voicemailId,voicemailDuration:li_voicemailDuration,
            voicemail: false,
           //type:ls_type,voicemail:lb_voicemail,
              missedCall:(x.parties[0].direction === 'Inbound' ? !x.parties[0].missedCall:x.parties[0].missedCall)
             });


}
return lo_map_id;
 })),'id');


//return _.flatten(x.parties); })),'id');




//const parties_flat = events.flatMap(obj => obj.parties);
//console.log('parties_flat'+JSON.stringify(parties_flat,null,4));

//console.log(JSON.stringify(events,null,4));

//console.log(JSON.stringify(parties,null,4));


var parties_ids =_.uniq(_.map(parties,function(x) {return x.id;}));
//console.log(parties_ids);

var ls_find=[];
_.each(parties_ids,function(y){
     ls_find.push(_.find(parties,function(xx){
             return xx.id ===y;

           }))

          
     
})

//console.log("ls_event= "+JSON.stringify(events,null,4));


//console.log("ls_find= "+JSON.stringify(ls_find,null,4));





return ls_find;

}
