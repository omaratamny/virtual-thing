/********************************************************************************
 * Copyright (c) 2018 - 2019 Contributors to the Eclipse Foundation
 * 
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 * 
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0, or the W3C Software Notice and
 * Document License (2015-05-13) which is available at
 * https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document.
 * 
 * SPDX-License-Identifier: EPL-2.0 OR W3C-20150513
 ********************************************************************************/

const Toasting = "toasting";
const Heating = "heating";
const Erroro = "erroro";
const inserting = "inserting";
const BreadPercentage = "waterpercentage";
const Toast = "Toast";
const Stop_A_Bread_Toture = "stopabreadtoture";
const TurnOff = "turnoff";
const WaterShortage = "watershortage";
const BeansShortage = "beansshortage";
const BinFull = "binfull";
const ErrorX = "errorx";

let thing = WoT.produce({
        title: "counterCoffeeMachine",
        description: "counter example Thing",
        "@context": ["https://www.w3.org/2019/wot/td/v1", {"iot": "http://example.org/iot"}],
    });

console.log("Produced " + thing.title);

thing.addProperty(
    Toasting,
    {
        type: "boolean",
        description: "Whether the Machine is Toasting",
        "iot:Custom": "example annotation",
        observable: true,
        readOnly: true
    },
    false);
thing.addProperty(
    Heating,
    {
        type: "boolean",
        description: "Whether the Machine is Heating",
        observable: true,
        readOnly: true
    },
    false);
thing.addProperty(
    Erroro,
    {
        type: "boolean",
        description: "If there is an ERROR",
        "iot:Custom": "example annotation",
        observable: true,
        readOnly: true
    },
    false);
    thing.addProperty(
        Breadpercentage,
        {
            type: "integer",
            minimum : 0,
            maximum : 100,
            description: "An integer indicating how full the bread container is in percantages",
            "iot:Custom": "example annotation",
            observable: true,
            readOnly: true
        },
        0);
        thing.addProperty(
            Inserting,
            {
                type: "integer",
                minimum : 1,
                maximum : 4,
                description: "If the machine is inserting bread, or has bread or not, 1 is for no bread, 2 for inserting, 3 is for there is bread,4 getting bread out",
                "iot:Custom": "example annotation",
                observable: true,
                readOnly: true
            },
            1);
thing.addAction(
    Toast,
    {},
    (data,options) => {
       /* console.log(data);
            thing.properties[BREWING].write(true);
            setTimeout(function() {
            }, 3000);
            thing.properties[BREWING].write(false);
		return thing.properties[WaterPercentage].read().then( (count) => {
			let value = count -20;
			thing.properties[WaterPercentage].write(value);
			if (count < 20) {
            thing.events[WaterShortage].emit();
            }
        }); */
        return thing.properties[BreadPercentage].read().then( (bread) => {
            if(Bread<10){
            thing.events[BreadShortage].emit();
            break
             }
            else { 
                console.log(data);
                thing.properties[Toasting].write(true);
                thing.properties[Heating].write(true);
                thing.properties[Inserting].write(2);
                setTimeout(function() {
                }, 3000);
                thing.properties[Inserting].write(3);
                setTimeout(function() {
                }, 1000);
                setTimeout(function() {
                }, 3000);
                thing.properties[Heating].write(false);
                setTimeout(function() {
                }, 1000);
                thing.properties[Inserting].write(4);
                setTimeout(function() {
                }, 3000);
                thing.properties[Inserting].write(1);
                thing.properties[Toasting].write(false);
                let value = bread -10;
                thing.properties[BreadPercentage].write(value);
            }
        });
    });

thing.addAction(
    Stop_A_Bread_Torture,
    {},
    () => {
        console.log("stop the bread torture");
        thing.properties[Heating].write(false);
        thing.properties[Inserting].write(4);
        setTimeout(function() {
        }, 3000);
        thing.properties[Inserting].write(1);
        thing.properties[Toasting].write(false);
        /*
        return thing.properties[NAME_PROPERTY_COUNT].read().then( (count) => {
            let value = count - 1;
            thing.properties[brew].write(false);
            thing.properties[NAME_PROPERTY_LAST_CHANGE].write((new Date()).toISOString());
            thing.events[NAME_EVENT_CHANGE].emit();
            
        });
        */
    });

thing.addAction(
    TurnOff,
    {},
    () => {
        console.log("turn the machine off");
        thing.properties[Heating].write(false);
        thing.properties[Inserting].write(4);
        setTimeout(function() {
        }, 3000);
        thing.properties[Inserting].write(1);
        thing.properties[Toasting].write(false);
        thing.properties[Erroro].write(false);

    });
    
thing.addEvent(
    BreadShortage,
{
        type: "boolean",
        description: "If there is a watershortage"
    });       
thing.addEvent(
    ErrorX,
{
        type: "boolean",
        description: "If there is an error"
    });        
thing["support"] = "git://github.com/eclipse/thingweb.node-wot.git";

thing.expose().then( () => { console.info(thing.title + " waiting for your order"); } );

