export default (events) => {

var _ = require('underscore');
//var _ = require('lodash');
    // TODO: fill me with logic
//var la_events=_.flatten(events.sort());
var parties = _.sortBy(_.flatten(_.map(_.sortBy(events, 'sequence'), function(x) { 

var lo_omit=_.omit(x,'parties','origin','sessionId','from','to');
let merged =Object.assign({},_.flatten(x.parties)[0],lo_omit);

//console.log('x.parties=',x.parties[0].from.phoneNumber);
//var ls_from='',ls_to=''
//if (typeof x.from.phoneNumber !== 'undefined') {ls_from=x.from.phoneNumber;}
//if (typeof x.to.phoneNumber !== 'undefined') {ls_to=x.to.phoneNumber;}
return Object.assign({},_.flatten(x.parties)[0],lo_omit,{origin:x.origin.type},
            {partyId:x.parties[0].id,sessionId:x.telephonySessionId,
             from: x.parties[0].from.phoneNumber,to:x.parties[0].to.phoneNumber
             }); })),'id');
//return _.flatten(x.parties); })),'id');




//const parties_flat = events.flatMap(obj => obj.parties);
//console.log('parties_flat'+JSON.stringify(parties_flat,null,4));

//console.log(events);

console.log(parties);

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
//const unique = [...new Set(parties.map(item => item.id))];
//console.log(unique);

//console.log(_.flatten([1, [2], [3, [[4]]]]));

//console.log(_.sortBy(events, 'sequence'));

// let connections = events(examples["outbound-ring-out-direct"]);


return events.sort('sequence');
//return [events[0],events[1]];

}
