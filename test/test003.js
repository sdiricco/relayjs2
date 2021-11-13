/**
 * test001.js
 *
 * scope of test:
 * verify that when the board is disconnected,
 * the module raise an error during the connection
 * Check also the internal status of module
 * 
 * prerequisites:
 * - a board with a valid firmata.ino firmware connected
 *
 * description step:
 * - call <constructor()> of RelayJs class
 * - listen on <error> event
 * - call <requestPort()> method
 * - call <connect(${port.path})> method with port received by requestPort() method
 * - Tester: Disconnect the board. Wait 10000 ms..
 * - get <firmata> property
 * - get <connected> property
 */

 const { RelayJs, Firmata, Serialport } = require("../relayjs");
 const {wait} = require("./utils")
 
 let main = async () => {
   let relayjs = undefined;
   try {
     console.log(`--- TEST START ---`);
     console.log("call <constructor()> of RelayJs class");
     relayjs = new RelayJs();
     console.log("listen on <error> event");
     relayjs.on("error", (e)=> {
       console.log(e)
     })
     console.log("call <requestPort()> method")
     let port = await relayjs.requestPort();
     console.log(port)
     console.log(`call <connect(${port.path})> method with port received by requestPort() method`);
     const res = await relayjs.connect(port.path);
     console.log(res);
     console.log("Tester: Disconnect the board. Wait 10000 ms..");
     await wait(10000);
     console.log("get <firmata> property");
     console.log(relayjs.firmata);
     console.log("get <connected> property");
     console.log(relayjs.connected);
     console.log(`--- TEST PASSED: ${!relayjs.connected} ---`);
     console.log(`--- TEST END ---`);
   } catch (e) {
     console.log(e.message);
   }
 };
 
 main();
 