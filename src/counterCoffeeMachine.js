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

const Brewing = "brewing";
const Grinding = "grinding";
const Erroro = "erroro";
const WaterPercentage = "waterpercentage";
const BeansPercentage = "beanspercentage";
const BinPercentage = "binpercentage";
const Brew = "Brew";
const Stop_A_Coffee = "stopacoffee";
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
    Brewing,
    {
        type: "boolean",
        description: "Whether the Machine is BREWING",
        "iot:Custom": "example annotation",
        observable: true,
        readOnly: true
    },
    false);
thing.addProperty(
    Grinding,
    {
        type: "boolean",
        description: "Whether the Machine is grinding",
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
        Waterpercentage,
        {
            type: "integer",
            minimum : 0,
            maximum : 100,
            description: "An integer indicating how full the water tanks is in percantages",
            "iot:Custom": "example annotation",
            observable: true,
            readOnly: true
        },
        0);
        thing.addProperty(
            BeansPercentage,
            {
                type: "boolean",
                minimum : 0,
                maximum : 100,
                description: "An integer indicating how full the beans container is in percantages",
                "iot:Custom": "example annotation",
                observable: true,
                readOnly: true
            },
            0);
thing.addProperty(
    BinPercentage,
    {
        type: "boolean",
        minimum : 0,
        maximum : 100,
        description: "An integer indicating how full the bin is in percantages",
        "iot:Custom": "example annotation",
        observable: true,
        readOnly: true
    },
    0);

thing.addAction(
    Brew,
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
        return thing.properties[BeansPercentage].read().then( (beans) => {
            if(beans<10){
            thing.events[BeansShortage].emit();
            break
             }
            else {  return thing.properties[WaterPercentage].read().then( (count) => {
                if (count < 20) {
                    thing.events[WaterShortage].emit();
                break
                }
                else {
                    console.log(data);
                    thing.properties[BREWING].write(true);
                setTimeout(function() {
                }, 3000);
                thing.properties[BREWING].write(false);
                let value = count -20;
                thing.properties[WaterPercentage].write(value);
                }
            });}
        });
    });

thing.addAction(
    Stop_A_Coffee,
    {},
    () => {
        console.log("stop the coffee making");
        thing.properties[BREWING].write(false);
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
        thing.properties[BREWING].write(false);
        thing.properties[Grinding].write(false);
        thing.properties[Erroro].write(false);
    });
    
thing.addEvent(
    WaterShortage,
{
        type: "boolean",
        description: "If there is a watershortage"
    });
thing.addEvent(
    BeansShortage,
{
        type: "boolean",
        description: "If there is a beansshortage"
    });        
thing.addEvent(
    BinFull,
{
        type: "boolean",
        description: "If the bin is full"
    });
thing.addEvent(
    ErrorX,
{
        type: "boolean",
        description: "If there is an error"
    });        
thing["support"] = "git://github.com/eclipse/thingweb.node-wot.git";

thing.expose().then( () => { console.info(thing.title + " waiting for your order"); } );

