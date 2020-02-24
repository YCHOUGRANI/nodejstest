export default (events) => {

var _ = require('underscore');
var moment = require('moment');

    // TODO: fill me with logic

var parties = _.sortBy(_.flatten(_.map(_.sortBy(events, 'sequence'), function(x) { 

var lo_omit=_.omit(x,'parties','origin','sessionId','from','to');

var lb_voicemail=false;

var lo_voicemail={};
var ls_voicemailId='';
var li_voicemailDuration=0;
 if (typeof x.parties[0].message !== 'undefined' && typeof x.parties[0].message.messageType !== 'undefined' && x.parties[0].message.messageType === "VoiceMail") {
            ls_voicemailId=x.parties[0].message.messageId,li_voicemailDuration=x.parties[0].message.vmDuration;
            lb_voicemail=true;
           }



lo_voicemail={voicemailId:ls_voicemailId,voicemailDuration:li_voicemailDuration};

const regex = RegExp(/\+*/);
var ls_type='Internal';

if (typeof x.parties[0].status.mobilePickupData !== 'undefined') {ls_type='External';}

moment.locale('en'); // 'en'
var ld_date=new Date(moment(x.eventTime).toDate());
var ld_date2=moment(x.eventTime).format('dddd, MMMM Do YYYY, h:mm:ss a');

var ld_date2=moment(x.eventTime).format('dddd, MMMM Do YYYY, h:mm:ss a');

var lo_map_id={};
if (typeof x.parties[0].message !== 'undefined' && typeof x.parties[0].message.messageType !== 'undefined' && x.parties[0].message.messageType === "VoiceMail" ) {

lo_map_id= Object.assign({},_.flatten(x.parties)[0],lo_omit,{origin:x.origin.type},
            {partyId:x.parties[0].id,sessionId:x.telephonySessionId,
             from: x.parties[0].from.phoneNumber,to:x.parties[0].to.phoneNumber,
             startAt:moment(x.eventTime).toDate(),endAt:moment(x.eventTime).toDate(),
            setupAt:new Date(),disconnectAt:new Date(),
            //setupAt:new Date(moment(x.eventTime).format('h:mm:ss a')),disconnectAt:new Date(moment(x.eventTime).format('h:mm:ss a')),
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
             setupAt:new Date(),disconnectAt:new Date(),
             //setupAt:new Date(moment(x.eventTime).toDate()),disconnectAt:new Date(moment(x.eventTime).toDate()),
            //setupAt:new Date(moment(x.eventTime).format('h:mm:ss a')),disconnectAt:new Date(moment(x.eventTime).format('h:mm:ss a')),
            //voicemailId:ls_voicemailId,voicemailDuration:li_voicemailDuration,
            voicemail: false,
           //type:ls_type,voicemail:lb_voicemail,
              missedCall:(x.parties[0].direction === 'Inbound' ? !x.parties[0].missedCall:x.parties[0].missedCall)
             });


}
return lo_map_id;
 })),'id');



var parties_ids =_.uniq(_.map(parties,function(x) {return x.id;}));


var ls_find=[];
_.each(parties_ids,function(y){
     ls_find.push(_.find(parties,function(xx){
             return xx.id ===y;
           }))
     
})


return ls_find;

}
