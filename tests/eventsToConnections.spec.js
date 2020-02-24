import expect from "expect";
import { eventsToConnections } from "../src/index";
import loadExamples from "./examples/loadExamples";

describe("eventsToConnections", () => {

    let examples = {};

    beforeEach(async () => {
        examples = await loadExamples();
    });

    it("should be a function", () => {
        expect(eventsToConnections).toBeInstanceOf(Function);
    });

    it("should return an array of connections with 2 items", () => {

        let connections = eventsToConnections(examples["outbound-ring-out-direct"]);

        expect(connections).toBeInstanceOf(Array);
        expect(connections).toHaveLength(2);
    });

    it("should return an array of connections with 3 items", () => {
        let connections = eventsToConnections(examples["inbound-call-to-main-number"]);
        expect(connections).toHaveLength(3);
    });

    it("should assign the owners to the connections", () => {

        let connections = eventsToConnections(examples["outbound-ring-out-direct"]);

        expect(connections[0].extensionId).toBe("234566654");
        expect(connections[0].accountId).toBe("234566654");

        expect(connections[1].extensionId).toBeUndefined();
        expect(connections[1].accountId).toBe("234566654");
    });

    it("should set the origin fields", () => {
        let connections = eventsToConnections(examples["outbound-ring-out-press-one"]);

        expect(connections[0].origin).toBe("RingOut");
        expect(connections[1].origin).toBe("RingOut");

        connections = eventsToConnections(examples["rob-board-room"]);

        expect(connections[0].origin).toBe("Call");
        expect(connections[1].origin).toBe("Call");

    });


    it("should assign the part and session ids", () => {

        let connections = eventsToConnections(examples["outbound-ring-out-direct"]);

        expect(connections[0].partyId).toBe("cs169612397275616092-1");
        expect(connections[0].sessionId).toBe("Y3MxNjk2MTIzOTcyNzU2MTYwOTJAMTAuMjguMjAuMTA5");

        expect(connections[1].partyId).toBe("cs169612397275616092-2");
        expect(connections[1].sessionId).toBe("Y3MxNjk2MTIzOTcyNzU2MTYwOTJAMTAuMjguMjAuMTA5");
    });

    it("should assign the from and to", () => {

        let connections = eventsToConnections(examples["outbound-ring-out-direct"]);

        expect(connections[0].from).toBe("+442222222222");
        expect(connections[0].to).toBe("+441111111111");

        expect(connections[1].from).toBe("+442222222222");
        expect(connections[1].to).toBe("+441111111111");

    });

    it("should set the start at and end at", () => {

        let connections = eventsToConnections(examples["outbound-ring-out-direct"]);

        expect(connections[0].startAt).toBeInstanceOf(Date);
        expect(connections[0].endAt).toBeInstanceOf(Date);

        expect(connections[1].startAt).toBeInstanceOf(Date);
        expect(connections[1].endAt).toBeInstanceOf(Date);

        expect(connections[0].startAt.getTime()).toBe(connections[0].setupAt.getTime());
        expect(connections[0].endAt.getTime()).toBe(connections[0].disconnectAt.getTime());

        expect(connections[1].startAt.getTime()).toBe(connections[1].proceedAt.getTime());
        expect(connections[1].endAt.getTime()).toBe(connections[1].disconnectAt.getTime());

    });

    it("should calculate the call time", () => {

        let connections = eventsToConnections(examples["outbound-ring-out-direct"]);

        expect(connections[0].callTime).toBe(10698);
        expect(connections[1].callTime).toBe(10837);

    });

    it("should calculate the ring time", () => {

        let connections = eventsToConnections(examples["outbound-ring-out-direct"]);

        expect(connections[0].ringTime).toBe(8577);
        expect(connections[1].ringTime).toBe(8271);

    });

    it("should set the answered field", () => {

        let connections = eventsToConnections(examples["outbound-ring-out-direct"]);

        expect(connections[0].answered).toBe(true);
        expect(connections[1].answered).toBe(true);

    });

    it("should calculate the hold time and take it away from the call time", () => {

        let connections = eventsToConnections(examples["rob-board-room"]);

        expect(connections[0].holdTime).toBe(7222);
        expect(connections[1].holdTime).toBe(6314);

        expect(connections[0].callTime).toBe(58148 - 7222);
        expect(connections[1].callTime).toBe(46416 - 6314);

    });

    it("should set the missed call field", () => {

        let connections = eventsToConnections(examples["dnd-internal"]);

        expect(connections[0].missedCall).toBe(false);
        expect(connections[1].missedCall).toBe(true);

        connections = eventsToConnections(examples["inbound-main-number-hangup"]);

        expect(connections[0].missedCall).toBe(false);
        expect(connections[1].missedCall).toBe(true);

    });

    it("should set the voicemail & missed call field", () => {

        let connections = eventsToConnections(examples["left-voicemail"]);

        expect(connections[0].voicemail).toBe(false);
        expect(connections[1].voicemail).toBe(true);

        expect(connections[0].missedCall).toBe(false);
        expect(connections[1].missedCall).toBe(true);

        expect(connections[1].answered).toBe(false);

        connections = eventsToConnections(examples["inbound-to-voicemail"]);

        expect(connections[1].missedCall).toBe(true);
        expect(connections[1].answered).toBe(false);

        connections = eventsToConnections(examples["dnd-internal"]);

        expect(connections[1].missedCall).toBe(true);
        expect(connections[1].answered).toBe(false);

    });

    it("should set the voicemail details", () => {

        let connections = eventsToConnections(examples["left-voicemail"]);

        expect(connections[1].voicemailId).toBe("567627468064");
        expect(connections[1].voicemailDuration).toBe(10);

    });

    it("should set the voicemail details to null when they didn't leave the voicemail", () => {

        let connections = eventsToConnections(examples["dnd-internal"]);

        expect(connections[1].voicemailId).toBe(null);
        expect(connections[1].voicemailDuration).toBe(null);

    });

    it("should set the ring time correctly when leaving a voicemail", () => {

        let connections1 = eventsToConnections(examples["left-voicemail"]);

        expect(connections1[1].ringTime).toBe(32895);

        let connections2 = eventsToConnections(examples["dnd-internal"]);

        expect(connections2[1].ringTime).toBe(1445);

    });

    it("should hand a call queues events correctly", () => {

        let connections = eventsToConnections(examples["internal-call-queue"]);

        expect(connections).toHaveLength(5);

        expect(connections[1].ringTime).toBe(9448);
        expect(connections[2].ringTime).toBe(5161);
        expect(connections[3].ringTime).toBe(5157);

        expect(connections[1].missedCall).toBe(false);
        expect(connections[2].missedCall).toBe(false);
        expect(connections[3].missedCall).toBe(false);

        expect(connections[1].answered).toBe(false);
        expect(connections[2].answered).toBe(false);
        expect(connections[3].answered).toBe(false);

    });

    it("should hand a rotating call queues events correctly", () => {

        let connections = eventsToConnections(examples["tick-tock"]);

        expect(connections).toHaveLength(11);

        expect(connections[1].missedCall).toBe(true);
        expect(connections[2].missedCall).toBe(false);
        expect(connections[3].missedCall).toBe(false);
        expect(connections[4].missedCall).toBe(false);
        expect(connections[5].missedCall).toBe(false);
        expect(connections[6].missedCall).toBe(false);
        expect(connections[7].missedCall).toBe(false);
        expect(connections[8].missedCall).toBe(false);
        expect(connections[9].missedCall).toBe(false);
        expect(connections[10].missedCall).toBe(false);


    });

    it("should handle gone events like disconnects for call time", () => {

        let connections = eventsToConnections(examples["gone-event-transfer"]);

        expect(connections[0].callTime).not.toBe(121233);
        expect(connections[0].callTime).toBe(14345);

        expect(connections[1].callTime).toBe(111596);

    });

    it("should set a transferred call as transferred ", () => {

        let connections = eventsToConnections(examples["gone-event-transfer"]);

        expect(connections[0].transferred).toBe(true);
        expect(connections[1].transferred).toBe(false);

    });

    it("should set the direction of calls", () => {

        let connections = eventsToConnections(examples["outbound-ring-out-direct"]);

        expect(connections[0].direction).toBe("Outbound");
        expect(connections[1].direction).toBe("Inbound");

    });


    it("should set the type of calls", () => {

        let connections = eventsToConnections(examples["outbound-ring-out-direct"]);

        expect(connections[0].type).toBe("External");
        expect(connections[1].type).toBe("External");

        connections = eventsToConnections(examples["inbound-call-to-main-number"]);
        expect(connections[0].type).toBe("External");
        expect(connections[1].type).toBe("External");
        expect(connections[2].type).toBe("External");

        connections = eventsToConnections(examples["internal-call-queue"]);

        expect(connections[0].type).toBe("Internal");
        expect(connections[1].type).toBe("Internal");
        expect(connections[2].type).toBe("Internal");
        expect(connections[0].type).toBe("Internal");
        expect(connections[1].type).toBe("Internal");

    });

});
